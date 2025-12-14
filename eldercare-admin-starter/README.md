# ElderCare Admin Starter (React Native Web + Expo Router + Gluestack + NativeWind)

This is a **fully client-side** starter kit for an elderly healthcare admin dashboard:

- **Tech stack**
  - Expo + React Native 18
  - **react-native-web** (web target)
  - **expo-router** for routing
  - **@gluestack-ui/themed** + **@gluestack-ui/config**
  - **nativewind** (Tailwind-style classes)
  - **react-native-chart-kit** + **react-native-svg** for charts

- **Features**
  - Dashboard with example charts for vitals and appointment load
  - User profiles page with **CRUD** (mock data) + validation
  - **Add Patient** popup wizard (multi-step) with:
    - Patient Info & Emergency Contact
    - Doctor selector or add-new
    - Caregiver selector or add-new
    - Medications select or add-new
    - Vital-sign template selector or add-new
    - Appointments
  - Validation toggle in the wizard (on/off) for UX testing

> All data is in-memory using simple adapters. No backend or network calls.

---

## 1. Prerequisites

- Node.js LTS
- `npm` or `yarn`
- Expo CLI (via `npx expo` or global install)

---

## 2. Install dependencies

From the project root:

```bash
npm install
# or
yarn
```

If you prefer Expo-managed versions, you can also run:

```bash
npx expo install
```

to align dependencies with your local Expo SDK.

---

## 3. Run the project

```bash
npm run start
# or
yarn start
```

Expo will open the Dev Tools. From there you can:

- Press `w` to launch the web build (React Native Web).
- Press `a` / `i` to run on Android / iOS simulators, if configured.

---

## 4. Project structure

```text
app/
  _layout.tsx      # Shell: Gluestack provider, sidebar, patient wizard, Slot()
  index.tsx        # Dashboard page
  users.tsx        # Users CRUD page

src/
  types/
    models.ts
  data/
    mockUsers.ts
    mockPatients.ts
  adapters/
    userAdapter.ts
    patientAdapter.ts
  context/
    CareDataContext.tsx
  components/
    layout/
      Sidebar.tsx
    dashboard/
      DashboardScreen.tsx
      MetricCard.tsx
    users/
      UsersScreen.tsx
    patients/
      AddPatientWizard.tsx
```

---

## 5. Pages & Navigation

This project uses **expo-router**:

- `/` → Dashboard
- `/users` → User Profiles

Navigation is driven by the left-hand **Sidebar**. The **Add patient** button opens a modal wizard for UX testing.

---

## 6. Data adapters

All data access goes through simple mock adapters in `src/adapters`:

- `userAdapter.ts` manages in-memory user data.
- `patientAdapter.ts` manages in-memory patient data.

These are wrapped by `CareDataContext` which exposes:

- `users`, `patients`, `loading`, `reload`
- `createUser`, `updateUser`, `deleteUser`
- `createPatient`

You can later swap these implementations for real API calls without touching the UI layer.

---

## 7. Styling

- Layout containers use **NativeWind** `className` utilities (Tailwind-style classes).
- Gluestack components handle forms, buttons, modals, inputs, and layout primitives.

Tailwind / NativeWind config is defined in `tailwind.config.js` with `nativewind/preset`.

---

## 8. Charts

The dashboard uses **react-native-chart-kit** for:

- Line chart: mock average systolic blood pressure (7 days).
- Bar chart: mock appointment load by weekday.

Both charts render on web via `react-native-svg`.

---

## 9. Next steps

- Replace mock adapters with real REST / GraphQL / FHIR calls.
- Add auth and role-based access (Admin/Doctor/Caregiver) if needed.
- Extend the patient wizard into a full patient detail workflow (timeline, vitals history, care plans).
