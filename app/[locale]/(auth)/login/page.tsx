"use client";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/utils/userAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/store/hook";
import { setUser } from "@/app/store/authSlice";
import { Link } from "@/navigation";

import { motion } from "framer-motion";
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  // Enable static rendering
  const t = useTranslations("auth.login");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => loginUser(data),
    onSuccess: (data) => {
      toast.success(t("successToast"));
      dispatch(setUser(data));
      localStorage.setItem("user", JSON.stringify(data));
      reset();
      router.replace("/");
    },
    onError: (error: any) => {
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
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold ">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {t("email")}{" "}
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder={t("emailPlaceholder")}
          className="
            rounded-lg border border-gray-300 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-green-500
          "
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {t("password")}
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder={t("passwordPlaceholder")}
          className="
            rounded-lg border border-gray-300 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-green-500
          "
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        initial={{}}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.9, y: 1 }}
        disabled={mutation.isPending}
        className="
          w-full rounded-lg bg-green-600 py-2 font-semibold text-white
          hover:bg-green-700
          disabled:opacity-50
          transition
          hover:cursor-pointer
        "
      >
        {mutation.isPending ? t("submitting") : t("submit")}
      </motion.button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500">
        {t("footerText")}{" "}
        <Link
          href="/register"
          className="font-medium text-green-600 hover:underline"
        >
          {t("registerLink")}
        </Link>
      </p>
    </form>
  );
}
