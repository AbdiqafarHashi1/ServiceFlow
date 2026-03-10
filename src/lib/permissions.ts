import type { AppRole } from './auth';
const roleRank: Record<AppRole, number> = { staff: 1, manager: 2, owner: 3 };
export const hasRole = (role: AppRole, minRole: AppRole) => roleRank[role] >= roleRank[minRole];
export const canViewReports = (role: AppRole) => hasRole(role, 'manager');
export const canViewSettings = (role: AppRole) => role === 'owner';
