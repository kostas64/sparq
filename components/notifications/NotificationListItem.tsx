import { black } from "@/assets/colors";
import Icon from "@/assets/images/svg/Logo.svg";
import { NOTIFICATION_HEIGHT } from "@/constants/Constants";
import { NotificationListItemType } from "@/types";
import React, { memo } from "react";
import { Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type NotificationListItemProps = {
  item: NotificationListItemType;
  index: number;
  scrollY: SharedValue<number>;
};

const NotificationListItem = memo(
  ({ item, index, scrollY }: NotificationListItemProps) => {
    const animatedStyles = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [
            (index - 6) * NOTIFICATION_HEIGHT,
            (index - 5) * NOTIFICATION_HEIGHT,
            (index - 4) * NOTIFICATION_HEIGHT,
            (index - 3) * NOTIFICATION_HEIGHT,
            (index - 2) * NOTIFICATION_HEIGHT,
            (index - 1) * NOTIFICATION_HEIGHT,
          ],
          [0, 1, 1, 1, 1, 0],
          Extrapolation.CLAMP
        ),
        shadowColor: black,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [
                (index - 6) * NOTIFICATION_HEIGHT,
                (index - 5) * NOTIFICATION_HEIGHT,
                (index - 4) * NOTIFICATION_HEIGHT,
                (index - 3) * NOTIFICATION_HEIGHT,
                (index - 2) * NOTIFICATION_HEIGHT,
                (index - 1) * NOTIFICATION_HEIGHT,
                index * NOTIFICATION_HEIGHT,
              ],
              [-48, -8, 40, 88, 98, 86, 112],
              Extrapolation.CLAMP
            ),
          },
          {
            scale: interpolate(
              scrollY.value,
              [
                (index - 6) * NOTIFICATION_HEIGHT,
                (index - 5) * NOTIFICATION_HEIGHT,
                (index - 4) * NOTIFICATION_HEIGHT,
                (index - 3) * NOTIFICATION_HEIGHT,
                (index - 2) * NOTIFICATION_HEIGHT,
                (index - 1) * NOTIFICATION_HEIGHT,
                index * NOTIFICATION_HEIGHT,
              ],
              [0.63, 0.72, 0.81, 0.9, 1, 0.9],
              Extrapolation.CLAMP
            ),
          },
        ],
      };
    });

    const innerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        scrollY.value,
        [
          (index - 6) * NOTIFICATION_HEIGHT,
          (index - 5) * NOTIFICATION_HEIGHT,
          (index - 4) * NOTIFICATION_HEIGHT,
          (index - 3) * NOTIFICATION_HEIGHT,
          (index - 2) * NOTIFICATION_HEIGHT,
          (index - 1) * NOTIFICATION_HEIGHT,
          index * NOTIFICATION_HEIGHT,
        ],
        [0, 0, 0, 0.1, 1, 0, 0],
        Extrapolation.CLAMP
      ),
    }));

    return (
      <Animated.View
        style={animatedStyles}
        className="flex-row items-center gap-3 p-3 mx-7 bg-background-white rounded-3xl "
      >
        <Animated.View
          style={innerAnimatedStyle}
          className="flex-row items-center"
        >
          <View className="bg-primary p-2 mr-3 rounded-2xl">
            <Icon width={24} height={24} />
          </View>
          <View className="flex-1 " style={{ bottom: 3 }}>
            <View className="flex-row flex-1 items-center justify-between">
              <Text className="font-heavy">{item.title}</Text>
              <Text className="font-roman text-sm pr-1 text-light-grey">
                {"now"}
              </Text>
            </View>
            <Text className="font-roman">{item.description}</Text>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
);

NotificationListItem.displayName = "NotificationListItem";

export default NotificationListItem;
