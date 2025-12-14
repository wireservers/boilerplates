import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  Input,
  InputField,
  Switch,
} from '@gluestack-ui/themed';
import { useCareData } from '../../context/CareDataContext';
import { PatientInput } from '../../types/models';

type AddPatientWizardProps = {
  isOpen: boolean;
  onClose: () => void;
};

const wizardSteps = [
  { key: 'info', label: 'Info & Contact' },
  { key: 'doctor', label: 'Doctor' },
  { key: 'caregiver', label: 'Caregiver' },
  { key: 'meds', label: 'Medications' },
  { key: 'vitals', label: 'Vitals' },
  { key: 'appt', label: 'Appointments' },
];

const AddPatientWizard: React.FC<AddPatientWizardProps> = ({
  isOpen,
  onClose,
}) => {
  const { createPatient } = useCareData();

  const [currentStep, setCurrentStep] = useState(0);
  const [validationOn, setValidationOn] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [patientName, setPatientName] = useState('');
  const [dob, setDob] = useState('');
  const [emName, setEmName] = useState('');
  const [emPhone, setEmPhone] = useState('');

  const [doctors, setDoctors] = useState([
    { id: 'd1', name: 'Dr. Robert Smith', specialization: 'Geriatrics' },
    { id: 'd2', name: 'Dr. Julia Lee', specialization: 'Cardiology' },
  ]);
  const [selectedDoctorId, setSelectedDoctorId] =
    useState<string | null>('d1');
  const [newDoctorName, setNewDoctorName] = useState('');
  const [newDoctorSpec, setNewDoctorSpec] = useState('');

  const [caregivers, setCaregivers] = useState([
    { id: 'c1', name: 'Karen Brown', shift: 'Day shift' },
    { id: 'c2', name: 'Luis Martinez', shift: 'Night shift' },
  ]);
  const [selectedCaregiverId, setSelectedCaregiverId] =
    useState<string | null>('c1');
  const [newCaregiverName, setNewCaregiverName] = useState('');
  const [newCaregiverShift, setNewCaregiverShift] = useState('');

  const [knownMeds, setKnownMeds] = useState<string[]>([
    'Lisinopril 10mg',
    'Metformin 500mg',
    'Aspirin 81mg',
  ]);
  const [selectedMeds, setSelectedMeds] = useState<string[]>([
    'Lisinopril 10mg',
  ]);
  const [newMedName, setNewMedName] = useState('');

  const [vitalTemplates, setVitalTemplates] = useState<string[]>([
    'Stable BP / HR',
    'Mild hypertension',
    'Post-op monitoring',
  ]);
  const [selectedVitalTemplate, setSelectedVitalTemplate] =
    useState<string>('Stable BP / HR');
  const [newVitalTemplate, setNewVitalTemplate] = useState('');

  const [appointments, setAppointments] = useState<
    { date: string; type: string }[]
  >([{ date: '2025-11-21 09:00', type: 'Initial intake assessment' }]);
  const [newApptDate, setNewApptDate] = useState('');
  const [newApptType, setNewApptType] = useState('');

  const reset = () => {
    setCurrentStep(0);
    setValidationOn(true);
    setErrors({});
    setPatientName('');
    setDob('');
    setEmName('');
    setEmPhone('');
    setDoctors([
      { id: 'd1', name: 'Dr. Robert Smith', specialization: 'Geriatrics' },
      { id: 'd2', name: 'Dr. Julia Lee', specialization: 'Cardiology' },
    ]);
    setSelectedDoctorId('d1');
    setNewDoctorName('');
    setNewDoctorSpec('');
    setCaregivers([
      { id: 'c1', name: 'Karen Brown', shift: 'Day shift' },
      { id: 'c2', name: 'Luis Martinez', shift: 'Night shift' },
    ]);
    setSelectedCaregiverId('c1');
    setNewCaregiverName('');
    setNewCaregiverShift('');
    setKnownMeds(['Lisinopril 10mg', 'Metformin 500mg', 'Aspirin 81mg']);
    setSelectedMeds(['Lisinopril 10mg']);
    setNewMedName('');
    setVitalTemplates([
      'Stable BP / HR',
      'Mild hypertension',
      'Post-op monitoring',
    ]);
    setSelectedVitalTemplate('Stable BP / HR');
    setNewVitalTemplate('');
    setAppointments([
      { date: '2025-11-21 09:00', type: 'Initial intake assessment' },
    ]);
    setNewApptDate('');
    setNewApptType('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validateStep = () => {
    if (!validationOn) {
      setErrors({});
      return true;
    }

    const next: Record<string, string> = {};

    switch (currentStep) {
      case 0:
        if (!patientName.trim()) next.patientName = 'Patient name is required.';
        if (!dob.trim()) next.dob = 'Date of birth is required.';
        if (!emName.trim())
          next.emName = 'Emergency contact name is required.';
        if (!emPhone.trim())
          next.emPhone = 'Emergency contact phone is required.';
        break;
      case 1:
        if (!selectedDoctorId)
          next.doctor = 'Select or add a doctor for this patient.';
        break;
      case 2:
        if (!selectedCaregiverId)
          next.caregiver = 'Select or add a caregiver.';
        break;
      case 3:
        if (!selectedMeds.length)
          next.meds = 'Select at least one medication or add a new one.';
        break;
      case 4:
        if (!selectedVitalTemplate)
          next.vitals = 'Select or define a vital-sign template.';
        break;
      case 5:
        if (!appointments.length)
          next.appt = 'Add at least one appointment.';
        break;
      default:
        break;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }

    const doctor = doctors.find((d) => d.id === selectedDoctorId);
    const caregiver = caregivers.find((c) => c.id === selectedCaregiverId);

    const payload: PatientInput = {
      name: patientName.trim() || 'Unnamed patient',
      dob: dob.trim() || '',
      emergencyContactName: emName.trim(),
      emergencyContactPhone: emPhone.trim(),
      doctorName: doctor?.name,
      caregiverName: caregiver?.name,
      medications: selectedMeds.slice(),
      vitalsTemplate: selectedVitalTemplate,
      appointments: appointments.slice(),
    };

    await createPatient(payload);
    handleClose();
  };

  const handleBack = () => {
    if (currentStep === 0) {
      handleClose();
    } else {
      setCurrentStep((s) => s - 1);
      setErrors({});
    }
  };

  const addDoctor = () => {
    if (!newDoctorName.trim()) return;
    const id = `d${Date.now()}`;
    const doc = {
      id,
      name: newDoctorName.trim(),
      specialization: newDoctorSpec.trim() || 'Geriatrics',
    };
    setDoctors((prev) => [...prev, doc]);
    setSelectedDoctorId(id);
    setNewDoctorName('');
    setNewDoctorSpec('');
  };

  const addCaregiver = () => {
    if (!newCaregiverName.trim()) return;
    const id = `c${Date.now()}`;
    const cg = {
      id,
      name: newCaregiverName.trim(),
      shift: newCaregiverShift.trim() || 'Day shift',
    };
    setCaregivers((prev) => [...prev, cg]);
    setSelectedCaregiverId(id);
    setNewCaregiverName('');
    setNewCaregiverShift('');
  };

  const toggleMed = (name: string) => {
    setSelectedMeds((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name],
    );
  };

  const addMedication = () => {
    if (!newMedName.trim()) return;
    const med = newMedName.trim();
    setKnownMeds((prev) => (prev.includes(med) ? prev : [...prev, med]));
    setSelectedMeds((prev) => [...prev, med]);
    setNewMedName('');
  };

  const addVitalTemplate = () => {
    if (!newVitalTemplate.trim()) return;
    const vt = newVitalTemplate.trim();
    setVitalTemplates((prev) => (prev.includes(vt) ? prev : [...prev, vt]));
    setSelectedVitalTemplate(vt);
    setNewVitalTemplate('');
  };

  const addAppointment = () => {
    if (!newApptDate.trim() || !newApptType.trim()) return;
    setAppointments((prev) => [
      ...prev,
      { date: newApptDate.trim(), type: newApptType.trim() },
    ]);
    setNewApptDate('');
    setNewApptType('');
  };

  const renderStepper = () => (
    <View className="flex-row justify-between mb-3">
      {wizardSteps.map((s, index) => {
        const active = index === currentStep;
        const completed = index < currentStep;
        return (
          <View key={s.key} className="flex-1 items-center">
            <View
              className={`w-7 h-7 rounded-full items-center justify-center ${
                completed
                  ? 'bg-emerald-500'
                  : active
                  ? 'bg-emerald-500/80'
                  : 'bg-slate-700'
              }`}
            >
              <Text className="text-white text-xs font-semibold">
                {index + 1}
              </Text>
            </View>
            <Text className="text-[10px] text-slate-300 mt-1 text-center">
              {s.label}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const renderValidationToggle = () => (
    <View className="flex-row items-center justify-end mb-2">
      <Text className="text-[11px] text-slate-300 mr-2">
        Validation {validationOn ? 'ON' : 'OFF'}
      </Text>
      <Switch
        size="sm"
        isChecked={validationOn}
        onToggle={() => setValidationOn(!validationOn)}
      />
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View>
            <Text className="text-sm text-white mb-3">
              Patient information & emergency contact
            </Text>

            <FormControl isInvalid={!!errors.patientName} className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Patient name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Full name"
                  value={patientName}
                  onChangeText={setPatientName}
                />
              </Input>
              {errors.patientName && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.patientName}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.dob} className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Date of birth</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="YYYY-MM-DD"
                  value={dob}
                  onChangeText={setDob}
                />
              </Input>
              {errors.dob && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.dob}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.emName} className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>
                  Emergency contact name
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Name"
                  value={emName}
                  onChangeText={setEmName}
                />
              </Input>
              {errors.emName && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.emName}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.emPhone} className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>
                  Emergency contact phone
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Phone number"
                  value={emPhone}
                  onChangeText={setEmPhone}
                />
              </Input>
              {errors.emPhone && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.emPhone}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          </View>
        );
      case 1:
        return (
          <View>
            <Text className="text-sm text-white mb-3">
              Assign primary doctor
            </Text>
            <Text className="text-[11px] text-slate-400 mb-2">
              Select from existing or add a new provider.
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {doctors.map((d) => {
                const selected = d.id === selectedDoctorId;
                return (
                  <View
                    key={d.id}
                    className={`px-3 py-2 rounded-xl border ${
                      selected
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-slate-600'
                    }`}
                  >
                    <Text
                      className="text-xs text-white"
                      onPress={() => setSelectedDoctorId(d.id)}
                    >
                      {d.name}
                    </Text>
                    <Text className="text-[10px] text-slate-400">
                      {d.specialization}
                    </Text>
                  </View>
                );
              })}
            </View>
            {errors.doctor && (
              <Text className="text-[11px] text-red-400 mb-2">
                {errors.doctor}
              </Text>
            )}

            <Text className="text-[11px] text-slate-400 mb-1">
              Add doctor (optional)
            </Text>
            <FormControl className="mb-2">
              <FormControlLabel>
                <FormControlLabelText>Doctor name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Dr. Name"
                  value={newDoctorName}
                  onChangeText={setNewDoctorName}
                />
              </Input>
            </FormControl>
            <FormControl className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Specialization</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Geriatrics, Cardiology, etc."
                  value={newDoctorSpec}
                  onChangeText={setNewDoctorSpec}
                />
              </Input>
            </FormControl>
            <Button size="sm" onPress={addDoctor}>
              <ButtonText>Save & select new doctor</ButtonText>
            </Button>
          </View>
        );
      case 2:
        return (
          <View>
            <Text className="text-sm text-white mb-3">
              Assign primary caregiver
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {caregivers.map((c) => {
                const selected = c.id === selectedCaregiverId;
                return (
                  <View
                    key={c.id}
                    className={`px-3 py-2 rounded-xl border ${
                      selected
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-slate-600'
                    }`}
                  >
                    <Text
                      className="text-xs text-white"
                      onPress={() => setSelectedCaregiverId(c.id)}
                    >
                      {c.name}
                    </Text>
                    <Text className="text-[10px] text-slate-400">
                      {c.shift}
                    </Text>
                  </View>
                );
              })}
            </View>
            {errors.caregiver && (
              <Text className="text-[11px] text-red-400 mb-2">
                {errors.caregiver}
              </Text>
            )}

            <Text className="text-[11px] text-slate-400 mb-1">
              Add caregiver (optional)
            </Text>
            <FormControl className="mb-2">
              <FormControlLabel>
                <FormControlLabelText>Caregiver name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Name"
                  value={newCaregiverName}
                  onChangeText={setNewCaregiverName}
                />
              </Input>
            </FormControl>
            <FormControl className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Shift</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="Day shift / Night shift"
                  value={newCaregiverShift}
                  onChangeText={setNewCaregiverShift}
                />
              </Input>
            </FormControl>
            <Button size="sm" onPress={addCaregiver}>
              <ButtonText>Save & select new caregiver</ButtonText>
            </Button>
          </View>
        );
      case 3:
        return (
          <View>
            <Text className="text-sm text-white mb-3">
              Medications (select or add)
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {knownMeds.map((m) => {
                const selected = selectedMeds.includes(m);
                return (
                  <View
                    key={m}
                    className={`px-3 py-1 rounded-full border ${
                      selected
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-slate-600'
                    }`}
                  >
                    <Text
                      className={`text-[11px] ${
                        selected ? 'text-emerald-300' : 'text-slate-200'
                      }`}
                      onPress={() => toggleMed(m)}
                    >
                      {selected ? '✓ ' : ''}
                      {m}
                    </Text>
                  </View>
                );
              })}
            </View>
            {errors.meds && (
              <Text className="text-[11px] text-red-400 mb-2">
                {errors.meds}
              </Text>
            )}

            <Text className="text-[11px] text-slate-400 mb-1">
              Add medication (optional)
            </Text>
            <FormControl className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Medication name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="e.g. Atorvastatin 20mg daily"
                  value={newMedName}
                  onChangeText={setNewMedName}
                />
              </Input>
            </FormControl>
            <Button size="sm" onPress={addMedication}>
              <ButtonText>Add & select medication</ButtonText>
            </Button>
          </View>
        );
      case 4:
        return (
          <View>
            <Text className="text-sm text-white mb-3">
              Baseline vital sign template
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-3">
              {vitalTemplates.map((v) => {
                const selected = v === selectedVitalTemplate;
                return (
                  <View
                    key={v}
                    className={`px-3 py-1 rounded-full border ${
                      selected
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : 'border-slate-600'
                    }`}
                  >
                    <Text
                      className={`text-[11px] ${
                        selected ? 'text-emerald-300' : 'text-slate-200'
                      }`}
                      onPress={() => setSelectedVitalTemplate(v)}
                    >
                      {selected ? '✓ ' : ''}
                      {v}
                    </Text>
                  </View>
                );
              })}
            </View>
            {errors.vitals && (
              <Text className="text-[11px] text-red-400 mb-2">
                {errors.vitals}
              </Text>
            )}

            <Text className="text-[11px] text-slate-400 mb-1">
              Add template (optional)
            </Text>
            <FormControl className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Template label</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="e.g. Frailty / high fall risk"
                  value={newVitalTemplate}
                  onChangeText={setNewVitalTemplate}
                />
              </Input>
            </FormControl>
            <Button size="sm" onPress={addVitalTemplate}>
              <ButtonText>Add & select template</ButtonText>
            </Button>
          </View>
        );
      case 5:
        return (
          <View>
            <Text className="text-sm text-white mb-3">
              Initial appointments
            </Text>
            <Text className="text-[11px] text-slate-400 mb-2">
              Add one or more appointments to bootstrap the schedule.
            </Text>
            <View className="mb-3">
              {appointments.map((a, idx) => (
                <View
                  key={`${a.date}-${idx}`}
                  className="flex-row justify-between items-center border-b border-slate-800 py-1"
                >
                  <Text className="text-[11px] text-slate-200">{a.date}</Text>
                  <Text className="text-[11px] text-slate-400">{a.type}</Text>
                </View>
              ))}
            </View>
            {errors.appt && (
              <Text className="text-[11px] text-red-400 mb-2">
                {errors.appt}
              </Text>
            )}
            <FormControl className="mb-2">
              <FormControlLabel>
                <FormControlLabelText>
                  Appointment date/time
                </FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="YYYY-MM-DD HH:mm"
                  value={newApptDate}
                  onChangeText={setNewApptDate}
                />
              </Input>
            </FormControl>
            <FormControl className="mb-3">
              <FormControlLabel>
                <FormControlLabelText>Type / reason</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  placeholder="e.g. Routine check-up"
                  value={newApptType}
                  onChangeText={setNewApptType}
                />
              </Input>
            </FormControl>
            <Button size="sm" onPress={addAppointment}>
              <ButtonText>Add appointment</ButtonText>
            </Button>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalBackdrop />
      <ModalContent className="bg-slate-950 max-w-3xl w-full">
        <ModalHeader>
          <View className="flex-row justify-between w-full items-center">
            <Text className="text-base font-semibold text-white">
              Add patient (wizard)
            </Text>
            <ModalCloseButton />
          </View>
        </ModalHeader>
        <ModalBody>
          {renderStepper()}
          {renderValidationToggle()}
          <ScrollView style={{ maxHeight: 420 }}>
            {renderStepContent()}
          </ScrollView>
        </ModalBody>
        <ModalFooter className="flex-row justify-between items-center">
          <Button variant="outline" action="secondary" onPress={handleBack}>
            <ButtonText>{currentStep === 0 ? 'Cancel' : 'Back'}</ButtonText>
          </Button>
          <Button onPress={handleNext}>
            <ButtonText>
              {currentStep === wizardSteps.length - 1 ? 'Finish' : 'Next'}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPatientWizard;
