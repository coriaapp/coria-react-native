import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	Dimensions,
	ScrollView,
	Platform,
	Image
} from "react-native";
import CustomButton from "../components/CustomButton";
import RNFetchBlob from "rn-fetch-blob";
import uuid from "react-native-uuid";

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
	EmitterSubscription
} from "react-native";
import {
	AccessLevel,
	iosReadGalleryPermission,
	iosRequestAddOnlyGalleryPermission,
	iosRequestReadWriteGalleryPermission
} from "react-native-photo-gallery-api";

import { PhotoGallery } from "react-native-photo-gallery-api";

import axios from "axios";

import { encryptImage, decryptImage } from "../utils/EncryptUtil";

const scheme = "Catalyst"; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
	"BI69JyfHCVUbtwrqQqA8PcMhk82YZJbUYDrPJ5VKgqKPODvuSCP_vK1Qn3FhR1jtr5AO8Vb3IdRdtPLhzIbsXKU";

const ProfileScreen: React.FC = () => {
	const [key, setKey] = useState<string | null>(null);
	const [userInfo, setUserInfo] = useState<string | null>(null);
	const [console, setConsole] = useState<string | null>(null);
	const [photos, setPhotos] = useState<any[]>();
	const [androidPhoto, setAndroidPhoto] = useState<string>("");

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
				"https://ipfs.infura.io:5001/api/v0/add",
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
		const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
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
		uiConsole(`[Gallery][getPhotos] edges: ${edges.length}`);
		setAndroidPhoto(edges[1].node.image.uri);
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
			uiConsole("Logged In");
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
		<View style={styles.container}>
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
			<Button title="Add Image to IPFS New" onPress={uploadImageToInfuraIPFS} />
			<View style={styles.consoleArea}>
				<Text style={styles.consoleText}>Console:</Text>
				<ScrollView style={styles.console}>
					<Text>{console}</Text>
				</ScrollView>
			</View>

			{/* <CustomButton /> */}
			{/* <Image source={{ uri: "ph://CC95F08C-88C3-4012-9D6D-64A413D254B3/LO/001/IMG_0111.HEIC" }} style={{width: 100, height: 100}}  /> */}
			{/* <Image source={{ uri: androidPhoto }} style={{width: 100, height: 100}}  /> */}
		</View>
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
		flex: 1
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
