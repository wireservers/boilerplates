// screens/tutorial.screens.tsx
import React from "react";
import { View, Text, Button } from "react-native";

export default function TutorialScreen({ route, navigation }) {
    // For demonstration, static data:
    const { id } = route.params || {};
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Tutorial #{id}</Text>
            <Text style={{ marginVertical: 8 }}>Tutorial steps will be listed here.</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}
