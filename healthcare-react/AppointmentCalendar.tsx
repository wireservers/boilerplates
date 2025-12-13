import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { appointments } from '../lib/mockData';

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState('2024-11-14');

  const dateAppointments = appointments.filter(a => a.date === selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'in-progress': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'checkup': return 'bg-blue-100 text-blue-700';
      case 'therapy': return 'bg-green-100 text-green-700';
      case 'consultation': return 'bg-purple-100 text-purple-700';
      case 'procedure': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Appointments</h1>
          <p className="text-gray-500">{dateAppointments.length} appointments today</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-gray-900">November 2024</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-xs text-gray-500 py-2">{day}</div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => {
                  const isSelected = day === 14;
                  const hasAppointments = [14, 15].includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(`2024-11-${day.toString().padStart(2, '0')}`)}
                      className={`
                        py-2 rounded-lg text-sm transition-colors relative text-center
                        ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                        ${!isSelected && hasAppointments ? 'font-semibold' : ''}
                      `}
                    >
                      {day}
                      {hasAppointments && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-blue-100"></div>
                  <span className="text-gray-600">Checkup</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-green-100"></div>
                  <span className="text-gray-600">Therapy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-purple-100"></div>
                  <span className="text-gray-600">Consultation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-orange-100"></div>
                  <span className="text-gray-600">Procedure</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule - {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dateAppointments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No appointments scheduled for this day</p>
                </div>
              ) : (
                dateAppointments.map(appointment => (
                  <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(appointment.type)}`}>
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-gray-900">{appointment.patientName}</p>
                          <p className="text-sm text-gray-500 capitalize">{appointment.type}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="text-gray-900">{appointment.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="text-gray-900">{appointment.duration} minutes</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Provider</p>
                        <p className="text-gray-900">{appointment.provider}</p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-sm text-gray-900 mt-1">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">View Patient</Button>
                      <Button variant="outline" size="sm">Reschedule</Button>
                      {appointment.status === 'scheduled' && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Start Appointment</Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl text-gray-900">{appointments.filter(a => a.status === 'scheduled').length}</p>
              <p className="text-sm text-gray-500 mt-1">Scheduled</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl text-gray-900">{appointments.filter(a => a.status === 'in-progress').length}</p>
              <p className="text-sm text-gray-500 mt-1">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl text-gray-900">{appointments.filter(a => a.status === 'completed').length}</p>
              <p className="text-sm text-gray-500 mt-1">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl text-gray-900">{appointments.filter(a => a.status === 'cancelled').length}</p>
              <p className="text-sm text-gray-500 mt-1">Cancelled</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}