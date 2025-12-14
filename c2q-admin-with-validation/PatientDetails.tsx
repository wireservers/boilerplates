import { ArrowLeft, Phone, AlertCircle, Activity, Pill, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { patients, medications, vitals, appointments } from '../lib/mockData';

interface PatientDetailsProps {
  patientId: string;
  onBack: () => void;
}

export function PatientDetails({ patientId, onBack }: PatientDetailsProps) {
  const patient = patients.find(p => p.id === patientId);
  const patientMedications = medications.filter(m => m.patientId === patientId);
  const patientVitals = vitals.filter(v => v.patientId === patientId);
  const patientAppointments = appointments.filter(a => a.patientId === patientId);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'observation': return 'default';
      case 'stable': return 'secondary';
      case 'recovering': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Patients
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-blue-700">{patient.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div>
              <h1 className="text-gray-900">{patient.name}</h1>
              <p className="text-gray-500">{patient.age} years old • {patient.gender} • Room {patient.roomNumber}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getStatusColor(patient.status)}>{patient.status}</Badge>
                <span className="text-sm text-gray-500">Admitted: {new Date(patient.admissionDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Edit Details</Button>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned Doctor</p>
                <p className="text-gray-900">{patient.assignedDoctor}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned Nurse</p>
                <p className="text-gray-900">{patient.assignedNurse}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Emergency Contact</p>
                <p className="text-gray-900">{patient.emergencyContact.name}</p>
                <p className="text-xs text-gray-500">{patient.emergencyContact.relationship}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Primary Diagnosis</p>
                  <p className="text-gray-900">{patient.primaryDiagnosis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conditions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.conditions.map((condition, index) => (
                      <Badge key={index} variant="outline">{condition}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allergies</p>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">⚠ {allergy}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-900">No known allergies</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Relationship</p>
                  <p className="text-gray-900">{patient.emergencyContact.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{patient.emergencyContact.phone}</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Medications</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Pill className="w-4 h-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientMedications.filter(m => m.status === 'active').map(med => (
                  <div key={med.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.dosage} • {med.frequency} • {med.route}</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Prescribed by</p>
                        <p className="text-gray-900">{med.prescribedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Start date</p>
                        <p className="text-gray-900">{new Date(med.startDate).toLocaleDateString()}</p>
                      </div>
                      {med.lastAdministered && (
                        <div>
                          <p className="text-gray-500">Last administered</p>
                          <p className="text-gray-900">{med.lastAdministered}</p>
                        </div>
                      )}
                      {med.nextDue && (
                        <div>
                          <p className="text-gray-500">Next due</p>
                          <p className="text-gray-900">{med.nextDue}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Vital Signs History</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Activity className="w-4 h-4 mr-2" />
                  Record Vitals
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm text-gray-500">Time</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-500">Blood Pressure</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-500">Heart Rate</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-500">Temperature</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-500">SpO2</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-500">Resp. Rate</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-500">Recorded By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientVitals.map(vital => (
                      <tr key={vital.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">{vital.timestamp}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={vital.bloodPressure.systolic > 140 ? 'text-red-600' : 'text-gray-900'}>
                            {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{vital.heartRate} bpm</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={vital.temperature > 99.5 ? 'text-red-600' : 'text-gray-900'}>
                            {vital.temperature}°F
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className={vital.oxygenSaturation < 95 ? 'text-red-600' : 'text-gray-900'}>
                            {vital.oxygenSaturation}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{vital.respiratoryRate}/min</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{vital.recordedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Appointments</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientAppointments.map(appointment => (
                  <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-900 capitalize">{appointment.type}</p>
                        <p className="text-sm text-gray-500">{appointment.provider}</p>
                      </div>
                      <Badge variant={
                        appointment.status === 'completed' ? 'secondary' :
                        appointment.status === 'in-progress' ? 'default' :
                        appointment.status === 'cancelled' ? 'destructive' :
                        'outline'
                      }>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="text-gray-900">{new Date(appointment.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="text-gray-900">{appointment.time} ({appointment.duration} min)</p>
                      </div>
                    </div>
                    {appointment.notes && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-sm text-gray-900">{appointment.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
