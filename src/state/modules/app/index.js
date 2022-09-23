import { createReducer } from 'redux-create-reducer';
import {getNotification, VALUE_MAX} from "../../../utils/helper";
import { getContractAddress } from 'utils/getContractAddress';
import callAPI from "../../../utils/callAPI";

export const BOOT = 'BOOT';
export const BOOT_FINISHED = 'BOOT_FINISHED';

export const SET_WEB3 = 'SET_WEB3';
export const SET_CHAIN_ID = 'SET_CHAIN_ID';
export const SET_WALLET_ADDRESS = 'SET_WALLET_ADDRESS';
export const SET_IS_APPROVE_FOR_MARKET = 'SET_IS_APPROVE_OFR_MARKET';
export const SET_IS_APPROVE_FOR_TOKEN = 'SET_IS_APPROVE_FOR_TOKEN';

export const SHOW_TOAST_ALERT = 'SHOW_TOAST_ALERT';
export const CLOSE_TOAST_ALERT = 'CLOSE_TOAST_ALERT';

export const RESET_WALLET_ADDRESS = 'RESET_WALLET_ADDRESS';

export const SET_INSTANCE_SMART_CONTRACT = 'SET_INSTANCE_SMART_CONTRACT';
export const SET_INSTANCE_NFT = 'SET_INSTANCE_NFT';
export const SET_INSTANCE_EGG_STORE = 'SET_INSTANCE_EGG_STORE';
export const SET_INSTANCE_SNCT = 'SET_INSTANCE_SNCT';
export const SET_INSTANCE_TOC = 'SET_INSTANCE_TOC';
export const SET_INSTANCE_MARKETPLACE = 'SET_INSTANCE_MARKETPLACE';
export const SET_INSTANCE_SNAKE_NFT = 'SET_INSTANCE_SNAKE_NFT';
export const SET_INSTANCE_EGG_NFT = 'SET_INSTANCE_EGG_NFT';
export const SET_INSTANCE_BOOT_STORE = 'SET_INSTANCE_BOOT_STORE';
export const SET_INSTANCE_SNAKE_STORE = 'SET_INSTANCE_SNAKE_STORE';
export const SET_INSTANCE_FAUCET = 'SET_INSTANCE_FAUCET';
export const SET_INSTANCE_TOKEN_REWARD = 'SET_INSTANCE_TOKEN_REWARD';
export const SET_INSTANCE_EGG_AIR_DROP = 'SET_INSTANCE_EGG_AIR_DROP';

export const SET_LOADING = 'SET_LOADING';
export const SET_LOADING_DATA = 'SET_LOADING_DATA';

export const REQUEST_NONCE = 'REQUEST_NONCE';
export const REQUEST_NONCE_SUCCESS = 'REQUEST_NONCE_SUCCESS';
export const REQUEST_NONCE_FAILURE = 'REQUEST_NONCE_FAILURE';

export const SET_IS_CONNECT_WALLET = 'SET_IS_CONNECT_WALLET';

export const REQUEST_GET_STATUS_UPDATE_INFO = 'REQUEST_GET_STATUS_UPDATE_INFO';
export const REQUEST_GET_STATUS_UPDATE_INFO_SUCCESS = 'REQUEST_GET_STATUS_UPDATE_INFO_SUCCESS';
export const REQUEST_GET_STATUS_UPDATE_INFO_FAILURE = 'REQUEST_GET_STATUS_UPDATE_INFO_FAILURE';

export const REQUEST_UPDATE_INFO = 'REQUEST_UPDATE_INFO';
export const REQUEST_UPDATE_INFO_SUCCESS = 'REQUEST_UPDATE_INFO_SUCCESS';
export const REQUEST_UPDATE_INFO_FAILURE = 'REQUEST_UPDATE_INFO_FAILURE';

export const SET_VISIBLE_MODAL_UPDATE_INFO_USER = 'SET_VISIBLE_MODAL_UPDATE_INFO_USER';
export const SET_LOADING_BTN_UPDATE_INFO_USER = 'SET_LOADING_BTN_UPDATE_INFO_USER';

