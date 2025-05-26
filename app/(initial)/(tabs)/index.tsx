import AnimatedView from "@/components/ui/AnimatedView";
import SlideInTrantition from "@/components/ui/SlideInTransition";
import Text from "@/components/ui/Text";
import { HEIGHT, SPRING_ANIM_CONFIG } from "@/constants/Constants";
import { useTabbarVisibility } from "@/context/TabbarContext";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Arrow from "../../../assets/images/svg/arrow-narrow-right.svg";
import Logo from "../../../assets/images/svg/Logo.svg";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 64 : 84;

  const { showTabbar } = useTabbarVisibility();
  const [hideLaunchScreen, setHideLaunchScreen] = useState(false);

  const translateLaunchStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: hideLaunchScreen
          ? withSpring(-HEIGHT, SPRING_ANIM_CONFIG)
          : 0,
      },
    ],
  }));

  return (
    <>
      <AnimatedView
        style={translateLaunchStyle}
        className="absolute z-50 w-full h-full items-center justify-center bg-primary"
      >
        <SlideInTrantition
          withFade
          index={2}
          animate
          delay={50}
          distanceToTravel={25}
          onFinish={() =>
            setTimeout(() => {
              setHideLaunchScreen(true);
              showTabbar();
            }, 750)
          }
        >
          <Logo />
        </SlideInTrantition>

        <SlideInTrantition
          withFade
          index={3}
          delay={50}
          animate
          distanceToTravel={50}
        >
          <Text className="text-4xl font-roman text-white">Welcome to</Text>
        </SlideInTrantition>
        <SlideInTrantition
          withFade
          index={3}
          delay={50}
          animate
          distanceToTravel={50}
        >
          <Text className="text-4xl font-heavy text-white">SPARQ</Text>
        </SlideInTrantition>
      </AnimatedView>

      <View className="flex-1 bg-background px-5" style={{ paddingTop }}>
        <SlideInTrantition index={0} delay={25} animate={hideLaunchScreen}>
          <Text className="font-roman text-too-grey" style={{ fontSize: 48 }}>
            Good Morning
          </Text>
          <Text className="font-roman text-light-grey" style={{ fontSize: 48 }}>
            Riley
          </Text>
        </SlideInTrantition>

        <SlideInTrantition index={1} delay={50} animate={hideLaunchScreen}>
          <View className="pl-7 pt-9 pb-7 mt-7 bg-background-secondary rounded-ss-3xl rounded-se-3xl">
            <Text className="font-book">
              <Text className="text-too-grey" style={{ fontSize: 160 }}>
                93
              </Text>
              <Text className="text-text-quaternary" style={{ fontSize: 32 }}>
                /100
              </Text>
            </Text>
          </View>
          <View className="flex-row justify-between px-7 py-5 bg-background-secondary border-t border-background-white rounded-es-3xl rounded-ee-3xl">
            <Text className="text-lg font-roman">Perform Health Check</Text>
            <Arrow />
          </View>
        </SlideInTrantition>

        <SlideInTrantition index={2} delay={75} animate={hideLaunchScreen}>
          <View className="mt-4 p-5 bg-background-secondary rounded-3xl">
            <Text
              className="text-too-grey font-medium text-lg"
              style={{ lineHeight: 18 }}
            >
              Mercedes Benz GLE GLE 450 4MATIC
            </Text>
            <Text
              className="text-text-quaternary font-medium text-lg"
              style={{ lineHeight: 18 }}
            >
              GLE 450 4MATIC
            </Text>

            <Image
              source={require("../../../assets/images/cars/image_14.png")}
              style={styles.img}
            />
          </View>
        </SlideInTrantition>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    alignSelf: "center",
    width: 265,
    height: 105,
    marginTop: 32,
  },
});
