import React from "react";
import { View } from "react-native";
import { HStack, Text, Avatar, Image } from "./core";

const TopBar: React.FC = () => {
  return (
    <HStack
      width="100%"
      pl="$4"
    >

      <Image
        source={{ uri: "https://coria.tech/coria-text-logo.png" }}
        width={85}
        height={40}
        resizeMode="contain"
      />
      {/* <Text fontSize={24} alignSelf='center' fontWeight="bold" color="white" fontFamily="OpenSans-SemiBold">
        Coria
      </Text> */}
      {/* <Avatar bgColor="#194E8B" size="md" borderRadius="$full">
        <Avatar.FallbackText></Avatar.FallbackText>
        <Avatar.Image
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
          }}
        />
      </Avatar> */}
    </HStack>
  );
};

export default TopBar;
