# Full‑Stack RN (Web/iOS/Android) + Express/axios/Mongo + Entra External ID (Customers) — Starter Kit

> Delivery scope: cross‑platform React Native app (Expo 53 / RN 0.79.5 / React 19) for Web+iOS+Android, Express API (TypeScript), MongoDB (Mongoose), Microsoft Entra External ID (Customers) OIDC auth with App Roles–aware RBAC, axios with token injection, and end‑to‑end local/dev configuration.

---

## 0) High‑Level Architecture & Auth Flow

**Front end**: React Native (Expo Router). On **web**, authentication uses `msal-browser` + `@azure/msal-react`. On **native (iOS/Android)**, authentication uses `expo-auth-session` (Auth Code + PKCE) against your Entra External ID tenant’s OIDC metadata (ciamlogin.com), requesting `openid profile offline_access` and your API scope. Tokens are stored in **SecureStore** on native and **sessionStorage** on web.

**API**: Node.js + Express + TypeScript. JWT validation uses `jose` with JWKS from the tenant’s discovery endpoint. RBAC enforces `roles` (External ID app roles) or falls back to `scp`/custom claims when roles are absent. CORS configured for Expo dev URLs and web origin. MongoDB via Mongoose; environment variables follow your standard.

**Data**: Mongo Atlas/Azure Cosmos DB for Mongo API. Example `UserProfile` model; swap in domain models as needed.

**Flow**:

1. User signs in → acquires ID token + Access token for API scope.
2. axios interceptor attaches `Authorization: Bearer <access_token>`.
3. API validates signature/issuer/audience using JWKS; authorizes by `roles` claim.
4. API hits Mongo and returns data.

---

## 1) Prerequisites

- **Node** ≥ 20.x, **pnpm** or **npm** (examples use pnpm)
- **Expo** CLI ≥ 12 (SDK 53)
- **Mongo** connection string (Atlas or Azure Cosmos DB for Mongo)
- **Microsoft Entra External ID (Customers)** tenant with:
  - App registration **for the SPA/RN client** (public) with redirect URIs
  - App registration **for the API** with **exposed scope** (e.g., `api://<api-app-id>/access_as_user`) and **App Roles** (e.g., `Admin`, `Writer`, `Reader`)

> **Heads‑up**: New tenants should use **Entra External ID (Customers)** with `ciamlogin.com` endpoints. Don’t mix with `login.microsoftonline.com`. Keep issuer domains consistent across client + API.

---

## 2) Monorepo Layout

```
fullstack-externalid/
├─ apps/
│  ├─ mobile/                 # Expo (RN web+iOS+Android)
│  │  ├─ app/                 # Expo Router
│  │  ├─ src/
│  │  │  ├─ auth/             # cross-platform auth adapters
│  │  │  ├─ api/              # axios client
│  │  │  ├─ components/
│  │  │  └─ screens/
│  │  ├─ app.config.ts
│  │  └─ package.json
│  └─ api/                    # Express + TS + Mongoose
│     ├─ src/
│     │  ├─ middleware/
│     │  ├─ models/
│     │  ├─ routes/
│     │  ├─ services/
│     │  └─ server.ts
│     ├─ tsconfig.json
│     ├─ package.json
│     └─ .env
├─ package.json
└─ README.md
```

---

## 3) Bootstrap Commands

```bash
# 3.1 Create Expo app
pnpm dlx create-expo-app@latest apps/mobile --template tabs

# Pin versions (Expo 53 / RN 0.79.5 / React 19)
cd apps/mobile

pnpm i react@19.0.0 react-native@0.79.5 expo@~53.0.20
pnpm i -D typescript @types/react @types/react-native

# Auth + storage + router
pnpm i expo-router
pnpm i @azure/msal-browser @azure/msal-react expo-auth-session expo-secure-store axios

# 3.2 Create API (TS)
cd ../../
mkdir -p apps/api && cd apps/api
pnpm init -y
pnpm i express cors dotenv mongoose jose jwks-rsa morgan helmet
pnpm i -D typescript ts-node-dev @types/express @types/cors @types/node

# TS config
pnpm exec tsc --init --rootDir src --outDir dist --module commonjs --target ES2022 --esModuleInterop --resolveJsonModule --moduleResolution node --strict
```

---

## 4) Environment Variables

### 4.1 API `.env`

