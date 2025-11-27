'use client';

import { useState } from 'react';
import { User, LogOut, Edit3, Upload, Building2 } from 'lucide-react';

interface UserProfileDropdownProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
    cnpj_vinculado?: string;
  } | null;
  onLogout: () => void;
  onEditProfile: () => void;
  onUploadPhoto: () => void;
  onEditCompany?: () => void;
}

export default function UserProfileDropdown({
  user,
  onLogout,
  onEditProfile,
  onUploadPhoto,
  onEditCompany,
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      {/* Botão do usuário */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {getInitials(user.name)}
            </span>
          </div>
        )}
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-gray-900">{user.name}</span>
          <span className="text-xs text-indigo-600 font-medium">LOGADO</span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header com info do usuário */}
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
            {user.cnpj_vinculado && (
              <p className="text-xs text-indigo-600 mt-1">CNPJ: {user.cnpj_vinculado}</p>
            )}
          </div>

          {/* Opções do menu */}
          <div className="p-2">
            {/* Upload de Foto */}
            <button
              onClick={() => {
                onUploadPhoto();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded transition flex items-center gap-2 font-medium"
            >
              <Upload className="w-4 h-4" />
              Atualizar Foto
            </button>

            {/* Editar Perfil */}
            <button
              onClick={() => {
                onEditProfile();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded transition flex items-center gap-2 font-medium"
            >
              <Edit3 className="w-4 h-4" />
              Editar Dados Pessoais
            </button>

            {/* Editar Dados da Empresa (se tiver CNPJ) */}
            {user.cnpj_vinculado && onEditCompany && (
              <button
                onClick={() => {
                  onEditCompany();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded transition flex items-center gap-2 font-medium"
              >
                <Building2 className="w-4 h-4" />
                Atualizar Dados Empresa
              </button>
            )}

            {/* Divisor */}
            <div className="my-2 border-t border-gray-200" />

            {/* Sair da Conta */}
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded transition flex items-center gap-2 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sair da Conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
