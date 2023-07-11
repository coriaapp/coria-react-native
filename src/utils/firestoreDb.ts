import firestore from '@react-native-firebase/firestore';

const db = firestore();

// UserDataType
interface UserDataType {
    address: string; // wallet public address
    name: string;
    email: string;
}

const addUserDataOrRetrieve = async (data: UserDataType) => {
    let currentUser = await firestore().collection('Users').where('address', '==', data.address).get();
    if (currentUser.empty) {
        try {
            await db.collection('users').add(data);
            currentUser = await firestore().collection('Users').where('address', '==', data.address).get();
        } catch (error) {
            console.log(error);
        }
    } 

    return currentUser.docs[0].data();
}

// add ipfs hash data to users collection in firestore
const addIpfsHash = async (data: any) => {
    try {
        await db.collection('users').doc(data.address).collection(data.ipfsHash)
    } catch (error) {
        console.log(error);
    }
}

exports = {
    addUserDataOrRetrieve,
    addIpfsHash,
}
