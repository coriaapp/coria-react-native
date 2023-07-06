import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "./src/components";
import { config } from "./gluestack-ui.config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsScreen from "./src/screens/SettingsScreen";

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config.theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SettingsScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
};

export default App;
