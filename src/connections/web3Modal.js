import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { getContractAddress } from 'utils/getContractAddress';
import { 
  setWalletAddress, 
  setChainId, 
  setWeb3, 
  setIsConnectWallet, 
  resetWalletAddress,
  setInstanceEggStore, 
  setInstanceSnct,
  setInstanceMarketplace,
  setInstanceSnakeNFT,
  setInstanceEggNFT,
  setInstanceToc,
  setInstanceBootStore,
  setInstanceSnakeStore,
  setInstanceFaucet,
  setInstanceTokenReward,
  setInstanceEggAirDrop
} from "../state/modules/app";
import SmartContractEggStore from 'constants/SmartContractEggStore.json';
import SmartContractSNCT from 'constants/SmartContractSNCT.json';
import SmartContractMarketplace from 'constants/SmartContractMarketplace.json';
import SmartContractSnakeNFT from 'constants/SmartContractSnakeNFT.json';
import SmartContractEggNFT from 'constants/SmartContractEggNFT.json';
import SmartContractToken from 'constants/SmartContractToken.json';
import SmartContractBootStore from 'constants/SmartContractBootStore.json';
import SmartContractSnakeStore from 'constants/SmartContractSnakeStore.json';
import SmartContractFaucet from 'constants/SmartContractFaucet.json';
import SmartContractTokenReward from 'constants/SmartContractTokenReward.json';
import SmartContractEggAirDrop from 'constants/SmartContractEggAirDrop.json';
// import WalletConnectProvider from '@walletconnect/web3-provider';
import {  } from 'state/modules/app';
import { store } from 'state/configureStore';
import {verifySignatureWithServer} from "./auth/verify";
import { removeAuthToken, hasAuthToken } from 'utils/localStorage';
import * as localStorage from 'utils/localStorage';
import { goToPage, ROUTE_HOME } from 'state/modules/routing';
import { reloadClaims } from 'state/modules/home';

export const CONNECTID = 'WEB3_CONNECT_CACHED_PROVIDER';

const rpcSupport = {
  43113: 'https://api.avax-test.network/ext/bc/C/rpc',
  43114: 'https://api.avax.network/ext/bc/C/rpc',
};

//getWeb3Default.js

export const web3Default = {
  43113: {
    web3Default: new Web3(new Web3.providers.HttpProvider('https://testnet.snowtrace.io/')),
    name: 'AVAX',
    explorer: 'https://testnet.snowtrace.io',
  },
  43114:{
    web3Default: new Web3(new Web3.providers.HttpProvider('https://snowtrace.io/')),
    name: 'AVAX',
    explorer: 'https://snowtrace.io/',
  }
};

// export const networkDefault = !!localStorage.getItem('chainId')
//   ? parseInt(localStorage.getItem('chainId'))
//   : 43113;

// export const getWeb3List = (_chainId) => {
//   return web3Default[_chainId];
// };

const paramsSwitchNetwork = {
  43113: [
    {
      chainId: '0xa869',
      chainName: 'Avalanche FUJI C-Chain',
      nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://testnet.snowtrace.io/'],
    },
  ],
  43114: [
    {
      chainId: '0xa86a',
      chainName: 'Avalanche Mainnet C-Chain',
      nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
      },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://snowtrace.io/'],
    },
  ],
};

const providerOptions = {
  walletconnect: {
    // package: WalletConnectProvider,
    options: {
      rpc: rpcSupport,
      qrcodeModalOptions: {
        mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar'],
      },
      bridge: 'https://bridge.walletconnect.org',
    },
  },
};


const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

export const disconnectWeb3Modal = async () => {
  localStorage.removeItem(CONNECTID);
  web3Modal.clearCachedProvider();
};

