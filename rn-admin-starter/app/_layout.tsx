import { Stack, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "@/theme/gluestack-ui.config";
import { useAuthStore } from "@/store/auth";

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const { isSignedIn } = useAuthStore();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (!isSignedIn && !inAuthGroup) {
      router.replace("/login");
    } else if (isSignedIn && inAuthGroup) {
      router.replace("/(tabs)/dashboard");
    }
  }, [segments, isSignedIn]);

  return (
    <GluestackUIProvider config={config}>
      <Box className="flex-1 bg-neutral-50">
        <Stack screenOptions={{ headerShown: false }} />
      </Box>
    </GluestackUIProvider>
  );
}