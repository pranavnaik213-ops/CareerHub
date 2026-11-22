/**
 * Format tech compensation into Indian Rupees (INR - ₹ LPA / Cr)
 */
export function formatSalary(val: number, currency: string = '₹'): string {
  if (currency === '₹') {
    if (val >= 10000000) {
      const cr = (val / 10000000).toFixed(1).replace(/\.0$/, '');
      return `₹${cr} Cr`;
    }
    if (val >= 100000) {
      const lpa = Math.round(val / 100000);
      return `₹${lpa} LPA`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  }

  // Fallback for USD
  if (val >= 1000) {
    return `$${Math.round(val / 1000)}k`;
  }
  return `$${val.toLocaleString('en-US')}`;
}

export function formatSalaryRange(min: number, max: number, currency: string = '₹'): string {
  if (currency === '₹') {
    const minStr = formatSalary(min, '₹');
    const maxStr = formatSalary(max, '₹');
    return `${minStr} – ${maxStr}`;
  }
  return `${formatSalary(min, '$')} – ${formatSalary(max, '$')}`;
}

export const formatSalaryLakhs = formatSalary;
