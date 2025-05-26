import { GENERIC_MAX_MULTIPLIER } from "@/constants/Constants";
import React from "react";
import { Text as RNText, TextProps } from "react-native";

type CustomTextProps = {
  children: React.ReactNode;
} & TextProps;

const Text = ({ children, ...props }: CustomTextProps) => {
  return (
    <RNText maxFontSizeMultiplier={GENERIC_MAX_MULTIPLIER} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
