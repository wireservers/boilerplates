# Installation Instructions

## Prerequisites

Before you begin, ensure you have:
- **Node.js** version 18.0 or higher
- **npm** version 9.0 or higher (comes with Node.js)

Check your versions:
```bash
node --version
npm --version
```

If you need to install/update Node.js, visit: https://nodejs.org/

## Complete Installation Steps

### Step 1: Verify Project Structure

Your project should have this structure:

```
eldercare-dashboard/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   └── styles/
│       └── globals.css
├── components/
│   ├── DashboardOverview.tsx
│   ├── PatientList.tsx
│   ├── PatientDetails.tsx
│   ├── AppointmentCalendar.tsx
│   ├── MedicationManager.tsx
│   ├── VitalsMonitor.tsx
│   ├── CareTeam.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   ├── ui/
│   │   └── (42+ UI component files)
│   └── figma/
│       └── ImageWithFallback.tsx
├── lib/
│   ├── mockData.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── postcss.config.js
├── index.html
├── .eslintrc.cjs
└── .gitignore
```

### Step 2: Install All Dependencies

Open your terminal in the project root directory and run:

```bash
npm install
```

This will install **60+ packages** including:
- React & React DOM
- TypeScript
- Vite (build tool)
- Tailwind CSS v4
- lucide-react (icons)
- recharts (charts)
- react-hook-form (forms)
- zod (validation)
- All Radix UI components (shadcn/ui)

**Expected install time:** 2-5 minutes depending on your internet speed.

### Step 3: Verify Installation

Check that `node_modules` folder was created:
```bash
ls -la node_modules
```

You should see hundreds of folders.

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 5: Open in Browser

Open your web browser and navigate to:
```
http://localhost:5173
```

You should see the ElderCare Admin Dashboard!

## Verification Checklist

After installation, verify these work:

### ✅ Navigation
- [ ] Click through all sidebar menu items
- [ ] Dashboard loads
- [ ] Patients page loads
- [ ] Appointments page loads
- [ ] Medications page loads
- [ ] Vitals page loads
- [ ] Care Team page loads
- [ ] Reports page loads (with charts)
- [ ] Settings page loads (NEW!)

### ✅ Settings Page Features
- [ ] Profile tab visible
- [ ] User Management tab visible
- [ ] Can open "Add New User" form
- [ ] Form validation shows errors for invalid data
- [ ] Can edit existing users
- [ ] Statistics show correct numbers

### ✅ Reports Page Charts
- [ ] Pie chart displays
- [ ] Bar charts display
- [ ] Line charts display
- [ ] Tooltips work on hover

## Common Issues & Solutions

### Issue 1: Port 5173 Already In Use
```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue 2: Module Not Found Errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: "Cannot find module 'react-hook-form@7.55.0'"
```bash
# Install specific version
npm install react-hook-form@7.55.0
```

### Issue 4: TypeScript Errors
```bash
# Check the build
npm run build
```
Read the error messages carefully - they usually point to the exact problem.

### Issue 5: Tailwind Styles Not Working
Verify these:
1. `src/styles/globals.css` exists
2. It's imported in `src/main.tsx`
3. `postcss.config.js` exists

### Issue 6: Charts Not Displaying
```bash
# Ensure recharts is installed
npm install recharts
```

### Issue 7: Form Validation Not Working
```bash
# Ensure validation packages are installed
npm install react-hook-form@7.55.0 zod @hookform/resolvers
```

## Alternative Installation Methods

### Using Yarn
```bash
yarn install
yarn dev
```

### Using pnpm
```bash
pnpm install
pnpm dev
```

## Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables (Optional)

Create a `.env` file in the project root (optional):

```env
VITE_APP_NAME="ElderCare Dashboard"
VITE_API_URL="http://localhost:3000"
```

Access in code:
```typescript
const appName = import.meta.env.VITE_APP_NAME;
```

## Installing Additional Packages

If you need to add more packages later:

```bash
# Regular dependencies
npm install package-name

# Development dependencies
npm install -D package-name
```

## Updating Packages

To update all packages to their latest versions:

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

## Script Commands

Available npm scripts:

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## IDE Setup (Recommended)

### VS Code Extensions
Install these extensions for the best experience:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - Tailwind autocomplete
4. **TypeScript and JavaScript Language Features** - Built-in

### VS Code Settings
Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Performance Tips

### Faster npm installs
```bash
# Use npm cache
npm config set cache ~/.npm

# Or use pnpm (faster alternative)
npm install -g pnpm
pnpm install
```

### Faster development server
The first load is slow, but hot reload is instant after that.

## Next Steps After Installation

Once everything is running:

1. **Explore the Dashboard** - Click through all pages
2. **Test User Management** - Go to Settings > User Management
3. **Test Form Validation** - Try submitting invalid data
4. **View Charts** - Go to Reports page
5. **Read Documentation** - Check README.md

## Getting Help

If you're stuck:

1. Check browser console for errors (F12)
2. Check terminal for build errors
3. Review this installation guide
4. Check `/QUICK_START.md`
5. Check `/PROJECT_CHECKLIST.md`
6. Review `/README.md`

## Success! 🎉

If you see the dashboard in your browser, you're all set!

The application is now running with:
- ✅ All components loaded
- ✅ Charts working (recharts)
- ✅ Forms with validation
- ✅ User CRUD operations
- ✅ Mock data populated
- ✅ Responsive design

Happy coding! 🚀
