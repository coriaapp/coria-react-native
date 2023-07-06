import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Text, VStack, HStack } from "../components/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { isLightTheme } from "../utils/colorScheme";
import ProfileButton from "../components/buttons/ProfileButton";
import CustomButton from "../components/buttons/CustomButton";
import { Box } from "../components/core";

const isAndroid: Boolean = Platform.OS === "android";

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ backgroundColor: isLightTheme ? "white" : "black" }}>
      <Box h="100%" justifyContent="center">
        <VStack space="xs" reversed={false}>
          <Box w="100%" h="25%" bg="$blue300" />
          <Box w="100%" h="24%" bg="$blue400" />
          <Box w="100%" h="48%">
            <HStack space="xs" reversed={false} h="100%">
              <VStack w="50%" h="100%" space="xs">
                <Box w="100%" h="49%" bg="$orange400" />
                <Box w="100%" h="50%" bg="$orange200" />
              </VStack>
              <Box w="50%" h="100%" bg="$blue400" />
            </HStack>
          </Box>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold"
  },
  textUnderline: {
    textDecorationLine: "underline",
    textDecorationColor: "#307AFF",
    textDecorationStyle: "solid"
  },
  textUnderlineAndroid: {
    color: "#307AFF"
  }
});

export default SettingsScreen;
