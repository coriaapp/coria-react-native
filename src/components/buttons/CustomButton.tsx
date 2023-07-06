import React from "react";
import {
  Text,
  Pressable,
  HStack,
  VStack,
  Avatar,
  ArrowRightIcon,
  LockIcon,
  Box
} from "../core";
import { ArrowRight, Unlock } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const CustomButton: React.FC = () => {
  return (
    <Pressable
      id="security"
      p="$3"
      bg="#191919"
      w="100%" 
      h="100%"
      rounded={40}
      onPress={() => console.log("Profile Button Pressed")}
    >
      <VStack h="100%" justifyContent="space-between">
        <HStack  bg="$black" h="$11" w="$11" rounded={50} justifyContent="center" m="$3" >
          {/* <Icon name="lock" color={"white"} size={18} style={{marginTop: 10}}/> */}
          <Icon name="sync-alt" color={"white"} size={18} style={{marginTop: 10}}/>
        </HStack>
        

        <HStack w="100%" justifyContent="space-between" p="$3" pb="$4">
          <Text color="white" fontFamily="OpenSans-Medium" fontWeight="$medium">Security </Text>
          <ArrowRightIcon color="white" />
        </HStack>
        
      </VStack>

    </Pressable>
  );
};

export default CustomButton;
