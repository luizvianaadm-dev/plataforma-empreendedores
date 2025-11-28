-- SPRINT 10: INTEGRACAO PAGAMENTOS (STRIPE + PIX)
-- Criar tabelas para gerenciar planos de preco, pagamentos e assinaturas

-- Tabela: pricing_plans
CREATE TABLE IF NOT EXISTS pricing_plans (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BRL',
  billing_period VARCHAR(50) DEFAULT 'monthly',
  features TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: payments
CREATE TABLE IF NOT EXISTS payments (
  id BIGSERIAL PRIMARY KEY,
  payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  pricing_plan_id BIGINT REFERENCES pricing_plans(id),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'BRL',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  pricing_plan_id BIGINT REFERENCES pricing_plans(id),
  status VARCHAR(50) DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar indices para performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Inserir planos de preco
INSERT INTO pricing_plans (name, description, price, currency, billing_period, features) VALUES
  ('Plano Basico', 'Criacao de empresa ate CNPJ', 97.90, 'BRL', 'monthly', ARRAY['Nome da Empresa', 'Validacao CNPJ', 'Descricao da Ideia', 'Plano Basico', 'Download em PDF']),
  ('Plano Profissional', 'Tudo do Basico + Analise de Mercado e Projecao Financeira', 197.90, 'BRL', 'monthly', ARRAY['Tudo do Basico', 'Analise de Mercado (IA)', 'Projecao Financeira 3 Anos', 'Pitch Deck', 'Acesso Dashboard 30 Dias']),
  ('Plano Completo', 'Tudo do Profissional + Consulta + Suporte Extended', 397.90, 'BRL', 'monthly', ARRAY['Tudo do Profissional', 'Consulta 1 Hora', 'Refinamentos Ilimitados', 'Integracao Contabilidade', 'Suporte 90 Dias'])
ON CONFLICT DO NOTHING;
