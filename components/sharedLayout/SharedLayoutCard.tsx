import Close from "@/assets/images/svg/close.svg";
import {
  CAR_H,
  CAR_W,
  SMALL_MAX_MULTIPLIER,
  SPRING_ANIM_CONFIG,
} from "@/constants/Constants";
import useShareTransitionStyles from "@/hooks/sharedTransitionLayout/useShareTransitionStyles";
import React from "react";
import { LayoutChangeEvent, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScalePresasble from "../ScalePresasble";
import Text from "../ui/Text";
import CarSectionBox from "./CarSectionBox";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const SharedLayoutCard = () => {
  const progress = useSharedValue(0);
  const initialHeight = useSharedValue(0);

  const insets = useSafeAreaInsets();
  const tabbarSpace = insets.bottom > 0 ? insets.bottom + 16 : 32;

  const {
    backdrop,
    parentContainerAnimatedStyle,
    containerAnimatedStyle,
    closeAnimatedStyle,
    titleAnimatedStyle,
    carAnimatedStyle,
    goodCareAnimatedStyle,
    cardBottomPartAnimatedStyle,
    animatedScrollProps,
  } = useShareTransitionStyles({
    initialHeight,
    progress,
    tabbarSpace,
  });

  const triggerTransition = (shouldOpen = true) => {
    const toValue = shouldOpen ? 1 : 0;
    progress.value = withSpring(toValue, SPRING_ANIM_CONFIG);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;

    if (!initialHeight.value) {
      initialHeight.value = height;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatedPressable
        style={backdrop}
        onPress={() => triggerTransition(false)}
        className="absolute w-full h-full bg-black"
      />

      <Animated.View style={parentContainerAnimatedStyle}>
        <ScalePresasble onPress={() => triggerTransition(true)}>
          <Animated.View
            onLayout={onLayout}
            style={containerAnimatedStyle}
            className="bg-background-secondary pl-4 pb-5 rounded-3xl overflow-hidden"
          >
            <AnimatedScrollView
              animatedProps={animatedScrollProps}
              showsVerticalScrollIndicator={false}
            >
              <AnimatedPressable
                style={closeAnimatedStyle}
                hitSlop={24}
                onPress={() => triggerTransition(false)}
              >
                <Close onPress={() => triggerTransition(false)} />
              </AnimatedPressable>
              <Animated.Image
                source={require("@/assets/images/cars/activity_car.png")}
                style={[styles.car, carAnimatedStyle]}
              />

              <Animated.View style={titleAnimatedStyle}>
                <Text className="font-heavy text-xs pb-1 text-light-grey">
                  QUICK TIPS
                </Text>
                <Animated.Text
                  style={goodCareAnimatedStyle}
                  maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
                  className="font-heavy text-2xl text-primary"
                >
                  Taking good care
                </Animated.Text>

                <Text
                  maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
                  className="font-heavy text-2xl text-too-grey"
                >
                  of your vehicle
                </Text>
              </Animated.View>

              {/* Part below initial card */}
              <Animated.View
                style={cardBottomPartAnimatedStyle}
                className="pr-4 gap-4"
              >
                <CarSectionBox
                  index={"01"}
                  title={"Change the engine oil regularly"}
                  description={
                    "Engine oil keeps vital parts of the engine lubricated. If the engine isn’t lubricated enough, the parts will wear and tear due to friction. Therefore, it’s important to change the engine oil."
                  }
                />

                <CarSectionBox
                  index={"02"}
                  title={"Change the engine oil regularly"}
                  description={
                    "Engine oil keeps vital parts of the engine lubricated. If the engine isn’t lubricated enough, the parts will wear and tear due to friction. Therefore, it’s important to change the engine oil."
                  }
                />

                <CarSectionBox
                  index={"03"}
                  title={"Change the engine oil regularly"}
                  description={
                    "Engine oil keeps vital parts of the engine lubricated. If the engine isn’t lubricated enough, the parts will wear and tear due to friction. Therefore, it’s important to change the engine oil."
                  }
                />
              </Animated.View>
            </AnimatedScrollView>
          </Animated.View>
        </ScalePresasble>
      </Animated.View>
    </>
  );
};

export default SharedLayoutCard;

const styles = StyleSheet.create({
  car: {
    width: CAR_W,
    height: CAR_H,
    marginTop: 48,
    marginBottom: 21,
    left: CAR_W / 3.5,
  },
});
