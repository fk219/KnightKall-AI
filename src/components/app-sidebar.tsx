import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Phone,
  PhoneCall,
  PhoneIncoming,
  Settings,
  Users,
  Activity,
  ChevronDown,
  Bot,
  FileText,
  Megaphone,
  Contact,
  CreditCard,
  Zap,
  ChevronRight,
  Smartphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import callaiLogo from "@/assets/callai-logo.png";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Realtime Data",
    url: "/realtime",
    icon: Activity,
  },
  {
    title: "All Results",
    url: "/results",
    icon: Users,
  },
  {
    title: "AI Dialer",
    url: "/dialer",
    icon: Smartphone,
  },
];

const agentsItems = [
  {
    title: "Agents",
    url: "/agents",
    icon: Bot,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: FileText,
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: Contact,
  },
  {
    title: "Phone Numbers",
    url: "/phone-numbers",
    icon: Phone,
  },
];

const outboundItems = [
  {
    title: "Campaigns",
    url: "/outbound/campaigns",
    icon: Megaphone,
  },
  {
    title: "Batch Calls",
    url: "/outbound/batch-calls",
    icon: PhoneCall,
  },
  {
    title: "Call Logs",
    url: "/outbound/logs",
    icon: FileText,
  },
];

const analyticsItems = [
  {
    title: "Inbound Analytics",
    url: "/analytics/inbound",
    icon: PhoneIncoming,
  },
  {
    title: "Outbound Analytics",
    url: "/analytics/outbound",
    icon: PhoneCall,
  },
];

const otherItems = [
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: Zap,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [agentsOpen, setAgentsOpen] = useState(true);
  const [outboundOpen, setOutboundOpen] = useState(true);
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isAnalyticsActive = analyticsItems.some((item) => isActive(item.url));
  const isAgentsActive = agentsItems.some((item) => isActive(item.url));
  const isOutboundActive = outboundItems.some((item) => isActive(item.url));

  return (
    <TooltipProvider>
      <Sidebar className={`${collapsed ? "w-24 sidebar-collapsed" : "w-64"}`} collapsible="icon">
      <SidebarHeader className={collapsed ? "p-2 border-b border-border/50" : "p-6 border-b border-border/50"}>
        {!collapsed && (
          <div className="flex items-center space-x-4">
            <img 
              src={callaiLogo} 
              alt="CallAI Logo" 
              className="h-10 w-10 rounded-xl shadow-sm"
            />
            <div>
              <span className="text-xl font-bold text-gradient">CallAI</span>
              <p className="text-xs text-muted-foreground font-medium">AI Calling Platform</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center py-2">
            <img 
              src={callaiLogo} 
              alt="CallAI Logo" 
              className="h-12 w-12 rounded-xl shadow-sm hover:shadow-green transition-shadow"
            />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className={collapsed ? "custom-scrollbar px-2 py-6" : "custom-scrollbar px-4 py-6"}>
        <SidebarGroup className="space-y-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item justify-center ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-5 w-5" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <NavLink
                        to={item.url}
                        className={({ isActive: linkActive }) =>
                          `sidebar-item ${
                            linkActive || isActive(item.url)
                              ? "sidebar-item-active"
                              : "sidebar-item-inactive"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Agents Section */}
        <SidebarGroup className="mt-1">
          {collapsed ? (
            <SidebarGroupContent>
              <SidebarMenu>
                {agentsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item justify-center ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-5 w-5" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : (
            <Collapsible open={agentsOpen} onOpenChange={setAgentsOpen}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between p-3 hover:bg-secondary/60 rounded-xl cursor-pointer group transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bot className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Agents</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 text-muted-foreground group-hover:text-foreground ${
                      agentsOpen ? "rotate-180" : ""
                    }`}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {agentsItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item ml-6 ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          )}
        </SidebarGroup>

        {/* Outbound Section */}
        <SidebarGroup className="mt-1">
          {collapsed ? (
            <SidebarGroupContent>
              <SidebarMenu>
                {outboundItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item justify-center ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-5 w-5" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : (
            <Collapsible open={outboundOpen} onOpenChange={setOutboundOpen}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between p-3 hover:bg-secondary/60 rounded-xl cursor-pointer group transition-colors">
                  <div className="flex items-center space-x-3">
                    <PhoneCall className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Outbound</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 text-muted-foreground group-hover:text-foreground ${
                      outboundOpen ? "rotate-180" : ""
                    }`}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {outboundItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item ml-6 ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          )}
        </SidebarGroup>

        {/* Analytics Section */}
        <SidebarGroup className="mt-1">
          {collapsed ? (
            <SidebarGroupContent>
              <SidebarMenu>
                {analyticsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item justify-center ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-5 w-5" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          ) : (
            <Collapsible open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="flex items-center justify-between p-3 hover:bg-secondary/60 rounded-xl cursor-pointer group transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-foreground">Analytics</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 text-muted-foreground group-hover:text-foreground ${
                      analyticsOpen ? "rotate-180" : ""
                    }`}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-2">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {analyticsItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item ml-6 ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-4 w-4" />
                            <span className="font-medium">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          )}
        </SidebarGroup>

        {/* Other Items */}
        <SidebarGroup className="mt-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {otherItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink
                            to={item.url}
                            className={({ isActive: linkActive }) =>
                              `sidebar-item justify-center ${
                                linkActive || isActive(item.url)
                                  ? "sidebar-item-active"
                                  : "sidebar-item-inactive"
                              }`
                            }
                          >
                            <item.icon className="h-5 w-5" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <NavLink
                        to={item.url}
                        className={({ isActive: linkActive }) =>
                          `sidebar-item ${
                            linkActive || isActive(item.url)
                              ? "sidebar-item-active"
                              : "sidebar-item-inactive"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                        <ChevronRight className="h-4 w-4" />
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </TooltipProvider>
  );
}