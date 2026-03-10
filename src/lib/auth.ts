export type AppRole = 'owner' | 'manager' | 'staff';

export const getCurrentUser = async () => ({
  id: process.env.NEXT_PUBLIC_DEMO_USER_ID ?? '00000000-0000-0000-0000-000000000001',
  fullName: process.env.NEXT_PUBLIC_DEMO_USER_NAME ?? 'Demo Owner',
  role: (process.env.NEXT_PUBLIC_DEMO_USER_ROLE as AppRole) ?? 'owner',
  organizationId: process.env.NEXT_PUBLIC_DEMO_ORG_ID ?? '00000000-0000-0000-0000-000000000111',
});
