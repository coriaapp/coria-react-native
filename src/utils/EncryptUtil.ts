import CryptoJS from "crypto-js";
import RNFetchBlob from "rn-fetch-blob";

export async function encryptImage(
	imageUri: string,
	key: string
): Promise<string> {
	const image = await RNFetchBlob.fs.readStream(imageUri, "base64");
    // create a WordArray from the stream data
  const wordArray = CryptoJS.lib.WordArray.create([]);

  // encrypt the WordArray using CryptoJS
	const encryptedImage = CryptoJS.AES.encrypt(wordArray, key).toString();
	return encryptedImage;
	
}

export async function decryptImage(
	encryptedImage: string,
	key: string
): Promise<string> {
	const decryptedImage = CryptoJS.AES.decrypt(encryptedImage, key).toString(
		CryptoJS.enc.Utf8
	);

	const directoryPath = fs.DocumentDirectoryPath;
	const imagePath = `${directoryPath}/decryptedImage.png`;

	await fs.writeFile(imagePath, decryptedImage, "base64");
	return imagePath;
}
