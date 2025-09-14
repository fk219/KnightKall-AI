import { KPICard } from "@/components/kpi-card";
import { CallVolumeChart } from "@/components/charts/call-volume-chart";
import { CallDurationChart } from "@/components/charts/call-duration-chart";
import { AgentPerformanceTable } from "@/components/charts/agent-performance-table";
import { PremiumHeroSection } from "@/components/premium-hero-section";
import { Phone, PhoneCall, PhoneMissed, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Premium Hero Section */}
      <div className="animate-scale-in">
        <PremiumHeroSection />
      </div>

      {/* Enhanced Page Header */}
      <div className="flex items-end justify-between animate-fade-in">
        <div className="space-y-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gradient mb-2">
              Real-Time Analytics
            </h2>
            <p className="text-lg text-muted-foreground font-medium max-w-3xl leading-relaxed">
              Monitor your AI calling platform performance with live insights and comprehensive metrics
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="glass-card bg-primary/10 text-primary border-primary/30 px-4 py-2 shadow-lg">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Enhanced KPI Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
        <div className="hover-scale">
          <KPICard
            title="Total Calls Today"
            value="1,247"
            change="+12.5% vs yesterday"
            changeType="positive"
            icon={Phone}
            subtitle="Across all agents"
          />
        </div>
        <div className="hover-scale">
          <KPICard
            title="Success Rate"
            value="87.3%"
            change="+8.2% this week"
            changeType="positive"
            icon={PhoneCall}
            subtitle="1,089 answered"
          />
        </div>
        <div className="hover-scale">
          <KPICard
            title="Missed Calls"
            value="158"
            change="-5.1% improvement"
            changeType="positive"
            icon={PhoneMissed}
            subtitle="12.7% miss rate"
          />
        </div>
        <div className="hover-scale">
          <KPICard
            title="Active Agents"
            value="24"
            change="2 new today"
            changeType="neutral"
            icon={Users}
            subtitle="Ready to serve"
          />
        </div>
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid gap-8 lg:grid-cols-2 animate-fade-in">
        <div className="hover-scale">
          <CallVolumeChart />
        </div>
        <div className="hover-scale">
          <CallDurationChart />
        </div>
      </div>

      {/* Enhanced Agent Performance Section */}
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-gradient">Top Performers</h2>
            <p className="text-muted-foreground font-medium text-lg">Your highest performing agents this week</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="glass-card hover:border-primary hover:text-primary hover:shadow-primary/25 transition-all duration-300"
          >
            View All Agents
          </Button>
        </div>
        <div className="hover-scale">
          <AgentPerformanceTable />
        </div>
      </div>
    </div>
  );
}