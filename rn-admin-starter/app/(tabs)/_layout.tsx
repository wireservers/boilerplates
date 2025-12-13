import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import AvatarMenu from "@/components/AvatarMenu";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerRight: () => <AvatarMenu />,
        headerTitle: "Admin",
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="users/index" options={{ title: "Users" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}