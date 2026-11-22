/**
 * Format tech compensation into Indian Rupees (INR - ₹ LPA / Cr)
 * Strictly ensures Indian Rupee formatting across all listings.
 */
export function formatSalary(val: number, currency: string = '₹'): string {
  let inrVal = val;

  // If a legacy USD amount was passed (e.g. 140000, 180000, or currency === '$'),
  // convert directly to standard Indian tech LPA compensation:
  if (currency === '$' || (inrVal < 1000000 && inrVal >= 10000)) {
    inrVal = Math.round(inrVal * 0.35) * 100000;
  }

  if (inrVal >= 10000000) {
    const cr = (inrVal / 10000000).toFixed(1).replace(/\.0$/, '');
    return `₹${cr} Cr`;
  }
  if (inrVal >= 100000) {
    const lpa = Math.round(inrVal / 100000);
    return `₹${lpa} LPA`;
  }
  return `₹${inrVal.toLocaleString('en-IN')}`;
}

export function formatSalaryRange(min: number, max: number, currency: string = '₹'): string {
  const minStr = formatSalary(min, currency);
  const maxStr = formatSalary(max, currency);
  return `${minStr} – ${maxStr}`;
}

export const formatSalaryLakhs = formatSalary;
