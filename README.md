# GasApp Filling Station

Dashboard for filling station staff. Staff see incoming orders, mark cylinders as filled, create orders for walk-in or phone customers, and view analytics. Only accounts with role `station` can sign in.

Stack: React, Vite, TypeScript, React Router, TanStack Query, zustand, Tailwind, Socket.IO client.

## Setup
```
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev            # http://localhost:3000
```

In development, `VITE_API_URL` defaults to `http://localhost:4000/api/v1`. A production build needs it set.

## Scripts
- `npm run dev` starts the dev server.
- `npm run build` type-checks and builds to `dist/`.
- `npm run typecheck` runs `tsc`.
- `npm run lint` runs oxlint.
- `npm test` runs the unit tests (vitest).

The API contract is in the `gasapp-backend` repository, file `docs/API.md`.
