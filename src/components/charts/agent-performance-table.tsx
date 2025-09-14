import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const agentData = [
  {
    id: 1,
    name: "Agent Sarah",
    calls: 145,
    answered: 132,
    avgDuration: "4:32",
    satisfaction: 4.8,
    trend: "up",
  },
  {
    id: 2,
    name: "Agent Mike",
    calls: 128,
    answered: 115,
    avgDuration: "3:48",
    satisfaction: 4.6,
    trend: "up",
  },
  {
    id: 3,
    name: "Agent Lisa",
    calls: 134,
    answered: 118,
    avgDuration: "5:12",
    satisfaction: 4.7,
    trend: "stable",
  },
  {
    id: 4,
    name: "Agent John",
    calls: 96,
    answered: 82,
    avgDuration: "3:24",
    satisfaction: 4.3,
    trend: "down",
  },
  {
    id: 5,
    name: "Agent Emma",
    calls: 112,
    answered: 98,
    avgDuration: "4:15",
    satisfaction: 4.5,
    trend: "up",
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

const getTrendBadge = (trend: string) => {
  switch (trend) {
    case "up":
      return <Badge variant="secondary" className="bg-success/10 text-success">Improving</Badge>;
    case "down":
      return <Badge variant="secondary" className="bg-destructive/10 text-destructive">Declining</Badge>;
    default:
      return <Badge variant="secondary">Stable</Badge>;
  }
};

export function AgentPerformanceTable() {
  return (
    <Card className="premium-card premium-card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Top Performing Agents</CardTitle>
            <CardDescription className="text-base">Weekly performance leaderboard</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            This Week
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow className="hover:bg-transparent border-border/50">
                <TableHead className="font-semibold text-foreground">Agent</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Total Calls</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Answered</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Avg Duration</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Satisfaction</TableHead>
                <TableHead className="text-right font-semibold text-foreground">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentData.map((agent, index) => (
                <TableRow 
                  key={agent.id} 
                  className="hover:bg-primary-lighter/30 transition-colors border-border/30 group"
                >
                  <TableCell className="font-semibold text-foreground">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-8 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{agent.name}</span>
                      {index === 0 && <Badge className="bg-warning/10 text-warning text-xs">Top</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{agent.calls}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-success font-semibold">{agent.answered}</span>
                      <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                        {Math.round((agent.answered / agent.calls) * 100)}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">{agent.avgDuration}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="font-semibold">{agent.satisfaction}</span>
                      <span className="text-muted-foreground text-sm">/5</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(agent.trend)}
                      </div>
                      {getTrendBadge(agent.trend)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}