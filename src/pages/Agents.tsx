import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, Play, Pause, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const agents = [
  {
    id: 1,
    name: "Customer Support Agent",
    status: "active",
    calls: 234,
    satisfaction: 4.8,
    description: "Handles general customer inquiries and support tickets",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Sales Outreach Agent",
    status: "active",
    calls: 156,
    satisfaction: 4.6,
    description: "Focused on lead qualification and sales conversations",
    lastActive: "5 min ago",
  },
  {
    id: 3,
    name: "Technical Support Agent",
    status: "paused",
    calls: 89,
    satisfaction: 4.9,
    description: "Specialized in technical troubleshooting and support",
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "Appointment Booking Agent",
    status: "active",
    calls: 312,
    satisfaction: 4.7,
    description: "Manages appointment scheduling and calendar coordination",
    lastActive: "Just now",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success">Active</Badge>;
    case "paused":
      return <Badge variant="secondary">Paused</Badge>;
    default:
      return <Badge variant="secondary">Inactive</Badge>;
  }
};

export default function Agents() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor your AI calling agents
          </p>
        </div>
        <Button onClick={() => navigate("/agents/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Agent
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{agents.length}</div>
            <p className="text-sm text-muted-foreground">Total Agents</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {agents.filter(a => a.status === 'active').length}
            </div>
            <p className="text-sm text-muted-foreground">Active Now</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {agents.reduce((sum, agent) => sum + agent.calls, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Calls</p>
          </CardContent>
        </Card>
        <Card className="premium-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-sm text-muted-foreground">Avg Satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id} className="premium-card premium-card-hover">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-lighter">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    {getStatusBadge(agent.status)}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {agent.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Calls</span>
                  <span className="font-medium">{agent.calls}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Satisfaction</span>
                  <span className="font-medium">{agent.satisfaction}/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Active</span>
                  <span className="font-medium">{agent.lastActive}</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                {agent.status === "active" ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}