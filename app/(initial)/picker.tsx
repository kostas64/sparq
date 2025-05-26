import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SelectedCarBox from "@/components/garagePicker/SelectedCarBox";
import AnimatedGaragePicker from "@/components/ui/AnimatedGaragePicker";
import { CARS, SPRING_ANIM_CONFIG } from "@/constants/Constants";
import { CarType, GaragePickerMethods } from "@/types";
import { View } from "react-native";
import {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Picker = () => {
  const insets = useSafeAreaInsets();
  const paddingTop =
    insets.top > 20 ? insets.top + 4 : insets.top > 0 ? insets.top + 16 : 24;

  const [selectedCar, setSelectedCar] = useState<CarType>(CARS[0]);

  const selectedCarRef = useRef<View>(null);
  const pickerRef = useRef<GaragePickerMethods>(null);

  const progressSelection = useSharedValue(0);
  const progressArrow = useSharedValue(0);
  const pickerWidth = useSharedValue(0);

  const openPicker = () => {
    pickerRef.current?.openPicker();
    progressSelection.value = withSpring(1, SPRING_ANIM_CONFIG);
    progressArrow.value = withTiming(1);
  };

  const revertPicker = () => {
    progressArrow.value = withTiming(0);
    progressSelection.value = withTiming(0);
  };

  const onDismissPicker = () => {
    pickerRef.current?.onDismissPicker();
    revertPicker();
  };

  const onSelectCar = (car: CarType) => {
    setSelectedCar(car);
    onDismissPicker();
  };

  useEffect(() => {
    selectedCarRef?.current?.measure(
      (_x: number, _y: number, width: number) => {
        pickerWidth.value = width;
      }
    );
  }, [selectedCar, pickerWidth]);

  return (
    <>
      <SelectedCarBox
        onPress={openPicker}
        selectedCarRef={selectedCarRef}
        selectedCar={selectedCar}
        progressSelection={progressSelection}
        progressArrow={progressArrow}
        containerStyle={{
          position: "absolute",
          marginTop: paddingTop,
          marginHorizontal: 20,
        }}
      />

      <AnimatedGaragePicker
        ref={pickerRef}
        onSelectCar={onSelectCar}
        revertPicker={revertPicker}
        externalOpenPicker={openPicker}
        selectedCar={selectedCar}
        pickerWidth={pickerWidth}
        progressSelection={progressSelection}
        progressArrow={progressArrow}
      />
    </>
  );
};

export default Picker;
