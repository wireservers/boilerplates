import { useEffect, useMemo, useState } from "react";
import { View, FlatList, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Text, Button } from "@gluestack-ui/themed";
import { useUsersStore, User } from "@/store/users";

export default function UsersList() {
  const router = useRouter();
  const { items, fetchUsers, deleteUser } = useUsersStore();
  const [q, setQ] = useState("");

  useEffect(() => { fetchUsers(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(u => (u.name + u.email + u.role).toLowerCase().includes(s));
  }, [q, items]);

  function onDelete(u: User) {
    Alert.alert("Delete user", `Are you sure you want to remove ${u.name}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteUser(u.id) },
    ]);
  }

  return (
    <View className="flex-1 p-4 bg-neutral-50">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-2xl font-bold">Users</Text>
        <Button className="bg-accent-600" onPress={() => router.push("/(tabs)/users/create")}>
          <Text className="text-white font-semibold">New</Text>
        </Button>
      </View>

      <TextInput
        className="border border-neutral-300 rounded-xl p-3 mb-3 bg-white"
        placeholder="Search users..."
        value={q}
        onChangeText={setQ}
      />

      <FlatList
        data={filtered}
        keyExtractor={(u) => u.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/(tabs)/users/${item.id}`)}
            className="bg-white rounded-2xl p-4 mb-3 shadow"
          >
            <Text className="font-semibold">{item.name}</Text>
            <Text size="sm" className="text-neutral-500">{item.email}</Text>
            <View className="flex-row gap-3 mt-3">
              <Button className="bg-neutral-200" onPress={() => router.push(`/(tabs)/users/${item.id}`)}>
                <Text>Edit</Text>
              </Button>
              <Button className="bg-red-500" onPress={() => onDelete(item)}>
                <Text className="text-white">Delete</Text>
              </Button>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}