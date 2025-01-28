import { AppSidebar } from "../../components/app-sidebar";
import { ModeToggle } from "@/components/ui/modetoggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserProfile } from "@/components/ui/user-profile";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <ModeToggle />
          <UserProfile />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
