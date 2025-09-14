import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Upload, Calendar, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function NewCampaign() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    assistant: "",
    scheduleType: "now" as "now" | "later",
    scheduledDate: "",
    scheduledTime: "",
    description: ""
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "text/csv" || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phoneNumber || !formData.assistant || !uploadedFile) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields and upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campaign created",
      description: "Your campaign has been created successfully and will start processing.",
    });
    
    navigate("/outbound/campaigns");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/outbound/campaigns")}
            className="hover:bg-secondary/60"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gradient">New Campaign</h1>
            <p className="text-muted-foreground">Create a new outbound calling campaign</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the purpose of this campaign"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Phone Number Selection */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>Phone Number</span>
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.phoneNumber} onValueChange={(value) => setFormData(prev => ({ ...prev, phoneNumber: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a phone number" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="+1234567890">+1 (234) 567-8900 - Main Line</SelectItem>
                  <SelectItem value="+1987654321">+1 (987) 654-3210 - Sales Line</SelectItem>
                  <SelectItem value="+1555444333">+1 (555) 444-3330 - Support Line</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">Best Practices</p>
                    <p className="text-muted-foreground">
                      Learn how to avoid spam flagging and optimize your calling strategy for better success rates.
                    </p>
                    <Button variant="link" className="p-0 h-auto text-primary text-sm">
                      View spam flagging best practices →
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CSV Upload */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Upload CSV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 hover:bg-secondary/20"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {uploadedFile ? (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-green-500 mx-auto" />
                      <div className="text-foreground font-medium">{uploadedFile.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        File uploaded successfully
                      </Badge>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                      <div className="text-foreground font-medium">
                        Drag and drop a CSV file here or click to select file locally
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Maximum file size: 5MB
                      </div>
                    </div>
                  )}
                </div>
                
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Assistant Selection */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.assistant} onValueChange={(value) => setFormData(prev => ({ ...prev, assistant: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an assistant" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="sales-assistant">Sales Assistant - Lead Generation</SelectItem>
                  <SelectItem value="support-agent">Support Agent - Customer Service</SelectItem>
                  <SelectItem value="demo-specialist">Demo Specialist - Product Demos</SelectItem>
                  <SelectItem value="follow-up-bot">Follow-up Bot - Customer Retention</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Choose when to send</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={formData.scheduleType} 
                onValueChange={(value: "now" | "later") => setFormData(prev => ({ ...prev, scheduleType: value }))}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary/20 transition-colors">
                  <RadioGroupItem value="now" id="send-now" />
                  <Label htmlFor="send-now" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">Send Now</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start the campaign immediately after creation
                    </p>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-secondary/20 transition-colors">
                  <RadioGroupItem value="later" id="schedule-later" />
                  <Label htmlFor="schedule-later" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">Schedule for later</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Schedule the campaign to start at a specific date and time
                    </p>
                  </Label>
                </div>
              </RadioGroup>
              
              {formData.scheduleType === "later" && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduled-date">Date</Label>
                    <Input
                      id="scheduled-date"
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduled-time">Time</Label>
                    <Input
                      id="scheduled-time"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/outbound/campaigns")}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-primary/25 shadow-lg min-w-[140px]"
            >
              Launch Campaign
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}