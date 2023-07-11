import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { isLightTheme } from "../utils/colorScheme";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Box, Image } from "../components/core";
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

type NestedScreenProps = {
  route: {
    params: {
      msg: {
        image: {
          uri: string;
          width: number;
          height: number;
        };
      }
    };
  };
};

const NestedScreen = ({ route }: NestedScreenProps) => {

  return (
    <Box h="100%" w="100%" backgroundColor={isLightTheme ? "white" : "black"}>
      <ReactNativeZoomableView
        maxZoom={30}
        minZoom={1}
        contentWidth={route.params.msg.image.width}
        contentHeight={route.params.msg.image.height}
        disablePanOnInitialZoom={true}
      >
        <Image
          source={{ uri: route.params.msg.image.uri }}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />

      </ReactNativeZoomableView>
    </Box>
  );
};

export default NestedScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  }
});
