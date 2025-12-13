
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Slot } from 'expo-router';
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Slot />
    </GluestackUIProvider>
  );
}
