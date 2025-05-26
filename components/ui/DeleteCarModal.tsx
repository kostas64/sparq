import colors from "@/assets/colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Trash from "../../assets/images/svg/trash-03.svg";
import Button from "./Button";
import Text from "./Text";

type DeleteCarModalProps = {
  ref: React.RefObject<BottomSheetModal | null>;
  onDismiss: () => void;
  onDelete: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DeleteCarModal = ({ ref, onDelete, onDismiss }: DeleteCarModalProps) => {
  const insets = useSafeAreaInsets();
  const animatedIndex = useSharedValue(0);
  const paddingBottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  const backdrop = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.4],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <BottomSheetModal
      ref={ref}
      style={styles.container}
      animatedIndex={animatedIndex}
      backdropComponent={() => (
        <AnimatedPressable
          style={backdrop}
          onPress={() => {
            ref.current?.dismiss();
            onDismiss();
          }}
          className="absolute w-full h-full bg-black"
        />
      )}
      handleStyle={{ backgroundColor: colors?.["charcoal-50"] }}
      handleIndicatorStyle={{ backgroundColor: colors?.["sparq-ui-150"] }}
    >
      <BottomSheetView
        className="bg-charcoal-50 px-7"
        style={{ paddingBottom }}
      >
        <View className="p-3 mt-4 self-center rounded-full bg-background-extralight">
          <View className="p-3 background-extralight rounded-full bg-sparq-ui-10">
            <Trash
              width={24}
              height={24}
              stroke={colors?.["oh-so-orange"]}
              strokeWidth={2}
            />
          </View>
        </View>

        <Text className="text-center text-lg font-heavy text-black mt-4">
          Remove Vehicle
        </Text>

        <Text className="pt-4 px-4 pb-7">
          <Text className="text-center font-medium text-sm text-little-greyish mt-4">
            Are you sure you want to remove your
          </Text>
          <Text className="font-heavy text-sm text-little-greyish">{` ${"2022 Golf GTI Performance"} `}</Text>
          <Text className="text-center font-medium text-sm text-little-greyish mt-4">
            from the app? This action is irreversible.
          </Text>
        </Text>

        <Button
          label={"Yes, Continue"}
          onPress={onDelete}
          style={{ backgroundColor: colors?.["error-red"] }}
        />

        <Text
          suppressHighlighting
          onPress={() => {
            ref.current?.dismiss();
            onDismiss();
          }}
          className="pt-7 text-center text-lg font-heavy text-sparq-ui-130"
        >
          Dismiss
        </Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default DeleteCarModal;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
