import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import { serviceDetailsReducer, serviceReducer } from './reducers/serviceReducers';
import { profileReducer, userReducer } from './reducers/userReducers';

const reducer= combineReducers({
    services: serviceReducer,
    serviceDetails: serviceDetailsReducer,
     user: userReducer,
     profile: profileReducer,
});

let initialState= {};

const middleware= [thunk];

const store= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;