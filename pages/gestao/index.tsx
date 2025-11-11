'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { LayoutDashboard, DollarSign, Package, Users } from 'lucide-react';

interface DashboardStats {
  totalTransacoes: number;
  totalProdutos: number;
  totalFuncionarios: number;
  saldoFinanceiro: number;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function GestaoPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTransacoes: 0,
    totalProdutos: 0,
    totalFuncionarios: 0,
    saldoFinanceiro: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const [transacoes, produtos, funcionarios] = await Promise.all([
        supabase.from('financeiro_transacoes').select('*', { count: 'exact' }),
        supabase.from('estoque_produtos').select('*', { count: 'exact' }),
        supabase.from('rh_funcionarios').select('*', { count: 'exact' }),
      ]);

      setStats({
        totalTransacoes: transacoes.count || 0,
        totalProdutos: produtos.count || 0,
        totalFuncionarios: funcionarios.count || 0,
        saldoFinanceiro: 0, // Will calculate from transactions
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Gestão Operacional</h1>
          </div>
          <p className="text-slate-600">Gerencie financeiro, estoque e recursos humanos em um único lugar</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Financeiro Card */}
          <Link href="/gestao/financeiro">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border-l-4 border-l-blue-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-2">Transações</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalTransacoes}</p>
                  <p className="text-slate-500 text-xs mt-2">Financeiro</p>
                </div>
                <DollarSign className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </div>
          </Link>

          {/* Estoque Card */}
          <Link href="/gestao/estoque">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border-l-4 border-l-green-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-2">Produtos</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalProdutos}</p>
                  <p className="text-slate-500 text-xs mt-2">Estoque</p>
                </div>
                <Package className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </div>
          </Link>

          {/* RH Card */}
          <Link href="/gestao/rh">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border-l-4 border-l-purple-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-2">Funcionários</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalFuncionarios}</p>
                  <p className="text-slate-500 text-xs mt-2">Recursos Humanos</p>
                </div>
                <Users className="w-10 h-10 text-purple-500 opacity-20" />
              </div>
            </div>
          </Link>

          {/* Quick Access Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6 border-l-4 border-l-blue-600">
            <h3 className="font-semibold text-slate-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-2">
              <Link href="/gestao/financeiro">
                <p className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">→ Nova Transação</p>
              </Link>
              <Link href="/gestao/estoque">
                <p className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">→ Novo Produto</p>
              </Link>
              <Link href="/gestao/rh">
                <p className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">→ Novo Funcionário</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Bem-vindo à Gestão Operacional</h2>
          <p className="text-slate-600 leading-relaxed">
            Use o painel abaixo para gerenciar todos os aspectos do seu negócio. Acesse cada módulo para visualizar, adicionar ou editar informações.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex gap-4">
              <DollarSign className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900">Gestão Financeira</h3>
                <p className="text-slate-600 text-sm">Controle receitas, despesas e fluxo de caixa</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Package className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900">Gestão de Estoque</h3>
                <p className="text-slate-600 text-sm">Monitore produtos, quantidades e localizações</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900">Recursos Humanos</h3>
                <p className="text-slate-600 text-sm">Gerencie funcionários e departamentos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