const defaultState = {
  isBooting: false,
  bootDidFinish: false,
  web3: null,
  chainId: null,
  walletAddress: null,
  isShowToastAlert: false,
  toastAlertPayload: {
    type: '',
    message: '',
  },
  instanceSmartContract: null,
  instanceNFT: null,
  isApproveForMarket: true,
  isApproveForToken: false,
  instanceEggStore:null,
  instanceSnct:null,
  instanceToc:null,
  instanceMarketplace: null,
  instanceSnakeNFT: null,
  instanceEggNFT: null,
  instanceBootStore: null,
  instanceSnakeStore: null,
  loading: false,
  nonce: 0,
  loadingData: true,
  isConnectWallet: false,
  instanceFaucet: null,
  instanceTokenReward: null,
  instancEggAirDrop: null,
  statusUpdateInfoUser: false,
  visibleModalUpdateInfoUser: false,
  loadingBtnUpdataInfoUser: false
};

const reducer = createReducer(defaultState, {
  [BOOT]: state => ({
    ...state,
    isBooting: true,
    bootDidFinish: false
  }),
  [BOOT_FINISHED]: state => ({
    ...state,
    isBooting: false,
    bootDidFinish: true
  }),
  [SET_WEB3]: (state, action) => ({
    ...state, web3: action.payload
  }),
  [SET_CHAIN_ID]: (state, action) => ({
    ...state, chainId: action.payload
  }),
  [SET_WALLET_ADDRESS]: (state, action) => ({
    ...state, walletAddress: action.payload
  }),
  [SHOW_TOAST_ALERT]: (state, action) => ({
    ...state,
    isShowToastAlert: true,
    toastAlertPayload: action.payload
  }),
  [CLOSE_TOAST_ALERT]: state => ({
    ...state,
    isShowToastAlert: false,
    toastAlertPayload: {
      type: '',
      message: '',
    }
  }),
  [RESET_WALLET_ADDRESS]: state => ({
    ...state,
    walletAddress: null
  }),
  [SET_INSTANCE_SMART_CONTRACT]: (state, action) => ({
    ...state, instanceSmartContract: action.payload
  }),
  [SET_INSTANCE_NFT]: (state, action) => ({
    ...state, instanceNFT: action.payload
  }),
  [SET_IS_APPROVE_FOR_MARKET]: (state, action) => ({
    ...state,
    isApproveForMarket: action.payload,
  }),
  [SET_IS_APPROVE_FOR_TOKEN]: (state, action) => ({
    ...state,
    isApproveForToken: action.payload,
  }),
  [SET_INSTANCE_EGG_STORE]: (state, action) => ({
    ...state, 
    instanceEggStore: action.payload
  }),
  [SET_INSTANCE_SNCT]: (state, action) => ({
    ...state, 
    instanceSnct: action.payload
  }),
  [SET_INSTANCE_MARKETPLACE]: (state, action) => ({
    ...state, 
    instanceMarketplace: action.payload
  }),
  [SET_INSTANCE_SNAKE_NFT]: (state, action) => ({
    ...state, 
    instanceSnakeNFT: action.payload
  }),
  [SET_LOADING]: (state, action) => ({
    ...state, 
    loading: action.payload
  }),
  [SET_INSTANCE_EGG_NFT]: (state, action) => ({
    ...state, 
    instanceEggNFT: action.payload
  }),
  [SET_INSTANCE_TOC]: (state, action) => ({
    ...state, 
    instanceToc: action.payload
  }),
  [REQUEST_NONCE]: state => ({
    ...state,
    loadingTableClaim: true
  }),
  [REQUEST_NONCE_SUCCESS]: (state, action) => ({
    ...state,
    nonce: action.payload.user.nonce,
  }),
  [REQUEST_NONCE_FAILURE]: (state, action) => ({
    ...state,
    nonce: 0
  }),
  [SET_LOADING_DATA]: (state, action) => ({
    ...state,
    loadingData: action.payload
  }),
  [SET_INSTANCE_BOOT_STORE]: (state, action) => ({
    ...state, 
    instanceBootStore: action.payload
  }),
  [SET_INSTANCE_SNAKE_STORE]: (state, action) => ({
    ...state, 
    instanceSnakeStore: action.payload
  }),
  [SET_IS_CONNECT_WALLET]: (state, action) => ({
    ...state, 
    isConnectWallet: action.payload
  }),
  [SET_INSTANCE_FAUCET]: (state, action) => ({
    ...state, 
    instanceFaucet: action.payload
  }),
  [SET_INSTANCE_TOKEN_REWARD]: (state, action) => ({
    ...state, 
    instanceTokenReward: action.payload
  }),
  [SET_INSTANCE_EGG_AIR_DROP]: (state, action) => ({
    ...state, 
    instancEggAirDrop: action.payload
  }),
  [REQUEST_GET_STATUS_UPDATE_INFO]: state => ({
    ...state,
    statusUpdateInfoUser: false
  }),
  [REQUEST_GET_STATUS_UPDATE_INFO_SUCCESS]: (state, action) => ({
    ...state,
    statusUpdateInfoUser: action.payload.status,
    visibleModalUpdateInfoUser: action.payload.status ? false : true
  }),
  [REQUEST_GET_STATUS_UPDATE_INFO_FAILURE]: state => ({
    ...state,
    statusUpdateInfoUser: false
  }),
  [SET_VISIBLE_MODAL_UPDATE_INFO_USER]: (state, action) => ({
    ...state,
    visibleModalUpdateInfoUser: action.payload
  }),
  [SET_LOADING_BTN_UPDATE_INFO_USER]: (state, action) => ({
    ...state,
    loadingBtnUpdataInfoUser: action.payload
  })
});

