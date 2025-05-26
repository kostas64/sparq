import { CAR_HEIGHT, WIDTH } from "@/constants/Constants";
import { CarType } from "@/types";
import React, { useCallback, useEffect } from "react";
import { Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ACTION_WIDTH = CAR_HEIGHT;
const ACTION_COUNT = 3;
const MAX_TRANSLATE_X = -ACTION_WIDTH * ACTION_COUNT;
const MAX_TRANSLATE_FULL_WIDTH = WIDTH;

type SwipeableItemProps = {
  children: React.ReactNode;
  index: number;
  itemToDelete: SharedValue<number | null>;
  disabled?: boolean;
  actions: {
    component: React.ReactNode;
    backgroundColor: string;
    onPress?: (index: number) => void;
  }[];
  selectedCar: CarType;
  deleting: SharedValue<number>;
  progress: SharedValue<number>;
  setIsSwiping: (isSwiping: boolean) => void;
  extendSwipableActionProgress: SharedValue<number>;
};

const SwipeableItem = ({
  index: parentIndex,
  itemToDelete,
  children,
  disabled,
  actions,
  selectedCar,
  progress,
  deleting,
  setIsSwiping,
  extendSwipableActionProgress,
}: SwipeableItemProps) => {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const deleted = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
    })
    .onStart(() => {
      runOnJS(setIsSwiping)(true);
    })
    .onUpdate((e) => {
      const nextX = startX.value + e.translationX;
      translateX.value = Math.max(Math.min(nextX, 0), MAX_TRANSLATE_X);
    })
    .onEnd(() => {
      const shouldOpen =
        Math.abs(translateX.value) > Math.abs(MAX_TRANSLATE_X / 3);
      translateX.value = withTiming(shouldOpen ? MAX_TRANSLATE_X : 0, {
        duration: 200,
      });
    })
    .onFinalize(() => {
      runOnJS(setIsSwiping)(false);
    })
    .activeOffsetX([-40, 40]);

  const animStyle = useAnimatedStyle(() => {
    if (
      extendSwipableActionProgress.value > 0 &&
      itemToDelete.value === parentIndex
    ) {
      return {
        height: interpolate(
          deleting.value,
          [0, 1],
          [CAR_HEIGHT, 0],
          Extrapolation.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              extendSwipableActionProgress.value,
              [0, 1],
              [translateX.value, 2 * translateX.value],
              Extrapolation.CLAMP
            ),
          },
        ],
      };
    }

    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useDerivedValue(() => {
    if (deleting.value === 1 && itemToDelete.value === parentIndex) {
      deleted.value = true;
    }
  });

  const containerStyle = useAnimatedStyle(() => {
    if (
      extendSwipableActionProgress.value > 0 &&
      itemToDelete.value === parentIndex
    ) {
      return {
        marginBottom: interpolate(
          deleting.value,
          [0, 1],
          [4, 0],
          Extrapolation.CLAMP
        ),
      };
    }

    if (deleted.value) {
      return {
        marginBottom: 0,
      };
    }

    return {
      marginBottom: 4,
    };
  });

  const action1Style = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateX.value,
        [0, MAX_TRANSLATE_X],
        [0, ACTION_WIDTH],
        Extrapolation.CLAMP
      ),
    };
  });

  const action2Style = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateX.value,
        [MAX_TRANSLATE_X / 3, MAX_TRANSLATE_X],
        [0, ACTION_WIDTH],
        Extrapolation.CLAMP
      ),
    };
  });

  const action3Style = useAnimatedStyle(() => {
    if (
      extendSwipableActionProgress.value > 0 &&
      itemToDelete.value === parentIndex
    ) {
      return {
        width: interpolate(
          extendSwipableActionProgress.value,
          [0, 1],
          [ACTION_WIDTH, MAX_TRANSLATE_FULL_WIDTH],
          Extrapolation.CLAMP
        ),
      };
    }

    return {
      width: interpolate(
        translateX.value,
        [MAX_TRANSLATE_X * 0.8, MAX_TRANSLATE_X],
        [0, ACTION_WIDTH],
        Extrapolation.CLAMP
      ),
    };
  });

  const closeActions = useCallback(() => {
    translateX.value = withTiming(0, {
      duration: 200,
    });
  }, [translateX]);

  useDerivedValue(() => {
    if (progress.value === 0 && translateX.value < 0) {
      runOnJS(closeActions)();
      extendSwipableActionProgress.value = 0;
      itemToDelete.value = null;
    }
  });

  useEffect(() => {
    closeActions();
  }, [selectedCar, closeActions]);

  if (disabled) {
    return (
      <Animated.View className="w-full" style={containerStyle}>
        {children}
      </Animated.View>
    );
  }

  return (
    <Animated.View className="w-full overflow-hidden" style={containerStyle}>
      {/* Background action buttons */}
      <View className="absolute right-0 top-0 bottom-0 flex-row z-0">
        {actions.map(({ component, backgroundColor, onPress }, index) => (
          <Animated.View
            key={index}
            style={[
              index === 0
                ? action1Style
                : index === 1
                  ? action2Style
                  : action3Style,
            ]}
            className="justify-center items-center overflow-hidden"
          >
            <Pressable
              style={{ backgroundColor }}
              className="h-full w-full justify-center items-center"
              onPress={() => onPress?.(parentIndex)}
            >
              {component}
            </Pressable>
          </Animated.View>
        ))}
      </View>

      {/* Foreground swipeable content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animStyle} className="z-10">
          {children}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default SwipeableItem;
