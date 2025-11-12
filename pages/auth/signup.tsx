'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader } from 'lucide-react';

export default function SignUp() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setSucesso('');

    // Validação
    if (!nome || !email || !senha) {
      setErro('Todos os campos são obrigatórios');
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    // Simulação de cadastro (em produção, conectar com API)
    setTimeout(() => {
      setSucesso('Cadastro realizado! Confira sua caixa de entrada ou faça login.');
      setLoading(false);
      setTimeout(() => router.push('/auth/signin'), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Plataforma de Empreendedores</h1>
            <p className="text-gray-600 mt-2">Crie sua conta e comece a automatizar</p>
          </div>

          {sucesso && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {sucesso}
            </div>
          )}

          {erro && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin mr-2" size={18} />
                  Cadastrando...
                </span>
              ) : (
                'Criar conta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já possui uma conta?{' '}
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
