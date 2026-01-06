'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/app/utils/userAPI'
import { useMutation } from '@tanstack/react-query'


const formSchema = z.object({
  name: z.string().min(2,'Name must be at least 2 characters').max(100,'Name must be at most 100 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8,'Password must be at least 8 characters').max(100,'Password must be at most 100 characters'),
})
export type FormData = z.infer<typeof formSchema>

export default function Page() {
  const { register, handleSubmit, reset
, formState: { errors }
   } = useForm<FormData>({ resolver: zodResolver(formSchema) })


   
    const mutation = useMutation({
    mutationFn:(data: FormData) => registerUser(data),
    onSuccess: (data) => {
      console.log('User registered successfully:', data)
              reset()

    },
    onError: (error) => {
      console.error('Error registering user:', error);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
        <div         className="w-full max-w-md space-y-6 rounded-2xl bg-gray-800 p-6 shadow-xl ring-1 ring-gray-700"
>
      <form
        onSubmit={handleSubmit(
            (data) => {
                mutation.mutate(data)
            }
    )}
        className="flex flex-col gap-6 border-b-2 border-gray-700 pb-6"
      >
        <h1 className="text-center text-2xl font-semibold text-white">
          Create Profile
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Name
          </label>
          <input
            id="name"
            placeholder="Enter your name"
            {...register('name')}
            className="
              rounded-lg bg-gray-700 px-4 py-2 text-white
              outline-none ring-1 ring-gray-600
              placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500
              transition
            "
          />
            {   errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}

        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"

            id="email"
            placeholder="Enter your email"
            {...register('email')}
            className="
              rounded-lg bg-gray-700 px-4 py-2 text-white
              outline-none ring-1 ring-gray-600
              placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500
              transition
            "
          />                  {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}

        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Password
          </label>
          <input
type='password'
id="password"
            placeholder="Enter your password"
            {...register('password')}
            className="
              rounded-lg bg-gray-700 px-4 py-2 text-white
              outline-none ring-1 ring-gray-600
              placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500
              transition
            "
          />                      {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}

        </div>

        <button
          type="submit"
          className="
            w-full rounded-lg bg-blue-600 py-2 font-semibold text-white
            hover:bg-blue-700
            active:scale-[0.98]
            transition
          "
        >
          Submit
        </button>
      </form>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <a href="/login" className="text-blue-400 hover:text-blue-300">
          Login
        </a>
      </p>
      </div>
    </div>
  )
}
