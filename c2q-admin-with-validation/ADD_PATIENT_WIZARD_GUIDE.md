# Patient Onboarding Wizard - Complete Guide

## Overview

The Patient Onboarding Wizard is a comprehensive 6-step dialog-based form system for adding new patients to the healthcare management dashboard. It guides administrators through collecting all necessary patient information, assigning healthcare providers, setting up medication schedules, recording initial vital signs, and scheduling appointments.

## Architecture

### Components

1. **AddPatientDialog.tsx** - Dialog wrapper component that manages the open/close state
2. **AddPatientWizard.tsx** - Main wizard component with all 6 steps and navigation logic

### Integration Points

The wizard can be triggered from multiple locations:
- **Sidebar Menu**: "Add Patient" button in the main navigation
- **Patients Page**: "Add New Patient" button in the PatientList component

## Wizard Steps

### Step 1: Patient Information & Emergency Contact

**Purpose**: Collect basic patient demographics and emergency contact details

**Fields**:
- First Name* (required)
- Last Name* (required)
- Date of Birth* (required, with calendar picker)
- Gender* (required, select: Male/Female/Other)
- Phone Number* (required, formatted)
- Email* (required, email validation)
- Address* (required)
- Medical History (optional, textarea)
- Current Conditions (optional, textarea)

**Emergency Contact Section**:
- Emergency Contact Name* (required)
- Emergency Contact Phone* (required)
- Emergency Contact Relationship* (required)

**Validation**:
- All required fields must be filled
- Email must be valid format
- Date of birth must be in the past
- Phone numbers must be valid format

**UI Features**:
- Calendar popup for date selection
- Dropdown select for gender
- Large textarea for medical history
- Separate card for emergency contact info
- Real-time validation feedback

---

### Step 2: Assign Doctor

**Purpose**: Assign a primary care physician to the patient

**Options**:
1. **Select Existing Doctor**: Choose from a dropdown of all doctors in the system
2. **Add New Doctor**: Fill out inline form to create a new doctor

**Existing Doctor Fields**:
- Doctor dropdown with search functionality
- Shows doctor name and specialization

**New Doctor Form**:
- Full Name* (required)
- Specialization* (required)
- Phone* (required)
- Email* (required)
- License Number (optional)
- Years of Experience (optional, number input)

**Validation**:
- Must either select an existing doctor OR complete all required fields for new doctor
- Cannot proceed without a doctor assigned
- Email validation for new doctor
- Phone number validation

**UI Features**:
- Toggle between "Select Existing" and "Add New" modes
- Searchable dropdown for existing doctors
- Inline form that expands when "Add New" is selected
- Visual feedback showing selected/created doctor

---

### Step 3: Assign Caregiver

**Purpose**: Assign a primary caregiver to the patient

**Options**:
1. **Select Existing Caregiver**: Choose from a dropdown of all caregivers
2. **Add New Caregiver**: Fill out inline form to create a new caregiver

**Existing Caregiver Fields**:
- Caregiver dropdown with search functionality
- Shows caregiver name and role

**New Caregiver Form**:
- Full Name* (required)
- Role* (required, select: Primary Caregiver/Family Member/Professional Caregiver/Nurse/Other)
- Phone* (required)
- Email* (required)
- Availability (optional, textarea for schedule notes)
- Relationship to Patient (optional)

**Validation**:
- Must either select an existing caregiver OR complete all required fields for new caregiver
- Cannot proceed without a caregiver assigned
- Email and phone validation for new caregiver

**UI Features**:
- Similar toggle interface as doctor selection
- Searchable dropdown for existing caregivers
- Role selection dropdown
- Expandable form for new caregiver creation

---

### Step 4: Medications

**Purpose**: Set up initial medication schedule for the patient

**Options**:
1. **Select Existing Medications**: Multi-select from medication database
2. **Add New Medication**: Create custom medications inline

