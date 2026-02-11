"use client";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "@/components/ui/sidebar";
import StoreInitializer from "../storeInitializer";
import { ThemeProvider as NextThemesProvider } from "next-themes"
const queryClient = new QueryClient();

export default function Providers({ children,...props }: React.ComponentProps<typeof NextThemesProvider>) {
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
