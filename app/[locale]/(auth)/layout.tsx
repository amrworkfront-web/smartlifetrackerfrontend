export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center  px-4">
      <div className="w-full max-w-md rounded-2xl  p-8 shadow-lg border ">
        {children}
      </div>
    </div>
  )
}