```
# Mongo (your standard naming)
MONGO_URI=mongodb+srv://wsuser:ZJbm8i6kKw2T@ws-cloud-mongo.mongocluster.cosmos.azure.com/foods?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000
DB_NAME=foods
PORT=3000

# Entra External ID (Customers)
TENANT_ID=<your-tenant-guid>
TENANT_NAME=<your-tenant>.onmicrosoft.com
POLICY=<user_flow_or_custom_policy>   # e.g., B2C_1_signupsignin
API_AUDIENCE=api://<api-app-id>       # API app identifier URI
API_SCOPE=api://<api-app-id>/access_as_user
ISSUER=https://<your-tenant-id>.ciamlogin.com/<your-tenant-guid>/v2.0/    # or policy-specific issuer
JWKS_URI=https://<your-tenant-id>.ciamlogin.com/<your-tenant-guid>/discovery/v2.0/keys
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006,http://localhost:5173
```

> For policy‑specific issuers (recommended when using user flows), your issuer may be of the form `https://<tenant-name>.ciamlogin.com/<tenant-name>/<POLICY>/v2.0/` and JWKS can still be read from the discovery document. Validate against the exact `issuer` from the well‑known metadata.

### 4.2 Mobile `.env` (via `app.config.ts` / `expo-constants`)

```
EXTERNALID_TENANT_ID=<guid>
EXTERNALID_TENANT_DOMAIN=<your-tenant>.onmicrosoft.com
EXTERNALID_POLICY=<user_flow_or_custom_policy>
EXTERNALID_CLIENT_ID=<public-client-id>
EXTERNALID_API_SCOPE=api://<api-app-id>/access_as_user
# Web-only MSAL config
WEB_AUTHORITY=https://<tenant-id>.ciamlogin.com/<tenant-guid>/v2.0
WEB_REDIRECT_URI=http://localhost:8080
WEB_POST_LOGOUT_REDIRECT_URI=http://localhost:8080
```

---

## 5) API — `src/server.ts` (Express + jose JWT validation + RBAC)

```ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const {
  PORT = '3000',
  MONGO_URI,
  DB_NAME,
  ALLOWED_ORIGINS = '',
  API_AUDIENCE,
  ISSUER,
  JWKS_URI,
} = process.env;

// Mongo
if (!MONGO_URI) throw new Error('MONGO_URI missing');
mongoose.connect(MONGO_URI, { dbName: DB_NAME });

// Express
const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: ALLOWED_ORIGINS.split(',').map(s => s.trim()), credentials: true }));

// JWKS
if (!JWKS_URI || !ISSUER || !API_AUDIENCE) throw new Error('Auth env missing');
const JWKS = createRemoteJWKSet(new URL(JWKS_URI));

// Auth middleware
async function requireAuth(req: any, res: any, next: any) {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ error: 'Missing bearer token' });

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: ISSUER,
      audience: API_AUDIENCE,
    });

    // Attach identity
    (req as any).user = {
      sub: payload.sub,
      name: payload.name,
      email: payload.email || payload.preferred_username,
      roles: (payload.roles as string[]) || [],
      scopes: (payload.scp as string)?.split(' ') || [],
    };
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'Invalid or expired token', detail: e?.message });
  }
}

// Role guard
function requireRole(...roles: string[]) {
  return (req: any, res: any, next: any) => {
    const user = (req as any).user;
    if (!user) return res.status(401).end();
    const has = user.roles?.some((r: string) => roles.includes(r));
    if (!has) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

// Routes
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/me', requireAuth, (req: any, res) => res.json({ user: req.user }));
app.get('/api/admin/metrics', requireAuth, requireRole('Admin'), (_req, res) => {
  res.json({ metrics: { status: 'green' } });
});

app.listen(Number(PORT), () => console.log(`API listening on :${PORT}`));
```

> Swap `ISSUER`/`JWKS_URI` to match your exact OIDC discovery. For policy‑specific flows, read the metadata and copy the `issuer` and `jwks_uri` values verbatim.

---

## 6) API — Example Mongoose Model `src/models/UserProfile.ts`

```ts
import { Schema, model } from 'mongoose';

const UserProfileSchema = new Schema(
  {
    sub: { type: String, index: true, unique: true },
    email: String,
    displayName: String,
    roles: [String],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'userprofiles' }
);

export const UserProfile = model('UserProfile', UserProfileSchema);
```

---

## 7) Mobile/Web — Expo app config (`app.config.ts`)

```ts
import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'ExternalIDStarter',
  slug: 'externalid-starter',
  scheme: 'externalidstarter', // used by expo-auth-session
  extra: {
    EXTERNALID_TENANT_ID: process.env.EXTERNALID_TENANT_ID,
    EXTERNALID_TENANT_DOMAIN: process.env.EXTERNALID_TENANT_DOMAIN,
    EXTERNALID_POLICY: process.env.EXTERNALID_POLICY,
    EXTERNALID_CLIENT_ID: process.env.EXTERNALID_CLIENT_ID,
    EXTERNALID_API_SCOPE: process.env.EXTERNALID_API_SCOPE,
    WEB_AUTHORITY: process.env.WEB_AUTHORITY,
    WEB_REDIRECT_URI: process.env.WEB_REDIRECT_URI,
    WEB_POST_LOGOUT_REDIRECT_URI: process.env.WEB_POST_LOGOUT_REDIRECT_URI,
  },
  ios: {
    bundleIdentifier: 'com.yourco.externalidstarter',
  },
  android: {
    package: 'com.yourco.externalidstarter',
  },
  web: {
    bundler: 'metro',
  },
});
```

