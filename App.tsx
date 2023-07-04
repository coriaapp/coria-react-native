import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/TabNavigator";
import { NativeBaseProvider, Text, Box } from "native-base";

const App: React.FC = () => {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<TabNavigator />
			</NavigationContainer>
		</NativeBaseProvider>
	);
};

export default App;
