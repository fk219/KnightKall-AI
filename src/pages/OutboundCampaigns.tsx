import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Phone, Users, TrendingUp, Clock, Play, Pause, MoreHorizontal, Megaphone, PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed" | "scheduled";
  totalCalls: number;
  completedCalls: number;
  successRate: number;
  createdAt: string;
  scheduledFor?: string;
  agent: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q4 Lead Generation",
    status: "active",
    totalCalls: 500,
    completedCalls: 347,
    successRate: 73,
    createdAt: "2024-01-15",
    agent: "Sales Assistant",
  },
  {
    id: "2", 
    name: "Customer Follow-up",
    status: "completed",
    totalCalls: 200,
    completedCalls: 200,
    successRate: 85,
    createdAt: "2024-01-10",
    agent: "Support Agent",
  },
  {
    id: "3",
    name: "Product Demo Outreach", 
    status: "scheduled",
    totalCalls: 150,
    completedCalls: 0,
    successRate: 0,
    createdAt: "2024-01-20",
    scheduledFor: "2024-01-25",
    agent: "Demo Specialist",
  },
];

export default function OutboundCampaigns() {
  const navigate = useNavigate();
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [webhookUrl, setWebhookUrl] = useState(''); // Add webhook URL state

  const handleStartBatchCall = async (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const webhookEndpoint = webhookUrl || 'YOUR_N8N_WEBHOOK_URL_HERE';
    
    if (webhookEndpoint === 'YOUR_N8N_WEBHOOK_URL_HERE') {
      alert('Please configure your webhook URL in the campaign settings.');
      return;
    }

    const batchPayload = {
      type: 'campaign_batch_call',
      campaign_id: campaignId,
      campaign_name: campaign.name,
      agent: campaign.agent,
      timestamp: Date.now(),
    };

    try {
      const response = await fetch(webhookEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchPayload),
      });

      if (response.ok) {
        alert(`Batch call initiated for campaign: ${campaign.name}`);
      } else {
        alert(`Failed to start batch call: ${response.status}`);
      }
    } catch (error) {
      alert(`Error starting batch call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "paused": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"; 
      case "completed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "scheduled": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: Campaign["status"]) => {
    switch (status) {
      case "active": return <Play className="h-3 w-3" />;
      case "paused": return <Pause className="h-3 w-3" />;
      case "completed": return <TrendingUp className="h-3 w-3" />;
      case "scheduled": return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Outbound Campaigns</h1>
            <p className="text-muted-foreground">Manage and monitor your AI calling campaigns</p>
          </div>
          <Button 
            onClick={() => navigate("/outbound/campaigns/new")}
            className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-primary/25 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>


        {/* Campaigns Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Campaign List</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Progress</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Success Rate</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Agent</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Created</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-foreground">{campaign.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {campaign.scheduledFor && `Scheduled for ${new Date(campaign.scheduledFor).toLocaleDateString()}`}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(campaign.status)} border capitalize`}>
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1">{campaign.status}</span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm text-foreground">
                            {campaign.completedCalls} / {campaign.totalCalls} calls
                          </div>
                          <div className="w-full bg-secondary/50 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(campaign.completedCalls / campaign.totalCalls) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${campaign.successRate >= 70 ? 'text-green-400' : campaign.successRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {campaign.successRate}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground">{campaign.agent}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground">
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-card">
                            <DropdownMenuItem onClick={() => navigate(`/outbound/campaigns/${campaign.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/outbound/campaigns/${campaign.id}/edit`)}>
                              Edit Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStartBatchCall(campaign.id)}>
                              Start Batch Call
                            </DropdownMenuItem>
                            {campaign.status === "active" && (
                              <DropdownMenuItem>Pause Campaign</DropdownMenuItem>
                            )}
                            {campaign.status === "paused" && (
                              <DropdownMenuItem>Resume Campaign</DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-400">
                              Delete Campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {campaigns.length === 0 && (
          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Phone className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Create your first campaign to start reaching out to customers with AI-powered calling
              </p>
              <Button 
                onClick={() => navigate("/outbound/campaigns/new")}
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-primary/25"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        )}
    </div>
  );
}