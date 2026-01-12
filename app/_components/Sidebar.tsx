import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  CheckSquare,
  StickyNote,
  BookOpen,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"

export const sidebarItems = [
  { title: "Tasks", icon: CheckSquare, href: "/tasks" },
  { title: "Notes", icon: StickyNote, href: "/notes" },
  { title: "Journal", icon: BookOpen, href: "/journal" },
  { title: "Calendar", icon: Calendar, href: "/calendar" },
  { title: "Profile", icon: User, href: "/profile" },
]

export default function CustomSidebar() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <Sidebar className="border-r">
        {/* Header */}
        <SidebarHeader className="px-4 py-4">
          <h2 className="text-xl font-bold tracking-tight">
            Smart Life Tracker
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Organize your life
          </p>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="px-2">
          <SidebarMenu className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  className="
                    flex items-center gap-3 rounded-lg px-3 py-2
                    text-sm font-medium text-muted-foreground
                    hover:bg-muted hover:text-foreground
                    transition-colors
                    data-[active=true]:bg-muted
                    data-[active=true]:text-foreground
                  "
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground border-t">
          © 2026 Smart Life Tracker
        </SidebarFooter>
      </Sidebar>

      {/* Main content */}
      <main className="flex-1">
        <header className="flex items-center gap-2 border-b bg-background px-4 py-3">
          <SidebarTrigger />
  
        </header>

        {/* Page content here */}
      </main>
    </div>
  )
}
