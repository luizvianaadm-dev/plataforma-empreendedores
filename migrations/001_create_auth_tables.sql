-- MIGRATION 001: CREATE AUTH TABLES
-- Plataforma Empreendedores - Authentication & Multi-tenancy
-- Date: 2025-11-17

-- 1. TABELA: usuarios (User Accounts)
CREATE TABLE public.usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(50) NOT NULL CHECK (tipo_usuario IN ('cliente', 'admin')),
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT true
);

-- 2. TABELA: clientes (Customer Workspaces)
CREATE TABLE public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
  nome_empresa VARCHAR(255) NOT NULL,
  cnpj_provisorio VARCHAR(20),
  ramo_atuacao VARCHAR(255),
  workspace_id UUID NOT NULL DEFAULT gen_random_uuid(),
  etapa_atual INTEGER DEFAULT 0 CHECK (etapa_atual >= 0 AND etapa_atual <= 6),
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA: planeje_dados (PLANEJE Step Data)
CREATE TABLE public.planeje_dados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE CASCADE,
  etapa INTEGER NOT NULL DEFAULT 1 CHECK (etapa = 1),
  dados_preenchidos JSONB NOT NULL DEFAULT '{}',
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. CREATE INDEXES for better query performance
CREATE INDEX idx_usuarios_email ON public.usuarios(email);
CREATE INDEX idx_clientes_usuario_id ON public.clientes(usuario_id);
CREATE INDEX idx_clientes_workspace_id ON public.clientes(workspace_id);
CREATE INDEX idx_planeje_dados_cliente_id ON public.planeje_dados(cliente_id);

-- 5. ENABLE Row Level Security (RLS) - For multi-tenancy isolation
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planeje_dados ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES for usuarios table
CREATE POLICY "Usuarios can view their own record"
  ON public.usuarios
  FOR SELECT
  USING (auth.uid()::text = id::text OR NULL);

-- 7. RLS POLICIES for clientes table
CREATE POLICY "Users can view their own clients"
  ON public.clientes
  FOR SELECT
  USING (usuario_id = auth.uid());

CREATE POLICY "Users can update their own clients"
  ON public.clientes
  FOR UPDATE
  USING (usuario_id = auth.uid());

CREATE POLICY "Users can insert clients"
  ON public.clientes
  FOR INSERT
  WITH CHECK (usuario_id = auth.uid());

-- 8. RLS POLICIES for planeje_dados table
CREATE POLICY "Users can view their own planeje data"
  ON public.planeje_dados
  FOR SELECT
  USING (
    cliente_id IN (
      SELECT id FROM public.clientes WHERE usuario_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own planeje data"
  ON public.planeje_dados
  FOR UPDATE
  USING (
    cliente_id IN (
      SELECT id FROM public.clientes WHERE usuario_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert planeje data"
  ON public.planeje_dados
  FOR INSERT
  WITH CHECK (
    cliente_id IN (
      SELECT id FROM public.clientes WHERE usuario_id = auth.uid()
    )
  );

-- FIM DA MIGRATION 001
