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
      <Box h="100%">
        <VStack space="xs" reversed={false}>
          <Box w="100%" h="20%" justifyContent="flex-end" pl="$3" pb="$4">
            <Text
              size={"4xl"}
              fontFamily="OpenSans-SemiBold"
              color={isLightTheme ? "$textDark0" : "$textLight0"}
            >
              Good morning,
            </Text>
            <Text
              style={
                isAndroid ? styles.textUnderlineAndroid : styles.textUnderline
              }
              size={"4xl"}
              fontFamily="OpenSans-SemiBold"
              color={isLightTheme ? "$textDark0" : "$textLight0"}
            >
              Ryan
            </Text>
          </Box>
          <Box w="100%" h="27%">
            <ProfileButton />
          </Box>

          <Box w="100%" h="50%">
            <HStack space="xs" reversed={false} h="100%">
              <VStack w="50%" h="100%" space="xs">
                <Box w="100%" h="49%">
                  <CustomButton />
                </Box>
                <Box w="100%" h="50%">
                  <CustomButton />
                </Box>
              </VStack>
              <Box w="50%" h="100%">
                <CustomButton />
              </Box>
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
