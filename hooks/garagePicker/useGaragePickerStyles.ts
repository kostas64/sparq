import { HEIGHT } from "@/constants/Constants";
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type GaragePickerStyleProps = {
  scrollY: SharedValue<number>;
  dismiss: SharedValue<boolean>;
  progress: SharedValue<number>;
  isOverShooting: SharedValue<boolean>;
  shouldExtend: SharedValue<boolean>;
  progressSelection: SharedValue<number>;
  initiaListHeight: number;
  scaledListHeight: number;
};

const useGaragePickerStyles = ({
  scrollY,
  dismiss,
  progress,
  isOverShooting,
  shouldExtend,
  initiaListHeight,
  scaledListHeight,
  progressSelection,
}: GaragePickerStyleProps) => {
  const listAnimatedStyle = useAnimatedStyle(() => ({
    overflow:
      scrollY.value > 0 || progressSelection.value > 0.99
        ? "hidden"
        : "visible",
  }));

  const containerStyle = useAnimatedStyle(() => {
    // Picker will fully close
    if (dismiss.value) {
      return {
        height: withTiming(0, {}, () => {
          dismiss.value = false;
        }),
        transform: [
          {
            translateY: interpolate(
              progress.value,
              [0, 0.3],
              [-200, 0],
              Extrapolation.CLAMP
            ),
          },
        ],
      };
    }

    // Picker will animate to full height
    if (isOverShooting.value && shouldExtend.value) {
      return {
        height: interpolate(
          progress.value,
          [1.1, 2],
          [initiaListHeight, HEIGHT + 24],
          Extrapolation.CLAMP
        ),
      };
    }

    // Picker will animate to the first position (5 cars visible)
    return {
      height: interpolate(
        progress.value,
        [0.2, 0.65, 1],
        [0, scaledListHeight, initiaListHeight],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 0.3],
            [-200, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  // Translate header
  const headerLeftPartStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [1.25, 2],
          [-36, -4],
          Extrapolation.CLAMP
        ),
      },
    ],
    gap: 8,
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [1, 2], [1, 0], Extrapolation.CLAMP),
  }));

  const backdrop = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 0.4], Extrapolation.CLAMP),
  }));

  const chevron = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [1.75, 2],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return {
    chevron,
    containerStyle,
    headerLeftPartStyle,
    footerStyle,
    backdrop,
    listAnimatedStyle,
  };
};

export default useGaragePickerStyles;
