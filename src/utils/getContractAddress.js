const contractAddress = {

  //AVAX Testnet
  43113: {
    Marketplace: '0xFf2447b7FE61E318f924e13aB5D83cB1FC7b7b62',
    SnakeNFT: '0xA4026987eBD001f944b3f0D4c721788562d8C93C',
    EggNFT: '0xB2bdb5B9de7a2b0FD165617Ec6A5e9500F264f43',    
    EggStore: '0x5744b0b493e4a7bc0d40de59a65a8fa66ccf5f17',
    SnctToken: '0x51a3e0cc6a53f84cb0ff23eca3061bb2a30c5095',
    TocToken: '0x7fa3b77eb457aa52c47f3bd93a37fd3794f7e0c7',
    BootStore: '0xe2b751632a8c8f3041abda4b9231bb37f85fa8d3',
    SnakeStore: '0x6a35cC616dfC127acAA3baCf05696661eF5507b0',
    Faucet: '0xa666d25c243ca8f310980bf86cd56d4ba34f4a87',
    TokenReward : '0xbb2909583acee811314d14b068539efd148e1526',
    EggAirDrop : '0xb772a648eab12b090a99d688778a49b4f2ea5323'
  },
  //AVAX Mainnet
  43114: {
    Marketplace: '0x98c61A080aA6Ad8911Fd6D72b3b65949c25239b0',
    EggNFT: '0x4735fC0C3D7D3F8E5DF62B5645aA0c2eBdEcA271',
    SnakeNFT: '0x0386a59bddea7e9e4b3f95da83cc065d230b3d43',
    EggStore: '0xAc33027b54B4456784f0F80e66E7fe923aE5091A',
    SnctToken: '0x2905d6d6957983d9ed73bc019ff2782c39dd7a49',
    TocToken: '0xf2e4a7c6d028006a4fe65ba7ea308051d380fd9b',
    BootStore: '0x8af7c6fbAFd041aAA3912B1b9F568efC3017a564',
    SnakeStore: '0x4e20c382e57e11895c14178d98690b706d3c9057',
    Faucet: '0xa666d25c243ca8f310980bf86cd56d4ba34f4a87',
    TokenReward : '0x77A5B32DeE437D67F05b3ba63E43aE9033c00aAc',
    EggAirDrop : '0xb772a648eab12b090a99d688778a49b4f2ea5323'
  },
};

export const getContractAddress = (_chainId) => {
  return contractAddress[_chainId];
};
