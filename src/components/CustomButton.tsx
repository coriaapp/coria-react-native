import React from "react";
import {
  Text,
  Pressable,
  HStack,
  VStack,
  Avatar,
  Icon,
  ArrowRightIcon
} from "./core";

const CustomButton: React.FC = () => {
  return (
    <Pressable
      onPress={() => console.log("Hello")}
      p="$5"
      bg="#191919"
      width={"100%"}
      height={"100%"}
      sx={{
        ":pressed": { bg: "$violet50" }
      }}
      rounded={30}
    >
      {/* Complete Space between VStack elemnts */}
      <VStack space="30%">
        <HStack>
          <Avatar bgColor="#194E8B" size="lg" borderRadius="$full">
            <Avatar.FallbackText></Avatar.FallbackText>
            <Avatar.Image
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              }}
            />
          </Avatar>
        </HStack>
        <HStack>
          <VStack>
            <Text color="white" fontWeight="$medium">
              John Doe
            </Text>
            <HStack space="53%">
              <Text color="#999999" fontWeight="$medium" fontSize={"$sm"}>
                Johndoe@gmail.com
              </Text>
              <Icon as={ArrowRightIcon} color="#999999" size="lg" />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default CustomButton;
