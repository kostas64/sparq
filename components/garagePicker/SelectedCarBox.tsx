import colors from "@/assets/colors";
import { CAR_HEIGHT, SMALL_MAX_MULTIPLIER, WIDTH } from "@/constants/Constants";
import { CarType } from "@/types";
import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Chevron from "../../assets/images/svg/cheveron-right.svg";

type SelectedCarBoxProps = {
  isInternal?: boolean;
  selectedCarRef?: React.RefObject<any>;
  selectedCar: CarType;
  onPress?: () => void;
  pickerWidth?: SharedValue<number>;
  progressArrow: SharedValue<number>;
  progressSelection: SharedValue<number>;
  containerStyle: StyleProp<ViewStyle>;
};

const AnimatedChevron = Animated.createAnimatedComponent(Chevron);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SelectedCarBox = ({
  isInternal,
  selectedCarRef,
  selectedCar,
  progressArrow,
  progressSelection,
  onPress,
  pickerWidth,
  containerStyle,
}: SelectedCarBoxProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    if (!pickerWidth?.value) {
      return {
        backgroundColor: interpolateColor(
          progressSelection.value,
          [0, 1],
          ["rgb(221, 221, 221)", "rgb(210, 210, 210)"]
        ),
        borderColor: interpolateColor(
          progressSelection.value,
          [0, 0.1, 1],
          ["rgb(194, 194, 194)", "rgb(194, 194, 194)", "rgb(210, 210, 210)"]
        ),
        height: interpolate(
          progressSelection.value,
          [0, 1],
          [30, CAR_HEIGHT],
          Extrapolation.CLAMP
        ),
      };
    }

    return {
      backgroundColor: interpolateColor(
        progressSelection.value,
        [0, 1],
        ["rgb(221, 221, 221)", "rgb(210, 210, 210)"]
      ),
      borderColor: interpolateColor(
        progressSelection.value,
        [0, 0.1, 1],
        ["rgb(194, 194, 194)", "rgb(194, 194, 194)", "rgb(210, 210, 210)"]
      ),
      width: interpolate(
        progressSelection.value,
        [0, 1],
        [pickerWidth.value, WIDTH - 40],
        Extrapolation.CLAMP
      ),
      height: interpolate(
        progressSelection.value,
        [0, 1],
        [30, CAR_HEIGHT],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            progressSelection.value,
            [0, 1],
            [isInternal ? -32 : 0, 0]
          ),
        },
      ],
    };
  });

  const nameAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progressSelection.value, [0, 1], [0, 14]) },
      { translateX: interpolate(progressSelection.value, [0, 1], [0, 98]) },
    ],
  }));

  const milesAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progressSelection.value,
      [0.5, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      { translateY: interpolate(progressSelection.value, [0, 1], [0, 40]) },
      { translateX: interpolate(progressSelection.value, [0, 1], [0, 110]) },
    ],
  }));

  const chevronAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progressArrow.value,
      [0, 0.1],
      [1, 0],
      Extrapolation.CLAMP
    ),
    transform: [
      { rotate: "90deg" },
      {
        translateY: interpolate(
          progressArrow.value,
          [0, 0.1],
          [0, WIDTH],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <>
      <AnimatedPressable
        onPress={onPress}
        ref={selectedCarRef}
        style={[containerAnimatedStyle, containerStyle]}
        className="flex-row gap-1 px-3 py-2 border border-sparq-ui-30 rounded-3xl self-start"
      >
        <Animated.Text
          style={nameAnimatedStyle}
          maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
          className="font-heavy align-middle text-14/4"
        >
          {selectedCar.name}
        </Animated.Text>
        <AnimatedChevron
          width={14}
          height={14}
          fill={colors?.["too-grey"]}
          style={chevronAnimatedStyle}
        />
      </AnimatedPressable>
      <View style={containerStyle}>
        <Animated.Text
          style={milesAnimatedStyle}
          maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
          className="absolute font-medium text-xs text-sparq-ui-40"
        >
          {selectedCar.miles}
        </Animated.Text>
      </View>
    </>
  );
};

export default SelectedCarBox;
