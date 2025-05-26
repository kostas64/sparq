import React from "react";
import { View } from "react-native";

import ScalePresasble from "@/components/ScalePresasble";
import Text from "@/components/ui/Text";
import { MEDIUM_MAX_MULTIPLIER } from "@/constants/Constants";
import { router } from "expo-router";
import Arrow from "../../assets/images/svg/arrow-narrow-right.svg";

type ItemProps = {
  title: string;
  caption: string;
  onPress: () => void;
};

const Item = ({ title, caption, onPress }: ItemProps) => {
  return (
    <ScalePresasble
      onPress={onPress}
      className="bg-background-light mx-4 p-4 rounded-lg "
    >
      <Text
        maxFontSizeMultiplier={MEDIUM_MAX_MULTIPLIER}
        className="font-medium text-xl text-black"
      >
        {title}
      </Text>
      <Text
        maxFontSizeMultiplier={MEDIUM_MAX_MULTIPLIER}
        className="font-roman text-sm text-too-grey"
      >
        {caption}
      </Text>
      <View className="absolute bottom-0 right-0 m-4">
        <Arrow width={24} height={18} />
      </View>
    </ScalePresasble>
  );
};

const ChooseExample = () => {
  return (
    <View className="flex-1 justify-center gap-4 bg-background">
      <Text
        maxFontSizeMultiplier={MEDIUM_MAX_MULTIPLIER}
        className="font-medium text-2xl text-black px-4"
      >
        Choose example
      </Text>
      <Item
        title="Garage Picker Component"
        onPress={() => router.navigate("/picker")}
        caption="The component simulates a car selection UI"
      />
      <Item
        title="Rest of Examples"
        caption="S2S Transition"
        onPress={() => router.navigate("/(initial)/(tabs)")}
      />
    </View>
  );
};

export default ChooseExample;
