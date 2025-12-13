import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from "victory-native";
import { View } from "react-native";

export default function ChartLine() {
  return (
    <View className="w-full h-48">
      <VictoryChart theme={VictoryTheme.material} height={180}>
        <VictoryAxis tickFormat={(t) => `W${t}`} />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]}
        />
      </VictoryChart>
    </View>
  );
}