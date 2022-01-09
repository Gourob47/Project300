import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConstants";
import { CLEAR_ERRORS } from "../constants/orderConstants";

import axios from "axios";
import { DELETE_SERVICE_FAIL } from "../constants/serviceConstants";

export const createOrder=(order)=>async(dispatch)=>{
    try {
        dispatch({type: CREATE_ORDER_REQUEST});

        const config= {headers: {"Content-Type": "application/json"}};

        const {data}= await axios.post(`/api/v1/program/new`,order, config);
        
        dispatch({type:CREATE_ORDER_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type:CREATE_ORDER_FAIL,
        payload: error.response.data.message,
        })
        
    }
}



export const myOrders=()=>async(dispatch)=>{
    try {
        dispatch({type: MY_ORDER_REQUEST});

      

        const {data}= await axios.get(`/api/v1/programs/me`);
        
        /* */
        dispatch({type:MY_ORDER_SUCCESS, payload: data.program});

    } catch (error) {
        dispatch({type:MY_ORDER_FAIL,
        payload: error.response.data.message,
        })
        
    }
}



export const getAllOrders=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_ORDER_REQUEST});

      

        const {data}= await axios.get(`/api/v1/admin/programs`);
        
        /* */
        dispatch({type:ALL_ORDER_SUCCESS, payload: data.programs});

    } catch (error) {
        dispatch({type:ALL_ORDER_FAIL,
        payload: error.response.data.message,
        })
        
    }
}


export const updateOrder=(id,order)=>async(dispatch)=>{
    try {
        dispatch({type: UPDATE_ORDER_REQUEST});

        const config= {headers: {"Content-Type": "application/json"}};

        const {data}= await axios.put(`/api/v1/admin/program/${id}`,order, config);
        
        dispatch({type:UPDATE_ORDER_SUCCESS, payload: data.success});

    } catch (error) {
        dispatch({type:UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
        })
        
    }
}


export const deleteOrder=(id)=>async(dispatch)=>{
    try {
        dispatch({type: DELETE_ORDER_REQUEST});

        const config= {headers: {"Content-Type": "application/json"}};

        const {data}= await axios.delete(`/api/v1/admin/program/${id}`);
        
        dispatch({type:DELETE_ORDER_SUCCESS, payload: data.success});

    } catch (error) {
        dispatch({type:DELETE_SERVICE_FAIL,
        payload: error.response.data.message,
        })
        
    }
}


export const getOrderDetails=(id)=>async(dispatch)=>{
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

      

        const {data}= await axios.delete(`/api/v1/admin/program/${id}`);
        
        /* */
        dispatch({type:ORDER_DETAILS_SUCCESS, payload: data.program});

    } catch (error) {
        dispatch({type:ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
        })
        
    }
}



export const clearErrors=()=> async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
