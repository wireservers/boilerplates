// screens/home.screens.tsx
import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import TutorialCard from "../components/tutorialCard.components";

const MOCK_TUTORIALS = [
    { id: "1", title: "Intro to Chess", difficulty: "Easy" },
    { id: "2", title: "Mastering Sudoku", difficulty: "Medium" }
];

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 12 }}>
                Gaming Tutorials
            </Text>
            <FlatList
                data={MOCK_TUTORIALS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TutorialCard tutorial={item} onPress={() => navigation.navigate("Tutorial", { id: item.id })} />
                )}
            />
            <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
        </View>
    );
}
