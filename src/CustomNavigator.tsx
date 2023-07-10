import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NestedScreen from "./screens/NestedScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import PhotosScreen from "./screens/PhotosScreen";
import { isLightTheme } from "./utils/colorScheme";

const Stack = createNativeStackNavigator(); 

const FirstScreenNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Library",
                headerTitleStyle: {
                  color: isLightTheme ? "black" : "white"
                },
                headerTransparent: true,
                headerBlurEffect: "regular",
                headerStyle: {
                  backgroundColor: "transparent"
                },
              }}
            />
            <Stack.Screen
              name="NestedScreen"
              component={NestedScreen}
              options={{
                title: "",
                headerStyle: {
                  backgroundColor: isLightTheme ? "white" : "black"
                }
              }}
            />
          </Stack.Navigator>
  );
};

export { FirstScreenNavigator }; // Stack-Navigator for Screen 1 Tab

const SecondScreenNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="NestedScreen" component={NestedScreen} />
  </Stack.Navigator>
  );
};

export { SecondScreenNavigator }; // Stack-Navigator for Screen 2 Tab

const ThirdScreenNavigator: React.FC = () => {
  return (


<Stack.Navigator>
<Stack.Screen 
  name="SettingsScreen" 
  component={SettingsScreen} 
  options={{
    headerShown: false,
  }}
/>
<Stack.Screen name="NestedScreen" component={NestedScreen} />
</Stack.Navigator>
  );
};

export { ThirdScreenNavigator }; // Stack-Navigator for Screen 3 Tab

