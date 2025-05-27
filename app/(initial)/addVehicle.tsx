import { background, black } from "@/assets/colors";
import Chevron from "@/assets/images/svg/cheveron-right.svg";
import AddVehicleCarName from "@/components/s2sTransition/AddVehicleCarName";
import AddVehicleCarSpecs from "@/components/s2sTransition/AddVehicleCarSpecs";
import SlideToAdd from "@/components/ui/SlideToAdd";
import { WIDTH } from "@/constants/Constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { LinearGradient, Rect, Stop } from "react-native-svg";

const AddVehicleScreen = () => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 8 : 24;
  const paddingBottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  return (
    <View className="flex-1 bg-background" style={{ paddingTop }}>
      <Pressable
        style={{ marginLeft: 24 }}
        onPress={() => {
          router.back();
        }}
      >
        <Chevron fill={black} style={{ transform: [{ rotate: "180deg" }] }} />
      </Pressable>

      <AddVehicleCarName />

      <Svg width={WIDTH} height={36} style={{ bottom: 32 }}>
        <LinearGradient id={"fadeOut"} x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopOpacity="0" stopColor={background} />
          <Stop offset="70%" stopOpacity="1" stopColor={background} />
        </LinearGradient>
        <Rect width={WIDTH} height={36} fill={"url(#fadeOut)"} />
      </Svg>

      <Image
        source={require("@/assets/images/cars/mercedes.png")}
        style={{
          alignSelf: "center",
          width: WIDTH - 96,
          height: (WIDTH - 96) / 2.5,
          transform: [{ translateY: -60 }],
        }}
      />

      <AddVehicleCarSpecs />

      <View
        className="absolute bottom-0 left-0 right-0 p-4 bg-white"
        style={[styles.radius, { paddingBottom }]}
      >
        <View className="items-center justify-center mt-4">
          <SlideToAdd label="slide to add" />
        </View>
      </View>
    </View>
  );
};

export default AddVehicleScreen;

const styles = StyleSheet.create({
  radius: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
