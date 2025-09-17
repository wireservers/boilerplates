// screens/profile.screens.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../services/auth.services";

export default function ProfileScreen({ navigation }) {
    const { user, signOut } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>User Profile</Text>
            <Text>Email: {user?.email}</Text>
            <Button title="Logout" onPress={signOut} />
        </View>
    );
}
