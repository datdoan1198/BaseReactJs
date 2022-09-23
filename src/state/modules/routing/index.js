export const ROUTE_HOME = 'route/ROUTE_HOME';
export const  ROUTE_STARTER_PACK = 'route/ROUTE_STARTER_PACK';
export const  ROUTE_SNAKE_ARMY = 'route/ROUTE_SNAKE_ARMY';
export const  ROUTE_MARKETPLACE = 'route/ROUTE_MARKETPLACE';
export const  ROUTE_INVENTORY = 'route/ROUTE_INVENTORY';
export const  ROUTE_STAKING = 'route/ROUTE_STAKING';
export const  ROUTE_SNAKE_DETAIL = 'route/ROUTE_SNAKE_DETAIL';
export const  ROUTE_SNAKE_INFO = 'route/ROUTE_SNAKE_INFO';
export const  ROUTE_SNAKE_REWARD = 'route/ROUTE_SNAKE_REWARD';
export const  ROUTE_LEADER_BOARD = 'route/ROUTE_LEADER_BOARD';
export const  ROUTE_FAUCET = 'route/ROUTE_FAUCET';
export const  ROUTE_FREE_ZONE = 'route/ROUTE_FREE_ZONE';
export const  ROUTE_FREE_ZONE_DETAIL = 'route/ROUTE_FREE_ZONE_DETAIL';
export const ROUTE_MIGRATE = 'route/ROUTE_MIGRATE';

export const selectRouteType = state => state.location.type;
export const selectRoutesMap = state => state.location.routesMap;
export const selectPreviousRoute = state => state.location.prev;

export const goToPage = (routeType, payload) => ({
    type: routeType,
    payload: payload
});
