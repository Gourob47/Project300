import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import { adminReviewReducer, deleteReviewReducer, deleteServiceReducer, newReviewReducer, newServiceReducer, serviceDetailsReducer, serviceReducer } from './reducers/serviceReducers';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailsReducer, updateOrderReducer } from './reducers/orderReducers';
import { myOrders } from './actions/orderAction';
import { getAdminService } from './actions/serviceAction';

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
     newService: newServiceReducer,
     deleteService: deleteServiceReducer,
     allOrders: allOrderReducer,
     updateOrders: updateOrderReducer,
     allUsers: allUsersReducer,
     userDetails: userDetailsReducer,
     allReviews: adminReviewReducer,
     deleteReviews: deleteReviewReducer,

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