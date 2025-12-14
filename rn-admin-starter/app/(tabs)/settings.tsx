import { View } from "react-native";
import { Text } from "@gluestack-ui/themed";

export default function Settings() {
  return (
    <View className="flex-1 p-4 bg-neutral-50">
      <Text className="text-2xl font-bold mb-2">Settings</Text>
      <Text className="text-neutral-600">Add organization and workspace settings here.</Text>
    </View>
  );
}