import { LayoutDashboard, Users, Calendar, Pill, Activity, UserCog, FileText, Bell, Settings, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { View } from '../App';
import { useState } from 'react';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onOpenAddPatient: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' as View },
  { name: 'Patients', icon: Users, view: 'patients' as View },
  { name: 'Appointments', icon: Calendar, view: 'appointments' as View },
  { name: 'Medications', icon: Pill, view: 'medications' as View },
  { name: 'Vitals', icon: Activity, view: 'vitals' as View },
  { name: 'Care Team', icon: UserCog, view: 'team' as View },
  { name: 'Reports', icon: FileText, view: 'reports' as View },
  { name: 'Settings', icon: Settings, view: 'settings' as View },
];

export function Sidebar({ currentView, onViewChange, onOpenAddPatient }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}>
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 shadow-sm z-10"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-600" /> : <ChevronLeft className="w-4 h-4 text-gray-600" />}
      </button>

      <div className="p-6 border-b border-gray-200">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <div className="text-gray-900">ElderCare</div>
              <div className="text-xs text-gray-500">Admin Dashboard</div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {/* Add Patient Button - Special */}
          <button
            onClick={onOpenAddPatient}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors bg-blue-600 text-white hover:bg-blue-700 mb-2 ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Add Patient' : ''}
          >
            <UserPlus className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Add Patient</span>}
          </button>

          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.name}
                onClick={() => onViewChange(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
            <span className="text-gray-600">AD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <div className="text-sm text-gray-900">Admin User</div>
              <div className="text-xs text-gray-500">administrator</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}