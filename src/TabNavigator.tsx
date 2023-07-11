import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { isLightTheme } from "./utils/colorScheme";
import {
  FirstScreenNavigator,
  SecondScreenNavigator,
  ThirdScreenNavigator
} from "./CustomNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Photos") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Search") {
            iconName = "search-sharp";
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isLightTheme ? "white" : "black",
          borderTopColor: isLightTheme ? "white" : "black"
        }
      })}
    >
      <Tab.Screen name="Photos" component={FirstScreenNavigator} />
      <Tab.Screen name="Search" component={SecondScreenNavigator} />
      <Tab.Screen name="Profile" component={ThirdScreenNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
