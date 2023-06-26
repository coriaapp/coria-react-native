import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { providerMetadata } from '../constants/Config';
import { BlockchainActions } from '../components/BlockchainActions';
import CustomButton from '../components/CustomButton';

const projectId = 'a75de0658f6e92694bf5b8092d9b5d55';


const ProfileScreen: React.FC = () => {
  const { isOpen, open, close, provider, isConnected, address  } = useWalletConnectModal();

  const handleOpen = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      {/* Create a button named Connect Wallet */}
      <Button 
        title={isConnected ? 'Disconnect' : 'Connect'}
        onPress={handleOpen}
      />

      <Text>Address: {address}</Text>
      <CustomButton />

      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
