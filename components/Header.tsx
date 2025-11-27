'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserProfileDropdown from './UserProfileDropdown';

interface User {
  name: string;
  email: string;
  avatar: string | null;
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    // Redirect to login
    router.push('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">Plataforma Empreendedores</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</a>
          <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Planeje</a>
          <a href="/cadastro-cliente" className="text-gray-600 hover:text-gray-900 font-medium">Cadastro Cliente</a>
          <a href="/formalizacao" className="text-gray-600 hover:text-gray-900 font-medium">Formalizar-se</a>
          <a href="/presenca-digital" className="text-gray-600 hover:text-gray-900 font-medium">Presença Digital</a>
          <a href="/gestao-operacional" className="text-gray-600 hover:text-gray-900 font-medium">Gestao Operacional</a>
          <a href="/crescimento-expansao" className="text-gray-600 hover:text-gray-900 font-medium">Crescimento & Expansao</a>
        </nav>
        <div className="flex items-center gap-4">
          {/* Show user profile if logged in */}
{user && <UserProfileDropdown user={user as User} />} (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name?.[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                  <span className="text-xs text-indigo-600 font-medium">LOGADO</span>
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition font-medium"
                    >
                      Sair da Conta
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Show create account button only if not logged in
            <a href="/signup" className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md transition">
              Criar Conta
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
