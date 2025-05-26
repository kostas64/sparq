import { Stack } from "expo-router";
import React from "react";
import colors from "../../assets/colors";

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: colors?.background },
        }}
      />
      <Stack.Screen
        name="picker"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: colors?.background },
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: colors?.background },
        }}
      />
    </Stack>
  );
};

export default InitialLayout;
