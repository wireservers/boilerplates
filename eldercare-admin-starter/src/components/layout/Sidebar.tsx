import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button, ButtonText } from '@gluestack-ui/themed';

type SidebarProps = {
  pathname: string;
  onNavigate: (path: string) => void;
  onAddPatient: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  pathname,
  onNavigate,
  onAddPatient,
}) => {
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    return path !== '/' && pathname.startsWith(path);
  };

  const NavItem = ({ label, path }: { label: string; path: string }) => {
    const active = isActive(path);
    return (
      <Pressable
        onPress={() => onNavigate(path)}
        className={`rounded-xl px-3 py-2 mb-2 ${
          active ? 'bg-emerald-500/20' : 'bg-transparent'
        }`}
      >
        <Text
          className={`text-sm ${
            active ? 'text-emerald-300 font-semibold' : 'text-slate-300'
          }`}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="w-64 bg-slate-950 border-r border-slate-800 p-4">
      <Text className="text-xl font-bold text-white mb-6">
        ElderCare Admin
      </Text>

      <Text className="text-xs text-slate-500 mb-2">MAIN</Text>
      <NavItem label="Dashboard" path="/" />
      <NavItem label="User Profiles" path="/users" />

      <View className="mt-8">
        <Button onPress={onAddPatient}>
          <ButtonText>Add patient</ButtonText>
        </Button>
        <Text className="text-[11px] text-slate-500 mt-2">
          Opens a mock multi-step wizard in a popup for UX testing.
        </Text>
      </View>
    </View>
  );
};

export default Sidebar;
