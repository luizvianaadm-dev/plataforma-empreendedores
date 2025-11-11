'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowLeft, Plus, DollarSign, Trash2 } from 'lucide-react';

interface Transacao {
  id: number;
  tipo: string;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  created_at: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function FinanceiroPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    tipo: 'receita',
    descricao: '',
    valor: '',
    data: '',
    categoria: '',
  });

  useEffect(() => {
    loadTransacoes();
  }, []);

  const loadTransacoes = async () => {
    try {
      const { data, error } = await supabase
        .from('financeiro_transacoes')
        .select('*')
        .order('data', { ascending: false });

      if (error) throw error;
      setTransacoes(data || []);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.descricao || !formData.valor || !formData.data) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const { error } = await supabase.from('financeiro_transacoes').insert([
        {
          tipo: formData.tipo,
          descricao: formData.descricao,
          valor: parseFloat(formData.valor),
          data: formData.data,
          categoria: formData.categoria || 'Geral',
          empresa_id: 1, // TODO: Get from user context
        },
      ]);

      if (error) throw error;
      
      setFormData({
        tipo: 'receita',
        descricao: '',
        valor: '',
        data: '',
        categoria: '',
      });
      
      await loadTransacoes();
      alert('Transação registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar transação:', error);
      alert('Erro ao registrar transação');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta transação?')) return;

    try {
      const { error } = await supabase
        .from('financeiro_transacoes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadTransacoes();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const totalReceita = transacoes
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);
  
  const totalDespesa = transacoes
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);
  
  const saldo = totalReceita - totalDespesa;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/gestao" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Gestão Financeira</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-green-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Receita</p>
            <p className="text-3xl font-bold text-green-600">R$ {totalReceita.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-red-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Despesa</p>
            <p className="text-3xl font-bold text-red-600">R$ {totalDespesa.toFixed(2)}</p>
          </div>
          <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${saldo >= 0 ? 'border-l-blue-500' : 'border-l-orange-500'}`}>
            <p className="text-slate-600 text-sm font-medium mb-2">Saldo</p>
            <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              R$ {saldo.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Form and List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nova Transação
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tipo</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Descrição</label>
                  <input
                    type="text"
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    placeholder="Ex: Venda de produto"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Data</label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                  <input
                    type="text"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    placeholder="Ex: Vendas"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Registrar Transação
                </button>
              </form>
            </div>
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-900">
                  Histórico de Transações ({transacoes.length})
                </h2>
              </div>
              <div className="divide-y divide-slate-200">
                {transacoes.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    Nenhuma transação registrada ainda
                  </div>
                ) : (
                  transacoes.map((transacao) => (
                    <div key={transacao.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              transacao.tipo === 'receita'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transacao.tipo.charAt(0).toUpperCase() + transacao.tipo.slice(1)}
                            </span>
                            <h3 className="font-medium text-slate-900">{transacao.descricao}</h3>
                          </div>
                          <div className="flex gap-6 mt-2 text-sm text-slate-500">
                            <span>{transacao.categoria}</span>
                            <span>{new Date(transacao.data).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-lg font-bold ${
                            transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleDelete(transacao.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
