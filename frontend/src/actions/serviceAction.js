import axios from 'axios';

import {
    ALL_SERVICE_REQUEST,
    ALL_SERVICE_SUCCESS,
    ALL_SERVICE_FAIL,

    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/serviceConstants";


  export const getAllService=(keyword="", currentPage=1, price=[1000,100000], category, ratings=0)=> async(dispatch)=>{

    
    try {
        dispatch({type: ALL_SERVICE_REQUEST});

        let link=`/api/v1/service?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category)
        {
           link=`/api/v1/service?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&catagory=${category}&ratings[gte]=${ratings}`;
        }

        const {data}= await axios.get(link);

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


  export const getServiceDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: SERVICE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/service/${id}`);
  
      dispatch({
        type: SERVICE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SERVICE_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //Clearing Errors

  export const clearErrors=()=> async(dispatch)=>{
      dispatch({type:CLEAR_ERRORS});
  }
  