# Quick Reference - Add Patient Dialog

## 🚀 How to Use

### Open the Dialog:
1. **Sidebar**: Click blue "Add Patient" button at top
2. **Patients Page**: Click "Add Patient" button in header

### Close the Dialog:
- Click "Complete" (Step 6)
- Click "Cancel" (Step 1)
- Click "Previous" back to Step 1, then "Cancel"
- Press **ESC** key
- Click outside the dialog (on overlay)

## 📋 Quick Steps

1. **Patient Info** ✅ Required
   - Name, DOB, Gender, Phone, Address
   - Emergency Contact

2. **Doctor** ✅ Required
   - Select existing OR add new

3. **Caregiver** ⚪ Optional
   - Select existing OR add new

4. **Medications** ⚪ Optional
   - Select multiple OR add new

5. **Vital Signs** ⚪ Optional
   - BP, HR, Temp, SpO2, Weight, Height

6. **Appointments** ⚪ Optional
   - Add multiple appointments

## 🎨 Dialog Features

- **Size**: Large (1280px max width)
- **Height**: 90% of viewport
- **Scrollable**: Yes
- **Responsive**: Yes
- **Overlay**: Semi-transparent black
- **Animation**: Fade in/out
- **Keyboard**: ESC to close
- **Mouse**: Click outside to close

## 🔧 For Developers

### Component Locations:
```
/components/AddPatientDialog.tsx     ← Dialog wrapper
/components/AddPatientWizard.tsx     ← Wizard steps
/src/App.tsx                         ← State management
/components/Sidebar.tsx              ← Blue button trigger
/components/PatientList.tsx          ← Header button trigger
```

### State Flow:
```typescript
// In App.tsx
const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

// Open dialog
const handleOpenAddPatient = () => setIsAddPatientOpen(true);

// Close dialog (automatic on complete/cancel)
onComplete={() => setIsAddPatientOpen(false)}
onCancel={() => setIsAddPatientOpen(false)}
```

### Import and Use:
```tsx
import { AddPatientDialog } from './components/AddPatientDialog';

<AddPatientDialog 
  open={isAddPatientOpen} 
  onOpenChange={setIsAddPatientOpen} 
/>
```

## 📦 Dependencies

- react-hook-form@7.55.0
- zod
- @hookform/resolvers
- date-fns
- lucide-react
- shadcn/ui (Dialog, Card, Input, etc.)

## ✅ Validation

### Step 1 (Required):
- First Name: min 2 chars
- Last Name: min 2 chars  
- Date of Birth: required
- Gender: male/female/other
- Phone: min 10 digits
- Address: min 5 chars
- Emergency Contact: all required

### Step 2 (Required):
- Must select doctor OR add new doctor

### Steps 3-6:
- All optional, can skip

## 🎯 Common Use Cases

### Quick Add (Minimal):
1. Fill Patient Info (Step 1)
2. Select Doctor (Step 2)
3. Click Next → Next → Next → Complete

### Full Onboarding:
1. Fill all patient information
2. Select/add doctor and caregiver
3. Add all current medications
4. Record initial vital signs
5. Schedule follow-up appointments
6. Complete

### Testing:
1. Open dialog
2. Test form validation (invalid data)
3. Test step navigation
4. Test selection cards
5. Test adding new items
6. Check console output on complete

## 🐛 Troubleshooting

### Dialog won't open:
- Check `isAddPatientOpen` state
- Verify button onClick is bound correctly
- Check console for errors

### Form validation not working:
- Ensure react-hook-form@7.55.0 is installed
- Check Zod schema is correct
- Verify resolver is configured

### Calendar not showing:
- Check date-fns is installed
- Verify Popover component exists
- Check Calendar component is imported

### Data not persisting:
- Normal behavior - dialog resets on close
- Check console.log output on complete
- Future: Add backend integration

## 💡 Tips

- **Use Tab** to navigate between fields
- **Use Enter** to submit inline forms
- **Press ESC** to quickly close dialog
- **Check console** for complete patient data
- **Mobile**: Dialog is fully responsive
- **Testing**: Dialog resets on each open

## 📊 Output Format

On completion, console logs:
```javascript
{
  // From Step 1
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: Date object,
  gender: "male",
  email: "john@example.com",
  phone: "(555) 123-4567",
  address: "123 Main St",
  emergencyContactName: "Jane Doe",
  emergencyContactPhone: "(555) 987-6543",
  emergencyContactRelation: "Daughter",
  
  // From Step 2
  doctor: { id: "d1", name: "Dr. Smith", ... },
  // OR
  doctor: { name: "Dr. New", specialty: "...", ... },
  
  // From Step 3
  caregiver: { id: "c1", ... } or { name: "...", ... },
  
  // From Step 4
  medications: ["med1", "med2", ...],
  
  // From Step 5
  vitalSigns: {
    bloodPressureSystolic: "120",
    bloodPressureDiastolic: "80",
    ...
  },
  
  // From Step 6
  appointments: [
    { date: Date, time: "14:00", type: "Checkup", ... }
  ]
}
```

## 🎨 Styling Customization

### Dialog Size:
```tsx
// In AddPatientDialog.tsx
<DialogContent className="max-w-5xl">  // Change size here
```

### Button Color:
```tsx
// In Sidebar.tsx
className="bg-blue-600 hover:bg-blue-700"  // Change color
```

### Stepper Colors:
```tsx
// In AddPatientWizard.tsx
isCompleted && 'bg-primary border-primary'
isCurrent && 'border-primary text-primary'
```

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Full width, stacked forms
- **Tablet** (768px - 1024px): 2-column grids
- **Desktop** (> 1024px): Full dialog with descriptions

## ⚠️ Important Notes

1. **Data is not saved** - Demo mode only
2. **Check console** for output on complete
3. **Dialog resets** on each open
4. **Requires all Step 1 fields** to proceed
5. **Must select/add doctor** to proceed from Step 2

## 🔗 Related Files

- `/ADD_PATIENT_WIZARD_GUIDE.md` - Full guide
- `/WIZARD_SUMMARY.md` - Technical summary
- `/DIALOG_UPDATE.md` - Dialog conversion details
- `/README.md` - Main project docs

---

**Quick Start**: Click the blue "Add Patient" button in the sidebar! 🎉
