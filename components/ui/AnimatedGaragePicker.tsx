import {
  CAR_HEIGHT,
  CARS,
  EXTRA_PICKER_CARS,
  HEADER_HEIGHT,
  MEDIUM_MAX_MULTIPLIER,
  SPRING_ANIM_CONFIG,
  VISIBLE_CARS,
} from "@/constants/Constants";
import useGaragePickerStyles from "@/hooks/garagePicker/useGaragePickerStyles";
import { AnimatedGaragePickerProps, CarType } from "@/types";
import { moveToFront } from "@/utils/moveItemToFront";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "../../assets/colors";
import Chevron from "../../assets/images/svg/cheveron-right.svg";
import Edit from "../../assets/images/svg/edit-05.svg";
import Info from "../../assets/images/svg/info-circle.svg";
import Trash from "../../assets/images/svg/trash-03.svg";
import GaragePickerListItem from "../garagePicker/GaragePickerListItem";
import SelectedCarBox from "../garagePicker/SelectedCarBox";
import AnimatedPill from "./AnimatedPill";
import DeleteCarModal from "./DeleteCarModal";
import SwipeableItem from "./SwipableItem";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedChevron = Animated.createAnimatedComponent(Chevron);

const SCROLL_OFFSET = 268;

const AnimatedGaragePicker = ({
  ref,
  selectedCar,
  pickerWidth,
  progressSelection,
  progressArrow,
  onSelectCar,
  revertPicker,
  externalOpenPicker,
}: AnimatedGaragePickerProps) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top > 0 ? insets.top + 8 : 24;

  const listRef = useRef<FlatList<CarType>>(null);
  const deleteModalRef = useRef<BottomSheetModal>(null);
  const [cars, setCars] = useState(CARS);
  const [isSwiping, setIsSwiping] = useState(false);

  const scrollY = useSharedValue(0);
  const progress = useSharedValue(0);
  const dragEnded = useSharedValue(true);
  const isOverShooting = useSharedValue(false);
  const shouldExtend = useSharedValue(false);
  const itemToDelete = useSharedValue<number | null>(null);
  const deleting = useSharedValue(0);
  const extendSwipableActionProgress = useSharedValue(0);
  const dismiss = useSharedValue(false);

  const INITIAL_LIST_HEIGHT =
    CAR_HEIGHT * VISIBLE_CARS + HEADER_HEIGHT + paddingTop;
  const SCALED_LIST_HEIGHT =
    CAR_HEIGHT * VISIBLE_CARS + HEADER_HEIGHT + paddingTop + 8;

  const {
    containerStyle,
    headerLeftPartStyle,
    footerStyle,
    backdrop,
    chevron,
    listAnimatedStyle,
  } = useGaragePickerStyles({
    scrollY,
    dismiss,
    progress,
    isOverShooting,
    shouldExtend,
    progressSelection,
    initiaListHeight: INITIAL_LIST_HEIGHT,
    scaledListHeight: SCALED_LIST_HEIGHT,
  });

  const scrollTo = (offset: number) => {
    listRef.current?.scrollToOffset({
      animated: true,
      offset,
    });
  };

  const swipeableActions = [
    {
      onPress: (index: number) => {},
      backgroundColor: colors?.["skeleton-item-background"],
      component: <Info width={24} height={24} />,
    },
    {
      onPress: (index: number) => {},
      backgroundColor: colors?.["edit-background"],
      component: <Edit width={24} height={24} />,
    },
    {
      onPress: (index: number) => {
        itemToDelete.value = index;
        extendSwipableActionProgress.value = withSpring(1, SPRING_ANIM_CONFIG);
        deleteModalRef.current?.present();
      },
      backgroundColor: colors?.["error-red"],
      component: (
        <Trash
          width={24}
          height={24}
          stroke={colors?.["white"]}
          strokeWidth={2}
        />
      ),
    },
  ];

  const renderItem = ({ item, index }: { item: CarType; index: number }) => {
    return (
      <SwipeableItem
        deleting={deleting}
        index={index}
        progress={progress}
        disabled={index === 0}
        actions={swipeableActions}
        selectedCar={selectedCar}
        itemToDelete={itemToDelete}
        setIsSwiping={setIsSwiping}
        extendSwipableActionProgress={extendSwipableActionProgress}
      >
        {index === 0 && (
          <SelectedCarBox
            isInternal
            onPress={externalOpenPicker}
            selectedCar={selectedCar}
            pickerWidth={pickerWidth}
            progressSelection={progressSelection}
            progressArrow={progressArrow}
            containerStyle={{ position: "absolute", marginLeft: 20 }}
          />
        )}
        <GaragePickerListItem
          item={item}
          showDetails={index !== 0}
          onSelectCar={isSwiping ? undefined : onSelectCar}
        />
      </SwipeableItem>
    );
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      // Picker is extended - Can close from Chevron only
      if (isOverShooting.value && shouldExtend.value && dragEnded.value) {
        return;
      }

      //Logic to capture if user is overscrolling from the end of the list
      if (e.contentOffset.y >= SCROLL_OFFSET) {
        isOverShooting.value = true;
      } else {
        isOverShooting.value = false;
      }
      dragEnded.value = false;
    },
    onEndDrag: () => {
      // Picker is extended - Can close from Chevron only
      if (isOverShooting.value && shouldExtend.value && dragEnded.value) {
        return;
      }

      dragEnded.value = true;
    },
    onMomentumEnd: (e) => {
      // Picker is extended - Can close from Chevron only
      if (isOverShooting.value && shouldExtend.value && dragEnded.value) {
        return;
      }

      // If user overscrolled from the end of the list
      // extend list and animate
      if (
        e.contentOffset.y >= SCROLL_OFFSET &&
        isOverShooting.value &&
        dragEnded.value
      ) {
        runOnJS(setCars)([...cars, ...EXTRA_PICKER_CARS]);
        shouldExtend.value = true;
        progress.value = withTiming(2, {});
      } else {
        shouldExtend.value = false;
      }
    },
  });

  const onDismissDeleteModal = () => {
    extendSwipableActionProgress.value = withSpring(
      0,
      SPRING_ANIM_CONFIG,
      () => {
        itemToDelete.value = null;
      }
    );
  };

  const extendList = () => {
    setCars((old) => [...old, ...EXTRA_PICKER_CARS]);
    isOverShooting.value = true;
    shouldExtend.value = true;
    progress.value = withTiming(2, {});
  };

  const onPressBack = () => {
    progress.value = withTiming(1, {}, () => {
      dragEnded.value = false;
      isOverShooting.value = false;
      shouldExtend.value = false;
      runOnJS(setCars)(cars.slice(0, CARS.length));
    });
  };

  const openPicker = () => {
    cancelAnimationFrame(progress.value);
    progress.value = withSpring(1, SPRING_ANIM_CONFIG);
  };

  const onDismissPicker = () => {
    cancelAnimationFrame(progress.value);
    isOverShooting.value = false;
    shouldExtend.value = false;

    revertPicker();
    dismiss.value = true;

    progress.value = withTiming(0, {}, () => {
      runOnJS(scrollTo)(0);
    });
  };

  const updateCarsAfterDelete = () => {
    extendSwipableActionProgress.value = 0;
    deleting.value = 0;
    itemToDelete.value = null;
  };

  const onDeleteCar = () => {
    deleteModalRef.current?.dismiss();
    deleting.value = withDelay(
      500,
      withSpring(1, SPRING_ANIM_CONFIG, (finished) => {
        if (finished) {
          runOnJS(updateCarsAfterDelete)();
        }
      })
    );
  };

  useImperativeHandle(ref, () => ({
    openPicker,
    onDismissPicker,
  }));

  useEffect(() => {
    const timeout = setTimeout(() => {
      const orderedCars = moveToFront(CARS, selectedCar);
      setCars(orderedCars);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedCar]);

  return (
    <>
      {/* Backdrop */}
      <AnimatedPressable
        style={backdrop}
        onPress={onDismissPicker}
        className="absolute w-full h-full bg-black"
      />

      {/* Picker */}
      <Animated.View
        style={[{ paddingTop }, containerStyle]}
        className="absolute w-full overflow-hidden bg-background-wihte bg-background-white rounded-ee-3xl rounded-es-3xl"
      >
        <View className="flex-row items-center justify-between px-5 py-2 ">
          <Animated.View
            style={headerLeftPartStyle}
            className="flex-row items-center items-center"
          >
            <AnimatedPressable onPress={onPressBack} style={chevron}>
              <AnimatedChevron
                fill={colors?.["too-grey"]}
                style={styles.chevron}
              />
            </AnimatedPressable>
            <Animated.Text
              maxFontSizeMultiplier={MEDIUM_MAX_MULTIPLIER}
              className="font-heavy text-xl text-too-grey "
            >
              Select Your Vehicle
            </Animated.Text>
          </Animated.View>
          <View className="items-center justify-center bg-charcoal-300 p-4 rounded-full">
            <View className="absolute w-4 h-0.5 rounded-sm bg-white" />
            <View className="absolute w-0.5 h-4 rounded-sm bg-white" />
          </View>
        </View>

        <Animated.FlatList
          data={cars}
          ref={listRef}
          renderItem={renderItem}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ListFooterComponent={() => (
            <Animated.Text
              style={footerStyle}
              onPress={extendList}
              suppressHighlighting
              className="text-center font-heavy text-light-grey"
            >
              See all cars
            </Animated.Text>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-8"
          style={listAnimatedStyle}
          keyExtractor={(item, index) => `${index}-${item.name}-${item.miles}`}
        />

        <AnimatedPill scrollY={scrollY} onPress={extendList} />
      </Animated.View>

      {/* Delete Modal */}
      <DeleteCarModal
        ref={deleteModalRef}
        onDelete={onDeleteCar}
        onDismiss={onDismissDeleteModal}
      />
    </>
  );
};

export default AnimatedGaragePicker;

const styles = StyleSheet.create({
  chevron: {
    transform: [{ rotate: "180deg" }, { translateY: 2 }],
  },
});
