import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "../components/core";
import { isLightTheme } from "../utils/colorScheme";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Box } from "../components/core";

type NestedScreenProps = {
  route: {
    params: {
      msg: string;
    };
  };
};

const NestedScreen = ({ route }: NestedScreenProps) => {
  return (
    <Box h="100%" w="100%" backgroundColor={isLightTheme ? "white": "black"}>
        <ImageZoom
          uri={route.params.msg}
          minScale={0}
          maxScale={10}
          onInteractionStart={() => console.log("Interaction started")}
          onInteractionEnd={() => console.log("Interaction ended")}
          onPinchStart={() => console.log("Pinch gesture started")}
          onPinchEnd={() => console.log("Pinch gesture ended")}
          onPanStart={() => console.log("Pan gesture started")}
          onPanEnd={() => console.log("Pan gesture ended")}
          renderLoader={() => <Text>Loading...</Text>}
          backgroundColor={isLightTheme ? "white": "black"}
        />
        </Box> 
  );
};

export default NestedScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
      }
});
