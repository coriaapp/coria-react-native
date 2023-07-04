import CryptoJS from 'crypto-js';
import fs from 'react-native-fs';

export async function encryptImage(imageUri: string, key: string): Promise<string> {
  const image = await fs.readFile(imageUri, 'base64');
  const encryptedImage = CryptoJS.AES.encrypt(image, key).toString();
  return encryptedImage;
}

export async function decryptImage(encryptedImage: string, key: string): Promise<string> {
  const decryptedImage = CryptoJS.AES.decrypt(encryptedImage, key).toString(CryptoJS.enc.Utf8);

  const directoryPath = fs.DocumentDirectoryPath;
  const imagePath = `${directoryPath}/decryptedImage.png`;

  await fs.writeFile(imagePath, decryptedImage, 'base64');
  return imagePath;
}
