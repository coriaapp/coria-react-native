import React from "react";
import { SafeAreaView } from "react-native";
import { HStack, Text, Avatar, Image } from "./core";

const TopBar: React.FC = () => {
  return (
    <SafeAreaView>
      <HStack w="100%" justifyContent="space-between">
      <Image
        source={{ uri: "https://coria.tech/coria-text-logo.png" }}
        width={85}
        height={40}
        resizeMode="contain"
      />
      <Avatar bgColor="#194E8B" size="lg" borderRadius="$full">
            <Avatar.FallbackText></Avatar.FallbackText>
            <Avatar.Image
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              }}
            />
          </Avatar>
    </HStack>
    </SafeAreaView>
  );
};

export default TopBar;
