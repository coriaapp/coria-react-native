import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GluestackUIProvider } from "./src/components";
import { config } from "./gluestack-ui.config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { isLightTheme } from "./src/utils/colorScheme";
import ProfileAvatar from "./src/components/ProfileAvatar";
import TabNavigator from "./src/TabNavigator";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config.theme}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default gestureHandlerRootHOC(App);
