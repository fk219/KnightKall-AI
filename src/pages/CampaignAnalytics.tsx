import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Eye, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const campaignMetrics = [
  {
    metric: "Total AI Calls",
    value: "4,228",
    trend: "up",
    change: "+12%"
  },
  {
    metric: "Running Calls",
    value: "0",
    trend: "none",
    change: "0%"
  },
  {
    metric: "Total Final Unqualified (Wrong Number) Calls",
    value: "0",
    trend: "none",
    change: "0%"
  },
  {
    metric: "Total Not Connected Calls (To be Redialed)",
    value: "1,996",
    trend: "down",
    change: "-8%"
  },
  {
    metric: "Total Picked Up Calls",
    value: "2,232",
    trend: "up",
    change: "+15%"
  },
  {
    metric: "Total Positive Calls",
    value: "228",
    trend: "up",
    change: "+24%"
  },
  {
    metric: "Total Negative Calls",
    value: "176",
    trend: "down",
    change: "-5%"
  },
  {
    metric: "Total Qualified Calls",
    value: "15",
    trend: "up",
    change: "+67%"
  },
  {
    metric: "Total Not Qualified Calls",
    value: "2,287",
    trend: "up",
    change: "+11%"
  },
  {
    metric: "Call Pickup Percentage",
    value: "52.79%",
    trend: "up",
    change: "+3.2%"
  },
  {
    metric: "Qualified Percentage",
    value: "0.35%",
    trend: "up",
    change: "+0.15%"
  },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-success" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    default:
      return <Minus className="h-4 w-4 text-muted-foreground" />;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-success";
    case "down":
      return "text-destructive";
    default:
      return "text-muted-foreground";
  }
};

export default function CampaignAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/campaigns")}
            className="hover:bg-primary-lighter"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campaign Analytics</h1>
            <p className="text-muted-foreground mt-1">Detailed performance metrics for all campaigns</p>
          </div>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">4,228</div>
            <p className="text-sm text-muted-foreground">Total Calls</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+12%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">52.79%</div>
            <p className="text-sm text-muted-foreground">Pickup Rate</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+3.2%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">0.35%</div>
            <p className="text-sm text-muted-foreground">Qualified Rate</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+0.15%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">228</div>
            <p className="text-sm text-muted-foreground">Positive Calls</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+24%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Detailed Call Metrics</CardTitle>
          <CardDescription>
            Comprehensive breakdown of campaign performance across all metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">METRIC</TableHead>
                  <TableHead className="font-semibold">VALUE</TableHead>
                  <TableHead className="font-semibold">TREND</TableHead>
                  <TableHead className="font-semibold">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignMetrics.map((metric, index) => (
                  <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium py-4">
                      {metric.metric}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">{metric.value}</span>
                        <Badge 
                          variant="secondary" 
                          className={`${getTrendColor(metric.trend)} bg-transparent border`}
                        >
                          {metric.change}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend)}
                        <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                          {metric.trend === "up" ? "Increasing" : metric.trend === "down" ? "Decreasing" : "Stable"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="premium-button-hover"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Calls
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Call Outcome Distribution</CardTitle>
            <CardDescription>Breakdown of call results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm font-medium">Positive Calls</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">228</div>
                  <div className="text-xs text-muted-foreground">10.2%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-sm font-medium">Negative Calls</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">176</div>
                  <div className="text-xs text-muted-foreground">7.9%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                  <span className="text-sm font-medium">Not Connected</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">1,996</div>
                  <div className="text-xs text-muted-foreground">47.2%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key metrics and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-medium text-success">Strong Performance</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Pickup rate increased by 3.2% this period
              </p>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="font-medium text-warning">Room for Improvement</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Qualified rate can be optimized further
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}