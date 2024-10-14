import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';  // Named import
import { authReducer } from './Auth/Reducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
