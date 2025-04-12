import { Stack } from "expo-router";
import colorize from "../colorize";
import { SafeAreaView, StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorize("#171717", 1.0) }}>
      <StatusBar backgroundColor="#171717" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: colorize("#171717", 1.0) }}>
        <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
      </View>
    </SafeAreaView>
  );
}
