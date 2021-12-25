import {
ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO,
}from "../constants/cartConstants";
import axios from "axios";

export const addItemToCart= (id)=> async(dispatch, getState)=>{
    const {data}= await axios.get(`/api/v1/service/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload:{
            
            service: data.service._id,
            name: data.service.name,
            price: data.service.price,
        

        }
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeItemsFromCart= (id)=> async(dispatch, getState)=>{
 
    dispatch({
        type: REMOVE_CART_ITEM,
        payload:id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}



/*export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
  localStorage.setItem("shippingInfo", JSON.stringify(data));
  };*/