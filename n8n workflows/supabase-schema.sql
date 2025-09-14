-- KnightCall AI - Supabase Database Schema
-- This schema is designed for a multi-tenant SaaS platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table (for multi-tenancy)
CREATE TABLE organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    plan VARCHAR(50) DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'enterprise')),
    monthly_call_limit INTEGER DEFAULT 1000,
    current_month_calls INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Users table (with role-based access)
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Agents table
CREATE TABLE agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    retell_agent_id VARCHAR(255) UNIQUE,
    voice_id VARCHAR(255),
    llm_websocket_url TEXT,
    response_engine TEXT DEFAULT 'retell-llm',
    language VARCHAR(10) DEFAULT 'en-US',
    interruption_sensitivity FLOAT DEFAULT 1.0,
    responsiveness FLOAT DEFAULT 1.0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'training')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phone Numbers table
CREATE TABLE phone_numbers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    number VARCHAR(20) UNIQUE NOT NULL,
    country_code VARCHAR(5),
    provider VARCHAR(50),
    type VARCHAR(20) DEFAULT 'outbound' CHECK (type IN ('inbound', 'outbound', 'both')),
    is_verified BOOLEAN DEFAULT false,
    monthly_cost DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    company VARCHAR(255),
    tags TEXT[], -- Array of tags
    custom_fields JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'do_not_call')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    agent_id UUID REFERENCES agents(id),
    from_number_id UUID REFERENCES phone_numbers(id),
    script TEXT,
    schedule_settings JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'archived')),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Batch Calls table
CREATE TABLE batch_calls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id),
    name VARCHAR(255) NOT NULL,
    from_number VARCHAR(20) NOT NULL,
    total_tasks INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    successful_tasks INTEGER DEFAULT 0,
    failed_tasks INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued', 'running', 'paused', 'completed', 'failed')),
    trigger_timestamp BIGINT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Batch Call Tasks table
CREATE TABLE batch_call_tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    batch_call_id UUID REFERENCES batch_calls(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id),
    to_number VARCHAR(20) NOT NULL,
    customer_name VARCHAR(255),
    retell_call_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'queued' CHECK (status IN ('queued', 'initiated', 'in_progress', 'completed', 'failed')),
    success BOOLEAN DEFAULT false,
    duration_seconds INTEGER,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calls table (individual call records)
CREATE TABLE calls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    batch_call_id UUID REFERENCES batch_calls(id),
    contact_id UUID REFERENCES contacts(id),
    agent_id UUID REFERENCES agents(id),
    agent_name VARCHAR(255),
    retell_call_id VARCHAR(255) UNIQUE,
    from_number VARCHAR(20) NOT NULL,
    to_number VARCHAR(20) NOT NULL,
    customer_name VARCHAR(255),
    call_source VARCHAR(50) DEFAULT 'manual', -- 'manual', 'batch', 'campaign'
    status VARCHAR(20) DEFAULT 'initiated' CHECK (status IN ('initiated', 'in_progress', 'completed', 'failed', 'no_answer', 'busy')),
    duration_seconds INTEGER,
    end_reason VARCHAR(100),
    analysis_completed BOOLEAN DEFAULT false,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Call Analytics table (detailed call analysis)
CREATE TABLE call_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
    retell_call_id VARCHAR(255) UNIQUE,
    transcript JSONB,
    recording_url TEXT,
    sentiment_analysis JSONB,
    call_summary TEXT,
    custom_analysis_data JSONB,
    talk_time_percentage FLOAT,
    user_sentiment VARCHAR(20),
    agent_performance_score FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge Base table
CREATE TABLE knowledge_base (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Keys table (for external integrations)
CREATE TABLE api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    permissions TEXT[] DEFAULT '{}',
    last_used TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Billing table
CREATE TABLE billing (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    calls_made INTEGER DEFAULT 0,
    amount_due DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
    stripe_invoice_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Webhooks table (for external integrations)
CREATE TABLE webhooks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    events TEXT[] NOT NULL,
    secret VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_calls_organization_id ON calls(organization_id);
CREATE INDEX idx_calls_retell_call_id ON calls(retell_call_id);
CREATE INDEX idx_calls_created_at ON calls(created_at);
CREATE INDEX idx_calls_status ON calls(status);

CREATE INDEX idx_batch_calls_organization_id ON batch_calls(organization_id);
CREATE INDEX idx_batch_calls_status ON batch_calls(status);
CREATE INDEX idx_batch_calls_created_at ON batch_calls(created_at);

CREATE INDEX idx_contacts_organization_id ON contacts(organization_id);
CREATE INDEX idx_contacts_phone_number ON contacts(phone_number);

CREATE INDEX idx_agents_organization_id ON agents(organization_id);
CREATE INDEX idx_agents_status ON agents(status);

-- Row Level Security (RLS) Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE phone_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_call_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Users can only access data from their organization)
CREATE POLICY users_organization_policy ON users
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY agents_organization_policy ON agents
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY phone_numbers_organization_policy ON phone_numbers
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY contacts_organization_policy ON contacts
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY campaigns_organization_policy ON campaigns
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY batch_calls_organization_policy ON batch_calls
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY calls_organization_policy ON calls
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY knowledge_base_organization_policy ON knowledge_base
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY billing_organization_policy ON billing
    FOR ALL USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

-- Functions for analytics
CREATE OR REPLACE FUNCTION get_organization_stats(org_id UUID, period_days INTEGER DEFAULT 30)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_calls', COUNT(*),
        'completed_calls', COUNT(*) FILTER (WHERE status = 'completed'),
        'success_rate', ROUND((COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / NULLIF(COUNT(*), 0)), 2),
        'total_duration', SUM(duration_seconds),
        'average_duration', ROUND(AVG(duration_seconds), 2)
    ) INTO result
    FROM calls 
    WHERE organization_id = org_id 
    AND created_at >= NOW() - INTERVAL '1 day' * period_days;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update organization call count
CREATE OR REPLACE FUNCTION update_org_call_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE organizations 
        SET current_month_calls = current_month_calls + 1,
            updated_at = NOW()
        WHERE id = NEW.organization_id;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_org_call_count
    AFTER INSERT ON calls
    FOR EACH ROW
    EXECUTE FUNCTION update_org_call_count();

-- Sample data for testing (remove in production)
INSERT INTO organizations (name, domain, plan) VALUES 
('Demo Organization', 'demo.knightcall.ai', 'professional');

INSERT INTO users (organization_id, email, password_hash, first_name, last_name, role) VALUES 
((SELECT id FROM organizations WHERE name = 'Demo Organization'), 'admin@demo.com', '$2a$10$hash', 'Admin', 'User', 'admin');

INSERT INTO agents (organization_id, name, description, status) VALUES 
((SELECT id FROM organizations WHERE name = 'Demo Organization'), 'Sales Pro', 'Expert sales agent for real estate leads', 'active'),
((SELECT id FROM organizations WHERE name = 'Demo Organization'), 'Customer Care', 'Friendly customer support specialist', 'active'),
((SELECT id FROM organizations WHERE name = 'Demo Organization'), 'Property Expert', 'Dubai property specialist for consultations', 'active');