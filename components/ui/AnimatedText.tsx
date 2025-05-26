import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { SLIDER_W } from "@/constants/Constants";

type AnimatedTextProps = {
  index: number;
  char: string;
  totalCharsLength: number;
  coloring: SharedValue<number>;
  sliderWidth: SharedValue<number>;
  maxFontSizeMultiplier?: number;
};

const AnimatedText = ({
  index,
  char,
  coloring,
  sliderWidth,
  totalCharsLength,
  maxFontSizeMultiplier,
}: AnimatedTextProps) => {
  const textColor = useAnimatedStyle(() => {
    const interval = 1 / (totalCharsLength + 8);

    return {
      opacity: interpolate(sliderWidth.value, [SLIDER_W, 260], [0.5, 0]),
      color: interpolateColor(
        coloring.value,
        [
          0.2 + (index - 3) * interval,
          0.2 + (index - 2) * interval,
          0.2 + (index - 1) * interval,
          0.2 + index * interval,
          0.2 + (index + 1) * interval,
          0.2 + (index + 2) * interval,
          0.2 + (index + 3) * interval,
        ],
        [
          "#FE522E",
          "#ff6161",
          "#ffad9c",
          "#ffffff",
          "#ffad9c",
          "#ff6161",
          "#FE522E",
        ]
      ),
    };
  });

  return (
    <Animated.Text
      className="font-heavy"
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      key={`index-${index}`}
      style={[textColor, styles.text]}
    >
      {char}
    </Animated.Text>
  );
};

export default AnimatedText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
