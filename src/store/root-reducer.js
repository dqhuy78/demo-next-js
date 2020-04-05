import { combineReducers } from 'redux-immutable';

import { reducers as auth } from './modules/auth';

export default combineReducers({
    auth,
});

