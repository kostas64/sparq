import {
  SLIDER_FINAL_W,
  SLIDER_H,
  SLIDER_W,
  SMALL_MAX_MULTIPLIER,
  WIDTH,
} from "@/constants/Constants";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import AnimatedText from "./AnimatedText";
import ChevronToCheck from "./ChevronToCheck";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SlideToAdd = ({ label = "slide to add" }) => {
  const chars = label.split("");

  const sliderWidth = useSharedValue(SLIDER_W);
  const coloring = useSharedValue(0);
  const reachEnd = useSharedValue(false);
  const finishProgress = useSharedValue(0);
  const animateToLaunch = useSharedValue(0);

  const totalCharsLength = chars.length;

  const animatedSliderBackground = useAnimatedStyle(() => {
    return {
      width: sliderWidth.value,
      transform: [{ translateX: SLIDER_W - sliderWidth.value }],
    };
  });

  const powerBtn = useAnimatedStyle(() => {
    let common = {
      opacity: interpolate(finishProgress.value, [0, 1], [1, 0]),
      transform: [
        { scale: interpolate(finishProgress.value, [0, 0.2, 1], [1, 1.14, 0]) },
        {
          rotate: `${interpolate(sliderWidth.value, [SLIDER_W, SLIDER_FINAL_W], [0, 80])}deg`,
        },
      ],
      left: interpolate(
        sliderWidth.value,
        [SLIDER_W, SLIDER_FINAL_W],
        [6, WIDTH - 122]
      ),
    };

    if (animateToLaunch.value > 0) {
      common = {
        ...common,
        transform: [
          {
            scale: interpolate(animateToLaunch.value, [0, 1], [1, 36]),
          },
          {
            rotate: `${interpolate(sliderWidth.value, [SLIDER_W, SLIDER_FINAL_W], [0, 80])}deg`,
          },
        ],
      };
    } else {
      common = {
        ...common,
        transform: [
          {
            scale: interpolate(finishProgress.value, [0, 0.2, 1], [1, 1.14, 0]),
          },
          {
            rotate: `${interpolate(sliderWidth.value, [SLIDER_W, SLIDER_FINAL_W], [0, 80])}deg`,
          },
        ],
      };
    }

    return common;
  });

  // Pan gesture for sliding the slider
  const gesture = Gesture.Pan()
    .onChange((e) => {
      if (reachEnd.value && e.translationX > 0) {
        return;
      }

      if (e.translationX < 0) {
        sliderWidth.value = Math.min(SLIDER_W, 74 + Math.abs(e.translationX));
      } else {
        const nextWidth = SLIDER_W - e.translationX;
        sliderWidth.value = Math.max(SLIDER_FINAL_W, nextWidth);
      }
    })
    .onFinalize(() => {
      const shouldComplete =
        SLIDER_W - sliderWidth.value <= (SLIDER_W - 64) / 2;
      reachEnd.value = shouldComplete;

      sliderWidth.value = withTiming(
        shouldComplete ? SLIDER_W : SLIDER_FINAL_W
      );

      if (shouldComplete) {
        reachEnd.value = false;
      } else {
        reachEnd.value = true;
      }
    });

  const navToHome = () => {
    router.replace("/(initial)/(tabs)");
  };

  const onPressVerify = () => {
    if (!reachEnd.value) {
      return;
    }

    animateToLaunch.value = withTiming(1, { duration: 750 }, () => {
      runOnJS(navToHome)();
    });
  };

  React.useEffect(() => {
    const timing = withTiming(1, { duration: 1000 });
    coloring.value = withRepeat(withDelay(750, timing), 0);
  }, [coloring]);

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderInnerContainer}>
          <View
            style={{
              width: SLIDER_W,
              height: SLIDER_H,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 1,
              zIndex: 10,
            }}
          >
            {chars.map((char, index) => (
              <AnimatedText
                key={`index-${index}`}
                char={char}
                index={index}
                coloring={coloring}
                sliderWidth={sliderWidth}
                maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
                totalCharsLength={totalCharsLength}
              />
            ))}
          </View>

          <Animated.View
            className="absolute bg-sparq-ui-110"
            style={[
              {
                borderRadius: 40,
                height: SLIDER_H,
              },
              animatedSliderBackground,
            ]}
          />
        </View>

        <AnimatedPressable
          hitSlop={16}
          onPress={onPressVerify}
          className="z-50 bg-oh-so-orange"
          style={[powerBtn, styles.powerBtn]}
        >
          <ChevronToCheck progress={sliderWidth} opacity={animateToLaunch} />
        </AnimatedPressable>
      </View>
    </GestureDetector>
  );
};

export default SlideToAdd;

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "row",
    height: SLIDER_H,
    borderRadius: 60,
  },
  sliderInnerContainer: {
    width: SLIDER_W,
  },
  powerBtn: {
    position: "absolute",
    padding: 20,
    borderRadius: 100,
    top: 6,
  },
});
