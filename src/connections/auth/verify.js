import axios from "axios";
import {store} from 'state/configureStore';
import {hasAuthToken, setAuthToken} from "../../utils/localStorage";
import _ from 'lodash'
import { setWalletAddress } from "state/modules/app";

const getNonce = async (address) => {
  return await axios
      .get(`${process.env.REACT_APP_API_URL}/auth/checkAddress`, {
        params: {
          walletAddress: address
        }
      })
      .then(function (response) {
        return {nonce: _.get(response, 'data.user.nonce')};
      })
      .catch(function (error) {
        return {nonce: null, msg: 'error server'};
      });
};

const login = async (address, signature) => {
  return await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        walletAddress: address.toLowerCase(),
        signature: signature,
      })
      .then(function (response) {
        return {error: false, token: _.get(response, 'data.accessToken')};
      })
      .catch(function (error) {
        return {error: true, msg: 'error server'};
      });
};

const register = async (address) => {
  return await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        walletAddress: address,
    })
    .then(function (response) {
      return {nonce: _.get(response, 'data.user.nonce')};
    })
    .catch(function (error) {
      return {nonce: null, msg: 'error server'};
    });
};

const createSignature = async (web3, address, nonce) => {
    try {
      return await web3.eth.personal.sign(
          web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
          address
        );
    } catch (error) {
        throw new Error('Parameter is not a number!');
    }
};

export const verifySignatureWithServer = async (web3, address) => {
    try {
        if (!hasAuthToken()) {
            const resNonce = await getNonce(address);
            let token = ''

            if (resNonce.nonce) {
              const signature = await createSignature(web3, address, resNonce.nonce);
              const verify = await login(address, signature);
              token = verify.token
            } else {
              const resRegister = await register(address);
              const signature = await createSignature(web3, address, resRegister.nonce);
              const verify = await login(address, signature);
              token = verify.token
            }

            if (token) {
              setAuthToken(token)
              // store.dispatch(setWalletAddress(address))
            }
        }
    } catch (error) {
        return false;
    }
};
