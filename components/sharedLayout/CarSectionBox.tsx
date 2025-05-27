import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../ui/Text";

type CarSectionBoxProps = {
  index: string;
  title: string;
  description: string;
};

const CarSectionBox = ({ index, title, description }: CarSectionBoxProps) => {
  return (
    <View className="bg-background-secondary p-7 rounded-3xl">
      <Text className="font-heavy text-light-grey text-5xl opacity-30 mb-2">
        {index}
      </Text>
      <Text className="font-heavy text-2xl mb-2">{title}</Text>
      <Text className="font-roman text-too-grey text-base">{description}</Text>
    </View>
  );
};

export default CarSectionBox;

const styles = StyleSheet.create({});
