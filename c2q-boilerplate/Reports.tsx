import { FileText, Download, TrendingUp, Users, Calendar, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { patients, appointments, medications, vitals } from '../lib/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Reports() {
  const totalPatients = patients.length;
  const criticalPatients = patients.filter(p => p.status === 'critical').length;
  const totalAppointments = appointments.length;
  const activeMedications = medications.filter(m => m.status === 'active').length;
  const totalVitalsRecorded = vitals.length;

  const avgAge = Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length);

  // Chart Data
  const patientStatusData = ['stable', 'critical', 'recovering', 'observation'].map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: patients.filter(p => p.status === status).length,
  }));

  const appointmentTypeData = ['checkup', 'therapy', 'consultation', 'procedure'].map(type => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    count: appointments.filter(a => a.type === type).length,
  }));

  const vitalsOverTimeData = vitals.map(vital => ({
    time: vital.timestamp.split(' ')[1],
    patient: vital.patientName.split(' ')[0],
    heartRate: vital.heartRate,
    bloodPressure: vital.bloodPressure.systolic,
    temperature: vital.temperature,
    spo2: vital.oxygenSaturation,
  }));

  const ageDistributionData = [
    { range: '70-74', count: patients.filter(p => p.age >= 70 && p.age <= 74).length },
    { range: '75-79', count: patients.filter(p => p.age >= 75 && p.age <= 79).length },
    { range: '80-84', count: patients.filter(p => p.age >= 80 && p.age <= 84).length },
    { range: '85+', count: patients.filter(p => p.age >= 85).length },
  ];

  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">Comprehensive healthcare management insights</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-2xl text-gray-900 mt-1">{totalPatients}</p>
                <p className="text-xs text-gray-500 mt-1">Avg Age: {avgAge} years</p>
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
                <p className="text-sm text-gray-500">Appointments</p>
                <p className="text-2xl text-gray-900 mt-1">{totalAppointments}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 inline" /> This month
                </p>
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
                <p className="text-sm text-gray-500">Active Medications</p>
                <p className="text-2xl text-gray-900 mt-1">{activeMedications}</p>
                <p className="text-xs text-gray-500 mt-1">Across all patients</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vitals Recorded</p>
                <p className="text-2xl text-gray-900 mt-1">{totalVitalsRecorded}</p>
                <p className="text-xs text-gray-500 mt-1">Today</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={patientStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {patientStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Types Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Heart Rate Trends Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Heart Rate Trends Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vitalsOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Distribution Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Blood Pressure Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Blood Pressure Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalsOverTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bloodPressure" stroke="#3b82f6" strokeWidth={2} name="Systolic BP" />
              <Line type="monotone" dataKey="spo2" stroke="#10b981" strokeWidth={2} name="SpO2 %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Patient Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['stable', 'critical', 'recovering', 'observation'].map(status => {
              const count = patients.filter(p => p.status === status).length;
              const percentage = Math.round((count / totalPatients) * 100);
              return (
                <div key={status} className="text-center">
                  <div className="mb-2">
                    <span className="text-3xl text-gray-900">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        status === 'critical' ? 'bg-red-500' :
                        status === 'observation' ? 'bg-yellow-500' :
                        status === 'recovering' ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-900 capitalize">{status}</p>
                  <p className="text-xs text-gray-500">{percentage}%</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['checkup', 'therapy', 'consultation', 'procedure'].map(type => {
                const count = appointments.filter(a => a.type === type).length;
                const percentage = Math.round((count / totalAppointments) * 100);
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900 capitalize">{type}</span>
                      <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Male', 'Female'].map(gender => {
                const count = patients.filter(p => p.gender === gender).length;
                const percentage = Math.round((count / totalPatients) * 100);
                return (
                  <div key={gender}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-900">{gender}</span>
                      <span className="text-sm text-gray-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${gender === 'Male' ? 'bg-blue-600' : 'bg-pink-600'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Diagnoses */}
      <Card>
        <CardHeader>
          <CardTitle>Common Primary Diagnoses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Diagnosis</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Patient Count</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Hypertension',
                  'Type 2 Diabetes',
                  'Heart Failure',
                  'Alzheimer\'s Disease',
                  'Arthritis',
                ].map((diagnosis, index) => {
                  const count = patients.filter(p => 
                    p.primaryDiagnosis.includes(diagnosis) || p.conditions.includes(diagnosis)
                  ).length;
                  const percentage = Math.round((count / totalPatients) * 100);
                  return (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{diagnosis}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{count}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Patient Census Report', description: 'Complete patient listing with status' },
              { title: 'Medication Administration Report', description: 'All medications and schedules' },
              { title: 'Vital Signs Summary', description: 'Aggregated vital signs data' },
              { title: 'Appointment Report', description: 'Scheduled and completed appointments' },
              { title: 'Care Team Schedule', description: 'Staff assignments and shifts' },
              { title: 'Monthly Summary', description: 'Complete facility overview' },
            ].map((report, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{report.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}