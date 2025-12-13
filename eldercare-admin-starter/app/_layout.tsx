import React, { useState } from 'react';
import { View } from 'react-native';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Slot, useRouter, usePathname } from 'expo-router';

import { CareDataProvider } from '../src/context/CareDataContext';
import Sidebar from '../src/components/layout/Sidebar';
import AddPatientWizard from '../src/components/patients/AddPatientWizard';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  return (
    <GluestackUIProvider config={config}>
      <CareDataProvider>
        <View className="flex-1 flex-row bg-slate-900">
          <Sidebar
            pathname={pathname}
            onNavigate={(path) => router.push(path as any)}
            onAddPatient={() => setIsAddPatientOpen(true)}
          />
          <View className="flex-1">
            <Slot />
          </View>
          <AddPatientWizard
            isOpen={isAddPatientOpen}
            onClose={() => setIsAddPatientOpen(false)}
          />
        </View>
      </CareDataProvider>
    </GluestackUIProvider>
  );
}
