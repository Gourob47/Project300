import axios from 'axios';

import {
    ALL_SERVICE_REQUEST,
    ALL_SERVICE_SUCCESS,
    ALL_SERVICE_FAIL,

    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,

    ADMIN_SERVICE_REQUEST,
    ADMIN_SERVICE_FAIL,
    ADMIN_SERVICE_SUCCESS,


    NEW_SERVICE_REQUEST,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_FAIL,
    NEW_SERVICE_RESET,


    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
    DELETE_SERVICE_RESET,
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
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


  export const getAdminService=()=>async(dispatch)=>{
    
    try{
      dispatch({type: ADMIN_SERVICE_REQUEST})

      const {data}= await axios.get(`/api/v1/admin/services`);


      dispatch({type: ADMIN_SERVICE_SUCCESS,    payload: data.services,})
   
    }

    catch (error) {
      dispatch({
        type: ADMIN_SERVICE_FAIL,
        payload: error.response.data.message,
      });
    }

  };


  export const createService = (serviceData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_SERVICE_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        `/api/v1/admin/service/new`,
        serviceData,
        config
      );
  
      dispatch({
        type: NEW_SERVICE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_SERVICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  export const updateService = (id,serviceData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SERVICE_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/admin/service/${id}`,
        serviceData,
        config
      );
  
      dispatch({
        type: UPDATE_SERVICE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SERVICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };




  export const deleteService = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_SERVICE_REQUEST });
  
  
      const { data } = await axios.delete(
        `/api/v1/admin/service/${id}`,
      
      );
  
      dispatch({
        type: DELETE_SERVICE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_SERVICE_FAIL,
        payload: error.response.data.message,
      });
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




  export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  
  export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
  
  
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };


    
  export const deleteReviews = (reviewId, serviceId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
  
  
      const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&serviceId=${serviceId}`);
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };






  
  




  //Clearing Errors

  export const clearErrors=()=> async(dispatch)=>{
      dispatch({type:CLEAR_ERRORS});
  }
  