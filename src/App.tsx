import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardLayout } from "@/components/dashboard-layout";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import CreateAgent from "./pages/CreateAgent";
import CampaignAnalytics from "./pages/CampaignAnalytics";
import InboundAnalytics from "./pages/InboundAnalytics";
import OutboundAnalytics from "./pages/OutboundAnalytics";
import OutboundCampaigns from "./pages/OutboundCampaigns";
import NewCampaign from "./pages/NewCampaign";
import BatchCalls from "./pages/BatchCalls";
import CallLogs from "./pages/CallLogs";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import Dialer from "./pages/Dialer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/realtime" element={<PlaceholderPage title="Realtime Data" description="Live monitoring of all call activities" />} />
              <Route path="/results" element={<PlaceholderPage title="All Results" description="Comprehensive view of all call outcomes" />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/create" element={<CreateAgent />} />
              <Route path="/templates" element={<PlaceholderPage title="Templates" description="Manage conversation templates and scripts" />} />
              <Route path="/campaigns" element={<PlaceholderPage title="Campaigns" description="Create and manage calling campaigns" />} />
              <Route path="/campaigns/analytics" element={<CampaignAnalytics />} />
              
              {/* Outbound Routes */}
              <Route path="/outbound/campaigns" element={<OutboundCampaigns />} />
              <Route path="/outbound/campaigns/new" element={<NewCampaign />} />
              <Route path="/outbound/batch-calls" element={<BatchCalls />} />
              <Route path="/outbound/logs" element={<CallLogs />} />
              <Route path="/dialer" element={<Dialer />} />
              <Route path="/contacts" element={<PlaceholderPage title="Contacts" description="Manage your contact database" />} />
              <Route path="/phone-numbers" element={<PlaceholderPage title="Phone Numbers" description="Configure and manage phone numbers" />} />
              <Route path="/billing" element={<PlaceholderPage title="Billing" description="Manage your subscription and billing" />} />
              <Route path="/integrations" element={<PlaceholderPage title="Integrations" description="Connect with external services" />} />
              <Route path="/analytics/inbound" element={<InboundAnalytics />} />
              <Route path="/analytics/outbound" element={<OutboundAnalytics />} />
              <Route 
                path="/incoming-calls" 
                element={
                  <PlaceholderPage 
                    title="Incoming Calls" 
                    description="Monitor and manage your incoming call activity"
                  />
                } 
              />
              <Route 
                path="/outbound-calls" 
                element={
                  <PlaceholderPage 
                    title="Outbound Calls" 
                    description="Track and analyze your outbound calling campaigns"
                  />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <PlaceholderPage 
                    title="Settings" 
                    description="Configure your AI calling platform preferences"
                  />
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
