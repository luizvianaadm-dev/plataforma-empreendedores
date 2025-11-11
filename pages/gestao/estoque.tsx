'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowLeft, Plus, Package, Trash2 } from 'lucide-react, Edit, Check }

interface Produto {
  id: number;
  nome: string;
  sku: string;
  quantidade: number;
  preco_custo: number;
  preco_venda: number;
  categoria: string;
  localizacao: string;
  created_at: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
      const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
    nome: '',
    sku: '',
    quantidade: '',
    preco_custo: '',
    preco_venda: '',
    categoria: '',
    localizacao: '',
  });

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from('estoque_produtos')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;
      setProdutos(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.sku || !formData.quantidade || !formData.preco_venda) {
      alert('Por favor, preencha os campos obrigatorios');
      return;
    }

    try {
      const { error } = await supabase.from('estoque_produtos').insert([
        {
          nome: formData.nome,
          sku: formData.sku,
          quantidade: parseInt(formData.quantidade),
          preco_custo: parseFloat(formData.preco_custo) || 0,
          preco_venda: parseFloat(formData.preco_venda),
          categoria: formData.categoria || 'Geral',
          localizacao: formData.localizacao || 'A definir',
        },
      ]);

      if (error) throw error;
      
      setFormData({
        nome: '',
        sku: '',
        quantidade: '',
        preco_custo: '',
        preco_venda: '',
        categoria: '',
        localizacao: '',
      });
      
      await loadProdutos();
      alert('Produto registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar produto:', error);
      alert('Erro ao registrar produto');
    }
  };

          const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('estoque_produtos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await loadProdutos();
      alert('Produto removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      alert('Erro ao remover produto');
    }
  };

  const handleEdit = (produto: Produto) => {
    setFormData(produto);
    setEditingId(produto.id);
  };

  const handleUpdate = async () => {
    if (!editingId || !formData.nome || !formData.sku) {
      alert('Por favor, preencha os campos obrigatorios');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('estoque_produtos')
        .update({
          nome: formData.nome,
          sku: formData.sku,
          quantidade: parseInt(formData.quantidade),
          preco_custo: parseFloat(formData.preco_custo) || 0,
          preco_venda: parseFloat(formData.preco_venda),
          categoria: formData.categoria || 'Geral',
          localizacao: formData.localizacao || 'A definir',
        })
        .eq('id', editingId);
      
      if (error) throw error;
      
      setFormData({
        nome: '',
        sku: '',
        quantidade: '',
        preco_custo: '',
        preco_venda: '',
        categoria: '',
        localizacao: '',
      });
      
      setEditingId(null);
      await loadProdutos();
      alert('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto');
    }
  };

  const filteredProdutos = produtos.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValorEstoque = produtos.reduce((acc, p) => acc + (p.preco_venda * p.quantidade), 0);
  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce((acc, p) => acc + p.quantidade, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/gestao" className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-slate-900">Gestao de Estoque</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-green-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Produtos</p>
            <p className="text-3xl font-bold text-green-600">{totalProdutos}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-blue-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Itens</p>
            <p className="text-3xl font-bold text-blue-600">{totalItens}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-purple-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Valor Total</p>
            <p className="text-3xl font-bold text-purple-600">R$ {totalValorEstoque.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Novo Produto
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Produto XYZ"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Ex: SKU-001"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Quantidade</label>
                  <input
                    type="number"
                    value={formData.quantidade}
                    onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preco Custo</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.preco_custo}
                    onChange={(e) => setFormData({ ...formData, preco_custo: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Preco Venda</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.preco_venda}
                    onChange={(e) => setFormData({ ...formData, preco_venda: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
                  <input
                    type="text"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    placeholder="Ex: Eletronicos"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Localizacao</label>
                  <input
                    type="text"
                    value={formData.localizacao}
                    onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                    placeholder="Ex: Predio A"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Registrar Produto
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-900">
                  Produtos ({produtos.length})
                </h2>
              </div>
              <div className="divide-y divide-slate-200">
                {produtos.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    Nenhum produto registrado ainda
                  </div>
                ) : (
                  produtos.map((produto) => (
                    <div key={produto.id} className="p-6 hover:bg-slate-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-lg">{produto.nome}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-slate-600">
                            <span>SKU: {produto.sku}</span>
                            <span>Qtd: {produto.quantidade}</span>
                            <span>{produto.categoria}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <p className="text-lg font-bold text-green-600">R$ {produto.preco_venda.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => handleDelete(produto.id)}
                            className="text-red-500 hover:text-red-700"
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
