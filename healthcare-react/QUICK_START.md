# Quick Start Guide

## Running Locally (3 Simple Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Fix Imports
```bash
node fix-imports.js
```

### Step 3: Run the App
```bash
npm run dev
```

That's it! Your healthcare dashboard should now be running at http://localhost:5173

---

## What the fix-imports script does

The Figma Make environment uses versioned imports like:
```typescript
import { Button } from "lucide-react@0.487.0"
```

Standard npm/Vite projects need:
```typescript
import { Button } from "lucide-react"
```

The `fix-imports.js` script automatically removes all version numbers (`@x.x.x`) from your imports.

---

## Troubleshooting

**Problem:** Still getting import errors after running the script?
**Solution:** 
1. Clear your terminal/console
2. Stop the dev server (Ctrl+C)
3. Run `node fix-imports.js` again
4. Run `npm run dev` again

**Problem:** "Module not found" errors?
**Solution:** Run `npm install` to ensure all packages are installed

---

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
