import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import { newReviewReducer, serviceDetailsReducer, serviceReducer } from './reducers/serviceReducers';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { myOrderReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducers';
import { myOrders } from './actions/orderAction';

const reducer= combineReducers({
    services: serviceReducer,
    serviceDetails: serviceDetailsReducer,
     user: userReducer,
     profile: profileReducer,
     forgotPassword: forgotPasswordReducer,
     cart: cartReducer,
     order: newOrderReducer,
     myOrder: myOrderReducer,
     orderDetails: orderDetailsReducer,
     newReview: newReviewReducer,
});

let initialState= {
  /*  cart:{
  
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

      
    }*/

    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],

       
      },
   
};

const middleware= [thunk];

const store= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;