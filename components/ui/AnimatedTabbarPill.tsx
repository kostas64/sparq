import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type AnimatedTabbarPillProps = {
  totalLength: number;
  sectionLength: number;
  selectedIndex: SharedValue<number>;
};

const AnimatedTabbarPill = ({
  selectedIndex,
  totalLength,
  sectionLength,
}: AnimatedTabbarPillProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    height: 48,
    width: 64,
    borderWidth: StyleSheet.hairlineWidth,
    transform: [
      {
        translateX: interpolate(
          selectedIndex.value,
          [0, totalLength],
          [0, sectionLength * totalLength]
        ),
      },
    ],
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="absolute bg-sparq-ui-10 rounded-full self-center border-sparq-border-00"
    />
  );
};

export default AnimatedTabbarPill;
