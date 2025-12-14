import { useState } from "react";
import { View, TextInput } from "react-native";
import { Link } from "expo-router";
import { Text, Button } from "@gluestack-ui/themed";
import { useAuthStore } from "@/store/auth";

export default function ResetScreen() {
  const { resetPassword } = useAuthStore();
  const [email, setEmail] = useState("admin@example.com");
  const [sent, setSent] = useState(false);

  async function onReset() {
    await resetPassword(email.trim());
    setSent(true);
  }

  return (
    <View className="flex-1 justify-center p-6 bg-gradient-to-b from-accent-50 to-brand-50">
      <View className="bg-white rounded-2xl p-6 shadow">
        <Text className="text-2xl font-bold mb-2">Reset password</Text>
        <Text className="text-neutral-500 mb-4">We'll send a reset link to your email.</Text>

        <Text className="mb-1">Email</Text>
        <TextInput
          className="border border-neutral-300 rounded-xl p-3 mb-4"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Button className="bg-accent-600" onPress={onReset}>
          <Text className="text-white font-semibold">Send reset link</Text>
        </Button>

        {sent ? <Text className="text-green-600 mt-3">Reset link sent. Check your inbox.</Text> : null}

        <Link href="/login"><Text className="text-accent-600 mt-4">Back to sign in</Text></Link>
      </View>
    </View>
  );
}