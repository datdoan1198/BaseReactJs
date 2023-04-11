import { combineReducers } from 'redux';

import appReducer, { namespace as appNamespace } from './modules/app';
import authReducer, { namespace as authNamespace } from './modules/auth';
import homeReducer, { namespace as homeNamespace } from './modules/home';

const reducer = extraReducers =>
    combineReducers({
        [appNamespace]: appReducer,
        [authNamespace]: authReducer,
        [homeNamespace]: homeReducer,
        ...extraReducers
    })

export default reducer;