export default reducer;
export const namespace = 'app';

export const changeWeiToInt = (wei) => async (dispatch, getState) => {
  const {app} = getState()
  const { web3 } = app
  return web3.utils.fromWei(wei)
};

export const boot = (options = {}) => ({
  type: BOOT,
  payload: options
});

export const setLoading = (type) => ({
  type: SET_LOADING,
  payload: type
});

export const bootFinished = () => ({
  type: BOOT_FINISHED
});

export const setWeb3 = (web3) => ({
  type: SET_WEB3,
  payload: web3
});

export const setChainId = (chainId) => ({
  type: SET_CHAIN_ID,
  payload: chainId
});

export const setWalletAddress = (walletAddress) => ({
  type: SET_WALLET_ADDRESS,
  payload: walletAddress
});

export const resetWalletAddress = () => ({
  type: RESET_WALLET_ADDRESS,
});

export const showToastAlert = (message = '', type = 'success') => ({
  type: SHOW_TOAST_ALERT,
  payload: {
    type,
    message
  }
});

export const closeToastAlert = () => ({
  type: CLOSE_TOAST_ALERT
});

export const setInstanceSmartContract = (payload) => ({
  type: SET_INSTANCE_SMART_CONTRACT,
  payload: payload
});

export const setIsConnectWallet = (payload) => ({
  type: SET_IS_CONNECT_WALLET,
  payload: payload
});

export const setInstanceBootStore = (payload) => ({
  type: SET_INSTANCE_BOOT_STORE,
  payload: payload
});

export const setInstanceSnakeStore = (payload) => ({
  type: SET_INSTANCE_SNAKE_STORE,
  payload: payload
});

export const setInstanceTokenReward = (payload) => ({
  type: SET_INSTANCE_TOKEN_REWARD,
  payload: payload
});

export const setInstanceNFT = (payload) => ({
  type: SET_INSTANCE_NFT,
  payload: payload
});

export const setInstanceEggStore = (payload) => ({
  type: SET_INSTANCE_EGG_STORE,
  payload: payload
});

export const setInstanceSnct = (payload) => ({
  type: SET_INSTANCE_SNCT,
  payload: payload
});

export const setInstanceToc = (payload) => ({
  type: SET_INSTANCE_TOC,
  payload: payload
});

export const setInstanceMarketplace = (payload) => ({
  type: SET_INSTANCE_MARKETPLACE,
  payload: payload
});

export const setInstanceSnakeNFT = (payload) => ({
  type: SET_INSTANCE_SNAKE_NFT,
  payload: payload
});

export const setInstanceEggNFT = (payload) => ({
  type: SET_INSTANCE_EGG_NFT,
  payload: payload
});

export const setInstanceFaucet = (payload) => ({
  type: SET_INSTANCE_FAUCET,
  payload: payload
});

export const setInstanceEggAirDrop = (payload) => ({
  type: SET_INSTANCE_EGG_AIR_DROP,
  payload: payload
});

export const setIsApproveForMarket = (payload) => ({
  type: SET_IS_APPROVE_FOR_MARKET,
  payload: payload
});

export const setIsApproveForToken = (payload) => ({
  type: SET_IS_APPROVE_FOR_TOKEN,
  payload: payload
});

export const setVisibleModalUpdateInfoUser = (type) => ({
  type: SET_VISIBLE_MODAL_UPDATE_INFO_USER,
  payload: type
});

