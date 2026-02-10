export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(Math.round(value));
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2).replace('.', ',')}%`;
}

export function formatROAS(value: number): string {
  return `${value.toFixed(2).replace('.', ',')}x`;
}

export function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace('.', ',')}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace('.', ',')}K`;
  }
  return formatNumber(value);
}

export function safeNumber(value: number | null | undefined): number {
  return value ?? 0;
}

export function safeDivide(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return numerator / denominator;
}
