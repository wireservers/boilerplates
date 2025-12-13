import { useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Text, Button } from "@gluestack-ui/themed";
import { useAuthStore } from "@/store/auth";

export default function ProfileScreen() {
  const { user, updateProfile } = useAuthStore();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");

  function onSave() {
    updateProfile({ name, email, avatarUrl });
  }

  return (
    <ScrollView className="flex-1 p-4 bg-neutral-50">
      <View className="bg-white rounded-2xl p-4 shadow">
        <Text className="text-2xl font-bold mb-4">Profile</Text>

        <Text className="mb-1">Full name</Text>
        <TextInput className="border border-neutral-300 rounded-xl p-3 mb-3" value={name} onChangeText={setName} />

        <Text className="mb-1">Email</Text>
        <TextInput className="border border-neutral-300 rounded-xl p-3 mb-3" value={email} onChangeText={setEmail} autoCapitalize="none" />

        <Text className="mb-1">Avatar URL</Text>
        <TextInput className="border border-neutral-300 rounded-xl p-3 mb-6" value={avatarUrl} onChangeText={setAvatarUrl} autoCapitalize="none" />

        <Button className="bg-brand-600" onPress={onSave}>
          <Text className="text-white font-semibold">Save changes</Text>
        </Button>
      </View>
    </ScrollView>
  );
}