**Select Existing**:
- Searchable multi-select dropdown
- Shows medication name and dosage
- Can select multiple medications at once
- Selected medications appear as removable badges

**Add New Medication Form**:
- Medication Name* (required)
- Dosage* (required, e.g., "500mg")
- Frequency* (required, select: Once daily/Twice daily/Three times daily/Four times daily/As needed)
- Instructions (optional, textarea for special instructions)
- Start Date (optional, defaults to today)
- Prescribing Doctor (optional, auto-populated if available)

**Validation**:
- At least one medication must be selected or added
- All required fields for new medications must be completed
- Dosage must include units (e.g., mg, mL)

**UI Features**:
- Dual interface: selection list + add new form
- Badge display for selected medications
- Ability to remove selected medications
- Multiple new medications can be added
- List view showing all added/selected medications

---

### Step 5: Initial Vital Signs

**Purpose**: Record the patient's initial vital signs readings

**Fields**:
- Blood Pressure Systolic* (required, number, mmHg)
- Blood Pressure Diastolic* (required, number, mmHg)
- Heart Rate* (required, number, bpm)
- Temperature* (required, number, °F)
- Respiratory Rate (optional, number, breaths/min)
- Oxygen Saturation (SpO2) (optional, number, %)
- Blood Glucose (optional, number, mg/dL)
- Weight (optional, number, lbs)
- Height (optional, number, inches)
- Notes (optional, textarea for observations)

**Validation**:
- Blood pressure, heart rate, and temperature are required
- Values must be within realistic ranges:
  - Systolic: 60-250 mmHg
  - Diastolic: 40-150 mmHg
  - Heart Rate: 30-200 bpm
  - Temperature: 95-105°F
  - SpO2: 0-100%
  - Respiratory Rate: 8-40 breaths/min

**UI Features**:
- Number inputs with unit labels
- Grouped related vitals (BP together, etc.)
- Input validation with range warnings
- Optional fields clearly marked
- Visual grouping of vital signs by category

---

### Step 6: Schedule Appointments

**Purpose**: Schedule initial appointments for the patient

**Options**:
1. **Select from Available Appointments**: Choose from pre-defined appointment slots
2. **Create New Appointment**: Schedule custom appointments

**New Appointment Form**:
- Appointment Type* (required, select: Check-up/Follow-up/Consultation/Emergency/Specialist Visit/Lab Work)
- Doctor* (required, dropdown of doctors - auto-populated with assigned doctor)
- Date* (required, calendar picker)
- Time* (required, time picker)
- Duration (optional, default 30 minutes)
- Location (optional, e.g., "Main Office, Room 203")
- Reason for Visit (optional, textarea)
- Notes (optional, textarea)

**Validation**:
- At least one appointment should be scheduled (recommended, not strictly required)
- All required fields for new appointments must be completed
- Appointment date must be in the future
- Cannot double-book doctors at the same time slot

**UI Features**:
- Calendar picker with date restrictions (no past dates)
- Time picker with common time slots
- Doctor dropdown pre-filled with assigned doctor
- Appointment type dropdown
- List view showing all scheduled appointments
- Ability to add multiple appointments
- Can remove appointments before submission

---

## Wizard Navigation

### Progress Indicator

- Visual progress bar at the top of the wizard
- Shows current step and total steps (1/6, 2/6, etc.)
- Step numbers and titles displayed
- Completed steps highlighted
- Current step emphasized

### Navigation Buttons

**Previous Button**:
- Disabled on Step 1
- Returns to previous step without validation
- Data is preserved when going back

**Next Button**:
- Validates current step before proceeding
- Shows loading state during validation
- Displays error messages if validation fails
- Changes to "Submit" on final step

**Cancel Button**:
- Available on all steps
- Confirms cancellation (data will be lost)
- Closes wizard and resets all data

**Submit Button** (Step 6 only):
- Final button to complete wizard
- Validates all data one final time
- Shows success message
- Closes wizard and refreshes patient list
- Resets form for next use

