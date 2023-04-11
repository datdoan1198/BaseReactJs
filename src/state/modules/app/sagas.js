import {
    all,
    fork,
    put,
    takeLatest,
    select
} from 'redux-saga/effects';
import {BOOT} from '../app';
import { redirect } from 'redux-first-router';
import {
    selectRouteType
} from '../routing';

function* watchAppBoot() {
    yield takeLatest(BOOT, function*() {
        const routeType = yield select(selectRouteType);
        const { location } = yield select();

        // yield put(bootFinished());
        yield put(redirect({
            type: routeType,
            payload: location.payload,
            query: location.query
        }));
    });
}

export default function* auth() {
    yield all([
        fork(watchAppBoot),
    ]);
}
