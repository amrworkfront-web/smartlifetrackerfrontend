"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/utils/userAPI";
import { useRouter } from "@/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/store/hook";
import { setUser } from "@/app/store/authSlice";
import { motion } from "motion/react";
import { Link } from "@/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => loginUser(data),
    onSuccess: (response) => {
      toast.success(t("successToast"));
      const userData = response.user ?? response;
      if (!userData || !userData.name) return;
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      reset();
router.replace("/journal");
 },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(t("errorToast"), {
        description: error.response?.data?.message || t("errorDesc"),
      });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="flex flex-col gap-6"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
          {t("email")}
        </Label>
        <Input
          id="login-email"
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "login-email-error" : undefined}
        />
        {errors.email && (
          <p id="login-email-error" className="text-sm text-red-500" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
          {t("password")}
        </Label>
        <Input
          id="login-password"
          type="password"
          {...register("password")}
          placeholder={t("passwordPlaceholder")}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "login-password-error" : undefined}
        />
        {errors.password && (
          <p id="login-password-error" className="text-sm text-red-500" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50 transition"
      >
        {mutation.isPending ? t("submitting") : t("submit")}
      </motion.button>

      <p className="text-center text-sm text-gray-500">
        {t("footerText")}{" "}
        <Link href="/register" className="font-medium text-green-600 hover:underline">
          {t("registerLink")}
        </Link>
      </p>
    </form>
  );
}
