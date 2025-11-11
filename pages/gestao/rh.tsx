'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowLeft, Plus, Users, Trash2, Edit, Check } from 'lucide-react';

interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  salario: string;
  data_admissao: string;
  departamento: string;
  status: string;
  created_at: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function RHPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    salario: '',
    data_admissao: '',
    departamento: '',
    status: 'ativo',
  });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFuncionarios();
  }, []);

  const loadFuncionarios = async () => {
    try {
      const { data, error } = await supabase
        .from('rh_funcionarios')
        .select('*')
        .order('nome', { ascending: true });

      if (error) throw error;
      setFuncionarios(data || []);
    } catch (error) {
      console.error('Erro ao carregar funcionarios:', error);
    } finally {
      setLoading(false);
    }
  };

    const handleEdit = (funcionario: Funcionario) => {
    setFormData(funcionario);
    setEditingId(funcionario.id);
  };

    const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await supabase
        .from('rh_funcionarios')
        .update({
          nome: formData.nome,
          cargo: formData.cargo,
          salario: parseFloat(formData.salario as unknown as string),
          data_admissao: formData.data_admissao,
          departamento: formData.departamento,
          status: formData.status,
        })
        .eq('id', editingId);
      alert('Funcionário atualizado com sucesso!');
      setEditingId(null);
      setFormData({
        nome: '',
        cargo: '',
        salario: '',
        data_admissao: '',
        departamento: '',
        status: 'ativo',
      });
      loadFuncionarios();
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      alert('Erro ao atualizar funcionário');
    }
  };

    const filteredFuncionarios = funcionarios.filter((func) =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    func.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.cargo || !formData.salario || !formData.data_admissao) {
      alert('Por favor, preencha todos os campos obrigatorios');
      return;
    }

    try {
      const { error } = await supabase.from('rh_funcionarios').insert([
        {
          nome: formData.nome,
          cargo: formData.cargo,
          salario: parseFloat(formData.salario),
          data_admissao: formData.data_admissao,
          departamento: formData.departamento || 'Geral',
          status: formData.status,
          empresa_id: 1,
        },
      ]);

      if (error) throw error;
      
      setFormData({
        nome: '',
        cargo: '',
        salario: '',
        data_admissao: '',
        departamento: '',
        status: 'ativo',
      });
      
      await loadFuncionarios();
      alert('Funcionario registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar funcionario:', error);
      alert('Erro ao registrar funcionario');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este funcionario?')) return;

    try {
      const { error } = await supabase
        .from('rh_funcionarios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadFuncionarios();
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const totalFuncionarios = funcionarios.length;
  const totalFolha = funcionarios.reduce((acc, f) => acc + f.salario, 0);
  const funcionariosAtivos = funcionarios.filter(f => f.status === 'ativo').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/gestao" className="inline-flex items-center gap-2 text-blue-600 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-slate-900">Recursos Humanos</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-purple-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Funcionarios</p>
            <p className="text-3xl font-bold text-purple-600">{totalFuncionarios}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-green-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Funcionarios Ativos</p>
            <p className="text-3xl font-bold text-green-600">{funcionariosAtivos}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-orange-500">
            <p className="text-slate-600 text-sm font-medium mb-2">Folha Mensal</p>
            <p className="text-3xl font-bold text-orange-600">R$ {totalFolha.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8 sticky top-20">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Novo Funcionario
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} placeholder="Nome" className="w-full px-4 py-2 border rounded" />
                <input type="text" value={formData.cargo} onChange={(e) => setFormData({...formData, cargo: e.target.value})} placeholder="Cargo" className="w-full px-4 py-2 border rounded" />
                <input type="number" step="0.01" value={formData.salario} onChange={(e) => setFormData({...formData, salario: e.target.value})} placeholder="Salario" className="w-full px-4 py-2 border rounded" />
                <input type="date" value={formData.data_admissao} onChange={(e) => setFormData({...formData, data_admissao: e.target.value})} className="w-full px-4 py-2 border rounded" />
                <input type="text" value={formData.departamento} onChange={(e) => setFormData({...formData, departamento: e.target.value})} placeholder="Departamento" className="w-full px-4 py-2 border rounded" />
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border rounded">
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                  <option value="afastado">Afastado</option>
                </select>
                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded">
                  Registrar Funcionario
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b bg-slate-50">
                <h2 className="text-lg font-semibold">Funcionarios ({funcionarios.length})</h2>
              </div>
              <div className="divide-y">
                {funcionarios.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">Nenhum funcionario registrado</div>
                ) : (
                  funcionarios.map((f) => (
                    <div key={f.id} className="p-6 hover:bg-slate-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-lg">{f.nome}</h3>
                          <div className="flex gap-4 mt-2 text-sm text-slate-600">
                            <span>{f.cargo}</span>
                            <span>{f.departamento}</span>
                            <span className={f.status === 'ativo' ? 'text-green-600' : 'text-red-600'}>{f.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-lg font-bold text-purple-600">R$ {f.salario.toFixed(2)}</p>
                          </div>
                          <button onClick={() => handleDelete(f.id)} className="text-red-500">
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