---

## 8) Mobile/Web — Auth adapters

### 8.1 `src/auth/nativeAuth.ts` — **Native (iOS/Android)** using `expo-auth-session`

```ts
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const E = Constants.expoConfig?.extra as any;

const tenant = E.EXTERNALID_TENANT_DOMAIN; // your-tenant.onmicrosoft.com
const policy = E.EXTERNALID_POLICY;        // e.g., B2C_1_signupsignin
const clientId = E.EXTERNALID_CLIENT_ID;
const scope = E.EXTERNALID_API_SCOPE;      // api://.../access_as_user

// Discovery for policy-based issuer (External ID/B2C)
const discovery = {
  authorizationEndpoint: `https://${tenant.replace('.onmicrosoft.com','')}.ciamlogin.com/${tenant}/${policy}/oauth2/v2.0/authorize`,
  tokenEndpoint:         `https://${tenant.replace('.onmicrosoft.com','')}.ciamlogin.com/${tenant}/${policy}/oauth2/v2.0/token`,
  revocationEndpoint:    `https://${tenant.replace('.onmicrosoft.com','')}.ciamlogin.com/${tenant}/${policy}/oauth2/v2.0/logout`,
};

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true, scheme: 'externalidstarter' });

export async function signInNative() {
  const req = new AuthSession.AuthRequest({
    clientId,
    redirectUri,
    responseType: AuthSession.ResponseType.Code,
    scopes: ['openid', 'profile', 'offline_access', scope],
    usePKCE: true,
  });
  await req.makeAuthUrlAsync(discovery);
  const res = await req.promptAsync(discovery, { useProxy: true });
  if (res.type !== 'success' || !res.params.code) throw new Error('Auth failed');

  const token = await AuthSession.exchangeCodeAsync({
    clientId,
    code: res.params.code,
    redirectUri,
    extraParams: { code_verifier: req.codeVerifier! },
  }, discovery);

  // Persist tokens securely
  await SecureStore.setItemAsync('access_token', token.accessToken!);
  if (token.refreshToken) await SecureStore.setItemAsync('refresh_token', token.refreshToken);
  return token;
}

export async function getAccessTokenNative() {
  return SecureStore.getItemAsync('access_token');
}

export async function refreshAccessTokenNative() {
  const refreshToken = await SecureStore.getItemAsync('refresh_token');
  if (!refreshToken) return null;
  const token = await AuthSession.refreshAsync({
    clientId,
    refreshToken,
    scopes: ['openid', 'profile', 'offline_access', scope],
  }, discovery);
  await SecureStore.setItemAsync('access_token', token.accessToken!);
  if (token.refreshToken) await SecureStore.setItemAsync('refresh_token', token.refreshToken);
  return token.accessToken;
}

export async function signOutNative() {
  await SecureStore.deleteItemAsync('access_token');
  await SecureStore.deleteItemAsync('refresh_token');
}
```

### 8.2 `src/auth/webAuth.tsx` — **Web** using MSAL

```tsx
import { PublicClientApplication, InteractionType, AccountInfo } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';

const msalConfig = {
  auth: {
    clientId: (window as any).ENV.EXTERNALID_CLIENT_ID,
    authority: (window as any).ENV.WEB_AUTHORITY,
    redirectUri: (window as any).ENV.WEB_REDIRECT_URI,
    postLogoutRedirectUri: (window as any).ENV.WEB_POST_LOGOUT_REDIRECT_URI,
  },
  cache: { cacheLocation: 'sessionStorage', storeAuthStateInCookie: false },
};

export const pca = new PublicClientApplication(msalConfig);

export function WebAuthProvider({ children }: any) {
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
}

export async function acquireWebToken(scope: string) {
  const { accounts } = pca;
  const request = { scopes: ['openid', 'profile', scope], account: accounts[0] as AccountInfo };
  try {
    const res = await pca.acquireTokenSilent(request);
    return res.accessToken;
  } catch {
    const res = await pca.acquireTokenPopup(request);
    return res.accessToken;
  }
}
```

### 8.3 Platform‑switching thin wrapper `src/auth/index.ts`

```ts
import { Platform } from 'react-native';

