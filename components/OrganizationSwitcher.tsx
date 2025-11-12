'use client';

import { useState } from 'react';
import { ChevronDown, Building2, Plus, Check } from 'lucide-react';
import type { Organization } from '../lib/types/organization';

interface OrganizationSwitcherProps {
  organizations: Organization[];
  currentOrganization: Organization;
  onSwitch: (orgId: string) => void;
  onCreateNew?: () => void;
}

export default function OrganizationSwitcher({
  organizations,
  currentOrganization,
  onSwitch,
  onCreateNew,
}: OrganizationSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
      >
        <Building2 className="h-5 w-5 text-gray-600" />
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-gray-900">{currentOrganization.name}</p>
          <p className="text-xs text-gray-500">Plano {currentOrganization.plan}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
                Suas Organizações
              </p>
              {organizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => {
                    onSwitch(org.id);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">{org.name}</p>
                      <p className="text-xs text-gray-500">Plano {org.plan}</p>
                    </div>
                  </div>
                  {org.id === currentOrganization.id && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>

            {onCreateNew && (
              <>
                <div className="border-t border-gray-200" />
                <div className="p-2">
                  <button
                    onClick={() => {
                      onCreateNew();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="text-sm font-medium">Criar Nova Organização</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
