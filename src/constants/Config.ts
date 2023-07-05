import { IProviderMetadata } from "@walletconnect/modal-react-native";

export const providerMetadata: IProviderMetadata = {
  name: "Coria",
  description: "An media backup app",
  url: "https://coria.tech/",
  icons: ["https://your-project-logo.com/"],
  redirect: {
    native: "Coria://",
    universal: "Coria.com"
  }
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        "eth_sendTransaction",
        "eth_signTransaction",
        "eth_sign",
        "personal_sign",
        "eth_signTypedData"
      ],
      chains: ["eip155:1"],
      events: ["chainChanged", "accountsChanged"],
      rpcMap: {}
    }
  }
};
