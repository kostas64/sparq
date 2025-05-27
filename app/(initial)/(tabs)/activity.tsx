import FloatingPlusButton from "@/components/sharedLayout/FloatingPlusButton";
import SharedLayoutCard from "@/components/sharedLayout/SharedLayoutCard";
import { StyleSheet, View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="flex-1 bg-background" style={{ paddingTop: 224 }}>
      <SharedLayoutCard />

      <View className="absolute" style={{ bottom: 10, right: 16 }}>
        <FloatingPlusButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
