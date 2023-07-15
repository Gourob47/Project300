import { useState } from "react";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [], /*shippingInfo:{},*/ }, action) => {
  
    switch (action.type) {
        case ADD_TO_CART:
          // return {
          //   ...state,
          //   cartItems: [...state.cartItems, action.payload],
          // };
          const item = action.payload;

          
    
          const isItemExist = state.cartItems.find(
            (i) => i.service === item.service
            
          );
    
          if (isItemExist) {
            return {
              ...state,
               cartItems: state.cartItems.map((i) =>
                i.service === isItemExist.service ? item : i
              ),
              
            };
          }
           else {
            return {
  
               ...state,           
                cartItems: [...state.cartItems.slice(1), item],
            };
          }
       

          case REMOVE_CART_ITEM:
              return{
                  ...state,
                  cartItems: state.cartItems.filter((i)=>i.service!==action.payload)
              }

              /*case SAVE_SHIPPING_INFO:
                return{
                  ...state,
                  shippingInfo: action.paylaod,
                }*/
    default:
      return state;
  }
};


