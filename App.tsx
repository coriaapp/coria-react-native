import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';


const App: React.FC = () => {

  return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
  );
};


export default App;