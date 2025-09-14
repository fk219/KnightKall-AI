import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Filter, Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart } from "recharts";

const pipelineData = [
  { stage: 'Attempted', value: 2450, color: 'hsl(var(--muted-foreground))' },
  { stage: 'Answered', value: 1834, color: 'hsl(var(--primary))' },
  { stage: 'Qualified', value: 1247, color: 'hsl(var(--primary-light))' },
  { stage: 'Closed', value: 456, color: 'hsl(var(--success))' },
];

const outcomeData = [
  { name: 'Success', value: 456, color: 'hsl(var(--success))' },
  { name: 'Voicemail', value: 378, color: 'hsl(var(--warning))' },
  { name: 'Rejected', value: 287, color: 'hsl(var(--destructive))' },
  { name: 'Follow-up', value: 413, color: 'hsl(var(--primary-light))' },
];

const agentComparisonData = [
  { agent: 'Sarah', calls: 145, conversions: 67, rate: 46.2 },
  { agent: 'Mike', calls: 128, conversions: 52, rate: 40.6 },
  { agent: 'Lisa', calls: 134, conversions: 58, rate: 43.3 },
  { agent: 'John', calls: 96, conversions: 34, rate: 35.4 },
  { agent: 'Emma', calls: 112, conversions: 48, rate: 42.9 },
];

export default function OutboundAnalytics() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Outbound Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analysis of your outbound calling campaigns
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <CalendarDays className="h-4 w-4 mr-2" />
            Last 30 days
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
            <div className="text-2xl font-bold text-primary">74.9%</div>
            <p className="text-sm text-muted-foreground">Answer Rate</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+5.2%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">18.6%</div>
            <p className="text-sm text-muted-foreground">Conversion Rate</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+2.1%</span>
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">3:47</div>
            <p className="text-sm text-muted-foreground">Avg Call Time</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+0:23</span>
            </div>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$847</div>
            <p className="text-sm text-muted-foreground">Revenue per Agent</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-xs text-success">+12.4%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Visualization */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Conversion Pipeline</CardTitle>
          <CardDescription>Progress through each stage of the outbound process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1">
                  <div className="relative">
                    <div 
                      className="h-12 rounded-lg transition-all duration-300 flex items-center justify-between px-4"
                      style={{ 
                        backgroundColor: stage.color,
                        width: `${(stage.value / pipelineData[0].value) * 100}%`
                      }}
                    >
                      <span className="text-white font-bold">
                        {stage.value}
                      </span>
                      <span className="text-white/80 text-sm">
                        {Math.round((stage.value / pipelineData[0].value) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                {index > 0 && (
                  <div className="flex space-x-2">
                    <Badge variant="secondary">
                      {Math.round((stage.value / pipelineData[index-1].value) * 100)}% conversion
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Call Outcomes */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Call Outcome Analysis</CardTitle>
            <CardDescription>Distribution of call results</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={outcomeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Agent Performance Comparison */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>Agent Performance Comparison</CardTitle>
            <CardDescription>Calls vs conversion rates by agent</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={agentComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="agent" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar yAxisId="left" dataKey="calls" fill="hsl(var(--primary-light))" name="Total Calls" />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Conversion Rate (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Table */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle>Detailed Agent Metrics</CardTitle>
          <CardDescription>Comprehensive performance breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Agent</th>
                  <th className="text-right py-3 px-4 font-medium">Total Calls</th>
                  <th className="text-right py-3 px-4 font-medium">Conversions</th>
                  <th className="text-right py-3 px-4 font-medium">Rate</th>
                  <th className="text-right py-3 px-4 font-medium">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {agentComparisonData.map((agent, index) => (
                  <tr key={agent.agent} className="border-b border-border/50 hover:bg-card-hover transition-colors">
                    <td className="py-3 px-4 font-medium">{agent.agent}</td>
                    <td className="text-right py-3 px-4">{agent.calls}</td>
                    <td className="text-right py-3 px-4 text-success font-medium">{agent.conversions}</td>
                    <td className="text-right py-3 px-4">
                      <Badge 
                        variant="secondary" 
                        className={agent.rate > 40 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}
                      >
                        {agent.rate}%
                      </Badge>
                    </td>
                    <td className="text-right py-3 px-4 font-mono">
                      ${(agent.conversions * 47.3).toFixed(0)}
                    </td>
                    <td className="text-right py-3 px-4">
                      {index < 2 && <Badge className="bg-success/10 text-success">Top Performer</Badge>}
                      {index >= agentComparisonData.length - 2 && <Badge variant="secondary">Needs Support</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}