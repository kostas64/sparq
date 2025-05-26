import { EnteringExitingAnimationType, LayoutAnimationType } from "@/types";
import { ViewProps } from "react-native";
import Animated, { useReducedMotion } from "react-native-reanimated";

type AnimatedViewProps = {
  entering?: EnteringExitingAnimationType;
  exiting?: EnteringExitingAnimationType;
  layout?: LayoutAnimationType;
  children: React.ReactNode;
} & ViewProps;

const AnimatedView = ({
  entering,
  exiting,
  layout,
  children,
  ...props
}: AnimatedViewProps) => {
  const isReducedMotionEnabled = useReducedMotion();

  const enteringAnimation = !isReducedMotionEnabled ? entering : undefined;
  const exitingAnimation = !isReducedMotionEnabled ? exiting : undefined;
  const layoutTransition = !isReducedMotionEnabled ? layout : undefined;

  return (
    <Animated.View
      exiting={exitingAnimation}
      entering={enteringAnimation}
      layout={layoutTransition}
      {...props}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
