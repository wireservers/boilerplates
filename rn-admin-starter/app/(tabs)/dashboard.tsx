import { ScrollView, View } from "react-native";
import { Text } from "@gluestack-ui/themed";
import Card from "@/components/Card";
import ChartLine from "@/components/ChartLine";
import ChartBar from "@/components/ChartBar";

export default function Dashboard() {
  return (
    <ScrollView className="flex-1 p-4 bg-neutral-50">
      <Text className="text-2xl font-bold mb-4">Dashboard</Text>

      <View className="flex-row gap-3 mb-4">
        <Card className="flex-1 bg-white">
          <Text className="text-neutral-500">Active Users</Text>
          <Text className="text-3xl font-bold mt-1">1,248</Text>
        </Card>
        <Card className="flex-1 bg-white">
          <Text className="text-neutral-500">Conversion</Text>
          <Text className="text-3xl font-bold mt-1">4.7%</Text>
        </Card>
      </View>

      <Card title="Weekly Throughput" className="bg-white mb-4">
        <ChartLine />
      </Card>

      <Card title="Quarterly Revenue" className="bg-white">
        <ChartBar />
      </Card>
    </ScrollView>
  );
}