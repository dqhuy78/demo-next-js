import { put, call, takeLatest, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

import authApi from '~/api/auth';

//========== TYPES ==========//
const GET_AUTH_USER = 'auth/GET_AUTH_USER';
const GET_POST = 'auth/GET_POST';
const STORE_AUTH_USER = 'auth/STORE_AUTH_USER';

export const types = {
    GET_AUTH_USER,
    STORE_AUTH_USER,
    GET_POST,
};

//========== ACTIONS ==========//
const storeAuthUser = createAction(types.STORE_AUTH_USER);

//========== SAGAS ==========//
export function* sagas() {
    yield all([
        yield takeLatest(types.GET_AUTH_USER, getAuthUser),
        yield takeLatest(types.GET_POST, getPost),
    ]);
};

function* getAuthUser() {
    try {
        const response = yield call(authApi.getAuthUser);
        yield put(storeAuthUser(response));
    } catch (error) {
        return false;
    }
}

function* getPost() {
    try {
        const response = yield call(authApi.getPost);
        yield put(storeAuthUser(response));
    } catch (error) {
        // handleError(error);
        return false;
    }
}

//========== SELECTORS ==========//
const getUser = state => state.getIn(['auth', 'user']);

export const selectors = {
    getUser,
};

//========== REDUCER ==========//
const storeUser = (state, action) =>  state.setIn(['auth', 'user'], fromJS(action.payload));

const initialState = fromJS({
    user: [],
});

export const reducers = handleActions({
    [types.STORE_AUTH_USER]: storeUser,
}, initialState);



