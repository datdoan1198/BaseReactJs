import { isFunction } from 'lodash';
import axios from 'axios';
import { getAuthToken, removeAuthToken, removeItem } from './localStorage';
import { notification } from 'antd';
import {resetWalletAddress, setIsConnectWallet} from '../state/modules/app'
import { goToPage, ROUTE_HOME } from 'state/modules/routing';

export default async function callAPI({
    method,
    apiPath,
    actionTypes: [requestType, successType, failureType],
    variables,
    dispatch,
    getState,
    headers
}) {
  if (!isFunction(dispatch) || !isFunction(getState)) {
    throw new Error('callGraphQLApi requires dispatch and getState functions');
  }

  let baseUrlApi = process.env.REACT_APP_API_URL;

  const token = getAuthToken();
  const header = {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
  dispatch({ type: requestType, meta: { variables } });
  return axios({
    baseURL: baseUrlApi,
    headers: headers ? {...headers, ...header} : header,
    method,
    url: apiPath,
    data: variables,
    params: method === 'get' ? variables : ''
  })
  .then(function (response) {
    dispatch({ type: successType, meta: { variables }, payload: response.data });
    return response.data;
  })
  .catch(function (error) {
    let response = error.response ? error.response : error;
    dispatch({ type: failureType, meta: { variables }, payload: error.response });
    if (response.status === 401 || response.status === 403) {
      /* Handle error */
    }
    return {
      errorCode: response.status,
      errorMessage: response.statusText
    };
  });
}
