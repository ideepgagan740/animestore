export interface Money {
  amount: number;
  currency: 'USD' | 'CAD' | 'INR';
}

export function formatMoney(money: Money) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currency,
  }).format(money.amount);
}
