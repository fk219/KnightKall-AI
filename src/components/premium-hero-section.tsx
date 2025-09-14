import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users, Phone } from "lucide-react";
import dashboardHeroBg from "@/assets/dashboard-hero-bg.jpg";

export function PremiumHeroSection() {
  return (
    <Card className="relative overflow-hidden border-0 rounded-2xl mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${dashboardHeroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary-light/80" />
      
      {/* Content */}
      <div className="relative z-10 p-12">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-3 mb-6">
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Live Dashboard
            </Badge>
            <Badge className="bg-success/20 text-white border-success/30 backdrop-blur-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              +24% This Month
            </Badge>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Your AI Calling Platform
            <br />
            <span className="text-white/90">Performance Hub</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
            Monitor, analyze, and optimize your AI agents in real-time. 
            Get insights that drive better customer conversations and higher conversion rates.
          </p>
          
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center space-x-2 text-white">
              <Users className="h-5 w-5 text-white/80" />
              <span className="font-semibold">24 Active Agents</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Phone className="h-5 w-5 text-white/80" />
              <span className="font-semibold">1,247 Calls Today</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="glass" 
              size="lg" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
            >
              Create New Agent
            </Button>
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
              View Analytics
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-lg" />
    </Card>
  );
}