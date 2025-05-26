import { useEffect } from "react";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

import { SPRING_ANIM_CONFIG } from "@/constants/Constants";
import { StyleProp, ViewStyle } from "react-native";

type SlideInTrantitionProps = {
  index?: number;
  children: React.ReactNode;
  direction?: "up";
  delay?: number;
  animate: boolean;
  distanceToTravel?: number;
  withFade?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onFinish?: () => void;
};

const DEFAULT_DELAY = 75;
const DEFAULT_DISTANCE_TO_TRAVEL = 75;

const SlideInTrantition = ({
  index = 0,
  children,
  animate,
  delay = DEFAULT_DELAY,
  distanceToTravel = DEFAULT_DISTANCE_TO_TRAVEL,
  direction = "up",
  containerStyle,
  withFade,
  onFinish,
}: SlideInTrantitionProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      progress.value = withDelay(
        index * delay,
        withSpring(1, SPRING_ANIM_CONFIG, (finished) => {
          if (finished) {
            !!onFinish && runOnJS(onFinish)();
          }
        })
      );
    }
  }, [progress, index, delay, animate, onFinish]);

  const style = useAnimatedStyle(() => {
    //Direction up
    if (direction === "up") {
      return {
        opacity: withFade ? progress.value : 1,
        transform: [
          {
            translateY: interpolate(
              progress.value,
              [0, 1],
              [distanceToTravel, 0]
            ),
          },
        ],
      };
    }

    return {};
  });

  return (
    <Animated.View style={[containerStyle, style]}>{children}</Animated.View>
  );
};

export default SlideInTrantition;