### Smart Navigation Features

1. **Validation Blocking**: Cannot proceed to next step until current step passes validation
2. **Data Persistence**: All entered data is maintained when navigating between steps
3. **Auto-save**: Data is stored in component state throughout the process
4. **Error Recovery**: Validation errors are displayed inline with helpful messages
5. **Keyboard Support**: Enter key advances to next step (if valid), Escape closes wizard

---

## Form Validation

### Technology

- **react-hook-form v7.55.0**: Form state management
- **Zod**: Schema validation
- Real-time validation on blur
- Form-level validation on submit

### Validation Schemas

Each step has its own Zod schema:

```typescript
Step 1: patientInfoSchema
Step 2: doctorAssignmentSchema
Step 3: caregiverAssignmentSchema
Step 4: medicationsSchema
Step 5: vitalSignsSchema
Step 6: appointmentsSchema
```

### Error Handling

- Field-level errors appear below each input
- Form-level errors appear at the top of the step
- Errors are cleared as user corrects input
- Required fields marked with red asterisk (*)
- Error messages are descriptive and actionable

---

## Dialog Implementation

### Design Specifications

- **Size**: Large (max-width: 900px)
- **Height**: Max 90vh with scrollable content
- **Animation**: Smooth slide-in from bottom on mobile, fade-in on desktop
- **Overlay**: Semi-transparent backdrop with blur effect
- **Close Methods**: 
  - X button in top-right corner
  - Cancel button
  - Escape key
  - Click outside (with confirmation)

### Accessibility

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management (focus trapped in dialog)
- Screen reader friendly
- All React forwardRef warnings resolved
- Proper dialog title and description

### Responsive Design

- **Desktop**: Full-width dialog with side padding
- **Tablet**: Adjusted padding and font sizes
- **Mobile**: 
  - Full-width with minimal padding
  - Stacked layouts for forms
  - Touch-friendly button sizes
  - Scrollable content area

---

## Data Flow

### On Wizard Open

1. Dialog state set to `open`
2. Wizard initializes at Step 1
3. Form state reset to defaults
4. Mock data loaded (doctors, caregivers, medications)

### During Navigation

1. User fills out current step
2. Clicks "Next" button
3. react-hook-form validates current step
4. If valid: advance to next step, preserve data
5. If invalid: show errors, stay on current step

### On Submission

1. User completes Step 6 and clicks "Submit"
2. Final validation runs on all steps
3. Data compiled into complete patient object
4. Mock API call simulated (success message)
5. Patient added to mock data store
6. Success toast notification displayed
7. Wizard closes and resets
8. Patient list refreshes to show new patient

### On Cancel/Close

1. Confirmation dialog appears (if data entered)
2. User confirms cancellation
3. All form data cleared
4. Dialog closes
5. Wizard resets to Step 1

---

## State Management

### Wizard State

```typescript
- currentStep: number (1-6)
- isLoading: boolean
- selectedDoctor: Doctor | null
- newDoctor: DoctorFormData | null
- selectedCaregiver: Caregiver | null
- newCaregiver: CaregiverFormData | null
- selectedMedications: Medication[]
- newMedications: MedicationFormData[]
- vitalSigns: VitalSignsData
- appointments: AppointmentFormData[]
```

### Form State (per step)

Managed by react-hook-form:
- Field values
- Field errors
- Touched state
- Dirty state
- Form validity

---

## Integration with Main Application

### Triggering the Wizard

```typescript
// From Sidebar
<AddPatientDialog>
  <Button>Add Patient</Button>
</AddPatientDialog>

// From Patients Page
<AddPatientDialog>
  <Button>Add New Patient</Button>
</AddPatientDialog>
```

### Data Updates

After successful submission:
1. New patient added to `mockPatients` array
2. New doctor added to `mockDoctors` if created
3. New caregiver added to `mockCaregivers` if created
4. New medications added to `mockMedications` if created
5. Initial vital signs recorded
6. Appointments created in `mockAppointments`
7. Activity log entry created

