import { PLAN_LIMITS, Plan } from '@/types/plans';

export function isPro(plan: Plan) {
  return plan === 'pro';
}

export function isAtPetLimit(plan: Plan, currentPetCount: number) {
  return !isPro(plan) && currentPetCount >= PLAN_LIMITS.free.maxPets;
}

export function isAtExamLimit(plan: Plan, currentExamCount: number) {
  return !isPro(plan) && currentExamCount >= PLAN_LIMITS.free.maxExams;
}
