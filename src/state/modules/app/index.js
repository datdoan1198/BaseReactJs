import { createReducer } from 'redux-create-reducer';

export const BOOT = 'BOOT';

const defaultState = {
  isBooting: false,
  bootDidFinish: false,
};

const reducer = createReducer(defaultState, {
  [BOOT]: state => ({
    ...state,
    isBooting: true,
    bootDidFinish: false
  }),
});

export default reducer;
export const namespace = 'app';

export const boot = (options = {}) => ({
  type: BOOT,
  payload: options
});
