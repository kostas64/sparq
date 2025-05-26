import colors from "@/assets/colors";
import { CAR_HEIGHT, WIDTH } from "@/constants/Constants";
import React from "react";
import { Pressable } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { LinearGradient, Rect, Stop } from "react-native-svg";

type AnimatedPillProps = {
  scrollY: SharedValue<number>;
  onPress: () => void;
};

const AnimatedPill = ({ scrollY, onPress }: AnimatedPillProps) => {
  const leftPill = useAnimatedStyle(() => ({
    height: 4,
    width: 18,
    left: 3,
    transform: [
      {
        rotate: `${interpolate(scrollY.value, [0, CAR_HEIGHT * 2], [0, 35], Extrapolation.CLAMP)}deg`,
      },
      {
        translateX: interpolate(
          scrollY.value,
          [0, CAR_HEIGHT, CAR_HEIGHT * 2],
          [0, -2, -1],
          Extrapolation.CLAMP
        ),
      },
      {
        translateY: interpolate(
          scrollY.value,
          [0, CAR_HEIGHT],
          [0, -2],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const rightPill = useAnimatedStyle(() => ({
    height: 4,
    width: 18,
    right: 3,
    transform: [
      {
        rotate: `-${interpolate(scrollY.value, [0, CAR_HEIGHT * 2], [0, 35], Extrapolation.CLAMP)}deg`,
      },
      {
        translateX: interpolate(
          scrollY.value,
          [0, CAR_HEIGHT, CAR_HEIGHT * 2],
          [0, 2, 1],
          Extrapolation.CLAMP
        ),
      },
      {
        translateY: interpolate(
          scrollY.value,
          [0, CAR_HEIGHT],
          [0, -2],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <Pressable
      onPress={onPress}
      className="flex-row pb-2 items-center justify-center"
    >
      <Svg width={WIDTH} height={64} style={{ position: "absolute" }}>
        <LinearGradient
          id={"tabbarBackground"}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <Stop
            offset="0%"
            stopOpacity="0"
            stopColor={colors["background-white"]}
          />
          <Stop
            offset="60%"
            stopOpacity="1"
            stopColor={colors["background-white"]}
          />
        </LinearGradient>
        <Rect width={WIDTH} height={40} fill={"url(#tabbarBackground)"} />
      </Svg>
      <Animated.View style={leftPill} className="bg-light-grey rounded-md" />
      <Animated.View style={rightPill} className="bg-light-grey rounded-md" />
    </Pressable>
  );
};

export default AnimatedPill;
