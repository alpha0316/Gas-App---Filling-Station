import { expect, it } from 'vitest'
import { formatCoords } from './format'

it('formats coordinates to four decimals', () => {
  expect(formatCoords(5.603716, -0.18696)).toBe('5.6037, -0.1870')
})
