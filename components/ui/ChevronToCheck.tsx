import { SLIDER_FINAL_W, SLIDER_W } from "@/constants/Constants";
import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type ChevronToCheckProps = {
  progress: SharedValue<number>;
  opacity: SharedValue<number>;
};

const ChevronToCheck = ({ progress, opacity }: ChevronToCheckProps) => {
  const animatedLine1 = useAnimatedStyle(() => ({
    width: 3,
    height: interpolate(progress.value, [SLIDER_W, SLIDER_FINAL_W], [12, 18]),
    transform: [
      { rotate: "-45deg" },
      {
        translateY: interpolate(
          progress.value,
          [SLIDER_W, SLIDER_FINAL_W],
          [-3, -4]
        ),
      },
      {
        translateX: interpolate(
          progress.value,
          [SLIDER_W, SLIDER_FINAL_W],
          [2, 1.5]
        ),
      },
    ],
    opacity: interpolate(opacity.value, [0, 0.05], [1, 0], Extrapolation.CLAMP),
  }));

  const animatedLine2 = useAnimatedStyle(() => ({
    width: 3,
    height: 12,
    transform: [
      { rotate: "45deg" },
      {
        translateY: interpolate(
          progress.value,
          [SLIDER_W, SLIDER_FINAL_W],
          [3, 3]
        ),
      },
      {
        translateX: interpolate(
          progress.value,
          [SLIDER_W, SLIDER_FINAL_W],
          [2, 4]
        ),
      },
    ],
    opacity: interpolate(opacity.value, [0, 0.05], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View
      className="items-center justify-center"
      style={{ height: 24, width: 24 }}
    >
      <Animated.View className="bg-white rounded-full" style={animatedLine1} />
      <Animated.View
        className="absolute w-4 h-4 bg-white rounded-full"
        style={animatedLine2}
      />
    </View>
  );
};

export default ChevronToCheck;
