import {
    all,
    fork,
    put,
    takeLatest,
    select
} from 'redux-saga/effects';
import {BOOT, bootFinished} from './';
import { redirect } from 'redux-first-router';
import {
    selectRouteType
} from '../routing';
import {
    REQUEST_UPDATE_INFO_SUCCESS,
    REQUEST_UPDATE_INFO_FAILURE,
    checkInfoUpdateUser,
    setLoadingBtnUpdateInfoUser
} from "../app";
import {getNotification} from "../../../utils/helper";

function* watchAppBoot() {
    yield takeLatest(REQUEST_UPDATE_INFO_SUCCESS, function*(action) {
        getNotification(
            'success',
            'Update Info User',
            'Successfully update info user'
        )
        yield put(setLoadingBtnUpdateInfoUser(false))
        yield put(checkInfoUpdateUser());
    });
    yield takeLatest(REQUEST_UPDATE_INFO_FAILURE, function*(action) {
        let text = 'Update info user failed, please try again'
        if (action.payload.data.code === 'EMAIL_EXISTS') {
            text = action.payload.data.message;
        }
        getNotification(
            'error',
            'Update Info User',
            text
        )
        yield put(setLoadingBtnUpdateInfoUser(false))
    });
    yield takeLatest(BOOT, function*() {
        const routeType = yield select(selectRouteType);
        const { location } = yield select();

        yield put(bootFinished());
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
  