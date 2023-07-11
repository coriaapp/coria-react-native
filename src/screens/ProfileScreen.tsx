import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ScrollView,
  Platform,
  Image,
  Linking
} from "react-native";
import CustomButton from "../components/buttons/ProfileButton";
import { encryptImage, decryptImage } from "../utils/EncryptUtil";
import * as WebBrowser from "@toruslabs/react-native-web-browser";
import Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK
} from "@web3auth/react-native-sdk";

import RPC from "../ethersRPC"; // for using ethers.js

// Gallary
import {
  AppState,
  PermissionsAndroid,
  EmitterSubscription,
  SafeAreaView
} from "react-native";
import {
  AccessLevel,
  iosReadGalleryPermission,
  iosRequestAddOnlyGalleryPermission,
  iosRequestReadWriteGalleryPermission
} from "react-native-photo-gallery-api";

import { addUserDataOrRetrieve } from "../utils/firestoreDb";

import { PhotoGallery } from "react-native-photo-gallery-api";

import axios from "axios";

const scheme = "com.catalyst"; // Or your desired app redirectiosetbufferDatan scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
  "BI69JyfHCVUbtwrqQqA8PcMhk82YZJbUYDrPJ5VKgqKPODvuSCP_vK1Qn3FhR1jtr5AO8Vb3IdRdtPLhzIbsXKU";

