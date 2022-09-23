import Web3 from 'web3';

export const web3Default = {
  //AVAX Testnet
  43113: {
    web3Default: new Web3(new Web3.providers.HttpProvider('https://api.avax-test.network/ext/bc/C/rpc')),
    name: 'AVAX Testnet',
    explorer: 'https://testnet.snowtrace.io/',
  },
  //AVAX Mainnet
  43114: {
    web3Default: new Web3(
        new Web3.providers.HttpProvider('https://api.avax.network/ext/bc/C/rpc')
    ),
    name: 'AVAX Mainnet',
    explorer: 'https://snowtrace.io/',
  }
};

export const networkDefault = !!localStorage.getItem('chainId')
  ? parseInt(localStorage.getItem('chainId'))
  : 56;

export const getWeb3List = (_chainId) => {
  return web3Default[_chainId];
};
