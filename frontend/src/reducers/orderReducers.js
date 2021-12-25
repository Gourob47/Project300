import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants";
import { CLEAR_ERRORS } from "../constants/orderConstants";

export const newOrderReducer=(state={}, action)=>{
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading:true
            };
           case CREATE_ORDER_SUCCESS:
               return{
                   laoding: false,
                   order: action.payload

           };
           case CREATE_ORDER_FAIL:
           return{
               laoding: true,
               error: action.payload
           }

           case CLEAR_ERRORS:
               return{
                   ...state,
                   error: null
               }
            
    
        default:
            return state;
    }
}


export const myOrderReducer=(state={orders:[], package:{}}, action)=>{
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return{
              
                loading:true
            };
           case MY_ORDER_SUCCESS:
               return{
                   laoding: false,
                   orders: action.payload

           };
           case MY_ORDER_FAIL:
           return{
               laoding: true,
               error: action.payload
           }

           case CLEAR_ERRORS:
               return{
                   ...state,
                   error: null
               }
            
    
        default:
            return state;
    }
}


export const orderDetailsReducer=(state={order:{}}, action)=>{
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return{
              
                loading:true
            };
           case ORDER_DETAILS_SUCCESS:
               return{
                   laoding: false,
                   order: action.payload

           };
           case ORDER_DETAILS_FAIL:
           return{
               laoding: true,
               error: action.payload
           }

           case CLEAR_ERRORS:
               return{
                   ...state,
                   error: null
               }
            
    
        default:
            return state;
    }
}