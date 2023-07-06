import React from "react";
import { View } from "react-native";
import { HStack, Text, Avatar, Image } from "./core";

const TopBar: React.FC = () => {
  return (
    <HStack width="100%" pl="$4">
      <Image
        source={{ uri: "https://coria.tech/coria-text-logo.png" }}
        width={85}
        height={40}
        resizeMode="contain"
      />
    </HStack>
  );
};

export default TopBar;
