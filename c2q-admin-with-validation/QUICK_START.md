# Quick Start Guide

## Step-by-Step Installation

### 1. Install Node.js
Make sure you have Node.js 18 or higher installed:
```bash
node --version
```

### 2. Create Project Directory
```bash
mkdir eldercare-dashboard
cd eldercare-dashboard
```

### 3. Initialize npm (if package.json doesn't exist)
```bash
npm init -y
```

### 4. Copy all files from the project into your directory

Your directory structure should look like:
```
eldercare-dashboard/
├── src/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── ...
```

### 5. Install Dependencies
```bash
npm install
```

This will install all dependencies listed in package.json:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- lucide-react (icons)
- recharts (charts)
- react-hook-form (forms)
- zod (validation)
- All shadcn/ui components (Radix UI)

### 6. Start Development Server
```bash
npm run dev
```

### 7. Open in Browser
Navigate to: `http://localhost:5173`

## What You'll See

The dashboard will load with:
- Left sidebar navigation
- Top header with alerts
- Dashboard overview (default view)

### Navigation

Click through the sidebar menu items:
1. **Dashboard** - Overview with statistics
2. **Patients** - Patient list and management
3. **Appointments** - Calendar view
4. **Medications** - Medication tracking
5. **Vitals** - Vital signs monitoring
6. **Care Team** - Staff directory
7. **Reports** - Analytics with charts
8. **Settings** - User management (NEW!)

## Testing User Management

1. Click **Settings** in the sidebar
2. Click the **User Management** tab
3. Try these features:
   - **Add User**: Click "Add New User" button
   - **Edit User**: Click edit icon on any user
   - **Delete User**: Click trash icon (with confirmation)
   - **View Stats**: See total users, active, doctors, nurses

### Test Form Validation

Try submitting invalid data to see validation in action:
- Empty fields → "Required" error
- Invalid email → "Invalid email address"
- Wrong phone format → Format error
- Short names → "Must be at least 2 characters"

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use
If port 5173 is taken:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run build
```
Check the terminal for specific error messages.

### Styling Issues
Make sure `styles/globals.css` is imported in `main.tsx`:
```tsx
import './styles/globals.css';
```

## Environment Setup (Optional)

Create `.env` file for environment variables:
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=ElderCare Dashboard
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## Next Steps

### Connect to Backend
To connect a real backend:

1. **Install Axios or Fetch client**
```bash
npm install axios
```

2. **Create API service**
```typescript
// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPatients = () => api.get('/patients');
export const createPatient = (data) => api.post('/patients', data);
// ... etc
```

3. **Update components to use API**
Replace mock data imports with API calls.

### Supabase Integration
For rapid backend setup:

1. Create Supabase project at https://supabase.com
2. Install Supabase client:
```bash
npm install @supabase/supabase-js
```

3. Create Supabase client:
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
```

## Important Notes

⚠️ **This is a demo application with mock data**

For production:
- Implement authentication (JWT, OAuth, etc.)
- Connect to a real database
- Add proper error handling
- Implement HIPAA compliance for healthcare data
- Add audit logging
- Use HTTPS only
- Implement rate limiting
- Add data encryption

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Recharts](https://recharts.org)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for build errors
3. Verify all files are in the correct locations
4. Ensure all dependencies are installed
5. Try clearing node_modules and reinstalling

Enjoy building with ElderCare Dashboard! 🏥
