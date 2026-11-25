# Routely Monorepo

Routely is a TypeScript monorepo for a managed motorcycle dispatch and logistics ecosystem.

## Foundation stack

- pnpm workspaces
- Turborepo
- TypeScript
- Expo and React Native for mobile applications
- Expo Web for browser previews of mobile applications
- Next.js for web applications
- Supabase for authentication, PostgreSQL, storage, and realtime infrastructure
- ESLint and Prettier

## Repository layout

- `apps/entry` - central public first-launch experience for Customer, Rider, Owner, and Agent
- `apps/customer` - Expo + React Native customer and authorized merchant experience
- `apps/rider` - Expo + React Native rider app
- `apps/owner` - Expo + React Native motorcycle owner app
- `apps/agent` - Expo + React Native field operations app
- `apps/admin` - Next.js operations and platform administration app
- `apps/partner` - Next.js logistics and fleet partner app
- `packages/*` - shared, platform-neutral, or platform-specific foundations
- `supabase/` - migrations, functions, seed data, and policies
- `docs/` - architecture and product documentation
- `scripts/` - repeatable development utilities
- `tests/` - cross-workspace test assets

## Windows setup

Routely requires Node.js 20.19 or newer and Git for Windows.

### 1. Install Node.js

Install Node.js using one of these approaches:

- Download the Windows installer from https://nodejs.org/
- Use `winget install OpenJS.NodeJS.LTS`
- Use a Windows version manager such as nvm-windows

Restart the terminal after installation.

### 2. Enable pnpm

pnpm is declared in `package.json` through `packageManager`. Install it with Corepack when available:

```powershell
corepack enable
corepack prepare pnpm@10.17.1 --activate
pnpm --version
```

If Corepack is unavailable, install pnpm globally:

```powershell
npm install --global pnpm@10.17.1
pnpm --version
```

### 3. Install dependencies

From the repository root:

```powershell
pnpm install
```

### 4. Configure environment variables

Copy `.env.example` to `.env` and replace placeholders locally:

```powershell
Copy-Item .env.example .env
```

Do not commit `.env`. Never place service-role credentials in browser or Expo client configuration.

### 5. Start a browser preview

Each application can be started independently from the repository root. Run one command in a
PowerShell terminal; the browser apps do not require Android Studio, an emulator, or mobile SDKs.

```powershell
pnpm preview:entry
pnpm preview:customer
pnpm preview:rider
pnpm preview:owner
pnpm preview:agent
pnpm preview:admin
pnpm preview:partner
```

The entry preview uses port `8080`. Customer, Rider, Owner, and Agent previews use ports `8081`
through `8084`, respectively.
The Next.js previews use `http://localhost:3000` (admin) and `http://localhost:3001` (partner).
Stop a running preview with `Ctrl+C`.

The entry app stores only the selected experience and introductory-onboarding completion. It does
not store credentials or grant roles. On native, destination app links use the independent app
schemes; browser previews use the local ports above. Rider login and account creation both continue
to the existing phone + SMS OTP flow. Customer and Owner authentication are not connected, and
Agent access remains operations-provisioned.

Production web builds must provide the four public destination URLs shown in
`apps/entry/.env.example`; development previews use the localhost defaults.

The Rider app includes a phone-number authentication foundation. Live SMS requires the Rider
Supabase public URL and anon key in `apps/rider/.env.local`, plus phone authentication and an SMS
provider configured in the Supabase project. Without those settings, the app clearly reports that
no code was sent. Account registration, profile lookup, role membership, and operational approval
remain separate server-backed work.

### 6. Run workspace checks

```powershell
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

The root `pnpm build` builds shared packages, exports Expo web apps, and builds Next.js
applications. Native mobile builds are outside this browser-first setup.

## Supabase setup

Supabase CLI configuration and project linking are intentionally not initialized here. No project
credentials or fake secrets are included.

For Rider phone authentication:

1. Copy `apps/rider/.env.example` to `apps/rider/.env.local`.
2. Set the Supabase project URL and public anon key. Never use a service-role key in the Rider app.
3. Enable Phone authentication and configure an SMS provider in the Supabase dashboard.
4. Keep `EXPO_PUBLIC_AUTH_PREVIEW=false` outside development. In development only, setting it to
   `true` exposes a clearly labelled code-entry preview; it sends no SMS and cannot authenticate.

The Rider OTP service uses Supabase phone OTP request, resend, and verification operations. After
verification, access remains blocked because rider profile, onboarding, and approval status APIs are
not yet configured. Phone verification alone does not grant operational access.

Install the Supabase CLI and initialize/link a real project separately when backend work is approved.
