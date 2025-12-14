import React from 'react';
import { View, Text } from 'react-native';

type MetricCardProps = {
  label: string;
  value: string;
};

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => {
  return (
    <View className="bg-slate-950 rounded-2xl px-4 py-3 min-w-[150px] flex-1">
      <Text className="text-[11px] text-slate-400 mb-1 uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-2xl font-semibold text-emerald-300">{value}</Text>
    </View>
  );
};

export default MetricCard;
