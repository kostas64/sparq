import { Tabs } from "expo-router";
import React from "react";

import colors, { black, primary, transparent } from "@/assets/colors";
import Account from "@/assets/images/svg/account.svg";
import Activity from "@/assets/images/svg/activity.svg";
import Files from "@/assets/images/svg/file-03.svg";
import Home from "@/assets/images/svg/home-line.svg";
import Stars from "@/assets/images/svg/stars.svg";
import { HapticTab } from "@/components/HapticTab";
import MyTabbar from "@/components/MyTabbar";
import { Colors } from "@/constants/Colors";
import { useTabbarVisibility } from "@/context/TabbarContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { hidden } = useTabbarVisibility();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute",
        },
      }}
      tabBar={(props) => (hidden ? null : <MyTabbar {...props} />)}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Home
              stroke={focused ? colors?.["charcoal-100"] : black}
              fill={focused ? primary : transparent}
              strokeWidth={2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ color }) => (
            <Activity stroke={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="stars"
        options={{
          tabBarIcon: ({ color }) => <Stars />,
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Files
              stroke={focused ? colors?.["charcoal-100"] : black}
              fill={focused ? primary : transparent}
              strokeWidth={2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Account
              strokeWidth={2}
              stroke={focused ? colors?.["charcoal-100"] : black}
              fill={focused ? primary : transparent}
            />
          ),
        }}
      />
    </Tabs>
  );
}
