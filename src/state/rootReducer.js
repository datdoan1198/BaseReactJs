import { combineReducers } from 'redux';

import appReducer, { namespace as appNamespace } from './modules/app';
import homeReducer, { namespace as homeNamespace } from './modules/home';

const reducer = extraReducers =>
    combineReducers({
        [appNamespace]: appReducer,
        [homeNamespace]: homeReducer,
        ...extraReducers
    })

export default reducer;
