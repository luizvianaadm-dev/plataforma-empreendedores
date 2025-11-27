'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, Check, AlertCircle, Image } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, preview: string) => Promise<void>;
  currentPhotoUrl?: string;
}

export default function PhotoUploadModal({
  isOpen,
  onClose,
  onUpload,
  currentPhotoUrl,
}: PhotoUploadModalProps) {
  const [preview, setPreview] = useState<string | null>(currentPhotoUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Apenas imagens JPG ou PNG são permitidas');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande. Máximo 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) {
      setError('Selecione uma imagem primeiro');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const file = fileInputRef.current?.files?.[0];
      if (!file) throw new Error('Arquivo não selecionado');
      
      await onUpload(file, preview);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Enviar Foto</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="text-red-600" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Check className="text-green-600" size={20} />
              <p className="text-green-700 text-sm">Foto enviada com sucesso!</p>
            </div>
          )}

          {/* Image Preview */}
          {preview ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Mudar Foto
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition"
            >
              <Image className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-600 font-medium">Clique para selecionar</p>
              <p className="text-gray-400 text-sm">JPG ou PNG (máximo 5MB)</p>
            </div>
          )}

          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleUpload}
              disabled={loading || !preview}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-medium flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
