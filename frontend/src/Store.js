import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import { serviceReducer } from './reducers/serviceReducers';

const reducer= combineReducers({
    services: serviceReducer,
});

let initialState= {};

const middleware= [thunk];

const store= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;