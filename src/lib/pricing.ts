export type BillingPeriod = "quarterly" | "annually";

export const BILLING_MONTHS: Record<BillingPeriod, number> = {
  quarterly: 3,
  annually: 12,
};

export const PLAN_PRICING = {
  Team: {
    quarterly: 72000,
    annually: 239990,
    additionalContributorMonthly: 1500,
  },
  Business: {
    quarterly: 150000,
    annually: 500000,
    additionalContributorMonthly: 1250,
  },
};

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function contributorPrice(plan: keyof typeof PLAN_PRICING, billing: BillingPeriod): number {
  return PLAN_PRICING[plan].additionalContributorMonthly * BILLING_MONTHS[billing];
}

export function annualSavings(plan: keyof typeof PLAN_PRICING): number {
  const price = PLAN_PRICING[plan];
  return Math.round((1 - price.annually / (price.quarterly * 4)) * 100);
}