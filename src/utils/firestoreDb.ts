import firestore from "@react-native-firebase/firestore";

const db = firestore();

// UserDataType
interface UserDataType {
  address: string; // wallet public address
  name: string;
  email: string;
}

const addUserDataOrRetrieve = async (data: UserDataType) => {
  let currentUser = await db
    .collection("Users")
    .doc(data.address)
    .get()
    .then((documentSnapshot) => {
      console.log("User exists: ", documentSnapshot.exists);

      if (documentSnapshot.exists) {
        console.log("User data: ", documentSnapshot.data());
        return documentSnapshot.data();
      } else {
        try {
          const user = db
            .collection("Users")
            .doc(data.address)
            .set({
              name: data.name,
              email: data.email
            })
            .then(() => {
              return { name: data.name, email: data.email };
            });
        } catch (error) {
          console.log(error);
        }
      }
    });

  return currentUser;
};

// add ipfs hash data to users collection in firestore
const addIpfsHash = async (data: any) => {
  try {
    await db.collection("users").doc(data.address).collection(data.ipfsHash);
  } catch (error) {
    console.log(error);
  }
};

export { addUserDataOrRetrieve, addIpfsHash };
