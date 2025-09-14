import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Phone, Clock, TrendingUp, Users, Search, Filter, Play, Pause, Square, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BatchCall {
  id: string;
  batchName: string;
  status: "running" | "paused" | "completed" | "failed";
  totalNumbers: number;
  completed: number;
  successful: number;
  failed: number;
  startTime: string;
  estimatedCompletion?: string;
  avgDuration: string;
  campaign: string;
}

const mockBatchCalls: BatchCall[] = [
  {
    id: "batch_001",
    batchName: "Morning Sales Batch",
    status: "running",
    totalNumbers: 150,
    completed: 89,
    successful: 67,
    failed: 22,
    startTime: "2024-01-20T09:00:00Z",
    estimatedCompletion: "2024-01-20T12:30:00Z",
    avgDuration: "3m 24s",
    campaign: "Q4 Lead Generation",
  },
  {
    id: "batch_002", 
    batchName: "Customer Follow-up Batch",
    status: "completed",
    totalNumbers: 200,
    completed: 200,
    successful: 174,
    failed: 26,
    startTime: "2024-01-19T14:00:00Z",
    avgDuration: "2m 56s",
    campaign: "Customer Follow-up",
  },
  {
    id: "batch_003",
    batchName: "Product Demo Outreach",
    status: "paused",
    totalNumbers: 100,
    completed: 45,
    successful: 32,
    failed: 13,
    startTime: "2024-01-20T11:00:00Z",
    avgDuration: "4m 12s",
    campaign: "Product Demo Outreach",
  },
];

export default function BatchCalls() {
  const [batchCalls] = useState<BatchCall[]>(mockBatchCalls);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // New state for batch call creation
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [fromNumber, setFromNumber] = useState('+17180011228');
  const [contactList, setContactList] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('https://danubepropertiesdubai.app.n8n.cloud/webhook-test/batch-call');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateBatchCall = async () => {
    if (!batchName || !contactList) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Parse contact list (assuming comma or newline separated phone numbers)
    const phoneNumbers = contactList
      .split(/[,\n]/)
      .map(num => num.trim())
      .filter(num => num.length > 0);

    if (phoneNumbers.length === 0) {
      alert('Please provide at least one phone number');
      setIsSubmitting(false);
      return;
    }

    const batchPayload = {
      name: batchName,
      from_number: fromNumber,
      tasks: phoneNumbers.map(phoneNumber => ({
        to_number: phoneNumber,
        retell_llm_dynamic_variables: { customer_name: 'Customer' }
      })),
      trigger_timestamp: Date.now(),
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchPayload),
      });

      if (response.ok) {
        alert(`Batch call "${batchName}" created successfully with ${phoneNumbers.length} contacts!`);
        // Reset form
        setBatchName('');
        setContactList('');
        setIsCreateDialogOpen(false);
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Failed to create batch call: ${response.status}. Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error creating batch call: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: BatchCall["status"]) => {
    switch (status) {
      case "running": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "paused": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "failed": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: BatchCall["status"]) => {
    switch (status) {
      case "running": return <Play className="h-3 w-3" />;
      case "paused": return <Pause className="h-3 w-3" />;
      case "completed": return <TrendingUp className="h-3 w-3" />;
      case "failed": return <Square className="h-3 w-3" />;
      default: return null;
    }
  };

  const filteredBatches = batchCalls.filter(batch => {
    const matchesSearch = batch.batchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         batch.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCalls = batchCalls.reduce((acc, batch) => acc + batch.totalNumbers, 0);
  const completedCalls = batchCalls.reduce((acc, batch) => acc + batch.completed, 0);
  const successfulCalls = batchCalls.reduce((acc, batch) => acc + batch.successful, 0);
  const activeBatches = batchCalls.filter(batch => batch.status === "running").length;

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">Batch Calls</h1>
            <p className="text-muted-foreground">Monitor and manage your bulk calling operations</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-primary/25 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Create Batch Call
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <PhoneCall className="h-5 w-5 text-primary" />
                  <span>Create New Batch Call</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="batchName" className="text-sm font-medium text-foreground">
                    Batch Name *
                  </Label>
                  <Input
                    id="batchName"
                    value={batchName}
                    onChange={(e) => setBatchName(e.target.value)}
                    placeholder="Enter batch name (e.g., Morning Sales Batch)"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromNumber" className="text-sm font-medium text-foreground">
                    From Number
                  </Label>
                  <Input
                    id="fromNumber"
                    value={fromNumber}
                    onChange={(e) => setFromNumber(e.target.value)}
                    placeholder="+17180011228"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactList" className="text-sm font-medium text-foreground">
                    Phone Numbers *
                  </Label>
                  <Textarea
                    id="contactList"
                    value={contactList}
                    onChange={(e) => setContactList(e.target.value)}
                    placeholder="Enter phone numbers separated by commas or new lines:
+1234567890, +0987654321
+19876543210"
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supports multiple formats: comma-separated or line-by-line
                  </p>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="h-11 px-6"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateBatchCall} 
                    disabled={isSubmitting || !batchName || !contactList}
                    className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-primary/25 shadow-lg h-11 px-6"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Batch Call
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Batches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gradient">{activeBatches}</span>
                <Play className="h-5 w-5 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-400">{totalCalls.toLocaleString()}</span>
                <Phone className="h-5 w-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-green-400">{completedCalls.toLocaleString()}</span>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-purple-400">
                  {completedCalls > 0 ? Math.round((successfulCalls / completedCalls) * 100) : 0}%
                </span>
                <Users className="h-5 w-5 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search batches or campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batch Calls Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>Batch Operations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Batch Name</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Progress</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Success Rate</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Avg Duration</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Started</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBatches.map((batch) => (
                    <tr key={batch.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-foreground">{batch.batchName}</div>
                          <div className="text-sm text-muted-foreground">ID: {batch.id}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={`${getStatusColor(batch.status)} border capitalize`}>
                          {getStatusIcon(batch.status)}
                          <span className="ml-1">{batch.status}</span>
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm text-foreground">
                            {batch.completed} / {batch.totalNumbers} calls
                          </div>
                          <div className="w-full bg-secondary/50 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(batch.completed / batch.totalNumbers) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className={`font-medium ${
                              batch.completed > 0 
                                ? (batch.successful / batch.completed) >= 0.7 ? 'text-green-400' : 
                                  (batch.successful / batch.completed) >= 0.5 ? 'text-yellow-400' : 'text-red-400'
                                : 'text-muted-foreground'
                            }`}>
                              {batch.completed > 0 ? Math.round((batch.successful / batch.completed) * 100) : 0}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {batch.successful} successful / {batch.failed} failed
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground">{batch.avgDuration}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-foreground">{batch.campaign}</span>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="text-sm text-foreground">
                            {new Date(batch.startTime).toLocaleString()}
                          </div>
                          {batch.estimatedCompletion && batch.status === "running" && (
                            <div className="text-xs text-muted-foreground">
                              Est. completion: {new Date(batch.estimatedCompletion).toLocaleTimeString()}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredBatches.length === 0 && (
          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Phone className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No batch operations found</h3>
              <p className="text-muted-foreground text-center max-w-md">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Batch operations will appear here once campaigns start running"
                }
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}