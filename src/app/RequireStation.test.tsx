import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RequireStation from './RequireStation'

vi.mock('../features/station/useStationSocket', () => ({ useStationSocket: () => undefined }))

// Server rendering reads the store's initial state, so the test swaps the store hook.
const state = vi.hoisted(() => ({ user: null as { role: string } | null, loading: false }))
vi.mock('../features/auth/store', () => ({
  useAuthStore: (select: (s: typeof state) => unknown) => select(state),
}))

const render = () =>
  renderToStaticMarkup(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<RequireStation />}>
          <Route path="/" element={<p>secret</p>} />
        </Route>
        <Route path="/login" element={<p>login page</p>} />
      </Routes>
    </MemoryRouter>,
  )

describe('RequireStation', () => {
  beforeEach(() => Object.assign(state, { user: null, loading: false }))

  it('shows a busy placeholder while the session loads', () => {
    state.loading = true
    expect(render()).toContain('aria-busy')
  })

  it('does not render the page for a signed-out visitor', () => {
    expect(render()).not.toContain('secret')
  })

  it('does not render the page for a non-station role', () => {
    state.user = { role: 'customer' }
    expect(render()).not.toContain('secret')
  })

  it('renders the page for a station account', () => {
    state.user = { role: 'station' }
    expect(render()).toContain('secret')
  })
})
