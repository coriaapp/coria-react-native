import React from "react";
import { StyleSheet, View, useColorScheme, Appearance, Platform } from "react-native";
import { Text, VStack, HStack } from "../components/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { isLightTheme } from "../utils/colorScheme";
import CustomButton from "../components/CustomButton";
import TopBar from "../components/TopBar";

const isAndroid: Boolean = Platform.OS === "android";

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ backgroundColor: isLightTheme ? "white" : "black" }}>
      <View
        style={{
          height: "100%",
          backgroundColor: isLightTheme ? "white" : "black"
        }}
      >
        {/* <TopBar /> */}
        <VStack>
          <HStack pl="$4" pt={15}>
            <VStack>
              <Text
                size={"4xl"}
                fontFamily="OpenSans-SemiBold"
                color={isLightTheme ? "$textDark0" : "$textLight0"}
              >
                Good morning,
              </Text>
              <Text
                style={isAndroid ? styles.textUnderlineAndroid : styles.textUnderline}
                size={"4xl"}
                fontFamily="OpenSans-SemiBold"
                color={isLightTheme ? "$textDark0" : "$textLight0"}
              >
                John Doe
              </Text>
            </VStack>
          </HStack>
          <HStack mt="$4" style={{ height: "44%" }}>
            <CustomButton />
          </HStack>
        </VStack>
      </View>
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
  },
  textUnderlineAndroid: {
    textDecorationLine: undefined,
    color: "#307AFF"
  }
});

export default SettingsScreen;
