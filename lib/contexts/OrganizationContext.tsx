'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Organization } from '../types/organization';

interface OrganizationContextType {
  currentOrganization: Organization | null;
  organizations: Organization[];
  switchOrganization: (orgId: string) => void;
  refreshOrganizations: () => Promise<void>;
  isLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch organizations from API
  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with real API call
      // const res = await fetch('/api/organizations');
      // const data = await res.json();

      // Mock data for now
      const mockOrgs: Organization[] = [
        {
          id: '1',
          name: 'Minha Empresa',
          slug: 'minha-empresa',
          plan: 'free',
          subscription_status: 'active',
          max_automations: 1,
          max_messages_per_month: 100,
          messages_used_this_month: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      setOrganizations(mockOrgs);

      // Set current organization (from localStorage or first org)
      const savedOrgId = localStorage.getItem('currentOrganizationId');
      const current = savedOrgId
        ? mockOrgs.find(org => org.id === savedOrgId)
        : mockOrgs[0];
      setCurrentOrganization(current || null);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const switchOrganization = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId);
    if (org) {
      setCurrentOrganization(org);
      localStorage.setItem('currentOrganizationId', orgId);
    }
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        organizations,
        switchOrganization,
        refreshOrganizations: fetchOrganizations,
        isLoading,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within OrganizationProvider');
  }
  return context;
}
