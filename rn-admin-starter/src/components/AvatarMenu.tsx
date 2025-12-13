import { useState } from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/auth";
import {
  Avatar, AvatarImage, Menu, MenuItem, MenuSeparator, MenuBackdrop, MenuContent, MenuPlacement, Text
} from "@gluestack-ui/themed";

export default function AvatarMenu() {
  const router = useRouter();
  const { user, signOut } = useAuthStore();
  const [open, setOpen] = useState(false);
  const avatar = user?.avatarUrl ?? "https://i.pravatar.cc/100?img=5";

  return (
    <View className="mr-3">
      <Menu placement={MenuPlacement.BOTTOM_RIGHT} isOpen={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <Pressable onPress={() => setOpen(true)}>
          <Avatar size="md" className="border border-accent-500">
            <AvatarImage
              source={{ uri: avatar }}
              alt={user?.name ?? "User"}
            />
          </Avatar>
        </Pressable>
        <MenuBackdrop />
        <MenuContent>
          <View className="px-3 py-2">
            <Text className="font-semibold">{user?.name}</Text>
            <Text size="sm" className="text-neutral-500">{user?.email}</Text>
          </View>
          <MenuSeparator />
          <MenuItem textValue="Profile" onPress={() => { setOpen(false); router.push("/profile"); }}>
            <Text>Profile</Text>
          </MenuItem>
          <MenuItem textValue="Settings" onPress={() => { setOpen(false); router.push("/(tabs)/settings"); }}>
            <Text>Settings</Text>
          </MenuItem>
          <MenuItem textValue="Logout" onPress={() => { setOpen(false); signOut(); }}>
            <Text>Logout</Text>
          </MenuItem>
        </MenuContent>
      </Menu>
    </View>
  );
}