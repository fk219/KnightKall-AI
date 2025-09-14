'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Phone, Bot, Smartphone } from "lucide-react";

interface CallStatus {
  type: 'success' | 'error';
  message: string;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

// Mock agents data - replace with actual data from your API
const mockAgents: Agent[] = [
  { id: 'agent_1', name: 'Sales Pro', description: 'Expert sales agent for real estate leads', status: 'active' },
  { id: 'agent_2', name: 'Customer Care', description: 'Friendly customer support specialist', status: 'active' },
  { id: 'agent_3', name: 'Property Expert', description: 'Dubai property specialist for consultations', status: 'active' },
  { id: 'agent_4', name: 'Lead Qualifier', description: 'Initial lead screening and qualification', status: 'active' },
  { id: 'agent_5', name: 'Demo Specialist', description: 'Product demonstration and virtual tours', status: 'active' },
];

const Dialer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<CallStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [agents] = useState<Agent[]>(mockAgents);

  // Updated webhook URL
  const WEBHOOK_URL = 'https://danubepropertiesdubai.app.n8n.cloud/webhook-test/outbound-call';
  const RETELL_FROM_NUMBER = '+17180011228';

  const handleDialpadClick = (value: string) => {
    setPhoneNumber((prevNumber) => prevNumber + value);
  };

  const handleBackspace = () => {
    setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
  };

  const handleCall = async () => {
    if (!phoneNumber) {
      setCallStatus({ type: 'error', message: 'Please enter a phone number.' });
      return;
    }

    if (!selectedAgent) {
      setCallStatus({ type: 'error', message: 'Please select an AI agent.' });
      return;
    }

    setIsLoading(true);
    setCallStatus(null);

    const selectedAgentData = agents.find(agent => agent.id === selectedAgent);
    
    const callPayload = {
      type: 'outbound_call',
      from_number: RETELL_FROM_NUMBER,
      to_number: phoneNumber,
      agent_id: selectedAgent,
      agent_name: selectedAgentData?.name || 'Unknown Agent',
      customer_name: 'Customer',
      call_source: 'dialer',
      timestamp: Date.now(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(callPayload),
      });

      if (response.ok) {
        setCallStatus({ 
          type: 'success', 
          message: `Call initiated to ${phoneNumber} with ${selectedAgentData?.name}!` 
        });
        setPhoneNumber('');
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        setCallStatus({ 
          type: 'error', 
          message: `Failed to initiate call. Status: ${response.status}. Error: ${errorData.message}` 
        });
      }
    } catch (error) {
      setCallStatus({ 
        type: 'error', 
        message: `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (/[0-9]/.test(key) || key === '*' || key === '#') {
        handleDialpadClick(key);
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Enter') {
        handleCall();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phoneNumber, isLoading, selectedAgent]);

  const dialpadButtons = [
    { value: '1', text: '' },
    { value: '2', text: 'ABC' },
    { value: '3', text: 'DEF' },
    { value: '4', text: 'GHI' },
    { value: '5', text: 'JKL' },
    { value: '6', text: 'MNO' },
    { value: '7', text: 'PQRS' },
    { value: '8', text: 'TUV' },
    { value: '9', text: 'WXYZ' },
    { value: '*', text: '' },
    { value: '0', text: '+' },
    { value: '#', text: '' },
  ];

  const activeAgents = agents.filter(agent => agent.status === 'active');

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">AI Dialer</h1>
        <p className="text-muted-foreground">Make outbound calls with AI agents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Selection Panel */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <span>Select AI Agent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Choose an AI agent for your call" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                {activeAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id} className="p-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{agent.name}</div>
                          <div className="text-xs text-muted-foreground">{agent.description}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-400 border-green-400/30">
                        Active
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedAgent && (
              <div className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border border-primary/20">
                {(() => {
                  const agent = agents.find(a => a.id === selectedAgent);
                  return agent ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{agent.name}</h3>
                          <p className="text-sm text-muted-foreground">{agent.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-green-400 border-green-400/30 bg-green-400/10">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          Ready to Call
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          Agent ID: {agent.id}
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()} 
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialer Panel */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-primary" />
              <span>Keypad</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Phone Number Display */}
            <div className="w-full text-center mb-6 px-4">
              <div className="h-16 flex items-center justify-center bg-secondary/20 rounded-lg border border-border/50">
                <p className="font-mono text-2xl text-foreground">
                  {phoneNumber || 'Enter phone number'}
                </p>
              </div>
            </div>

            {/* Status Message */}
            {callStatus && (
              <div className={`p-3 mb-4 rounded-lg text-sm font-medium text-center ${
                callStatus.type === 'success' 
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-600/20 text-red-400 border border-red-500/30'
              }`}>
                {callStatus.message}
              </div>
            )}

            {/* Dialpad Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {dialpadButtons.map((button) => (
                <Button
                  key={button.value}
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center hover:bg-secondary/60 transition-all"
                  onClick={() => handleDialpadClick(button.value)}
                >
                  <span className="text-xl font-medium">{button.value}</span>
                  {button.text && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {button.text}
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={handleBackspace}
                className="flex items-center space-x-2 h-12 px-6"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
                  <line x1="18" y1="9" x2="12" y2="15" />
                  <line x1="12" y1="9" x2="18" y2="15" />
                </svg>
                <span>Clear</span>
              </Button>
              
              <Button
                onClick={handleCall}
                disabled={isLoading || !phoneNumber || !selectedAgent}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center space-x-2 px-8 h-12 shadow-lg hover:shadow-green-600/25 transition-all"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Calling...</span>
                  </>
                ) : (
                  <>
                    <Phone className="h-4 w-4" />
                    <span>Start Call</span>
                  </>
                )}
              </Button>
            </div>

            {/* Instructions */}
            <div className="mt-6 text-center text-xs text-muted-foreground space-y-1">
              <p>Use your keyboard or click to dial</p>
              <p>Press Enter to call • Backspace to delete</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dialer;
