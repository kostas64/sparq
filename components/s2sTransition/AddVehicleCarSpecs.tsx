import { SMALL_MAX_MULTIPLIER } from "@/constants/Constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../ui/Text";

const AddVehicleCarSpecs = () => {
  return (
    <View className="flex-1 p-5 bg-background-white rounded-ss-3xl rounded-se-3xl">
      <View className="flex-1 p-7 bg-whitish-white rounded-ss-3xl rounded-se-3xl">
        <View className="flex-row items-center justify-between ">
          <Text
            maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
            className="font-heavy text-sm text-sparq-ui-130"
          >
            Car Details
          </Text>
          <Text
            maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
            className="font-heavy text-sm text-primary"
          >
            Edit
          </Text>
        </View>

        <View className="mt-6 flex-row">
          <View className="gap-2" style={{ width: "50%" }}>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-xs text-light-grey"
            >
              Make
            </Text>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-md text-text-fifth"
            >
              Mercedes Benz
            </Text>
          </View>
          <View className="gap-2" style={{ width: "50%" }}>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-xs text-light-grey"
            >
              Model
            </Text>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-md text-text-fifth"
            >
              GLE 350
            </Text>
          </View>
        </View>

        <View className="mt-6 flex-row">
          <View className="gap-2" style={{ width: "100%" }}>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-xs text-light-grey"
            >
              Trim
            </Text>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-md text-text-fifth"
            >
              2.0L Bi-Turbo 2dr Plug-in Hybrid
            </Text>
          </View>
        </View>

        <View className="mt-6 flex-row">
          <View className="gap-2" style={{ width: "70%" }}>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-xs text-light-grey"
            >
              VIN
            </Text>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-md text-text-fifth"
            >
              2734286482374SJAHGD
            </Text>
          </View>
          <View className="gap-2" style={{ width: "30%" }}>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-xs text-light-grey"
            >
              Year
            </Text>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-md text-text-fifth"
            >
              2023
            </Text>
          </View>
        </View>

        <View className="mt-6 flex-row">
          <View className="gap-2" style={{ width: "70%" }}>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-xs text-light-grey"
            >
              Support OBD
            </Text>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-md text-text-fifth"
            >
              Yes
            </Text>
          </View>
        </View>
        <View className="mt-6 flex-row">
          <View className="gap-2" style={{ width: "70%" }}>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-xs text-light-grey"
            >
              Fuel Consumption
            </Text>
            <Text
              maxFontSizeMultiplier={SMALL_MAX_MULTIPLIER}
              className="font-roman text-md text-text-fifth"
            >
              4.04g / 100 miles
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddVehicleCarSpecs;

const styles = StyleSheet.create({});
