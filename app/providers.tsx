"use client"
import { Toaster } from "sonner"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SidebarProvider } from '@/components/ui/sidebar';
const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      {children}
              <Toaster richColors position="top-right" />

      </SidebarProvider>
    </QueryClientProvider>
  )
}
