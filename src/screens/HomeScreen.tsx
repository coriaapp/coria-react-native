import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isLightTheme } from "../utils/colorScheme";
import { VStack, HStack, Box, Image, Button, Pressable } from "../components/core";
import { dimensions } from "../utils/dimensions";
import { PhotoGallery } from "react-native-photo-gallery-api";

const HomeScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const isAndroid: Boolean = Platform.OS === "android";

  const getLibrary = async () => {
    const supportedMimeTypesByTheBackEnd = [
      "image/jpeg",
      "image/png",
      "image/heif",
      "image/heic",
      "image/heif-sequence",
      "image/heic-sequence"
    ];
    const pageSize = 30;
    const mimeTypeFilter = supportedMimeTypesByTheBackEnd;
    const { edges, page_info } = await PhotoGallery.getPhotos({
      first: !photos || photos.length < pageSize ? pageSize : photos.length,
      assetType: "Photos",
      mimeTypes: mimeTypeFilter,
      // Include fileSize only for android since it's causing performance issues on IOS.
      ...(Platform.OS === "android" && { fileSize: true })
    });
    setPhotos(edges);
    // setPhotos((photos) => [...photos, ...edges]);
  };

  React.useEffect(() => {
    getLibrary();
  }, []);

  return (
    // <SafeAreaView style={styles.safeArea}>
    <VStack h={dimensions.windowHeight} w={dimensions.windowWidth} space="md">
      <ScrollView style={styles.safeArea}>
        <Box
          w={dimensions.windowWidth}
          h={dimensions.windowWidth * (isAndroid ? 0.15 : 0.27)}
        />    

        {
          console.log(photos.length)
        }    

        {[...Array((photos.length / 3)).keys()].map((number, index) => {
          return (
            <HStack
              key={index}
              justifyContent="space-around"
              h={dimensions.windowWidth * 0.32}
              w={dimensions.windowWidth}
              pt="$0.5"
            >
              <Box w={dimensions.windowWidth * 0.33} h="100%">
                <Pressable onPress={() => navigation.navigate("NestedScreen", {msg:photos[index].node.image.uri})}>
                <Image
                  h="100%"
                  w="100%"
                  source={{
                    uri: photos[3 * index + 0]?.node.image.uri
                  }}
                />
                </Pressable>
                
              </Box>
              <Box w={dimensions.windowWidth * 0.33} h="100%">
              <Pressable onPress={() => navigation.navigate("NestedScreen", {msg:photos[(index + 1) % photos.length].node.image.uri})}>
                <Image
                  h="100%"
                  w="100%"
                  source={{
                    uri: photos[(3 * index + 1)]?.node.image.uri
                  }}
                />
                </Pressable>
              </Box>
              <Box w={dimensions.windowWidth * 0.33} h="100%">
              <Pressable onPress={() => navigation.navigate("NestedScreen", {msg:photos[(index + 2) % photos.length].node.image.uri})}>
                <Image
                  h="100%"
                  w="100%"
                  source={{
                    uri: photos[3 * index + 2]?.node.image.uri
                  }}
                />
                </Pressable>
              </Box>
            </HStack>
          );
        })}

      </ScrollView>
    </VStack>
    // {/* </SafeAreaView> */}
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: isLightTheme ? "white" : "black",
    height: "100%"
  }
});

export default HomeScreen;