export const setLoadingBtnUpdateInfoUser = (type) => ({
  type: SET_LOADING_BTN_UPDATE_INFO_USER,
  payload: type
});

export const getNonce = (skip = 0, limit = 10) => async (dispatch, getState) => {
  const {app} = getState()
  if (app.walletAddress) {
    return await callAPI({
      method: 'get',
      apiPath: `/auth/checkAddress?walletAddress=${app.walletAddress}`,
      actionTypes: [REQUEST_NONCE, REQUEST_NONCE_SUCCESS, REQUEST_NONCE_FAILURE],
      variables: {},
      dispatch,
      getState
    });
  }
};

export const getAllowanceCharacterForMarket = () => async (dispatch, getState) => {
  const {app} = getState()
  const { web3, chainId, walletAddress, instanceNFT} = app
  if (!!chainId && web3 && walletAddress && instanceNFT) {
    try {
      let contractAddress = getContractAddress(chainId);
      let allowance = await instanceNFT.methods.isApprovedForAll(
          walletAddress,
          contractAddress.SnakeNFT
      ).call();
      dispatch(setIsApproveForMarket(allowance))
    } catch (e) {
      // 
    }
  }
};

export const approveCharacterForMarket = () => async (dispatch, getState) => {
  const {app} = getState()
  const { web3, chainId, walletAddress, instanceNFT} = app
  if (!!chainId && web3 && walletAddress && instanceNFT) {
    try {
      let contractAddress = getContractAddress(chainId);
      await instanceNFT.methods
          .setApprovalForAll(contractAddress.SnakeNFT, true)
          .send({from: walletAddress})
          .on('transactionHash', (txHash) => {
          //
          })
          .on('receipt', () => {
            dispatch(getAllowanceCharacterForMarket())
          });
    } catch (e) {
      if (e && e.code !== 4001) {
      //
      }
    }
  }
};

export const getAllowanceTokenForMarket = () => async (dispatch, getState) => {
  const {app} = getState()
  const { web3, chainId, walletAddress, instanceSmartContract} = app
  if (!!chainId && web3 && walletAddress && instanceSmartContract) {
    try {
      let contractAddress = getContractAddress(chainId);
      let allowance = await instanceSmartContract.methods.allowance(
          walletAddress,
          contractAddress.MarketplaceProxy
      ).call();
      dispatch(setIsApproveForToken(allowance))
    } catch (e) {
      //
    }
  }
};

export const approveTokenForMarket = () => async (dispatch, getState) => {
  const {app} = getState()
  const { web3, chainId, walletAddress, instanceSmartContract} = app
  if (!!chainId && web3 && walletAddress && instanceSmartContract) {
    try {
      let contractAddress = getContractAddress(chainId);
      await instanceSmartContract.methods
          .approve(contractAddress.MarketplaceProxy, VALUE_MAX)
          .send({from: walletAddress})
          .on('transactionHash', (txHash) => {
            //
          })
          .on('receipt', () => {
            //
            dispatch(getAllowanceTokenForMarket())
          });
    } catch (e) {
      if (e && e.code !== 4001) {
      //
      }
    }
  }
};

export const checkInfoUpdateUser = () => async (dispatch, getState) => {
  const {app} = getState();
  if (app.walletAddress) {
    return await callAPI({
      method: 'get',
      apiPath: `/auth/checkInfoUpdate`,
      actionTypes: [
        REQUEST_GET_STATUS_UPDATE_INFO, 
        REQUEST_GET_STATUS_UPDATE_INFO_SUCCESS, 
        REQUEST_GET_STATUS_UPDATE_INFO_FAILURE
      ],
      variables: {},
      dispatch,
      getState
    });
  }
} 

export const handleUpdateInfoUser = (email, password) => async (dispatch, getState) => {
  const {app} = getState();
  if (app.walletAddress) {
    dispatch(setLoadingBtnUpdateInfoUser(true))
    return await callAPI({
      method: 'put',
      apiPath: `/users`,
      actionTypes: [
        REQUEST_UPDATE_INFO, 
        REQUEST_UPDATE_INFO_SUCCESS, 
        REQUEST_UPDATE_INFO_FAILURE
      ],
      variables: {
        email: email,
        password: password
      },
      dispatch,
      getState
    });
  }
} 


export const isBooting = state => state.app.isBooting;
export const bootDidFinish = state => state.app.bootDidFinish;

export const setLoadingData = (type) => ({
  type: SET_LOADING_DATA,
  payload: type
})