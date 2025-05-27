import colors, { primary } from "@/assets/colors";
import { CAR_H, HEIGHT, WIDTH } from "@/constants/Constants";
import {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";

type ShareTransitionStyleProps = {
  progress: SharedValue<number>;
  initialHeight: SharedValue<number>;
  tabbarSpace: number;
};

const useShareTransitionStyles = ({
  progress,
  initialHeight,
  tabbarSpace,
}: ShareTransitionStyleProps) => {
  const backdrop = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0.8, 1],
      [0, 0.4],
      Extrapolation.CLAMP
    ),
  }));

  const parentContainerAnimatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    bottom: interpolate(progress.value, [0, 1], [42, -tabbarSpace]),
    alignSelf: "center",
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const initialStyle = {
      width: interpolate(
        progress.value,
        [0, 1],
        [WIDTH - 42, WIDTH],
        Extrapolation.CLAMP
      ),
      position: "absolute",
      alignSelf: "center",
      bottom: 0,
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors?.["background-secondary"], colors?.["background"]]
      ),
    } as const;

    if (!initialHeight.value) {
      return initialStyle;
    }

    return {
      ...initialStyle,
      height: interpolate(
        progress.value,
        [0, 1],
        [initialHeight.value, HEIGHT * 0.8]
      ),
    };
  });

  const closeAnimatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: 1000,
    top: 24,
    right: 24,
    opacity: interpolate(
      progress.value,
      [0.5, 0.75],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -CAR_H * 1.3]) },
      { translateX: interpolate(progress.value, [0, 1], [0, 4]) },
    ],
  }));

  const carAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, 64]) }],
  }));

  const goodCareAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [primary, colors?.["too-grey"]]
    ),
  }));

  const cardBottomPartAnimatedStyle = useAnimatedStyle(() => ({
    display: progress.value > 0.9 ? "flex" : "none",
    opacity: interpolate(progress.value, [0.9, 1], [0, 1], Extrapolation.CLAMP),
    paddingBottom: progress.value === 0 ? 0 : 200,
  }));

  const animatedScrollProps = useAnimatedProps(() => ({
    scrollEnabled: progress.value === 1,
  }));

  return {
    backdrop,
    parentContainerAnimatedStyle,
    containerAnimatedStyle,
    closeAnimatedStyle,
    titleAnimatedStyle,
    carAnimatedStyle,
    goodCareAnimatedStyle,
    cardBottomPartAnimatedStyle,
    animatedScrollProps,
  };
};

export default useShareTransitionStyles;
