# Healthcare Dashboard - Local Deployment Guide

This guide will help you run the ElderCare healthcare management dashboard locally on your machine.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

Run the following command to install all required packages:

```bash
npm install react react-dom react-hook-form @hookform/resolvers zod lucide-react recharts react-day-picker embla-carousel-react class-variance-authority date-fns @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
```

Or if you prefer yarn:

```bash
yarn add react react-dom react-hook-form @hookform/resolvers zod lucide-react recharts react-day-picker embla-carousel-react class-variance-authority date-fns @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip
```

### 2. Fix Import Statements

The code was originally designed for Figma Make which uses versioned imports. For local development, you need to **remove version numbers from all imports**.

**EASIEST METHOD - Run the automated script:**

Choose one based on your operating system:

**Option A: Node.js (Cross-platform - RECOMMENDED)**
```bash
node fix-imports.js
```

**Option B: PowerShell (Windows)**
```powershell
.\fix-imports.ps1
```

**Option C: Bash (Mac/Linux/Git Bash)**
```bash
bash fix-imports.sh
```

These scripts will automatically remove all version numbers from imports in your entire project.

**Alternative: Manual Find & Replace in Code Editor:**

**Files already fixed:**
- ✅ `/components/Settings.tsx`
- ✅ `/components/AddPatientWizard.tsx`
- ✅ `/components/ui/form.tsx`

**Files that still need updating:**

You need to update all remaining UI component files in `/components/ui/` directory. Use this pattern:

**BEFORE (Figma Make syntax):**
```typescript
import { ChevronLeft } from "lucide-react@0.487.0";
import * as AccordionPrimitive from "@radix-ui/react-accordion@1.2.3";
```

**AFTER (Standard npm syntax):**
```typescript
import { ChevronLeft } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
```

### 3. Automated Fix (Recommended)

Use find-and-replace in your code editor to fix all imports at once:

**Find:** `@\d+\.\d+\.\d+"`
**Replace:** `"`
**Options:** Enable "Regular Expression" mode

This will remove all version numbers like `@1.2.3` from import statements.

### 4. Manual Fix for Each UI Component

Alternatively, manually update these files in `/components/ui/`:

- `accordion.tsx` - Remove `@1.2.3` and `@0.487.0`
- `alert-dialog.tsx` - Remove `@1.1.6`
- `alert.tsx` - Remove `@0.7.1`
- `aspect-ratio.tsx` - Remove `@1.1.2`
- `avatar.tsx` - Remove `@1.1.3`
- `badge.tsx` - Remove `@1.1.2` and `@0.7.1`
- `breadcrumb.tsx` - Remove `@1.1.2` and `@0.487.0`
- `button.tsx` - Remove `@1.1.2` and `@0.7.1`
- `calendar.tsx` - Remove `@0.487.0` and `@8.10.1`
- `carousel.tsx` - Remove `@8.6.0` and `@0.487.0`
- `chart.tsx` - Remove `@2.15.2`
- `checkbox.tsx` - Remove `@1.1.4` and `@0.487.0`
- `collapsible.tsx` - Remove `@1.1.3`
- And all other files in the `/components/ui/` directory

### 5. Start the Development Server

After installing dependencies and fixing imports:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application should now be running at `http://localhost:5173` (or another port if specified).

## Common Issues

### Issue: "Failed to resolve import"
**Solution:** Make sure you've removed ALL version numbers from imports and installed all dependencies.

### Issue: Module not found
**Solution:** Run `npm install` again to ensure all packages are installed.

### Issue: Type errors
**Solution:** Make sure you have TypeScript installed: `npm install -D typescript @types/react @types/react-dom`

## Project Structure

```
/
├── components/
│   ├── ui/              # ShadCN UI components
│   ├── Settings.tsx     # Settings & user management
│   ├── AddPatientWizard.tsx  # Patient onboarding wizard
│   ├── Sidebar.tsx      # Collapsible sidebar
│   └── ...              # Other components
├── lib/
│   ├── mockData.ts      # Mock data for development
│   └── utils.ts         # Utility functions
├── styles/
│   └── globals.css      # Global styles
└── App.tsx              # Main application
```

## Features

- ✅ Dashboard with real-time statistics
- ✅ Patient management (CRUD operations)
- ✅ Appointment scheduling with calendar
- ✅ Medication tracking
- ✅ Vital signs monitoring
- ✅ Care team management
- ✅ Reports and analytics
- ✅ 6-step patient onboarding wizard
- ✅ Form validation with Zod
- ✅ Collapsible sidebar
- ✅ Responsive design

## Notes

- This is a **frontend-only** application with mock data
- All data is stored in component state and will reset on page refresh
- For production use, connect to a real backend API
- The application uses Tailwind CSS v4.0

## Support

If you encounter any issues, check:
1. All imports have version numbers removed
2. All npm packages are installed
3. Node.js version is 18 or higher
4. No conflicting package versions

Enjoy using the ElderCare Healthcare Management Dashboard!