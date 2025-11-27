'use client';

import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  avatar: string | null;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data from localStorage or API
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">Plataforma Empreendedores</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Planeje</a>
          <a href="/planejar" className="text-gray-600 hover:text-gray-900 font-medium">Planejar</a>
          <a href="/cadastro-cliente" className="text-gray-600 hover:text-gray-900 font-medium">Cadastro Cliente</a>
          <a href="/formalizacao" className="text-gray-600 hover:text-gray-900 font-medium">Formalizar-se</a>
          <a href="/presenca-digital" className="text-gray-600 hover:text-gray-900 font-medium">Presença Digital</a>
          <a href="/gestao-operacional" className="text-gray-600 hover:text-gray-900 font-medium">Gestao Operacional</a>
          <a href="/crescimento-expansao" className="text-gray-600 hover:text-gray-900 font-medium">Crescimento & Expansao</a>
        </nav>
        <div className="flex items-center gap-4">
          {/* Show user profile if logged in */}
          {user ? (
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                <span className="text-xs text-indigo-600 font-medium">LOGADO</span>
              </div>
            </div>
          ) : (
            // Show create account button only if not logged in
            <a href="/signup" className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md">
              Criar Conta
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
