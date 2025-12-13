
# React Native Admin Starter (Expo + NativeWind + Gluestack UI)

This starter kit operationalizes a modern **admin template** for React Native (Expo) aligned to enterprise UX standards:
- **React 18** with **Expo** runtime
- **NativeWind (Tailwind)** + **Gluestack UI** for composable, accessible components
- **Dashboard** with charts & KPI cards
- **Auth UX**: login, logout, password reset, profile with avatar & dropdown
- **Admin blade** with **CRUD user forms** (create/read/update/delete)

> Bottom line: unzip, install, run. You’ll have a production‑grade UI baseline within minutes.

---

## 1) Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm 9+ (recommended) or npm
- Expo CLI (`npm i -g expo`), Android Studio and/or Xcode if you plan to run on device/simulator

---

## 2) Quickstart

```bash
# 1) Install
pnpm install

# 2) Run
pnpm start
# Press i for iOS Simulator, a for Android, or run in the Expo Go app
```

**Demo credentials (mocked):**
- Email: `admin@example.com`
- Password: `admin123`

---

## 3) What’s in the box

- **Expo Router**: File‑system routing (tabs + stacks).
- **Theming**: Tailwind‑first styling (`className`) with NativeWind; Gluestack UI provider + tokens.
- **Dashboard**: `victory-native` charts (line + bar), KPI cards, responsive layout.
- **Auth flows**: Login, password reset, avatar menu with Profile/Settings/Logout.
- **Users admin blade**: List, Create, Edit, Delete using lightweight **Zustand** store; forms via **react-hook-form** + **zod**.

> Everything is locally mocked. Swap the stores under `src/store` to wire up real APIs.

---

## 4) Project Structure

```
rn-admin-starter/
  app/
    _layout.tsx               # Root layout with Gluestack + theme + auth routing
    (auth)/
      login.tsx
      reset.tsx
      profile.tsx
    (tabs)/
      _layout.tsx             # Bottom tabs
      dashboard.tsx
      users/
        index.tsx             # List
        create.tsx            # Create
        [id].tsx              # Edit
      settings.tsx
  src/
    components/
      AvatarMenu.tsx
      Card.tsx
      ChartLine.tsx
      ChartBar.tsx
    store/
      auth.ts
      users.ts
    theme/
      gluestack-ui.config.ts  # Theme + tokens bridge
  assets/
    icon.png, splash.png, adaptive-icon.png
  README.md
  package.json
  tailwind.config.js
  babel.config.js
  tsconfig.json
  app.json
```

---

## 5) Styling System

- **NativeWind (Tailwind)** powers `className` on all RN views.
- **Gluestack UI** provides primitives (Button, Box, Text, Avatar, Menu) with strong accessibility semantics.
- Color tokens: `brand` (greens/teals) + `accent` (blues). Tweak in `tailwind.config.js`.

Example:

```tsx
<Card className="bg-brand-600">
  <Text className="text-white font-semibold">Throughput</Text>
</Card>
```

---

## 6) Dashboard

- Located at `app/(tabs)/dashboard.tsx`
- Uses `victory-native` (line and bar) with `react-native-svg` under the hood.
- KPI cards demonstrate responsive flexbox + Tailwind utilities.

---

## 7) Authentication UX

- **Login** (`/login`) → sets a mocked session in `src/store/auth.ts`
- **Password Reset** (`/reset`) → simulates email handoff
- **Avatar Menu** (top‑right of tabs) → Profile, Settings, Logout routes
- **Profile** (`/profile`) → editable name, avatar URL, email

To integrate real auth (e.g., OAuth/OIDC, Entra ID, Firebase): replace the actions in `auth.ts` and gate routes via the `isSignedIn` flag.

---

## 8) Users Admin Blade

- **List** users with search + quick actions
- **Create/Edit** forms validated via **zod**; optimistic updates in the store
- **Delete** with confirm sheet

Hook your API:
- Replace `src/store/users.ts` methods (`fetchUsers`, `createUser`, `updateUser`, `deleteUser`) with real HTTP calls.
- Add token injection/interceptors as needed.

---

## 9) Theming & Color Wayfinding

- Primary: `brand` (teal/green family)
- Secondary: `accent` (blue family)
- Adjust `src/theme/gluestack-ui.config.ts` or Tailwind tokens to brand‑match your org.

---

## 10) Common Tasks

**Add a new tab**
1. Create `app/(tabs)/reports.tsx`
2. It auto‑registers under the tab router. Customize tab options in `app/(tabs)/_layout.tsx`.

**Add a new screen in Users**
1. Create `app/(tabs)/users/export.tsx`
2. Use `useUsersStore()` to access data.

**Swap charts**
1. Edit `src/components/ChartLine.tsx` or `ChartBar.tsx`
2. Replace with another `victory-native` visualization or your own SVG.

---

## 11) Build & Ship

```bash
# iOS/Android builds with EAS (recommended)
pnpm add -g eas-cli
eas build:configure
eas build --platform ios
eas build --platform android
```

---

## 12) Troubleshooting

- Clear caches: `expo start -c`
- Reanimated plugin order: ensured in `babel.config.js`
- Typings: run `pnpm typecheck` after edits
- Android build error on SVG/NDK: ensure Android Studio and SDKs are current

---

## 13) License

MIT — use commercially, modify freely. Attribution optional.
