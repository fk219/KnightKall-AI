import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Filter, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const heatmapData = [
  { hour: '00', calls: 5 },
  { hour: '01', calls: 3 },
  { hour: '02', calls: 2 },
  { hour: '03', calls: 1 },
  { hour: '04', calls: 2 },
  { hour: '05', calls: 4 },
  { hour: '06', calls: 12 },
  { hour: '07', calls: 28 },
  { hour: '08', calls: 45 },
  { hour: '09', calls: 62 },
  { hour: '10', calls: 78 },
  { hour: '11', calls: 85 },
  { hour: '12', calls: 92 },
  { hour: '13', calls: 88 },
  { hour: '14', calls: 95 },
  { hour: '15', calls: 102 },
  { hour: '16', calls: 89 },
  { hour: '17', calls: 76 },
  { hour: '18', calls: 54 },
  { hour: '19', calls: 38 },
  { hour: '20', calls: 25 },
  { hour: '21', calls: 18 },
  { hour: '22', calls: 12 },
  { hour: '23', calls: 8 },
];

const sentimentData = [
  { name: 'Positive', value: 68, color: 'hsl(var(--success))' },
  { name: 'Neutral', value: 24, color: 'hsl(var(--warning))' },
  { name: 'Negative', value: 8, color: 'hsl(var(--destructive))' },
];

const funnelData = [
  { stage: 'Incoming', value: 1247, color: 'hsl(var(--primary))' },
  { stage: 'Connected', value: 1089, color: 'hsl(var(--primary-light))' },
  { stage: 'Converted', value: 834, color: 'hsl(var(--success))' },
  { stage: 'Escalated', value: 127, color: 'hsl(var(--warning))' },
];

export default function InboundAnalytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbound Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Deep insights into your incoming call performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <CalendarDays className="h-4 w-4 mr-2" />
            Last 7 days
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">87.3%</div>
            <p className="text-sm text-muted-foreground">Answer Rate</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">4:32</div>
            <p className="text-sm text-muted-foreground">Avg Duration</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">12.7%</div>
            <p className="text-sm text-muted-foreground">Escalation Rate</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.6/5</div>
            <p className="text-sm text-muted-foreground">Satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Call Volume Heatmap */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Call Volume Heatmap</CardTitle>
            <CardDescription>Hourly call distribution patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={heatmapData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Caller Sentiment</CardTitle>
            <CardDescription>Emotional analysis of interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>Call progression through each stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1">
                  <div className="relative">
                    <div 
                      className="h-8 rounded-lg transition-all duration-300"
                      style={{ 
                        backgroundColor: stage.color,
                        width: `${(stage.value / funnelData[0].value) * 100}%`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center px-3">
                      <span className="text-white font-medium text-sm">
                        {stage.value} ({Math.round((stage.value / funnelData[0].value) * 100)}%)
                      </span>
                    </div>
                  </div>
                </div>
                {index > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    -{Math.round(((funnelData[index-1].value - stage.value) / funnelData[index-1].value) * 100)}% drop
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}