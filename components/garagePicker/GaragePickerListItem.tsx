import {
  MEDIUM_MAX_MULTIPLIER,
  SMALL_MAX_MULTIPLIER,
} from "@/constants/Constants";
import { CarType } from "@/types";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScalePresasble from "../ScalePresasble";

type GaragePickerListItemProps = {
  item: CarType;
  showDetails: boolean;
  onSelectCar?: (car: CarType) => void;
};

const GaragePickerListItem = ({
  item,
  showDetails,
  onSelectCar,
}: GaragePickerListItemProps) => {
  return (
    <ScalePresasble
      onPress={() => {
        onSelectCar?.(item);
      }}
      className="flex-row items-center gap-3 pl-6 bg-transparent"
    >
      <Image
        cachePolicy={"memory-disk"}
        source={item.image}
        style={styles.img}
      />
      <View className="gap-1">
        {showDetails && (
          <Text
            maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
            className="font-heavy text-too-grey"
          >
            {item.name}
          </Text>
        )}

        {showDetails && (
          <Text
            maxFontSizeMultiplier={MEDIUM_MAX_MULTIPLIER}
            className="font-medium text-xs text-sparq-ui-40"
          >
            {item.miles}
          </Text>
        )}
      </View>
    </ScalePresasble>
  );
};

export default GaragePickerListItem;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 75,
  },
});
