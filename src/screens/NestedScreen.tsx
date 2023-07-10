import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { isLightTheme } from "../utils/colorScheme";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Box, Image } from "../components/core";
// import FastImage from "react-native-fast-image";
// import { createImageProgress } from "react-native-image-progress";
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
  // const Image = createImageProgress(FastImage)

const renderLoading = () => {
  return (<ActivityIndicator color={'white'} size={'large'} />)
}
  return (
    <Box h="100%" w="100%" backgroundColor={isLightTheme ? "white": "black"}>
      <ReactNativeZoomableView
          maxZoom={30}
          // Give these to the zoomable view so it can apply the boundaries around the actual content.
          // Need to make sure the content is actually centered and the width and height are
          // dimensions when it's rendered naturally. Not the intrinsic size.
          // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
          // Therefore, we'll feed the zoomable view the 300x150 size.
          contentWidth={route.params.msg.image.width}
          contentHeight={route.params.msg.image.height}
        >
        
 
        <Image
            source={{ uri: route.params.msg.image.uri }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            // resizeMode="contain"
            // indicator={renderLoading}
        />
           
        </ReactNativeZoomableView>

      {/* <ImageViewer
                enablePreload={true}
                imageUrls={[{ url: route.params.msg.image.uri }]}
                useNativeDriver={true}
                enableSwipeDown={false}
                renderImage={renderImage}
                loadingRender={renderLoading}
                saveToLocalByLongPress={false}
             /> */}

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
