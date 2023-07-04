import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { VStack, HStack, Box, Text } from "native-base";

const CustomButton: React.FC = () => {
	return (
		<Box bg="indigo.300" p="3" rounded="xl" w="95%" h="20%" borderRadius="30">
			<VStack justifyContent="space-between" space="50%">
				<HStack>
					<Icon name="ios-home" size={30} color="white" />
				</HStack>

				<HStack justifyContent="space-between" w="100%">
					<Text>Home</Text>
					<Icon name="ios-arrow-forward" size={30} color="white" />
				</HStack>
			</VStack>
		</Box>
	);
};

export default CustomButton;
