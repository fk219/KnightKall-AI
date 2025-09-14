import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Phone, Clock, Download, Search, Filter, Play, PhoneOff, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CallLog {
  id: string;
  phoneNumber: string;
  status: "completed" | "failed" | "no-answer" | "busy" | "voicemail";
  duration: string;
  startTime: string;
  endTime: string;
  campaign: string;
  agent: string;
  outcome?: string;
  recording?: string;
}

const mockCallLogs: CallLog[] = [
  {
    id: "call_001",
    phoneNumber: "+1 (555) 123-4567",
    status: "completed",
    duration: "3m 24s",
    startTime: "2024-01-20T09:15:00Z",
    endTime: "2024-01-20T09:18:24Z",
    campaign: "Q4 Lead Generation",
    agent: "Sales Assistant",
    outcome: "Interested - Follow-up scheduled",
    recording: "recording_001.mp3",
  },
  {
    id: "call_002",
    phoneNumber: "+1 (555) 987-6543",
    status: "no-answer",
    duration: "0m 45s",
    startTime: "2024-01-20T09:20:00Z",
    endTime: "2024-01-20T09:20:45Z",
    campaign: "Q4 Lead Generation",
    agent: "Sales Assistant",
  },
  {
    id: "call_003",
    phoneNumber: "+1 (555) 456-7890",
    status: "completed",
    duration: "5m 12s",
    startTime: "2024-01-20T09:25:00Z",
    endTime: "2024-01-20T09:30:12Z",
    campaign: "Customer Follow-up",
    agent: "Support Agent",
    outcome: "Issue resolved - Customer satisfied",
    recording: "recording_002.mp3",
  },
  {
    id: "call_004",
    phoneNumber: "+1 (555) 321-0987",
    status: "failed",
    duration: "0m 12s",
    startTime: "2024-01-20T09:35:00Z",
    endTime: "2024-01-20T09:35:12Z",
    campaign: "Product Demo Outreach",
    agent: "Demo Specialist",
    outcome: "Technical error - Line disconnected",
  },
  {
    id: "call_005",
    phoneNumber: "+1 (555) 654-3210",
    status: "voicemail",
    duration: "1m 30s",
    startTime: "2024-01-20T09:40:00Z",
    endTime: "2024-01-20T09:41:30Z",
    campaign: "Q4 Lead Generation",
    agent: "Sales Assistant",
    outcome: "Left voicemail message",
  },
];

export default function CallLogs() {
  const [callLogs] = useState<CallLog[]>(mockCallLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const getStatusColor = (status: CallLog["status"]) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "failed": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "no-answer": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "busy": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "voicemail": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: CallLog["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-3 w-3" />;
      case "failed": return <XCircle className="h-3 w-3" />;
      case "no-answer": return <PhoneOff className="h-3 w-3" />;
      case "busy": return <Phone className="h-3 w-3" />;
      case "voicemail": return <Play className="h-3 w-3" />;
      default: return null;
    }
  };

  const filteredLogs = callLogs.filter(log => {
    const matchesSearch = log.phoneNumber.includes(searchQuery) ||
                         log.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.agent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesCampaign = campaignFilter === "all" || log.campaign === campaignFilter;
    return matchesSearch && matchesStatus && matchesCampaign;
  });

  const uniqueCampaigns = Array.from(new Set(callLogs.map(log => log.campaign)));

  const totalCalls = callLogs.length;
  const completedCalls = callLogs.filter(log => log.status === "completed").length;
  const failedCalls = callLogs.filter(log => log.status === "failed").length;
  const avgDuration = callLogs.reduce((acc, log) => {
    const [minutes, seconds] = log.duration.split("m ");
    return acc + parseInt(minutes) * 60 + parseInt(seconds.replace("s", ""));
  }, 0) / callLogs.length;

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Call Logs</h1>
            <p className="text-muted-foreground">Detailed records of all outbound calls</p>
          </div>
          <Button variant="outline" className="hover:bg-secondary/60">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gradient">{totalCalls}</span>
                <Phone className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">{completedCalls}</span>
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-red-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-red-400">{failedCalls}</span>
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-400">
                  {Math.floor(avgDuration / 60)}m {Math.floor(avgDuration % 60)}s
                </span>
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search by phone number, campaign, or agent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="no-answer">No Answer</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="voicemail">Voicemail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Campaign" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Campaigns</SelectItem>
                    {uniqueCampaigns.map((campaign) => (
                      <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call Logs Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>Call Records</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Phone Number</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Agent</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Outcome</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Time</th>
                    <th className="text-center p-4 font-medium text-muted-foreground">Recording</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-foreground font-mono">{log.phoneNumber}</div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(log.status)} border capitalize`}>
                          {getStatusIcon(log.status)}
                          <span className="ml-1">{log.status.replace("-", " ")}</span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground font-mono">{log.duration}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground">{log.campaign}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground">{log.agent}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-muted-foreground text-sm">
                          {log.outcome || "—"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="text-foreground">
                            {new Date(log.startTime).toLocaleTimeString()}
                          </div>
                          <div className="text-muted-foreground">
                            {new Date(log.startTime).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {log.recording ? (
                          <Button variant="ghost" size="sm" className="hover:bg-secondary/60">
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredLogs.length === 0 && (
          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Phone className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No call logs found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                {searchQuery || statusFilter !== "all" || campaignFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Call logs will appear here once campaigns start running"
                }
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}