import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  subtitle?: string;
}

export function KPICard({ title, value, change, changeType, icon: Icon, subtitle }: KPICardProps) {
  const changeColorClass = {
    positive: "text-success bg-success/10",
    negative: "text-destructive bg-destructive/10", 
    neutral: "text-muted-foreground bg-muted/20",
  }[changeType];

  return (
    <Card className="kpi-card group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-xl bg-primary-lighter flex items-center justify-center group-hover:bg-primary group-hover:shadow-green-lg transition-all duration-300 transform group-hover:scale-110">
          <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold mb-2 tracking-tight text-foreground group-hover:text-gradient transition-colors">
          {value}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mb-2 font-medium">{subtitle}</p>
        )}
        <Badge variant="secondary" className={`text-xs font-semibold ${changeColorClass} border-0`}>
          {change}
        </Badge>
      </CardContent>
    </Card>
  );
}