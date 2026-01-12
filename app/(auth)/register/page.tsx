'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/app/utils/userAPI'
import { useRouter } from 'next/navigation'
import {toast} from 'sonner'
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be at most 100 characters'),
})

export type FormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) => registerUser(data),
    onSuccess: () => {
      toast.success("wellcome")
      reset()
      router.push('/') // بعد التسجيل يروح لصفحة login
    },
    onError: (error: any) => {
      toast.error('Error registering user:', {
        description: error.response?.data?.message || "Please check your credentials and try again."
      })
    }
  })


    
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-200 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Start your free account
        </p>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name')}
              placeholder="Your name"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50 transition"
          >
            {mutation.isPending ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  )
}
