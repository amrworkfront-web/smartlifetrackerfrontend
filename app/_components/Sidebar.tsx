"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link, usePathname } from "@/navigation";
import { useAppSelector } from "@/app/store/hook";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/app/utils/userAPI";
import LanguageSwitcher from "./LanguageSwitcher";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CheckSquare,
  StickyNote,
  BookOpen,
  Calendar,
  User,
  LogOut,
  Loader2,
  Timer,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const sidebarItems = [
  { key: "tasks", icon: CheckSquare, href: "/tasks" },
  { key: "pomodoro", icon: Timer, href: "/pomodoro" },
  { key: "notes", icon: StickyNote, href: "/notes" },
  { key: "journal", icon: BookOpen, href: "/journal" },
  { key: "calendar", icon: Calendar, href: "/calendar" },
  { key: "profile", icon: User, href: "/profile" },
];

export default function CustomSidebar() {
  const t = useTranslations("sidebar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success(t("logoutSuccess"));
      localStorage.removeItem("user");
      router.replace("/login");
    },
    onError: () => toast.error("Logout failed"),
  });

  return (
    <Sidebar
      side={locale === "ar" ? "right" : "left"}
      className="border-e"
      collapsible="icon"
    >
      <SidebarHeader className="px-4 py-4 border-b">
        <div className="flex items-center justify-between overflow-hidden">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold truncate">{t("title")}</h2>
            <p className="text-xs text-muted-foreground truncate">
              {t("subtitle")}
            </p>
          </div>
          <SidebarTrigger aria-label={t("toggle")} />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-4">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={t(`nav.${item.key}`)}
                isActive={pathname === item.href}
                className={
                  pathname === item.href
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white"
                    : ""
                }
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{t(`nav.${item.key}`)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <div className="flex justify-around items-start px-2 py-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-bold" aria-hidden="true">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="grid flex-1 text-sm leading-tight">
            <span className="truncate font-semibold">{user?.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </div>

        <SidebarMenuButton
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="w-full justify-start gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
          aria-label={t("logout")}
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <LogOut className="h-4 w-4" aria-hidden="true" />
          )}
          <span>{t("logout")}</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