export const connectWeb3Modal = async () => {

  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  let chainID = await web3.eth.getChainId();
  const { app } = store.getState();

  initInstance(chainID, web3)
  store.dispatch(setWeb3(web3));
  if (chainID !== parseInt(process.env.REACT_APP_NET_WORK)) {
    localStorage.removeItem(CONNECTID);
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: paramsSwitchNetwork[process.env.REACT_APP_NET_WORK],
      }).then(() => {
        connectWeb3Modal()
      }).catch(() => {
        // localStorage.removeItem(CONNECTID);
      });
  }
  if (app.isConnectWallet || localStorage.getAuthToken()) {
    if (!!rpcSupport[chainID] && chainID === parseInt(process.env.REACT_APP_NET_WORK)) {
      let accounts = await web3.eth.getAccounts();
  
      store.dispatch(setChainId(chainID));
  
      if (accounts.length > 0) {
        await verifySignatureWithServer(web3, accounts[0]);
        if (hasAuthToken()) {
          store.dispatch(setWalletAddress(accounts[0]));
        }
      }
      store.dispatch(setIsConnectWallet(false))
    } else {
      localStorage.removeItem(CONNECTID);
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: paramsSwitchNetwork[process.env.REACT_APP_NET_WORK],
      }).then(() => {
        connectWeb3Modal()
      }).catch(() => {
        // localStorage.removeItem(CONNECTID);
      });
    }
  }

  provider.on('accountsChanged', async (accounts) => {
    removeAuthToken();
    store.dispatch(setIsConnectWallet(true))
    store.dispatch(resetWalletAddress())
    store.dispatch(reloadClaims)
    store.dispatch(goToPage(ROUTE_HOME))
    // if (accounts.length > 0) {
    //   await verifySignatureWithServer(web3, accounts[0]);
    //   if (hasAuthToken()) {
    //     store.dispatch(setWalletAddress(accounts[0]));
    //   }
    // }
  });

  provider.on('chainChanged', async (chainID) => {
    chainID = parseInt(web3.utils.hexToNumber(chainID));
    if (!!rpcSupport[chainID]) {
      store.dispatch(setChainId(chainID));
      store.dispatch(setWeb3(web3));
      initInstance(chainID, web3)
    } else {
      // alert('Game does not support this network');
    }
  });

  // Subscribe to provider connection
  provider.on('connect', (info) => {
    // 
  });

  // Subscribe to provider disconnection
  provider.on('disconnect', (error) => {
    store.dispatch(setWalletAddress(null));
  });
};


const initInstance = (chainID, web3) => {
  let contractAddress = getContractAddress(chainID);

  try {
    const newInstanceEggStore = new web3.eth.Contract(SmartContractEggStore, contractAddress.EggStore);
    const newInstanceSnct = new web3.eth.Contract(SmartContractSNCT, contractAddress.SnctToken);
    const newInstanceToc = new web3.eth.Contract(SmartContractToken, contractAddress.TocToken);
    const newInstanceMarketplace = new web3.eth.Contract(SmartContractMarketplace, contractAddress.Marketplace);
    const newInstanceSnakeNFT = new web3.eth.Contract(SmartContractSnakeNFT, contractAddress.SnakeNFT);
    const newInstanceEggNFT = new web3.eth.Contract(SmartContractEggNFT, contractAddress.EggNFT);
    const newInstanceBootStore = new web3.eth.Contract(SmartContractBootStore, contractAddress.BootStore);
    const newInstanceSnakeStore = new web3.eth.Contract(SmartContractSnakeStore, contractAddress.SnakeStore);
    const newInstanceFaucet = new web3.eth.Contract(SmartContractFaucet, contractAddress.Faucet);
    const newInstanceTokenReward = new web3.eth.Contract(SmartContractTokenReward, contractAddress.TokenReward);
    const newInstanceEggAirDrop = new web3.eth.Contract(SmartContractEggAirDrop, contractAddress.EggAirDrop);
    store.dispatch(setInstanceEggStore(newInstanceEggStore))
    store.dispatch(setInstanceSnct(newInstanceSnct))
    store.dispatch(setInstanceToc(newInstanceToc))
    store.dispatch(setInstanceMarketplace(newInstanceMarketplace))
    store.dispatch(setInstanceSnakeNFT(newInstanceSnakeNFT))
    store.dispatch(setInstanceEggNFT(newInstanceEggNFT))
    store.dispatch(setInstanceBootStore(newInstanceBootStore))
    store.dispatch(setInstanceSnakeStore(newInstanceSnakeStore))
    store.dispatch(setInstanceFaucet(newInstanceFaucet))
    store.dispatch(setInstanceTokenReward(newInstanceTokenReward))
    store.dispatch(setInstanceEggAirDrop(newInstanceEggAirDrop))
  } catch (e) {
    //
  }
}
