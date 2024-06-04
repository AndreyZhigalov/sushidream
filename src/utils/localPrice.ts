export const localPrice = Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
}).format;
