import { describe, expect, it } from 'vitest'
import { formatMoney } from './money'

describe('formatMoney', () => {
  it('formats pesewas as cedis', () => {
    expect(formatMoney(12345, 'GHS')).toBe('₵123.45')
  })
  it('pads cents and groups thousands', () => {
    expect(formatMoney(5, 'GHS')).toBe('₵0.05')
    expect(formatMoney(123456789, 'GHS')).toBe('₵1,234,567.89')
  })
  it('keeps the sign of negative amounts', () => {
    expect(formatMoney(-250, 'GHS')).toBe('-₵2.50')
  })
  it('uses the currency code when there is no symbol', () => {
    expect(formatMoney(1000, 'USD')).toBe('USD 10.00')
  })
})
