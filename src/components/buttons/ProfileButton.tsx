import React from "react";
import {
  Text,
  Pressable,
  HStack,
  VStack,
  Avatar,
  Icon,
  ArrowRightIcon,
  Box
} from "../core";

const ProfileButton: React.FC = () => {
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
      {/* Complete Space between VStack elemnts */}
      <VStack pl="$3" pb="$1.5" h="100%" justifyContent="space-between">
        <HStack pt="$2">
          <Avatar bgColor="#194E8B" size="lg" borderRadius="$full">
            <Avatar.FallbackText></Avatar.FallbackText>
            <Avatar.Image
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              }}
            />
          </Avatar>
        </HStack>
        <HStack w="100%">
          <VStack w="100%">
            <Text
              fontFamily="OpenSans-SemiBold"
              color="white"
              fontWeight="$semibold"
            >
              John Doe
            </Text>
            <HStack w="100%" justifyContent="space-between" pr="$3">
              <Text
                fontFamily="OpenSans-Regular"
                color="#999999"
                fontSize={"$sm"}
              >
                johndoe@gmail.com
              </Text>
              <Icon as={ArrowRightIcon} color="#999999" size="lg" />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default ProfileButton;
