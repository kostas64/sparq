import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";

import TabbarProvider from "@/context/TabbarContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Black: require("../assets/fonts/AvenirLTPro-Black.otf"),
    BlackO: require("../assets/fonts/AvenirLTPro-BlackOblique.otf"),
    Book: require("../assets/fonts/AvenirLTPro-Book.otf"),
    BookO: require("../assets/fonts/AvenirLTPro-BookOblique.otf"),
    Heavy: require("../assets/fonts/AvenirLTPro-Heavy.otf"),
    HeavyO: require("../assets/fonts/AvenirLTPro-HeavyOblique.otf"),
    LightO: require("../assets/fonts/AvenirLTPro-LightOblique.otf"),
    Medium: require("../assets/fonts/AvenirLTPro-Medium.otf"),
    MediumO: require("../assets/fonts/AvenirLTPro-MediumOblique.otf"),
    Oblique: require("../assets/fonts/AvenirLTPro-Oblique.otf"),
    Roman: require("../assets/fonts/AvenirLTPro-Roman.otf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <TabbarProvider>
            <Stack>
              <Stack.Screen name="(initial)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </TabbarProvider>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
