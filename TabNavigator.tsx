import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import your screen components
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

interface TabNavigatorProps {
  toggleDarkMode: () => void;
}

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC<TabNavigatorProps> = ({ toggleDarkMode }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
