import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen: React.FC = () => {
	return (
		<Text style={styles.text}>Home Screen</Text>
	);
};

{
	/* <ScrollView w="100%" h="80" alignContent="center">
      <VStack  space="1">
        <HStack  space="3">
          <Center bg="primary.400" size="120"></Center>
          <Center bg="secondary.400" size="120"></Center>
          <Center bg="emerald.400" size="120"></Center>
        </HStack>
      </VStack>
    </ScrollView> */
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		fontSize: 24,
		fontWeight: "bold"
	}
});

export default HomeScreen;
