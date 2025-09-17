// screens/auth.screens.tsx
import React from "react";
import { View, Button } from "react-native";
import { useAuth } from "./auth.services";

export default function AuthScreen() {
    const { signInWithMicrosoft } = useAuth();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Sign In with Microsoft" onPress={signInWithMicrosoft} />
        </View>
    );
}
