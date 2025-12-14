import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Switch } from './ui/switch';
import { mockDoctors, mockCaregivers, mockMedications } from '../lib/mockData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  User, 
  Stethoscope, 
  Heart, 
  Pill, 
  Activity, 
  CalendarIcon,
  Plus,
  Search,
  X,
  ShieldAlert
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import React from 'react';

// Step definitions
const steps = [
  { id: 1, name: 'Patient Info', icon: User, description: 'Basic information & emergency contact' },
  { id: 2, name: 'Doctor', icon: Stethoscope, description: 'Select or add primary doctor' },
  { id: 3, name: 'Caregiver', icon: Heart, description: 'Select or add caregiver' },
  { id: 4, name: 'Medications', icon: Pill, description: 'Add medications' },
  { id: 5, name: 'Vital Signs', icon: Activity, description: 'Initial vital signs' },
  { id: 6, name: 'Appointments', icon: CalendarIcon, description: 'Schedule appointments' },
];

// Validation schemas for each step
const patientInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(10, 'Emergency contact phone is required'),
  emergencyContactRelation: z.string().min(2, 'Relationship is required'),
});

interface PatientWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function AddPatientWizard({ onComplete, onCancel }: PatientWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [patientData, setPatientData] = useState<any>({});
  const [validationEnabled, setValidationEnabled] = useState(true);
  
  // Step-specific states
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', phone: '', email: '' });
  
  const [selectedCaregiver, setSelectedCaregiver] = useState<string | null>(null);
  const [showCaregiverForm, setShowCaregiverForm] = useState(false);
  const [newCaregiver, setNewCaregiver] = useState({ name: '', relationship: '', phone: '', email: '' });
  
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [newMedications, setNewMedications] = useState<any[]>([]);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', instructions: '' });
  
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    temperature: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
  });
  
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ 
    date: undefined as Date | undefined, 
    time: '', 
    type: '', 
    notes: '' 
  });

  const form = useForm({
    resolver: zodResolver(patientInfoSchema),
    mode: 'onChange',
  });

  const handleNext = async () => {
    // Skip validation if disabled
    if (!validationEnabled) {
      if (currentStep === 1) {
        const formData = form.getValues();
        setPatientData({ ...patientData, ...formData });
      }
      
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
      return;
    }

    // Normal validation flow when enabled
    if (currentStep === 1) {
      const isValid = await form.trigger();
      if (!isValid) return;
      
      const formData = form.getValues();
      setPatientData({ ...patientData, ...formData });
    }
    
    if (currentStep === 2 && !selectedDoctor && !newDoctor.name) {
      alert('Please select or add a doctor');
      return;
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const completePatientData = {
      ...patientData,
      doctor: selectedDoctor || newDoctor,
      caregiver: selectedCaregiver || newCaregiver,
      medications: [...selectedMedications, ...newMedications],
      vitalSigns,
      appointments,
    };
    
    console.log('Complete Patient Data:', completePatientData);
    alert('Patient added successfully! Check console for details.');
    onComplete();
  };

  const addNewMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      setNewMedications([...newMedications, { ...newMedication, id: Date.now().toString() }]);
      setNewMedication({ name: '', dosage: '', frequency: '', instructions: '' });
      setShowMedicationForm(false);
    }
  };

  const addNewAppointment = () => {
    if (newAppointment.date && newAppointment.time && newAppointment.type) {
      setAppointments([...appointments, { ...newAppointment, id: Date.now().toString() }]);
      setNewAppointment({ date: undefined, time: '', type: '', notes: '' });
      setShowAppointmentForm(false);
    }
  };

  const removeAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2>Add New Patient</h2>
          <p className="text-muted-foreground mt-1">
            Complete all steps to onboard a new patient
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-2">
            <Label htmlFor="validation-toggle" className="cursor-pointer">
              Validation
            </Label>
            <Switch
              id="validation-toggle"
              checked={validationEnabled}
              onCheckedChange={setValidationEnabled}
            />
          </div>
          {!validationEnabled && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              Validation OFF
            </Badge>
          )}
        </div>
      </div>

      {/* Stepper */}
      <div className="mb-6">
        <div className="flex items-start">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 shrink-0 cursor-pointer',
                      isCompleted && 'bg-primary border-primary text-primary-foreground shadow-lg hover:shadow-xl',
                      isCurrent && 'border-primary text-primary bg-primary/10 ring-4 ring-primary/20 scale-110',
                      !isCompleted && !isCurrent && 'border-gray-300 text-gray-400 bg-white hover:border-gray-400'
                    )}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="text-center mt-3 min-w-[90px]">
                    <div className={cn(
                      'text-sm whitespace-nowrap transition-all cursor-pointer',
                      isCurrent && 'font-semibold text-primary',
                      isCompleted && 'font-medium',
                      !isCompleted && !isCurrent && 'text-muted-foreground'
                    )}
                    onClick={() => setCurrentStep(step.id)}
                    >
                      {step.name}
                    </div>
                    <div className={cn(
                      'text-xs text-muted-foreground hidden md:block whitespace-nowrap',
                      isCurrent && 'text-primary/70 font-medium'
                    )}>
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex items-center" style={{ marginTop: '28px' }}>
                    <div
                      className={cn(
                        'h-1 w-full transition-all duration-500 rounded-full',
                        isCompleted ? 'bg-primary shadow-sm' : 'bg-gray-200'
                      )}
                      style={{ minWidth: '40px' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Patient Info */}
          {currentStep === 1 && (
            <form className="space-y-6">
              <div>
                <h3 className="mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...form.register('firstName')}
                      placeholder="John"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...form.register('lastName')}
                      placeholder="Doe"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Date of Birth *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left',
                            !form.watch('dateOfBirth') && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch('dateOfBirth') ? (
                            format(form.watch('dateOfBirth'), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch('dateOfBirth')}
                          onSelect={(date) => form.setValue('dateOfBirth', date as Date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Gender *</Label>
                    <RadioGroup
                      value={form.watch('gender')}
                      onValueChange={(value) => form.setValue('gender', value as any)}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                    {form.formState.errors.gender && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.gender.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      placeholder="john.doe@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      {...form.register('phone')}
                      placeholder="(555) 123-4567"
                    />
                    {form.formState.errors.phone && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      {...form.register('address')}
                      placeholder="123 Main St, City, State, ZIP"
                      rows={2}
                    />
                    {form.formState.errors.address && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContactName">Contact Name *</Label>
                    <Input
                      id="emergencyContactName"
                      {...form.register('emergencyContactName')}
                      placeholder="Jane Doe"
                    />
                    {form.formState.errors.emergencyContactName && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.emergencyContactName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                    <Input
                      id="emergencyContactPhone"
                      {...form.register('emergencyContactPhone')}
                      placeholder="(555) 987-6543"
                    />
                    {form.formState.errors.emergencyContactPhone && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.emergencyContactPhone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                    <Input
                      id="emergencyContactRelation"
                      {...form.register('emergencyContactRelation')}
                      placeholder="Daughter"
                    />
                    {form.formState.errors.emergencyContactRelation && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.emergencyContactRelation.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Step 2: Doctor */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Select Primary Doctor</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {mockDoctors.map((doctor) => (
                    <Card
                      key={doctor.id}
                      className={cn(
                        'cursor-pointer transition-all hover:border-primary',
                        selectedDoctor === doctor.id && 'border-primary bg-primary/5'
                      )}
                      onClick={() => {
                        setSelectedDoctor(doctor.id);
                        setShowDoctorForm(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4>{doctor.name}</h4>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                          </div>
                          {selectedDoctor === doctor.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowDoctorForm(!showDoctorForm);
                    setSelectedDoctor(null);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Doctor
                </Button>

                {showDoctorForm && (
                  <div className="mt-4 p-4 border rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Doctor Name *</Label>
                        <Input
                          value={newDoctor.name}
                          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                          placeholder="Dr. John Smith"
                        />
                      </div>
                      <div>
                        <Label>Specialty *</Label>
                        <Input
                          value={newDoctor.specialty}
                          onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                          placeholder="Geriatrics"
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          value={newDoctor.phone}
                          onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={newDoctor.email}
                          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                          placeholder="doctor@example.com"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Caregiver */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Select Caregiver (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {mockCaregivers.map((caregiver) => (
                    <Card
                      key={caregiver.id}
                      className={cn(
                        'cursor-pointer transition-all hover:border-primary',
                        selectedCaregiver === caregiver.id && 'border-primary bg-primary/5'
                      )}
                      onClick={() => {
                        setSelectedCaregiver(caregiver.id);
                        setShowCaregiverForm(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4>{caregiver.name}</h4>
                            <p className="text-sm text-muted-foreground">{caregiver.role}</p>
                            <p className="text-sm text-muted-foreground">{caregiver.phone}</p>
                          </div>
                          {selectedCaregiver === caregiver.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowCaregiverForm(!showCaregiverForm);
                    setSelectedCaregiver(null);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Caregiver
                </Button>

                {showCaregiverForm && (
                  <div className="mt-4 p-4 border rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Caregiver Name *</Label>
                        <Input
                          value={newCaregiver.name}
                          onChange={(e) => setNewCaregiver({ ...newCaregiver, name: e.target.value })}
                          placeholder="Sarah Johnson"
                        />
                      </div>
                      <div>
                        <Label>Relationship *</Label>
                        <Input
                          value={newCaregiver.relationship}
                          onChange={(e) => setNewCaregiver({ ...newCaregiver, relationship: e.target.value })}
                          placeholder="Home Health Aide"
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          value={newCaregiver.phone}
                          onChange={(e) => setNewCaregiver({ ...newCaregiver, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          value={newCaregiver.email}
                          onChange={(e) => setNewCaregiver({ ...newCaregiver, email: e.target.value })}
                          placeholder="caregiver@example.com"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Medications */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label>Select Existing Medications (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {mockMedications.slice(0, 6).map((med) => (
                    <Card
                      key={med.id}
                      className={cn(
                        'cursor-pointer transition-all hover:border-primary',
                        selectedMedications.includes(med.id) && 'border-primary bg-primary/5'
                      )}
                      onClick={() => {
                        setSelectedMedications(
                          selectedMedications.includes(med.id)
                            ? selectedMedications.filter(id => id !== med.id)
                            : [...selectedMedications, med.id]
                        );
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4>{med.name}</h4>
                            <p className="text-sm text-muted-foreground">{med.dosage}</p>
                            <p className="text-sm text-muted-foreground">{med.frequency}</p>
                          </div>
                          {selectedMedications.includes(med.id) && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {newMedications.length > 0 && (
                <div>
                  <Label>Added Medications</Label>
                  <div className="space-y-2 mt-2">
                    {newMedications.map((med) => (
                      <div key={med.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4>{med.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {med.dosage} - {med.frequency}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNewMedications(newMedications.filter(m => m.id !== med.id))}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowMedicationForm(!showMedicationForm)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Medication
                </Button>

                {showMedicationForm && (
                  <div className="mt-4 p-4 border rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Medication Name *</Label>
                        <Input
                          value={newMedication.name}
                          onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                          placeholder="Aspirin"
                        />
                      </div>
                      <div>
                        <Label>Dosage *</Label>
                        <Input
                          value={newMedication.dosage}
                          onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                          placeholder="100mg"
                        />
                      </div>
                      <div>
                        <Label>Frequency *</Label>
                        <Select
                          value={newMedication.frequency}
                          onValueChange={(value) => setNewMedication({ ...newMedication, frequency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Once daily">Once daily</SelectItem>
                            <SelectItem value="Twice daily">Twice daily</SelectItem>
                            <SelectItem value="Three times daily">Three times daily</SelectItem>
                            <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                            <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                            <SelectItem value="As needed">As needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Instructions</Label>
                        <Textarea
                          value={newMedication.instructions}
                          onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                          placeholder="Take with food"
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button type="button" onClick={addNewMedication}>
                      Add Medication
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Vital Signs */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <Label className="mb-4">Initial Vital Signs (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Blood Pressure (Systolic)</Label>
                    <Input
                      type="number"
                      value={vitalSigns.bloodPressureSystolic}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, bloodPressureSystolic: e.target.value })}
                      placeholder="120"
                    />
                  </div>
                  <div>
                    <Label>Blood Pressure (Diastolic)</Label>
                    <Input
                      type="number"
                      value={vitalSigns.bloodPressureDiastolic}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, bloodPressureDiastolic: e.target.value })}
                      placeholder="80"
                    />
                  </div>
                  <div>
                    <Label>Heart Rate (bpm)</Label>
                    <Input
                      type="number"
                      value={vitalSigns.heartRate}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, heartRate: e.target.value })}
                      placeholder="72"
                    />
                  </div>
                  <div>
                    <Label>Temperature (°F)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={vitalSigns.temperature}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, temperature: e.target.value })}
                      placeholder="98.6"
                    />
                  </div>
                  <div>
                    <Label>Oxygen Saturation (%)</Label>
                    <Input
                      type="number"
                      value={vitalSigns.oxygenSaturation}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, oxygenSaturation: e.target.value })}
                      placeholder="98"
                    />
                  </div>
                  <div>
                    <Label>Weight (lbs)</Label>
                    <Input
                      type="number"
                      value={vitalSigns.weight}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, weight: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <Label>Height (inches)</Label>
                    <Input
                      type="number"
                      value={vitalSigns.height}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, height: e.target.value })}
                      placeholder="68"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Appointments */}
          {currentStep === 6 && (
            <div className="space-y-6">
              {appointments.length > 0 && (
                <div>
                  <Label>Scheduled Appointments</Label>
                  <div className="space-y-2 mt-2">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge>{apt.type}</Badge>
                            <h4>{format(apt.date, 'PPP')}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Time: {apt.time}
                          </p>
                          {apt.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Notes: {apt.notes}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAppointment(apt.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAppointmentForm(!showAppointmentForm)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Appointment
                </Button>

                {showAppointmentForm && (
                  <div className="mt-4 p-4 border rounded-lg space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left',
                                !newAppointment.date && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newAppointment.date ? (
                                format(newAppointment.date, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newAppointment.date}
                              onSelect={(date) => setNewAppointment({ ...newAppointment, date: date as Date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label>Time *</Label>
                        <Input
                          type="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Type *</Label>
                        <Select
                          value={newAppointment.type}
                          onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Checkup">Checkup</SelectItem>
                            <SelectItem value="Therapy">Therapy</SelectItem>
                            <SelectItem value="Consultation">Consultation</SelectItem>
                            <SelectItem value="Procedure">Procedure</SelectItem>
                            <SelectItem value="Follow-up">Follow-up</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label>Notes</Label>
                        <Textarea
                          value={newAppointment.notes}
                          onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                          placeholder="Additional notes about the appointment"
                          rows={2}
                        />
                      </div>
                    </div>
                    <Button type="button" onClick={addNewAppointment}>
                      Add Appointment
                    </Button>
                  </div>
                )}
              </div>

              {appointments.length === 0 && !showAppointmentForm && (
                <div className="text-center p-8 border rounded-lg border-dashed">
                  <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No appointments scheduled yet</p>
                  <p className="text-sm text-muted-foreground">Add appointments or skip this step</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onCancel : handlePrevious}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>

        {currentStep < steps.length ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleComplete}>
            <Check className="w-4 h-4 mr-2" />
            Complete
          </Button>
        )}
      </div>
    </div>
  );
}