import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "../components/core";
import { isLightTheme } from "../utils/colorScheme";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

type NestedScreenProps = {
  route: {
    params: {
      msg: string;
    };
  };
};

const NestedScreen = ({ route }: NestedScreenProps) => {
  return (
      <ImageZoom
        uri={'https://images.unsplash.com/photo-1596003906949-67221c37965c'}
        minScale={0.5}
        maxScale={3}
        onInteractionStart={() => console.log("Interaction started")}
        onInteractionEnd={() => console.log("Interaction ended")}
        onPinchStart={() => console.log("Pinch gesture started")}
        onPinchEnd={() => console.log("Pinch gesture ended")}
        onPanStart={() => console.log("Pan gesture started")}
        onPanEnd={() => console.log("Pan gesture ended")}
        renderLoader={() => <Text>Loading...</Text>}
      />
  );
};

export default NestedScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isLightTheme ? "white" : "black"
  },
  text: {
    color: "#000",
    fontWeight: "700",
    fontSize: 30
  }
});
