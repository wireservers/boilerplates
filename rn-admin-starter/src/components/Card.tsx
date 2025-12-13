import { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "@gluestack-ui/themed";

type Props = {
  title?: string;
  className?: string;
  children?: ReactNode;
};

export default function Card({ title, className, children }: Props) {
  return (
    <View className={`rounded-2xl p-4 shadow ${className ?? ""}`}>
      {title ? <Text className="text-base font-semibold mb-2">{title}</Text> : null}
      {children}
    </View>
  );
}