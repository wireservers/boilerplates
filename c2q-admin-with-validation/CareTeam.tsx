import { UserCog, Phone, Mail, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { careTeam } from '../lib/mockData';

export function CareTeam() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredTeam = careTeam.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.specialty && member.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'default';
      case 'nurse': return 'secondary';
      case 'therapist': return 'outline';
      case 'caregiver': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-duty': return 'bg-green-100 text-green-700';
      case 'available': return 'bg-blue-100 text-blue-700';
      case 'off-duty': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const doctors = careTeam.filter(m => m.role === 'doctor');
  const nurses = careTeam.filter(m => m.role === 'nurse');
  const therapists = careTeam.filter(m => m.role === 'therapist');
  const onDuty = careTeam.filter(m => m.status === 'on-duty');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Care Team</h1>
          <p className="text-gray-500">{filteredTeam.length} team members</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Doctors</p>
                <p className="text-2xl text-gray-900 mt-1">{doctors.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCog className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Nurses</p>
                <p className="text-2xl text-gray-900 mt-1">{nurses.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCog className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Therapists</p>
                <p className="text-2xl text-gray-900 mt-1">{therapists.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCog className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">On Duty</p>
                <p className="text-2xl text-gray-900 mt-1">{onDuty.length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <UserCog className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, role, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={roleFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setRoleFilter('all')}
              >
                All
              </Button>
              <Button
                variant={roleFilter === 'doctor' ? 'default' : 'outline'}
                onClick={() => setRoleFilter('doctor')}
              >
                Doctors
              </Button>
              <Button
                variant={roleFilter === 'nurse' ? 'default' : 'outline'}
                onClick={() => setRoleFilter('nurse')}
              >
                Nurses
              </Button>
              <Button
                variant={roleFilter === 'therapist' ? 'default' : 'outline'}
                onClick={() => setRoleFilter('therapist')}
              >
                Therapists
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeam.map(member => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-700">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                  </div>
                </div>
                <Badge variant={getRoleBadgeColor(member.role)} className="capitalize">
                  {member.role}
                </Badge>
              </div>

              {member.specialty && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500">Specialty</p>
                  <p className="text-sm text-gray-900">{member.specialty}</p>
                </div>
              )}

              {member.shift && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500">Shift</p>
                  <p className="text-sm text-gray-900">{member.shift}</p>
                </div>
              )}

              <div className="mb-3">
                <p className="text-xs text-gray-500">Patients Assigned</p>
                <p className="text-sm text-gray-900">{member.patientsAssigned} patients</p>
              </div>

              <div className="mb-4">
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(member.status)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
                  {member.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Schedule Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Day Shift (7AM - 3PM)</p>
              <div className="flex flex-wrap gap-2">
                {careTeam.filter(m => m.shift === 'Day (7AM-3PM)').map(member => (
                  <Badge key={member.id} variant="outline" className="px-3 py-1">
                    {member.name} - {member.role}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Evening Shift (3PM - 11PM)</p>
              <div className="flex flex-wrap gap-2">
                {careTeam.filter(m => m.shift === 'Evening (3PM-11PM)').map(member => (
                  <Badge key={member.id} variant="outline" className="px-3 py-1">
                    {member.name} - {member.role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
