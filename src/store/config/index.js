import { fromJS } from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga';

import rootReducer from '~/store/root-reducer';
import rootSaga from '~/store/root-saga';

const bindMiddleware = middleware => {
    if (process.env.APP_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');

        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

const configureStore = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        fromJS(initialState),
        bindMiddleware([sagaMiddleware])
    );
    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;
