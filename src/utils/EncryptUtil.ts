import CryptoJS from "crypto-js";

async function uriToBase64(
    uri: string
): Promise<string | ArrayBuffer> {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        };
    });
}

export async function encryptImage(
	imageUri: string,
	key: string
): Promise<string> {
    
    const imageBase64 = await uriToBase64(imageUri);

    // const encryptedImage = CryptoJS.AES.encrypt("imageBase64.toString()", key).toString();

	const encryptedImage = CryptoJS.AES.encrypt(imageBase64.toString(), key).toString();
	return encryptedImage;
	
}

// export async function decryptImage(
// 	encryptedImage: string,
// 	key: string
// ): Promise<string> {
// 	const decryptedImage = CryptoJS.AES.decrypt(encryptedImage, key).toString(
// 		CryptoJS.enc.Utf8
// 	);

// 	const directoryPath = fs.DocumentDirectoryPath;
// 	const imagePath = `${directoryPath}/decryptedImage.png`;

// 	await fs.writeFile(imagePath, decryptedImage, "base64");
// 	return imagePath;
// }
