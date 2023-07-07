import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GluestackUIProvider } from "./src/components";
import { config } from "./gluestack-ui.config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { isLightTheme } from "./src/utils/colorScheme";
import TopBar from "./src/components/TopBar";
import { Avatar, Box, Pressable } from "./src/components/core";
import ProfileAvatar from "./src/components/ProfileAvatar";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config.theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Library',
                headerTitleStyle: {
                  color: isLightTheme ? "black" : "white",
                },
                headerTransparent: true,
                headerBlurEffect: "regular",
                headerStyle: {
                  backgroundColor:"transparent",
                },
                headerRight: () => (
                  <ProfileAvatar />
                )
              }}


            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                title: '',
                headerStyle: {
                  backgroundColor: isLightTheme ? "white" : "black",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