const ProfileScreen: React.FC = () => {
  const [key, setKey] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [console, setConsole] = useState<string | null>(null);
  const [photos, setPhotos] = useState<any[]>();
  const [androidPhoto, setAndroidPhoto] = useState<string>("");
  const [bufferData, setbufferData] = useState<string | ArrayBuffer>("");
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [decryptedBase64, setDecryptedBase64] = useState<string | null>(null);

  const encryptData = async () => {
    const encryptedImage = await encryptImage(
      androidPhoto,
      "thisisapasswordhello"
    );

    setbufferData(encryptedImage);
  };

  const openURL = async () => {
    Linking.openURL("https://ipfs.io/ipfs/" + ipfsHash);
  };

  const decryptFromIPFS = async () => {
    // fetch from ipfs using axios
    let response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash}`);

    // decrypt the data
    let decryptedData = await decryptImage(
      response.data,
      "thisisapasswordhello"
    );

    setDecryptedBase64(decryptedData);
    uiConsole("Done");
  };

  const uploadDecryptedbase64toIPFS = async () => {
    // Set the headers for the request
    let headers = {
      // Accept: 'application/json',
      "Content-Type": "application/json",
      // Add your Infura API key and secret as authorization
      Authorization:
        "Basic " +
        btoa("2Rvg1x8VdW7CStns7hroA067KCW:2a013bb52024e4e3ace7c3af5e4d014e")
    };

    const formData = new FormData();
    formData.append("string", decryptedBase64);

    //upload base64 string to ipfs
    let response = await axios.post(
      "http://127.0.0.1:5001/api/v0/add",
      formData
      // { headers: headers }
    );
    setIpfsHash(response.data.Hash);
    uiConsole(response.data);
  };

  const uploadbase64toIPFS = async () => {
    // Set the headers for the request
    let headers = {
      // Accept: 'application/json',
      "Content-Type": "application/json",
      // Add your Infura API key and secret as authorization
      Authorization:
        "Basic " +
        btoa("2Rvg1x8VdW7CStns7hroA067KCW:2a013bb52024e4e3ace7c3af5e4d014e")
    };

    const formData = new FormData();
    formData.append("string", bufferData);

    //upload base64 string to ipfs
    let response = await axios.post(
      "http://127.0.0.1:5001/api/v0/add",
      formData
      // { headers: headers }
    );
    setIpfsHash(response.data.Hash);
    uiConsole(response.data);
  };

  const uploadImageToInfuraIPFS = async () => {
    try {
      // Create a FormData object to append the file
      let formData = new FormData();
      let fileName = androidPhoto.split("/").pop();
      let fileType = androidPhoto.split(".").pop();
      // Append the file to the formData
      formData.append("file", {
        uri: androidPhoto,
        name: fileName,
        type: `image/${fileType}`
      });
      // Set the headers for the request
      let headers = {
        "Content-Type": "multipart/form-data",
        // Add your Infura API key and secret as authorization
        Authorization:
          "Basic " +
          btoa("2Rvg1x8VdW7CStns7hroA067KCW:2a013bb52024e4e3ace7c3af5e4d014e")
      };
      // Send a POST request to the Infura IPFS endpoint with the formData and headers
      let response = await axios.post(
        "http://localhost:5001/api/v0/add",
        formData,
        { headers: headers }
      );
      uiConsole(response.data);
      // Return the response data, which contains the IPFS hash and other information
      return response.data;
    } catch (error) {
      // Handle any errors
      uiConsole(error);
    }
  };

  const requestAndroidGalleryReadPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    const status = await PermissionsAndroid.request(permission);
    uiConsole(`[Gallery][Permission] status: ${status}`);
  };

  const requestIOSFullPermission = async () => {
    try {
      const newPermission = await iosRequestReadWriteGalleryPermission();
      uiConsole(`[Gallery][Permission] new permission: ${newPermission}`);
    } catch (error) {
      uiConsole("[Gallery][Permission] can't request camera roll permission");
    }
  };

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
    setAndroidPhoto(edges[2].node.image.uri);
    uiConsole(
      `[Gallery][getPhotos] photoInfo: ${edges[1].node.image.uri}, DataType: ${edges[1].node.type}, FileName: ${edges[1].node.image.filename}`
    );
  };

  const login = async () => {
    try {
      setConsole("Logging in");
      const web3auth = new Web3Auth(WebBrowser, {
        clientId,
        network: OPENLOGIN_NETWORK.AQUA
      });

      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl
      });

      setUserInfo(info.toString());
      setKey(info.privKey?.toString() || "");
      uiConsole(info.userInfo.toString());
    } catch (e) {
      uiConsole("Error logging in", e);
    }
  };

  const getChainId = async () => {
    setConsole("Getting chain id");
    const networkDetails = await RPC.getChainId();
    uiConsole(networkDetails);
  };
  const getAccounts = async () => {
    setConsole("Getting account");
    const address = await RPC.getAccounts(key);
    uiConsole(address);
  };
  const signMessage = async () => {
    setConsole("Signing message");
    const message = await RPC.signMessage(key);
    uiConsole(message);
  };

  const uiConsole = (...args: any[]) => {
    setConsole(JSON.stringify(args || {}, null, 2) + "\n\n\n\n" + console);
  };

  const addDataToFirebase = async () => {
    const data = await addUserDataOrRetrieve({
      address: "string", // wallet public address
      name: "string",
      email: "string"
    });

    uiConsole(data);
  };

  const loggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Get User Info" onPress={() => uiConsole(userInfo)} />
      <Button title="Get Chain ID" onPress={() => getChainId()} />
      <Button title="Get Accounts" onPress={() => getAccounts()} />
      <Button title="Sign Message" onPress={() => signMessage()} />
      <Button title="Get Private Key" onPress={() => uiConsole(key)} />
      <Button title="Log Out" onPress={() => setKey("")} />
    </View>
  );

  const unloggedInView = (
    <View style={styles.buttonArea}>
      <Button title="Login with Web3Auth" onPress={login} />
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {key ? loggedInView : unloggedInView}
          <Button
            title="Request Full Permission iOS"
            onPress={requestIOSFullPermission}
          />
          <Button
            title="Request Read Permission Android"
            onPress={requestAndroidGalleryReadPermission}
          />
          <Button title="Get Library" onPress={getLibrary} />
          <Button
            title="Add Image to IPFS New"
            onPress={uploadImageToInfuraIPFS}
          />
          <Button title="Encrypt" onPress={encryptData} />
          <Button title="base64ipfs" onPress={uploadbase64toIPFS} />
          <Button title="Decrypt" onPress={decryptFromIPFS} />
          <Button title="open URL" onPress={openURL} />
          <Button
            title="Decrypted base 64 to ipfs"
            onPress={uploadDecryptedbase64toIPFS}
          />
          <Button title="Add Data to Firebase" onPress={addDataToFirebase} />
          <Text style={styles.consoleText}>
            URL: http://localhost:5001/ipfs/{ipfsHash}
          </Text>
          <View style={styles.consoleArea}>
            <Text style={styles.consoleText}>Console:</Text>
            <ScrollView style={styles.console}>
              <Text>{console}</Text>
            </ScrollView>
          </View>

          {/* <Text>Buffer: {bufferData}</Text> */}

          {/* <CustomButton /> */}
          {/* <Image source={{ uri: "ph://CC95F08C-88C3-4012-9D6D-64A413D254B3/LO/001/IMG_0111.HEIC" }} style={{width: 100, height: 100}}  /> */}
          {/* <Image source={{ uri: androidPhoto }} style={{width: 100, height: 100}}  /> */}
          {/* <Image
            source={{ uri: `${decryptedBase64}` }}
            resizeMode="cover"
            style={{ width: 100, height: 100 }}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 30
  },
  consoleArea: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 300
  },
  console: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    color: "#ffffff",
    padding: 10,
    width: Dimensions.get("window").width - 60
  },
  consoleText: {
    padding: 10
  },
  buttonArea: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 30
  }
});

export default ProfileScreen;
