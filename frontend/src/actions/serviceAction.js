import axios from 'axios';

import {
    ALL_SERVICE_REQUEST,
    ALL_SERVICE_SUCCESS,
    ALL_SERVICE_FAIL,
    CLEAR_ERRORS,
  } from "../constants/serviceConstants";


  export const getAllService=()=> async(dispatch)=>{

    
    try {
        dispatch({type: ALL_SERVICE_REQUEST});

        const {data}= await axios.get("api/v1/service");

        dispatch({
            type: ALL_SERVICE_SUCCESS,
            payload: data,
        })

       
        
    } catch (error) {
        dispatch({
            type: ALL_SERVICE_FAIL,
            payload: error.message,
        })
        
    }
  };


  //Clearing Errors

  export const clearErrors=()=> async(dispatch)=>{
      dispatch({type:CLEAR_ERRORS});
  }
  