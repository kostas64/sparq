import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Text from "./Text";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Button = ({ label, onPress, disabled, style }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={style}
      className="w-full py-4 items-center rounded-full"
    >
      <Text className="text-white font-black text-lg">{label}</Text>
    </Pressable>
  );
};

export default Button;
