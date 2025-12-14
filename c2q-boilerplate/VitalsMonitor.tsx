import { Activity, Heart, Thermometer, Wind, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { vitals, patients } from '../lib/mockData';

export function VitalsMonitor() {
  const latestVitals = patients.map(patient => {
    const patientVitals = vitals.filter(v => v.patientId === patient.id);
    const latest = patientVitals.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
    return { patient, vital: latest };
  }).filter(item => item.vital);

  const getVitalStatus = (vital: any) => {
    const issues = [];
    if (vital.bloodPressure.systolic > 140 || vital.bloodPressure.diastolic > 90) issues.push('BP');
    if (vital.temperature > 99.5) issues.push('Temp');
    if (vital.oxygenSaturation < 95) issues.push('SpO2');
    if (vital.heartRate > 100 || vital.heartRate < 60) issues.push('HR');
    return issues;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Vital Signs Monitor</h1>
          <p className="text-gray-500">Real-time patient vital signs tracking</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Record Vitals
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Readings Today</p>
                <p className="text-2xl text-gray-900 mt-1">{vitals.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Critical Vitals</p>
                <p className="text-2xl text-gray-900 mt-1">
                  {latestVitals.filter(item => getVitalStatus(item.vital).length > 0).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Heart Rate</p>
                <p className="text-2xl text-gray-900 mt-1">
                  {Math.round(vitals.reduce((sum, v) => sum + v.heartRate, 0) / vitals.length)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Temperature</p>
                <p className="text-2xl text-gray-900 mt-1">
                  {(vitals.reduce((sum, v) => sum + v.temperature, 0) / vitals.length).toFixed(1)}°F
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient Vitals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {latestVitals.map(({ patient, vital }) => {
          const issues = getVitalStatus(vital);
          const hasIssues = issues.length > 0;

          return (
            <Card key={patient.id} className={hasIssues ? 'border-red-200' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm text-blue-700">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{patient.name}</CardTitle>
                      <p className="text-sm text-gray-500">Room {patient.roomNumber}</p>
                    </div>
                  </div>
                  {hasIssues ? (
                    <Badge variant="destructive">Critical</Badge>
                  ) : (
                    <Badge variant="secondary">Normal</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last recorded</span>
                    <span className="text-gray-900">{vital.timestamp}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Blood Pressure */}
                    <div className={`p-3 rounded-lg ${
                      vital.bloodPressure.systolic > 140 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className={`w-4 h-4 ${
                          vital.bloodPressure.systolic > 140 ? 'text-red-600' : 'text-gray-600'
                        }`} />
                        <span className="text-xs text-gray-500">Blood Pressure</span>
                      </div>
                      <p className={`text-lg ${
                        vital.bloodPressure.systolic > 140 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                      </p>
                      <p className="text-xs text-gray-500">mmHg</p>
                    </div>

                    {/* Heart Rate */}
                    <div className={`p-3 rounded-lg ${
                      vital.heartRate > 100 || vital.heartRate < 60 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className={`w-4 h-4 ${
                          vital.heartRate > 100 || vital.heartRate < 60 ? 'text-red-600' : 'text-gray-600'
                        }`} />
                        <span className="text-xs text-gray-500">Heart Rate</span>
                      </div>
                      <p className={`text-lg ${
                        vital.heartRate > 100 || vital.heartRate < 60 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {vital.heartRate}
                      </p>
                      <p className="text-xs text-gray-500">bpm</p>
                    </div>

                    {/* Temperature */}
                    <div className={`p-3 rounded-lg ${
                      vital.temperature > 99.5 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className={`w-4 h-4 ${
                          vital.temperature > 99.5 ? 'text-red-600' : 'text-gray-600'
                        }`} />
                        <span className="text-xs text-gray-500">Temperature</span>
                      </div>
                      <p className={`text-lg ${
                        vital.temperature > 99.5 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {vital.temperature}
                      </p>
                      <p className="text-xs text-gray-500">°F</p>
                    </div>

                    {/* Oxygen Saturation */}
                    <div className={`p-3 rounded-lg ${
                      vital.oxygenSaturation < 95 ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Wind className={`w-4 h-4 ${
                          vital.oxygenSaturation < 95 ? 'text-red-600' : 'text-gray-600'
                        }`} />
                        <span className="text-xs text-gray-500">SpO2</span>
                      </div>
                      <p className={`text-lg ${
                        vital.oxygenSaturation < 95 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {vital.oxygenSaturation}
                      </p>
                      <p className="text-xs text-gray-500">%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Recorded by {vital.recordedBy}</span>
                    <Button variant="outline" size="sm">View History</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* All Readings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Recent Readings</CardTitle>
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
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Resp Rate</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {vitals.map(vital => {
                  const issues = getVitalStatus(vital);
                  return (
                    <tr key={vital.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{vital.patientName}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">{vital.timestamp}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={vital.bloodPressure.systolic > 140 ? 'text-red-600' : 'text-gray-900'}>
                          {vital.bloodPressure.systolic}/{vital.bloodPressure.diastolic}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={vital.heartRate > 100 || vital.heartRate < 60 ? 'text-red-600' : 'text-gray-900'}>
                          {vital.heartRate}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={vital.temperature > 99.5 ? 'text-red-600' : 'text-gray-900'}>
                          {vital.temperature}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className={vital.oxygenSaturation < 95 ? 'text-red-600' : 'text-gray-900'}>
                          {vital.oxygenSaturation}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{vital.respiratoryRate}/min</td>
                      <td className="py-3 px-4 text-sm">
                        {issues.length > 0 ? (
                          <Badge variant="destructive" className="text-xs">Critical</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Normal</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
