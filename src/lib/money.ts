const SYMBOLS: Record<string, string> = { GHS: '₵' }

// Amounts are integer minor units (pesewas). No floating-point math.
export function formatMoney(minor: number, currency: string): string {
  const sign = minor < 0 ? '-' : ''
  const abs = Math.abs(minor)
  const whole = Math.floor(abs / 100)
  const cents = String(abs % 100).padStart(2, '0')
  const grouped = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const symbol = SYMBOLS[currency] ?? `${currency} `
  return `${sign}${symbol}${grouped}.${cents}`
}
