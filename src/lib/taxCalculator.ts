/**
 * Indian Tech CTC & In-Hand Monthly Salary Calculator
 * Calibrated to India's New Tax Regime (FY 2025-26 / Budget 2024 revisions)
 */

export interface CTCBreakdown {
  ctcLakhs: number;
  totalCtcAnnual: number;
  baseSalaryAnnual: number;
  annualPerformanceBonus: number;
  rsuAnnual: number;
  employerPfAnnual: number;
  gratuityAnnual: number;
  grossTaxableAnnual: number;
  standardDeduction: number;
  netTaxableIncome: number;
  totalIncomeTaxAnnual: number;
  healthAndEduCess: number;
  totalTaxPayable: number;
  netAnnualInHand: number;
  monthlyInHand: number;
  taxSlabBreakdown: { slab: string; rate: string; tax: number }[];
}

export function calculateIndianCTCBreakdown(ctcLakhs: number, rsuPercentage: number = 15): CTCBreakdown {
  const totalCtcAnnual = Math.round(ctcLakhs * 100000);

  // Typical Indian Tier-1 Tech compensation split:
  // - RSUs / ESOPs: ~15% - 25% of CTC
  // - Annual Performance Bonus: ~10% of CTC
  // - Employer PF (12% of basic) + Gratuity (4.81% of basic): ~6% of CTC
  // - Base Salary (Fixed): Remaining ~60% - 70% of CTC
  const rsuAnnual = Math.round((totalCtcAnnual * rsuPercentage) / 100);
  const annualPerformanceBonus = Math.round(totalCtcAnnual * 0.10);
  const employerPfAnnual = Math.round(totalCtcAnnual * 0.045);
  const gratuityAnnual = Math.round(totalCtcAnnual * 0.015);
  const baseSalaryAnnual = totalCtcAnnual - rsuAnnual - annualPerformanceBonus - employerPfAnnual - gratuityAnnual;

  // Gross Taxable Cash Income (Base + Bonus; RSUs taxed upon vesting/perquisite)
  const grossTaxableAnnual = baseSalaryAnnual + annualPerformanceBonus;

  // New Tax Regime Standard Deduction: ₹75,000 (Budget 2024)
  const standardDeduction = 75000;
  const netTaxableIncome = Math.max(0, grossTaxableAnnual - standardDeduction);

  // New Tax Regime Slabs (FY 2025-26):
  // Up to ₹3,00,000: Nil
  // ₹3,00,001 to ₹7,00,000: 5%
  // ₹7,00,001 to ₹10,00,000: 10%
  // ₹10,00,001 to ₹12,00,000: 15%
  // ₹12,00,001 to ₹15,00,000: 20%
  // Above ₹15,00,000: 30%
  // Section 87A rebate: If total taxable income <= ₹7,00,000, tax is Nil.

  let tax = 0;
  const slabs = [
    { limit: 300000, rate: 0.00, label: '₹0 – ₹3,00,000', rateStr: '0%' },
    { limit: 700000, rate: 0.05, label: '₹3,00,001 – ₹7,00,000', rateStr: '5%' },
    { limit: 1000000, rate: 0.10, label: '₹7,00,001 – ₹10,00,000', rateStr: '10%' },
    { limit: 1200000, rate: 0.15, label: '₹10,00,001 – ₹12,00,000', rateStr: '15%' },
    { limit: 1500000, rate: 0.20, label: '₹12,00,001 – ₹15,00,000', rateStr: '20%' },
  ];

  const taxSlabBreakdown: { slab: string; rate: string; tax: number }[] = [];
  let remaining = netTaxableIncome;
  let prevLimit = 0;

  for (const s of slabs) {
    if (netTaxableIncome > prevLimit) {
      const taxableInThisSlab = Math.min(remaining, s.limit - prevLimit);
      const slabTax = Math.round(taxableInThisSlab * s.rate);
      tax += slabTax;
      taxSlabBreakdown.push({
        slab: s.label,
        rate: s.rateStr,
        tax: slabTax,
      });
      remaining -= taxableInThisSlab;
      prevLimit = s.limit;
    }
  }

  if (remaining > 0) {
    const slabTax = Math.round(remaining * 0.30);
    tax += slabTax;
    taxSlabBreakdown.push({
      slab: 'Above ₹15,00,000',
      rate: '30%',
      tax: slabTax,
    });
  }

  // Section 87A Rebate check
  if (netTaxableIncome <= 700000) {
    tax = 0;
  }

  // 4% Health & Education Cess
  const healthAndEduCess = Math.round(tax * 0.04);
  const totalTaxPayable = tax + healthAndEduCess;

  // In-Hand Cash Pay = (Base Salary + Bonus - Employee PF (~₹45,000) - Tax Payable)
  const employeePfAnnual = employerPfAnnual;
  const netAnnualInHand = Math.max(0, grossTaxableAnnual - employeePfAnnual - totalTaxPayable);
  const monthlyInHand = Math.round(netAnnualInHand / 12);

  return {
    ctcLakhs,
    totalCtcAnnual,
    baseSalaryAnnual,
    annualPerformanceBonus,
    rsuAnnual,
    employerPfAnnual,
    gratuityAnnual,
    grossTaxableAnnual,
    standardDeduction,
    netTaxableIncome,
    totalIncomeTaxAnnual: tax,
    healthAndEduCess,
    totalTaxPayable,
    netAnnualInHand,
    monthlyInHand,
    taxSlabBreakdown,
  };
}
