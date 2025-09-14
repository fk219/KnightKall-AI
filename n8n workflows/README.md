# n8n Workflows - Environment Setup Guide

## Required Environment Variables

### Core API Configuration
```bash
# Supabase Database
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Retell AI API
RETELL_API_URL=https://api.retellai.com/v2
RETELL_API_KEY=key_xxxxxxxxxxxxxxxxxxxxx
DEFAULT_AGENT_ID=agent_xxxxxxxxxxxxxxxxxxxxx

# Application URLs
FRONTEND_URL=https://your-app.vercel.app
WEBHOOK_BASE_URL=https://your-workspace.app.n8n.cloud/webhook
```

### Optional Integrations
```bash
# Stripe Billing
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# Email Notifications
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx

# SMS Notifications
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxx
```

## Workflow Deployment Instructions

### 1. Import Workflows to n8n Cloud
1. Log into your n8n Cloud account
2. Create a new workflow for each JSON file
3. Copy the JSON content and paste into the workflow
4. Save and activate each workflow

### 2. Configure Webhook URLs
After importing, update your frontend environment with the webhook URLs:
```bash
# Frontend .env file
VITE_WEBHOOK_OUTBOUND_CALL=https://your-workspace.app.n8n.cloud/webhook/outbound-call
VITE_WEBHOOK_BATCH_CALL=https://your-workspace.app.n8n.cloud/webhook/batch-call
VITE_WEBHOOK_CALL_EVENT=https://your-workspace.app.n8n.cloud/webhook/call-event
VITE_WEBHOOK_ANALYTICS=https://your-workspace.app.n8n.cloud/webhook/analytics
VITE_WEBHOOK_AGENT_SYNC=https://your-workspace.app.n8n.cloud/webhook/agent-sync
```

### 3. Set up Retell Webhooks
Configure Retell to send events to your n8n webhook:
- Event URL: `https://your-workspace.app.n8n.cloud/webhook/call-event`
- Events: `call_started`, `call_ended`, `call_analyzed`

## Testing Your Workflows

### Test Outbound Call
```bash
curl -X POST https://your-workspace.app.n8n.cloud/webhook/outbound-call \
  -H "Content-Type: application/json" \
  -d '{
    "from_number": "+17180011228",
    "to_number": "+1234567890",
    "agent_id": "agent_test",
    "agent_name": "Test Agent",
    "customer_name": "John Doe",
    "call_source": "dialer"
  }'
```

### Test Batch Call
```bash
curl -X POST https://your-workspace.app.n8n.cloud/webhook/batch-call \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Batch",
    "from_number": "+17180011228",
    "tasks": [
      {
        "to_number": "+1234567890",
        "retell_llm_dynamic_variables": {"customer_name": "John"}
      },
      {
        "to_number": "+0987654321", 
        "retell_llm_dynamic_variables": {"customer_name": "Jane"}
      }
    ],
    "trigger_timestamp": 1640995200000
  }'
```

### Test Analytics Request
```bash
curl -X GET "https://your-workspace.app.n8n.cloud/webhook/analytics?type=daily"
```

## Troubleshooting

### Common Issues
1. **Database Connection Failed**: Check Supabase credentials
2. **Retell API Error**: Verify API key and agent IDs
3. **Webhook Not Found**: Ensure workflows are activated
4. **CORS Errors**: Configure allowed origins in n8n settings

### Debug Mode
Enable debug logging in n8n to troubleshoot workflow issues:
1. Go to workflow settings
2. Enable "Log Level: Debug"
3. Check execution logs for detailed error information

---

Ready to deploy? Follow the steps above and your AI calling platform will be live! 🚀