export async function getAccessToken(scope: string) {
  if (Platform.OS === 'web') {
    const mod = await import('./webAuth');
    return mod.acquireWebToken(scope);
  } else {
    const mod = await import('./nativeAuth');
    const t = await mod.getAccessTokenNative();
    return t || (await mod.refreshAccessTokenNative());
  }
}
```

---

## 9) axios client with token injection — `src/api/http.ts`

```ts
import axios from 'axios';
import { getAccessToken } from '../auth';
import Constants from 'expo-constants';

const API_BASE = (Constants as any).expoConfig?.extra?.API_BASE || 'http://localhost:3000';
const SCOPE = (Constants as any).expoConfig?.extra?.EXTERNALID_API_SCOPE;

export const http = axios.create({ baseURL: API_BASE });

http.interceptors.request.use(async (config) => {
  const token = await getAccessToken(SCOPE);
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

http.interceptors.response.use(
  (r) => r,
  async (error) => {
    if (error?.response?.status === 401) {
      // You could trigger a refresh/interactive login flow here
    }
    return Promise.reject(error);
  }
);
```

---

## 10) Minimal Screens (Expo Router)

### `app/index.tsx`

```tsx
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>External ID Starter</Text>
      <Link href="/me">Go to /me</Link>
    </View>
  );
}
```

### `app/me.tsx`

```tsx
import { Text, View, Button } from 'react-native';
import { http } from '../src/api/http';

export default function Me() {
  async function load() {
    const { data } = await http.get('/api/me');
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <View style={{ gap: 12, padding: 24 }}>
      <Button title="Call /api/me" onPress={load} />
    </View>
  );
}
```

---

## 11) Local Development

**API**

```bash
cd apps/api
pnpm ts-node-dev src/server.ts
```

**Expo**

```bash
cd apps/mobile
pnpm expo start --web
# For native simulators: pnpm expo start --ios / --android
```

**CORS**: Add Expo dev origins (`http://localhost:19006`, `http://localhost:8081`) and your web origin to `ALLOWED_ORIGINS`.

---

## 12) Entra External ID (Customers) Tenant Setup Checklist

1. **Create External ID tenant** (Customers) and note **Tenant ID**.
2. **Register API app**:
   - Expose an API → Add scope: `access_as_user` → `api://<api-app-id>/access_as_user`.
   - Add **App Roles**: `Admin`, `Writer`, `Reader` (allowed member type: Users/Groups). Assign to test user.
3. **Register Public client (RN/Web)**:
   - Add platform **Web** with redirect `http://localhost:8080` (or your dev URL).
   - For **native**, you don’t set msal redirect; Expo uses `externalidstarter://*` via `scheme` and the proxy during dev.
   - Add permissions: **your API** → `access_as_user`. **Grant admin consent**.
4. **User flow / policy** (if using customer user flows): Create `B2C_1_signupsignin` and include `email`, `name` claims.
5. **Find the discovery document** (`.well-known/openid-configuration`) and copy `issuer` and `jwks_uri` into the API `.env`.

> **Do not mix issuers**: if your tokens say `*.ciamlogin.com`, ensure the web/native clients and the API all point to the `ciamlogin.com` authority and issuer.

---

## 13) RBAC & Claims Strategy

- Prefer **App Roles** in External ID (Customers). Tokens include `roles: ["Admin", ...]` when assigned. Fallback to `scp` or custom claims if needed.
- On first login, enrich/normalize roles in your DB (e.g., mirror `roles` → `UserProfile.roles`).

---

## 14) Hardening Notes

- Pin `issuer`, validate `audience` strictly, and cache JWKS (handled by `jose`).
- On native, store tokens in **SecureStore**; on web, use **sessionStorage** (avoid localStorage).
- Rotate API scope audience if you clone environments (dev/test/prod).
- Add rate limiting and structured logging (e.g., pino) before production.

---

## 15) Next Steps (Optional Accelerators)

- Add **/auth/refresh** orchestration for web to mitigate silent token hiccups.
- Build CI/CD: API → Azure App Service; Web → static build via Expo Web or Next.js wrapper; Mobile → EAS Build.
- Hook up Microsoft Graph if required (additional scopes).

---

## 16) Known Trade‑offs & Reality Check

- There is **no official first‑party MSAL for React Native**; `expo-auth-session` is the pragmatic path for native with External ID. For pure native builds without Expo, `react-native-app-auth` or community `react-native-msal` exist but require extra maintenance.
- External ID/B2C issuers and metadata can be **picky**; always copy the `issuer` exactly from your **policy’s** metadata and keep all apps on the same domain (`ciamlogin.com`).

---

### Appendix A — Minimal `README.md`

A ready‑to‑ship README with commands, environment tables, and troubleshooting can be added on request once your tenant IDs and scope names are final.

