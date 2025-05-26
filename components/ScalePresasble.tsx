import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ScalePresasbleProps = {
  children: React.ReactNode;
  className?: string;
} & PressableProps;

const ScalePresasble = ({ children, ...props }: ScalePresasbleProps) => {
  const scale = useSharedValue(1);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withTiming(0.95, { duration: 200 });
  };

  const onPressOut = () => {
    scale.value = withTiming(1);
  };

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={style}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};

export default ScalePresasble;

const styles = StyleSheet.create({});
