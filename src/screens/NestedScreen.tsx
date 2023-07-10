import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { isLightTheme } from "../utils/colorScheme";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Box } from "../components/core";
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import { createImageProgress } from "react-native-image-progress";

type NestedScreenProps = {
  route: {
    params: {
      msg: string;
    };
  };
};

const NestedScreen = ({ route }: NestedScreenProps) => {
  const Image = createImageProgress(FastImage)
  const renderImage = ({ source, style }) => {
    return (
        <Image
            source={{ uri: source?.uri, priority: 'high' }}
            style={style}
            resizeMode="contain"
            indicator={renderLoading}
        />
    )
}

const renderLoading = () => {
  return (<ActivityIndicator color={'white'} size={'large'} />)
}
  return (
    <Box h="100%" w="100%" backgroundColor={isLightTheme ? "white": "black"}>
      <ImageViewer
                enablePreload={true}
                imageUrls={[{ url: route.params.msg.image.uri }]}
                useNativeDriver={true}
                enableSwipeDown={false}
                renderImage={renderImage}
                loadingRender={renderLoading}
                saveToLocalByLongPress={false}
             />

        {/* <ImageZoom
          uri={route.params.msg.image.uri}
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
        /> */}
        </Box> 
  );
};

export default NestedScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
      }
});
