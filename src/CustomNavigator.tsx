import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NestedScreen from "./screens/NestedScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import PhotosScreen from "./screens/PhotosScreen";
import { isLightTheme } from "./utils/colorScheme";
import { Platform, Alert } from "react-native";
import { Pressable } from "./components/core";
import Icon from "react-native-vector-icons/Ionicons";

const isAndroid: Boolean = Platform.OS === "android";

const Stack = createNativeStackNavigator();

const FirstScreenNavigator: React.FC = () => {
  function formatTimestamp(timestamp: number) {
    // Create a Date object from the timestamp
    let date = new Date(timestamp * 1000);

    // Get the date and time as a string
    let dateString = date.toString();

    // Split the string by spaces
    let dateArray = dateString.split(" ");

    // Get the day, month, date, year, and time from the array
    let day = dateArray[0];
    let month = dateArray[1];
    let dd = dateArray[2];
    let year = dateArray[3];
    let time = dateArray[4];

    // Format the date and time as a string
    let formatted = `${day}, ${month} ${dd}, ${year} - ${time}`;

    // Return the formatted string
    return formatted;
  }

  function formatSize(size: number) {
    // Divide the size by 1024 to get the size in KBs
    let sizeInKB = size / 1024;

    // Check if the size is greater than or equal to 1024 KBs
    if (sizeInKB >= 1024) {
      // Divide the size by 1024 again to get the size in MBs
      let sizeInMB = sizeInKB / 1024;

      // Check if the size is greater than or equal to 1024 MBs
      if (sizeInMB >= 1024) {
        // Divide the size by 1024 again to get the size in GBs
        let sizeInGB = sizeInMB / 1024;

        // Return the size formatted as GBs
        return sizeInGB.toFixed(2) + " GB";
      } else {
        // Return the size formatted as MBs
        return sizeInMB.toFixed(2) + " MB";
      }
    } else {
      // Return the size formatted as KBs
      return sizeInKB.toFixed(2) + " KB";
    }
  }

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
          headerTitleAlign: "center",
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerStyle: {
            backgroundColor: isAndroid ? "black" : "transparent"
          }
        }}
      />
      <Stack.Screen
        name="NestedScreen"
        component={NestedScreen}
        options={({ route }) => ({
          title: "",
          headerRight: () => (
            <Pressable
              id=""
              onPress={() => {
                const formattedSize = formatSize(
                  route.params?.msg.image.fileSize
                );
                const formattedTimestamp = formatTimestamp(
                  route.params?.msg.timestamp
                );
                Alert.alert(
                  "Photo Metadata",
                  `\nFilename: ${route.params?.msg.image.filename}\n\nTimestamp: ${formattedTimestamp}\n\nDimensions: ${route.params.msg.image.width} x ${route.params?.msg.image.height} px\n\nMime type: ${route.params?.msg.type}\n\nSize: ${formattedSize}`
                );
              }}
            >
              <Icon
                name="information-circle-outline"
                color={"white"}
                size={24}
                style={{ marginTop: 12 }}
              />
            </Pressable>
          ),

          headerStyle: {
            backgroundColor: isLightTheme ? "white" : "black"
          },
          headerTintColor: "systemBlue"
        })}
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
          headerShown: false
        }}
      />
      <Stack.Screen name="NestedScreen" component={NestedScreen} />
    </Stack.Navigator>
  );
};

export { ThirdScreenNavigator }; // Stack-Navigator for Screen 3 Tab
