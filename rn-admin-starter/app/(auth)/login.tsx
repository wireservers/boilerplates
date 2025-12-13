import { useState } from "react";
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Link } from "expo-router";
import { Text, Button } from "@gluestack-ui/themed";
import { useAuthStore } from "@/store/auth";

export default function LoginScreen() {
  const { signIn } = useAuthStore();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onLogin() {
    setBusy(true);
    setErr(null);
    const ok = await signIn(email.trim(), password.trim());
    if (!ok) setErr("Invalid credentials");
    setBusy(false);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 justify-center p-6 bg-gradient-to-b from-brand-50 to-accent-50">
      <View className="bg-white rounded-2xl p-6 shadow">
        <Text className="text-2xl font-bold mb-2">Welcome back</Text>
        <Text className="text-neutral-500 mb-4">Sign in to your admin workspace</Text>

        <Text className="mb-1">Email</Text>
        <TextInput
          className="border border-neutral-300 rounded-xl p-3 mb-3"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="mb-1">Password</Text>
        <TextInput
          className="border border-neutral-300 rounded-xl p-3 mb-4"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {err ? <Text className="text-red-500 mb-3">{err}</Text> : null}

        <Button className="bg-brand-600" isDisabled={busy} onPress={onLogin}>
          <Text className="text-white font-semibold">Sign in</Text>
        </Button>

        <View className="flex-row justify-between mt-4">
          <Link href="/reset"><Text className="text-accent-600">Forgot password?</Text></Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}