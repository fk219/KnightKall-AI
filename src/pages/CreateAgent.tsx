import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Settings2, 
  Mic, 
  Phone, 
  Brain, 
  MessageSquare,
  Clock,
  Volume2,
  Zap,
  FileText,
  Users,
  Bot
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateAgent() {
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [voiceSpeed, setVoiceSpeed] = useState([1]);
  const [voiceTemperature, setVoiceTemperature] = useState([1]);
  const [llmTemperature, setLlmTemperature] = useState([0]);
  const [interruptionSettings, setInterruptionSettings] = useState([1]);
  const [voiceVolume, setVoiceVolume] = useState([1]);
  const [maxCallDuration, setMaxCallDuration] = useState([10]);
  const [reminderFrequency, setReminderFrequency] = useState([10]);
  const [reminderMaxCount, setReminderMaxCount] = useState([1]);
  const [enableVoicemail, setEnableVoicemail] = useState(false);
  const [endCallOnSilence, setEndCallOnSilence] = useState(3);
  const [enableBackchanneling, setEnableBackchanneling] = useState(true);
  const [speechNormalization, setSpeechNormalization] = useState(true);
  const [transcriptFormatting, setTranscriptFormatting] = useState(true);
  const [boostedKeywords, setBoostedKeywords] = useState("yeah,uh-huh,okay,umm,mm");
  const [selectedEnvironment, setSelectedEnvironment] = useState("HubSpot Environment");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/agents")}
            className="hover:bg-primary-lighter"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create AI Agent</h1>
            <p className="text-muted-foreground mt-1">Configure your perfect AI calling companion</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Play className="h-4 w-4 mr-2" />
            Test Call
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Panel - Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  placeholder="Enter agent name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your AI assistant's role and capabilities"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label>Environment</Label>
                <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HubSpot Environment">HubSpot Environment</SelectItem>
                    <SelectItem value="Salesforce Environment">Salesforce Environment</SelectItem>
                    <SelectItem value="Custom Environment">Custom Environment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Environment Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">None</p>
                  <p className="text-sm text-muted-foreground">Staging</p>
                </div>
                <Switch checked={false} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Main</p>
                  <p className="text-sm text-muted-foreground">Production</p>
                </div>
                <Switch checked={true} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Settings */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="voice" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="voice" className="flex items-center space-x-2">
                <Mic className="h-4 w-4" />
                <span>Voice</span>
              </TabsTrigger>
              <TabsTrigger value="call" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center space-x-2">
                <Settings2 className="h-4 w-4" />
                <span>Advanced</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Analysis</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Voice Settings</CardTitle>
                  <CardDescription>Configure voice characteristics and behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Voice Speed</Label>
                      <Badge variant="secondary">{voiceSpeed[0]}</Badge>
                    </div>
                    <Slider
                      value={voiceSpeed}
                      onValueChange={setVoiceSpeed}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="slider-primary"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Voice Temperature</Label>
                      <Badge variant="secondary">{voiceTemperature[0]}</Badge>
                    </div>
                    <Slider
                      value={voiceTemperature}
                      onValueChange={setVoiceTemperature}
                      max={2}
                      min={0}
                      step={0.1}
                      className="slider-primary"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>LLM Temperature</Label>
                      <Badge variant="secondary">{llmTemperature[0]}</Badge>
                    </div>
                    <Slider
                      value={llmTemperature}
                      onValueChange={setLlmTemperature}
                      max={2}
                      min={0}
                      step={0.1}
                      className="slider-primary"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Interruption Settings</Label>
                      <Badge variant="secondary">{interruptionSettings[0]}</Badge>
                    </div>
                    <Slider
                      value={interruptionSettings}
                      onValueChange={setInterruptionSettings}
                      max={3}
                      min={0}
                      step={0.1}
                      className="slider-primary"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Voice Volume</Label>
                      <Badge variant="secondary">{voiceVolume[0]}</Badge>
                    </div>
                    <Slider
                      value={voiceVolume}
                      onValueChange={setVoiceVolume}
                      max={2}
                      min={0}
                      step={0.1}
                      className="slider-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="call" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Call Settings</CardTitle>
                  <CardDescription>Configure call behavior and duration limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Enable Voicemail</Label>
                      <p className="text-sm text-muted-foreground">Turn voicemail on or off</p>
                    </div>
                    <Switch checked={enableVoicemail} onCheckedChange={setEnableVoicemail} />
                  </div>
                  
                  <div>
                    <Label>End Call on Silence</Label>
                    <Select value={endCallOnSilence.toString()} onValueChange={(value) => setEndCallOnSilence(Number(value))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Min</SelectItem>
                        <SelectItem value="2">2 Mins</SelectItem>
                        <SelectItem value="3">3 Mins</SelectItem>
                        <SelectItem value="5">5 Mins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Max Call Duration</Label>
                      <Badge variant="secondary">{maxCallDuration[0]} Mins</Badge>
                    </div>
                    <Slider
                      value={maxCallDuration}
                      onValueChange={setMaxCallDuration}
                      max={60}
                      min={1}
                      step={1}
                      className="slider-primary"
                    />
                  </div>
                  
                  <div>
                    <Label>IVR Navigation</Label>
                    <Button variant="outline" className="mt-2 w-full">
                      Add IVR
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Speech Settings</CardTitle>
                  <CardDescription>Advanced speech processing options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Enable Backchanneling</Label>
                      <p className="text-sm text-muted-foreground">Natural conversation responses</p>
                    </div>
                    <Switch checked={enableBackchanneling} onCheckedChange={setEnableBackchanneling} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Speech Normalization</Label>
                      <p className="text-sm text-muted-foreground">Improve speech clarity</p>
                    </div>
                    <Switch checked={speechNormalization} onCheckedChange={setSpeechNormalization} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Transcript Formatting</Label>
                      <p className="text-sm text-muted-foreground">Auto-format transcripts</p>
                    </div>
                    <Switch checked={transcriptFormatting} onCheckedChange={setTranscriptFormatting} />
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Reminder Settings</CardTitle>
                  <CardDescription>Configure automated reminders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Reminder Frequency</Label>
                      <Badge variant="secondary">{reminderFrequency[0]}s</Badge>
                    </div>
                    <Slider
                      value={reminderFrequency}
                      onValueChange={setReminderFrequency}
                      max={60}
                      min={1}
                      step={1}
                      className="slider-primary"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Reminder Max Count</Label>
                      <Badge variant="secondary">{reminderMaxCount[0]}</Badge>
                    </div>
                    <Slider
                      value={reminderMaxCount}
                      onValueChange={setReminderMaxCount}
                      max={10}
                      min={1}
                      step={1}
                      className="slider-primary"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Keyword Settings</CardTitle>
                  <CardDescription>Boost recognition for specific keywords</CardDescription>
                </CardHeader>
                <CardContent>
                  <Label>Boosted Keywords</Label>
                  <Textarea
                    value={boostedKeywords}
                    onChange={(e) => setBoostedKeywords(e.target.value)}
                    placeholder="Enter comma-separated keywords"
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Ambient Sound</CardTitle>
                  <CardDescription>Background audio settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Label>Sound Environment</Label>
                  <Select defaultValue="call-center">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call-center">Call Center</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="quiet">Quiet Room</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Post Call Analysis/Tags</CardTitle>
                  <CardDescription>Configure post-call data collection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base">Post Call Data Retrieval</Label>
                    <Button variant="outline" size="sm">
                      Add New Field +
                    </Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground font-medium">Analysis Fields</p>
                    <p className="text-sm text-muted-foreground">No fields added yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}