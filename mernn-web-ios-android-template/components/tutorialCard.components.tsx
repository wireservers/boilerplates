// components/tutorialCard.components.tsx
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default function TutorialCard({ tutorial, onPress }) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#fff",
                marginVertical: 8,
                padding: 16,
                borderRadius: 12,
                shadowColor: "#000",
                shadowOpacity: 0.07,
                shadowRadius: 4,
                elevation: 2
            }}
            onPress={onPress}
        >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{tutorial.title}</Text>
            <Text style={{ color: "#666" }}>{tutorial.difficulty}</Text>
        </TouchableOpacity>
    );
}
