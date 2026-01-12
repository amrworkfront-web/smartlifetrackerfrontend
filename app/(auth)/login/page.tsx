"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "@/app/utils/userAPI"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function Page() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) => loginUser(data),
    onSuccess: () => {
      toast.success("wellcome back")
      reset()
      router.push("/")
    },
    onError:(error:any)=>{
            toast.error("Login failed", {
        description: error.response?.data?.message || "Please check your credentials and try again."
      });
    }
  })

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="flex flex-col gap-6"
    >
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Login to your account
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
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
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="
            rounded-lg border border-gray-300 px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-green-500
          "
        />
        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="
          w-full rounded-lg bg-green-600 py-2 font-semibold text-white
          hover:bg-green-700
          disabled:opacity-50
          transition
        "
      >
        {mutation.isPending ? "Logging in..." : "Log In"}
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="font-medium text-green-600 hover:underline"
        >
          Register
        </a>
      </p>
    </form>
  )
}
