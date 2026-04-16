export type Plan = 'free' | 'pro';

export const PLAN_LIMITS = {
  free: {
    maxPets: 2,
    maxExams: 10,
    historyMonths: 12,
    gps: false,
    advancedMonitoring: false,
    vetSharing: false,
  },
  pro: {
    maxPets: Infinity,
    maxExams: Infinity,
    historyMonths: Infinity,
    gps: true,
    advancedMonitoring: true,
    vetSharing: true,
  },
} as const;

export const PRO_PRICE = 'R$ 29,90/mês';
