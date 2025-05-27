import Plus from "@/assets/images/svg/plus.svg";
import React from "react";
import { View } from "react-native";

const FloatingPlusButton = () => {
  return (
    <View className="bg-primary px-6 py-4 rounded-full">
      <Plus />
    </View>
  );
};

export default FloatingPlusButton;
