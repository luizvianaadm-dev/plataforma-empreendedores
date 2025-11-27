'use client';

import React, { useState } from 'react';
import { X, Building2, AlertCircle, RefreshCw, Check } from 'lucide-react';

interface CompanyDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  cnpj: string;
  companyData?: CompanyInfo;
  onSync?: () => Promise<void>;
}

export interface CompanyInfo {
  cnpj: string;
  nomeEmpresa: string;
  nomeFantasia?: string;
  endereco: string;
  cep: string;
  cidade: string;
  estado: string;
  cnaes: string[];
  statusEmpresa: string;
  dataConstituicao: string;
  ultimaVerificacao: string;
  proximaVerificacao: string;
}

export default function CompanyDataModal({
  isOpen,
  onClose,
  cnpj,
  companyData,
  onSync,
}: CompanyDataModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSync = async () => {
    if (!onSync) return;
    setLoading(true);
    setError(null);

    try {
      await onSync();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao sincronizar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Building2 className="text-white" size={24} />
            <h2 className="text-xl font-bold text-white">Dados da Empresa</h2>
          </div>
          <button onClick={onClose} className="text-white hover:bg-green-800 p-2 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="text-red-600" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Check className="text-green-600" size={20} />
              <p className="text-green-700 text-sm">Dados sincronizados com sucesso!</p>
            </div>
          )}

          {companyData ? (
            <>
              {/* CNPJ and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase">CNPJ</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">{companyData.cnpj}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Status</p>
                  <p className={`text-lg font-bold mt-1 ${
                    companyData.statusEmpresa === 'ATIVA'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {companyData.statusEmpresa}
                  </p>
                </div>
              </div>

              {/* Company Names */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Razão Social</h3>
                <p className="text-base text-gray-800">{companyData.nomeEmpresa}</p>
                {companyData.nomeFantasia && (
                  <>
                    <h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">Nome Fantasia</h3>
                    <p className="text-base text-gray-800">{companyData.nomeFantasia}</p>
                  </>
                )}
              </div>

              {/* Address */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-3">Endereço</h3>
                <p className="text-sm text-gray-800">
                  {companyData.endereco}, {companyData.cep}
                </p>
                <p className="text-sm text-gray-800 mt-1">
                  {companyData.cidade}, {companyData.estado}
                </p>
              </div>

              {/* CNAEs */}
              {companyData.cnaes?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">CÓDIGOS CNAE</h3>
                  <div className="flex flex-wrap gap-2">
                    {companyData.cnaes.map((cnae, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                      >
                        {cnae}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="font-semibold text-gray-600 mb-1">Constituição</p>
                  <p className="text-gray-800">{new Date(companyData.dataConstituicao).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="font-semibold text-gray-600 mb-1">Verificação</p>
                  <p className="text-gray-800">{new Date(companyData.ultimaVerificacao).toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded">
                  <p className="font-semibold text-gray-600 mb-1">Próxima Sync</p>
                  <p className="text-gray-800">{new Date(companyData.proximaVerificacao).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Building2 className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">Nenhum dado de empresa carregado ainda.</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Fechar
            </button>
            {onSync && (
              <button
                onClick={handleSync}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-medium flex items-center gap-2"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                {loading ? 'Sincronizando...' : 'Sincronizar com Receita'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
