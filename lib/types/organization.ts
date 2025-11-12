// Types for Multi-Tenancy (Organizations/Workspaces)

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  plan: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'trialing' | 'past_due' | 'canceled';
  subscription_id?: string;
  subscription_current_period_end?: Date;
  max_automations: number;
  max_messages_per_month: number;
  messages_used_this_month: number;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  invited_by?: string;
  invited_at?: Date;
  joined_at: Date;
}

export interface OrganizationInvite {
  id: string;
  organization_id: string;
  email: string;
  role: 'admin' | 'member';
  invited_by: string;
  token: string;
  expires_at: Date;
  accepted_at?: Date;
  created_at: Date;
}

export interface PlanLimits {
  maxAutomations: number;
  maxMessagesPerMonth: number;
  hasAdvancedAutomations: boolean;
  hasApiAccess: boolean;
  hasPrioritySupport: boolean;
  hasCustomReports: boolean;
}

export const PLAN_LIMITS: Record<Organization['plan'], PlanLimits> = {
  free: {
    maxAutomations: 1,
    maxMessagesPerMonth: 100,
    hasAdvancedAutomations: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasCustomReports: false,
  },
  pro: {
    maxAutomations: 10,
    maxMessagesPerMonth: 10000,
    hasAdvancedAutomations: true,
    hasApiAccess: false,
    hasPrioritySupport: true,
    hasCustomReports: true,
  },
  enterprise: {
    maxAutomations: -1, // Unlimited
    maxMessagesPerMonth: -1, // Unlimited
    hasAdvancedAutomations: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasCustomReports: true,
  },
};

export function getPlanLimits(plan: Organization['plan']): PlanLimits {
  return PLAN_LIMITS[plan];
}

export function canCreateAutomation(org: Organization): boolean {
  const limits = getPlanLimits(org.plan);
  if (limits.maxAutomations === -1) return true;
  // Aqui você precisaria contar as automações existentes
  return true; // Placeholder
}

export function canSendMessage(org: Organization): boolean {
  const limits = getPlanLimits(org.plan);
  if (limits.maxMessagesPerMonth === -1) return true;
  return org.messages_used_this_month < limits.maxMessagesPerMonth;
}

export function getUsagePercentage(org: Organization): number {
  const limits = getPlanLimits(org.plan);
  if (limits.maxMessagesPerMonth === -1) return 0;
  return (org.messages_used_this_month / limits.maxMessagesPerMonth) * 100;
}
