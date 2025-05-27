import colors from "@/assets/colors";
import { SPRING_ANIM_CONFIG, WIDTH } from "@/constants/Constants";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedTabbarPill from "./ui/AnimatedTabbarPill";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const selectedIndex = useSharedValue(-2);
  const marginBottom = insets.bottom > 0 ? insets.bottom + 16 : 32;

  return (
    <>
      <View
        style={{ marginBottom }}
        className="flex-row mx-5 justify-around bg-charcoal-75 rounded-full"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const Icon =
            options?.tabBarIcon?.({
              color: isFocused ? colors.primary : colors.black,
              focused: isFocused,
              size: 24,
            }) || null;

          const onPress = () => {
            selectedIndex.value = withSpring(index - 2, SPRING_ANIM_CONFIG);
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              disabled={route.name === "stars"}
              className="py-4 px-6 self-center z-50"
            >
              {Icon}
            </Pressable>
          );
        })}
        <AnimatedTabbarPill
          sectionLength={(WIDTH - 42) / state.routes.length}
          selectedIndex={selectedIndex}
          totalLength={state.routes.length}
        />
      </View>
    </>
  );
}

export default MyTabBar;