### UI Updates

- Patient list auto-refreshes
- Success toast appears
- Dashboard stats update
- Recent activity feed updates

---

## Code Structure

### AddPatientDialog.tsx

```typescript
- Manages dialog open/close state
- Wraps wizard in Dialog component
- Handles dialog accessibility
- Provides trigger button
```

### AddPatientWizard.tsx

```typescript
- Main wizard logic
- 6 step components
- Navigation handlers
- Form validation
- Data submission
- State management
```

### Key Functions

- `handleNext()`: Validate and advance to next step
- `handlePrevious()`: Return to previous step
- `handleSubmit()`: Process final submission
- `resetWizard()`: Clear all data and return to Step 1
- `validateStep()`: Run validation for current step

---

## Best Practices

### For Developers

1. Always validate on both client and server (when connected to backend)
2. Preserve user data when navigating between steps
3. Provide clear error messages
4. Use loading states for better UX
5. Test all validation scenarios
6. Ensure accessibility compliance
7. Test on multiple screen sizes

### For Users

1. Complete all required fields (marked with *)
2. Double-check entered information before submitting
3. Use the back button to review previous steps
4. Save partial progress by reviewing before submission
5. Contact support if validation errors are unclear

---

## Future Enhancements

### Planned Features

1. **Draft Saving**: Save partially completed wizards as drafts
2. **Photo Upload**: Add patient photo in Step 1
3. **Document Attachments**: Attach medical records, insurance cards
4. **Bulk Import**: Import multiple patients from CSV
5. **Template Presets**: Quick-fill common patient types
6. **Smart Suggestions**: AI-powered field suggestions
7. **Validation Enhancement**: Real-time duplicate detection
8. **Appointment Availability**: Show doctor's available time slots
9. **Medication Interactions**: Check for drug interactions
10. **Insurance Verification**: Verify insurance in real-time

### Technical Improvements

1. Backend API integration
2. Real-time validation with debouncing
3. Optimistic updates for better performance
4. Undo/redo functionality
5. Auto-save every N seconds
6. Offline support with sync
7. Multi-language support
8. Custom validation rules per organization
9. Audit trail for all changes
10. Advanced error recovery

---

## Troubleshooting

### Common Issues

**Issue**: Form doesn't advance to next step
- **Solution**: Check that all required fields are filled correctly
- **Cause**: Validation is failing on current step

**Issue**: Data lost when closing wizard
- **Solution**: This is expected behavior - use the full wizard flow
- **Future**: Draft saving feature will address this

**Issue**: Doctor/Caregiver dropdown is empty
- **Solution**: Check that mock data is loaded properly
- **Cause**: Data initialization issue

**Issue**: Calendar picker not working
- **Solution**: Click the calendar icon, not just the input field
- **Cause**: Component requires explicit trigger

**Issue**: Validation errors not clearing
- **Solution**: Correct the field value and blur the input
- **Cause**: Validation runs on blur or submit

---

## Testing Checklist

- [ ] Can open wizard from sidebar
- [ ] Can open wizard from patients page
- [ ] Can complete all 6 steps successfully
- [ ] Can navigate backwards without losing data
- [ ] Validation prevents advancement with invalid data
- [ ] Can add new doctor inline
- [ ] Can add new caregiver inline
- [ ] Can add multiple medications
- [ ] Can schedule multiple appointments
- [ ] Cancel button works and confirms
- [ ] X button closes dialog
- [ ] Escape key closes dialog
- [ ] Form resets after submission
- [ ] Success message appears
- [ ] New patient appears in patient list
- [ ] Works on mobile devices
- [ ] Keyboard navigation works
- [ ] Screen reader accessible

---

**Last Updated**: November 15, 2025
**Component Version**: 2.0 (Dialog-based)
**Status**: Production Ready
