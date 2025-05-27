import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { primary } from "@/assets/colors";
import AnimatedTyping from "@/components/ui/AnimatedTyping";
import ExampleBox from "@/components/ui/ExampleBox";
import { useTabbarVisibility } from "@/context/TabbarContext";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChooseExample = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const { hideTabbar } = useTabbarVisibility();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isFocused) {
      hideTabbar();
    }
  }, [isFocused, hideTabbar]);

  const paddingTop = insets.top > 0 ? insets.top + 16 : 32;

  return (
    <View className="flex-1 gap-4 bg-background" style={{ paddingTop }}>
      <AnimatedTyping
        text={[
          "Hi SPARQ team",
          "\n\nI'm Konstantinos Efkarpidis",
          "and this is my exploration !!",
          "\nEnjoy ®",
        ]}
        cursorInterval={100}
        onComplete={() => setAnimate(true)}
        textStyle={{ marginLeft: 16, color: primary, lineHeight: 25 }}
      />
      <ExampleBox
        index={1}
        title="Garage Picker"
        animate={animate}
        onPress={() => router.navigate("/picker")}
        caption="Car selection UI"
      />
      <ExampleBox
        index={2}
        animate={animate}
        title="S2S - Shared Transition - Loop"
        caption="All in one"
        onPress={() => router.navigate("/(initial)/addVehicle")}
      />
    </View>
  );
};

export default ChooseExample;
