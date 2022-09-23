import {
  select,
  take,
  all,
  fork,
  cancel,
  takeLatest
} from 'redux-saga/effects';
import { isEqual } from 'lodash';

import {
  selectRoutesMap,
  selectPreviousRoute
} from './index';

import { BOOT_FINISHED, bootDidFinish } from '../app';

// setup sagas on application boot
export function* watchRouteSagas() {
  const routesMap = yield select(selectRoutesMap);

  // watch routing actions -- spawn route sagas when the route mounts, and
  // cancel them when the route exits.
  let currentRouteTask;

  yield takeLatest(Object.keys(routesMap), function*(currentRoute) {

    const hasBooted = yield select(bootDidFinish);
    if (!hasBooted) {
      yield take(BOOT_FINISHED);
    }

    const previousRoute = yield select(selectPreviousRoute);

    if (
      currentRoute.type === previousRoute.type &&
      isEqual(currentRoute.payload, previousRoute.payload)
    ) {
      // no route change; leave sagas alon
      return;
    }

    if (currentRouteTask) {
      yield cancel(currentRouteTask);
    }

    if (routesMap[currentRoute.type].saga) {
      currentRouteTask = yield fork(routesMap[currentRoute.type].saga);
    }
  });
}

export default function* routes() {
  yield all([
    fork(watchRouteSagas),
  ]);
}
