"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/app/utils/userAPI";
import { useRouter } from "@/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/store/hook";
import { setUser } from "@/app/store/authSlice";
import { Link } from "@/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosError } from "axios";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) => registerUser(data),
    onSuccess: (response) => {
      toast.success(t("successToast"));
      const userData = response.user ?? response;
      if (!userData || !userData.name) return;
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));
      reset();
      router.push("/tasks");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(t("errorToast"), {
        description: error.response?.data?.message || t("errorDesc"),
      });
    },
  });

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">{t("title")}</h1>
        <p className="text-sm text-gray-500 text-center">{t("subtitle")}</p>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="flex flex-col gap-4 mt-6"
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="register-name" className="text-sm font-medium text-gray-700">
              {t("name")}
            </Label>
            <Input
              id="register-name"
              {...register("name")}
              placeholder={t("namePlaceholder")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "register-name-error" : undefined}
            />
            {errors.name && (
              <p id="register-name-error" className="text-sm text-red-500" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="register-email" className="text-sm font-medium text-gray-700">
              {t("email")}
            </Label>
            <Input
              id="register-email"
              type="email"
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "register-email-error" : undefined}
            />
            {errors.email && (
              <p id="register-email-error" className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="register-password" className="text-sm font-medium text-gray-700">
              {t("password")}
            </Label>
            <Input
              id="register-password"
              type="password"
              {...register("password")}
              placeholder={t("passwordPlaceholder")}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "register-password-error" : undefined}
            />
            {errors.password && (
              <p id="register-password-error" className="text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50 transition"
          >
            {mutation.isPending ? t("submitting") : t("submit")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {t("footerText")}{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
