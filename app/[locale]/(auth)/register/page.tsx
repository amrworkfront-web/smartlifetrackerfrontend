'use client'
import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/app/utils/userAPI'
import { useRouter } from 'next/navigation'
import {toast} from 'sonner'
import {useAppDispatch} from '@/app/store/hook'
import {setUser} from '@/app/store/authSlice'
import {Link} from "@/navigation"
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password must be at most 100 characters'),
})

export type FormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter()
  const dispatch=useAppDispatch();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const mutation = useMutation({
    mutationFn: (data: FormData) => registerUser(data),
    onSuccess: (data) => {
      toast.success(t("successToast"))
      localStorage.setItem('user',JSON.stringify((data)))
      dispatch(setUser(data))
      reset()
      router.push('/') // بعد التسجيل يروح لصفحة login
    },
    onError: (error: any) => {
      toast.error(t('errorToast'), {
        description: error.response?.data?.message || t("errorDesc")
      })
    }
  })


    
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl  p-8 shadow-lg border border-gray-200 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-500 text-center">
          {t("subtitle")}
        </p>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{t("name")}</label>
            <input
              {...register('name')}
              placeholder={t("namePlaceholder")}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{t("email")}</label>
            <input
              type="email"
              {...register('email')}
              placeholder={t("emailPlaceholder")}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{t("password")}</label>
            <input
              type="password"
              {...register('password')}
              placeholder={t("passwordPlaceholder")}
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
            {mutation.isPending ? t('submitting') : t('submit')}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          {t("footerText")}{' '}
          <Link href="/login" className="text-green-600 hover:underline">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  )
}
