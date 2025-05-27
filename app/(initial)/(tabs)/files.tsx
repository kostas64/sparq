import Hambuger from "@/assets/images/svg/Icon.svg";
import NotificationListItem from "@/components/notifications/NotificationListItem";
import {
  NOTIFICATION_HEIGHT,
  NOTIFICATION_INTERVAL,
  NOTIFICATIONS,
} from "@/constants/Constants";
import { NotificationListItemType } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const FilesScreen = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 8 : 24;

  const scrollRef = useRef<FlatList>(null);
  const timeout = useRef<number | null>(null);
  const scrollY = useSharedValue(0);
  const [notifications, setNotifications] =
    useState<NotificationListItemType[]>(NOTIFICATIONS);

  const renderItem = useCallback(
    ({ item, index }: { index: number; item: any }) => {
      return (
        <NotificationListItem item={item} index={index} scrollY={scrollY} />
      );
    },
    [scrollY]
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const CellRendererComponent = ({
    item,
    index,
    children,
    style,
    ...props
  }: {
    item: unknown;
    index: number;
    children: React.ReactNode;
    style: StyleProp<ViewStyle>;
  }) => {
    const newStyle = [style, { zIndex: 10000000000000 - index }];
    return (
      <View style={newStyle} {...props}>
        {children}
      </View>
    );
  };

  const generateNotifications = useCallback(() => {
    !!timeout.current && clearInterval(timeout.current);

    timeout.current = setInterval(() => {
      setNotifications((old) => [
        ...old,
        {
          ...NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)],
          id: old.length + 1,
        },
      ]);
    }, NOTIFICATION_INTERVAL);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToOffset({
      animated: true,
      offset: (notifications.length - 6) * NOTIFICATION_HEIGHT,
    });
  }, [notifications]);

  useEffect(() => {
    generateNotifications();

    return () => {
      !!timeout.current && clearInterval(timeout.current);
    };
  }, []);

  return (
    <View className="flex-1 bg-background" style={{ paddingTop }}>
      <Hambuger style={styles.spaceLeft} />

      <View style={styles.listContainer}>
        <AnimatedFlatList
          ref={scrollRef}
          onScroll={onScroll}
          data={notifications}
          windowSize={10}
          CellRendererComponent={CellRendererComponent}
          renderItem={renderItem}
          className="overflow-visible"
          //@ts-ignore
          keyExtractor={(item, index) => `${item.id}`}
        />
      </View>
    </View>
  );
};

export default FilesScreen;

const styles = StyleSheet.create({
  listContainer: {
    height: 200,
    transform: [{ translateY: -100 }],
  },
  spaceLeft: {
    marginLeft: 24,
  },
});
