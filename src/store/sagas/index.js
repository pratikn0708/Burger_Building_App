import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actiontypes from '../actions/actionTypes';
import { logoutSaga, checkoutTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
    yield all([
        takeEvery(actiontypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actiontypes.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga),
        takeEvery(actiontypes.AUTH_USER, authUserSaga),
        takeEvery(actiontypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
};

export function* watchBurgerBuilder() {
    yield takeEvery(actiontypes.INIT_INGREDIENTS, initIngredientsSaga);
};

export function* watchOrder() {
    yield takeLatest(actiontypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actiontypes.FETCH_ORDERS, fetchOrdersSaga);
};
