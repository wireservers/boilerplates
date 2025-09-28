// App.tsx
import React, { useState } from 'react';
import { Button, Text, FlatList, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { loginAndGetToken } from './src/auth/msalClient';

const API_BASE = 'https://localhost:4000'; // device may need your machine IP

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [foods, setFoods] = useState<any[]>([]);

  async function signIn() {
    const res = await loginAndGetToken();
    setToken(res.accessToken);
  }

  async function loadFoods() {
    if (!token) return;
    const r = await axios.get(`${API_BASE}/api/foods`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFoods(r.data);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <Button title={token ? 'Signed In' : 'Sign In'} onPress={signIn} />
        <View style={{ height: 12 }} />
        <Button title="Load Foods" onPress={loadFoods} disabled={!token} />
        <FlatList
          data={foods}
          keyExtractor={(x) => x._id}
          renderItem={({ item }) => <Text>{item.name} — {item.calories} kcal</Text>}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}