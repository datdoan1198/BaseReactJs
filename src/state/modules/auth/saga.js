import {
    all,
    fork,
    put,
    takeLatest
} from 'redux-saga/effects';
import {
    REQUEST_LOGIN,
    REQUEST_LOGIN_FAILURE,
    REQUEST_LOGIN_SUCCESS,
    REQUEST_REGISTER_FAILURE,
    REQUEST_REGISTER_SUCCESS
} from "./index";
import {getNotification} from "../../../utils/helper";
import {setAuthToken} from "../../../utils/localStorage";

function* loadRouteData() {
    //
}

function* handleActions() {
    yield takeLatest(REQUEST_REGISTER_SUCCESS, function*(action) {
        getNotification(
            'success',
            'Đăng ký tài khoản',
            'Đăng ký thành công!'
        )
    });

    yield takeLatest(REQUEST_REGISTER_FAILURE, function*(action) {
        let statusError = action.payload.data.status;
        let message = action.payload.data.message;
        if (statusError !== 400) {
            message = 'Đăng ký thất bại!';
        }
        getNotification('error','Đăng ký tài khoản', message);
    });

    yield takeLatest(REQUEST_LOGIN_SUCCESS, function*(action) {
        setAuthToken(action.payload.data.token);
        getNotification(
            'success',
            'Đăng nhập tài khoản',
            'Đăng nhập thành công!'
        )
    });

    yield takeLatest(REQUEST_LOGIN_FAILURE, function*(action) {
        let statusError = action.payload.data.status;
        let message = action.payload.data.message;
        if (statusError !== 400) {
            message = 'Đăng nhập thất bại!';
        }
        getNotification('error','Đăng nhập tài khoản', message);
    });
}

export function* loadAuthPage() {
    yield all([
        fork(loadRouteData),
        fork(handleActions)
    ]);
}

