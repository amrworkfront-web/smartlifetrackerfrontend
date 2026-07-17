"use client";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "../store/store";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import StoreInitializer from "../storeInitializer";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";

export default function Providers({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <StoreInitializer />
          <SidebarProvider>
            {children}
            <Toaster richColors position="top-right" />
          </SidebarProvider>
        </Provider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
