import Arrow from "@/assets/images/svg/arrow-narrow-right.svg";
import { MEDIUM_MAX_MULTIPLIER } from "@/constants/Constants";
import React from "react";
import { Text, View } from "react-native";
import ScalePresasble from "../ScalePresasble";
import SlideInTrantition from "./SlideInTransition";

type ItemProps = {
  title: string;
  animate: boolean;
  caption: string;
  index: number;
  onPress: () => void;
};

const ExampleBox = ({ title, index, caption, animate, onPress }: ItemProps) => {
  return (
    <SlideInTrantition
      animate={animate}
      withFade
      index={index}
      delay={300}
      distanceToTravel={50}
    >
      <ScalePresasble
        onPress={onPress}
        className="bg-background-light mx-4 rounded-2xl"
      >
        <Text
          maxFontSizeMultiplier={MEDIUM_MAX_MULTIPLIER}
          className="font-medium text-xl p-4  text-black"
        >
          {caption}
        </Text>
        <View className="p-4 border-t border-sparq-ui-30 ">
          <Text
            maxFontSizeMultiplier={MEDIUM_MAX_MULTIPLIER}
            className="font-roman text-lg text-too-grey"
          >
            {title}
          </Text>
          <View className="absolute bottom-0 right-0 m-4">
            <Arrow width={24} height={18} />
          </View>
        </View>
      </ScalePresasble>
    </SlideInTrantition>
  );
};
export default ExampleBox;
