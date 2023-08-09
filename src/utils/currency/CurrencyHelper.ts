import currency from 'currency.js';

export function formatCurrency(
  value: currency.Any = '',
  prefix = 'IDR',
  separator = '.',
  decimal = ',',
  precision = 0
) {
  if (value.toString().length === 0) return '';
  return currency(value, {
    symbol: prefix + ' ',
    separator,
    decimal,
    precision,
  }).format();
}
