import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as IWebBrowser from '@toruslabs/react-native-web-browser';
import EncryptedStorage from 'react-native-encrypted-storage';
import  Web3Auth, {
  LOGIN_PROVIDER,
  OPENLOGIN_NETWORK,
  IWeb3Auth,
  OpenloginUserInfo,
} from '@web3auth/react-native-sdk';
import RPC from '../ethersRPC'; // for using ethers.js

const scheme = 'Catalyst'; // Or your desired app redirection scheme
const resolvedRedirectUrl = `${scheme}://openlogin`;
const clientId =
  'BI69JyfHCVUbtwrqQqA8PcMhk82YZJbUYDrPJ5VKgqKPODvuSCP_vK1Qn3FhR1jtr5AO8Vb3IdRdtPLhzIbsXKU';

const ProfileScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState<OpenloginUserInfo | undefined>();
  const [key, setKey] = useState<string | undefined>('');
  const [console, setConsole] = useState<string>('');
  const [web3auth, setWeb3Auth] = useState<IWeb3Auth | null>(null);

  const login = async () => {
    try {
      setConsole('Logging in');
      const web3auth = new Web3Auth(IWebBrowser, EncryptedStorage,{
        clientId,
        network: OPENLOGIN_NETWORK.AQUA,
      });

      const info = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
        mfaLevel: 'none',
        curve: 'secp256k1',
      });

      setConsole(`Logged in ${web3auth.privKey}`);
      if (web3auth.privKey) {
        setUserInfo(web3auth.userInfo());
        setKey(web3auth.privKey);
        uiConsole('Logged In');
      }
    } catch (e: any) {
      setConsole(e.message);
    }
  };

  const getChainId = async () => {
    setConsole('Getting chain id');
    const networkDetails = await RPC.getChainId();
    uiConsole(networkDetails);
  };
  const getAccounts = async () => {
    setConsole('Getting account');
    const address = await RPC.getAccounts(key);
    uiConsole(address);
  };
  const signMessage = async () => {
    setConsole('Signing message');
    const message = await RPC.signMessage(key);
    uiConsole(message);
  };

  const uiConsole = (...args: any[]) => {
    setConsole(JSON.stringify(args || {}, null, 2) + '\n\n\n\n' + console);
  };

  const loggedInView = (
    <View style={styles.buttonArea}>
  <Button title="Get User Info" onPress={() => uiConsole(userInfo)} />
  <Button title="Get Chain ID" onPress={() => getChainId()} />
  <Button title="Get Accounts" onPress={() => getAccounts()} />
  <Button title="Sign Message" onPress={() => signMessage()} />
  <Button title="Get Private Key" onPress={() => uiConsole(key)} />
  <Button title="Log Out" onPress={() => setKey('')} />
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
      <View style={styles.consoleArea}>
        <Text style={styles.consoleText}>Console:</Text>
        <ScrollView style={styles.console}>
          <Text>{console}</Text>
        </ScrollView>
      </View>

      <CustomButton />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  consoleArea: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    color: '#ffffff',
    padding: 10,
    width: Dimensions.get('window').width - 60,
  },
  consoleText: {
    padding: 10,
  },
  buttonArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 30,
  },
});

export default ProfileScreen;
