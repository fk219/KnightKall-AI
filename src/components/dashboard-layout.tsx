import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Plus, Search, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface DashboardLayoutProps {
  children: React.ReactNode;
}
export function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Enhanced Header */}
          <header className="h-20 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center space-x-6">
              <SidebarTrigger className="h-9 w-9 hover:bg-primary-lighter transition-colors" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gradient">CallAI Dashboard</h1>
                <p className="text-sm text-muted-foreground font-medium">Manage your AI calling platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-primary">
                  <span className="sr-only">New notifications</span>
                </Badge>
              </Button>
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-auto custom-scrollbar bg-gradient-to-br from-background via-background to-primary-lighter/10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Enhanced Floating Action Button */}
        
      </div>
    </SidebarProvider>;
}