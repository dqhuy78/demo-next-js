import { all, fork } from 'redux-saga/effects';

import { sagas as authSaga } from './modules/auth';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
    ]);
}
