# ElderCare Admin Dashboard

A comprehensive healthcare management system for elderly patient care built with React, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- 📊 **Dashboard Overview** - Real-time statistics and quick actions
- 👥 **Patient Management** - Complete CRUD operations for patient records
- 📅 **Appointment Scheduling** - Calendar-based appointment system
- 💊 **Medication Tracking** - Medication schedules and administration
- 🩺 **Vital Signs Monitoring** - Track patient vital signs
- 👨‍⚕️ **Care Team Management** - Manage healthcare staff
- 📈 **Reports & Analytics** - Interactive charts with recharts
- ⚙️ **User Management** - CRUD operations with validated forms

### Technical Features
- ✅ Form validation with Zod and React Hook Form
- 📊 Interactive charts (Pie, Bar, Line charts)
- 🎨 Modern UI with shadcn/ui components
- 📱 Responsive design
- 🔔 Real-time alerts and notifications
- 🎯 TypeScript for type safety

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Form Validation**: React Hook Form + Zod
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript ESLint

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd eldercare-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
eldercare-admin-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── DashboardOverview.tsx
│   │   ├── PatientList.tsx
│   │   ├── PatientDetails.tsx
│   │   ├── AppointmentCalendar.tsx
│   │   ├── MedicationManager.tsx
│   │   ├── VitalsMonitor.tsx
│   │   ├── CareTeam.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── lib/
│   │   ├── mockData.ts      # Mock data for development
│   │   └── utils.ts         # Utility functions
│   ├── styles/
│   │   └── globals.css      # Global styles & Tailwind
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### Patient Management
- View all patients with filtering
- Add new patients
- Edit patient information
- View detailed patient records
- Track patient status (stable, critical, recovering, observation)

### Appointments
- Calendar view of appointments
- Schedule new appointments
- Filter by type (checkup, therapy, consultation, procedure)
- View appointment details

### Medications
- Track all medications
- Monitor administration schedules
- View medication history
- Filter by status (active, completed, discontinued)

### Vitals Monitoring
- Real-time vital signs display
- Track heart rate, blood pressure, temperature, SpO2
- Alert system for abnormal readings
- Historical data visualization

### Reports & Analytics
- Patient status distribution (Pie Chart)
- Appointment trends (Bar Chart)
- Vital signs trends (Line Charts)
- Age distribution analysis
- Common diagnoses tracking
- Exportable reports

### User Management
- Create/Read/Update/Delete system users
- Role-based access (Admin, Doctor, Nurse, Staff)
- Form validation for all user inputs
- User status management (Active/Inactive)
- Department assignment

## Form Validation

All forms include comprehensive validation:
- Email format validation
- Phone number format: (555) 123-4567
- Minimum character requirements
- Required field validation
- Real-time error messages

## Mock Data

The application uses mock data for demonstration purposes. In production, you would connect to:
- Backend API (REST/GraphQL)
- Database (PostgreSQL, MongoDB, etc.)
- Authentication service
- Supabase (recommended for rapid development)

## Security Notes

⚠️ **Important**: This is a demo application. For production use:
- Implement proper authentication and authorization
- Use secure backend APIs
- Never store Protected Health Information (PHI) without proper encryption
- Comply with HIPAA regulations for healthcare data
- Use environment variables for sensitive data
- Implement role-based access control (RBAC)

## Future Enhancements

- [ ] Supabase backend integration
- [ ] Real-time data synchronization
- [ ] Advanced search and filtering
- [ ] Export to PDF/Excel
- [ ] Push notifications
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Audit logging
- [ ] Advanced analytics with ML

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.

---

**Note**: This application is for demonstration purposes. Do not use it to store or manage actual Protected Health Information (PHI) without implementing proper security measures and complying with healthcare regulations (HIPAA, GDPR, etc.).
