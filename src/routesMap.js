import {NOT_FOUND} from 'redux-first-router';
import {
    ROUTE_AUTH,
    ROUTE_HOME
} from './state/modules/routing';
import {loadHomePage} from './state/modules/home/saga';

const routeMap = {
    [NOT_FOUND]: {
        path: '/not-found',
        component: 'NotFound',
    },
    [ROUTE_HOME]: {
        path: '/',
        component: 'Home',
        saga: loadHomePage
    },
    [ROUTE_AUTH]: {
        path: '/login',
        component: 'Auth',
        saga: loadHomePage
    }
}

export default routeMap;
