import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";
import { View } from "react-native";

export default function ChartBar() {
  return (
    <View className="w-full h-48">
      <VictoryChart theme={VictoryTheme.material} height={180}>
        <VictoryAxis tickFormat={(t) => `Q${t}`} />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 5 },
            { x: 3, y: 2 },
            { x: 4, y: 6 },
          ]}
        />
      </VictoryChart>
    </View>
  );
}