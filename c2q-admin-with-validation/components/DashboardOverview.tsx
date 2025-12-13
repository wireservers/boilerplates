import { Users, Calendar, AlertTriangle, Activity, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { patients, appointments, vitals } from '../lib/mockData';
import { View } from '../App';

interface DashboardOverviewProps {
  onNavigate: (view: View) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const criticalPatients = patients.filter(p => p.status === 'critical').length;
  const todayAppointments = appointments.filter(a => a.date === '2024-11-14').length;
  const totalPatients = patients.length;

  const recentVitals = vitals.slice(0, 3);
  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled').slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-2xl text-gray-900 mt-1">{totalPatients}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 inline" /> 2 new admissions
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Critical Alerts</p>
                <p className="text-2xl text-gray-900 mt-1">{criticalPatients}</p>
                <button 
                  onClick={() => onNavigate('patients')}
                  className="text-xs text-red-600 mt-1 hover:underline"
                >
                  View patients →
                </button>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Appointments</p>
                <p className="text-2xl text-gray-900 mt-1">{todayAppointments}</p>
                <button 
                  onClick={() => onNavigate('appointments')}
                  className="text-xs text-blue-600 mt-1 hover:underline"
                >
                  View schedule →
                </button>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vitals Recorded</p>
                <p className="text-2xl text-gray-900 mt-1">{vitals.length}</p>
                <p className="text-xs text-gray-500 mt-1">Last hour</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Patients */}
        <Card>
          <CardHeader>
            <CardTitle>Critical Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.filter(p => p.status === 'critical').map(patient => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                      <span className="text-sm text-red-800">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">Room {patient.roomNumber}</p>
                    </div>
                  </div>
                  <Badge variant="destructive">Critical</Badge>
                </div>
              ))}
              {patients.filter(p => p.status === 'observation').map(patient => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-sm text-amber-800">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">Room {patient.roomNumber}</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-500 hover:bg-amber-600">Observation</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{appointment.patientName}</p>
                      <p className="text-xs text-gray-500">{appointment.type} - {appointment.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{appointment.provider.split(' ')[1]}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Vitals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Vital Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Patient</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Time</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">BP</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">HR</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Temp</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">SpO2</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {recentVitals.map(vital => (
                  <tr key={vital.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{vital.patientName}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">{vital.timestamp.split(' ')[1]}</td>
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
                    <td className="py-3 px-4 text-sm text-gray-500">{vital.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
