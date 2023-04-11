export const ROUTE_HOME = 'route/ROUTE_HOME';
export const ROUTE_AUTH = 'route/ROUTE_AUTH';

export const selectRouteType = state => state.location.type;
export const selectRoutesMap = state => state.location.routesMap;
export const selectPreviousRoute = state => state.location.prev;

export const goToPage = (routeType, payload) => ({
    type: routeType,
    payload: payload
});
