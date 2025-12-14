import { useState } from "react";
import { View, TextInput, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from "@gluestack-ui/themed";
import { useUsersStore } from "@/store/users";

export default function CreateUser() {
  const router = useRouter();
  const { createUser } = useUsersStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [active, setActive] = useState(true);

  async function onSave() {
    await createUser({ name, email, role: role as any, active });
    router.back();
  }

  return (
    <View className="flex-1 p-4 bg-neutral-50">
      <Text className="text-2xl font-bold mb-3">Create user</Text>

      <View className="bg-white rounded-2xl p-4 shadow">
        <Text className="mb-1">Full name</Text>
        <TextInput className="border border-neutral-300 rounded-xl p-3 mb-3" value={name} onChangeText={setName} />

        <Text className="mb-1">Email</Text>
        <TextInput className="border border-neutral-300 rounded-xl p-3 mb-3" value={email} onChangeText={setEmail} autoCapitalize="none" />

        <Text className="mb-1">Role</Text>
        <Select selectedValue={role} onValueChange={(v) => setRole(String(v))}>
          <SelectTrigger className="border border-neutral-300 rounded-xl p-3 mb-3 bg-white">
            <SelectInput placeholder="Role" value={role} />
            <SelectIcon />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectItem label="Admin" value="Admin" />
              <SelectItem label="Editor" value="Editor" />
              <SelectItem label="Viewer" value="Viewer" />
            </SelectContent>
          </SelectPortal>
        </Select>

        <View className="flex-row items-center gap-3 mb-6">
          <Switch value={active} onValueChange={setActive} />
          <Text>Active</Text>
        </View>

        <Button className="bg-brand-600" onPress={onSave}>
          <Text className="text-white font-semibold">Create</Text>
        </Button>
      </View>
    </View>
  );
}