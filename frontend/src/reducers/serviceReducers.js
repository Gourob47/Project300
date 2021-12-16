import {
  ALL_SERVICE_REQUEST,
  ALL_SERVICE_SUCCESS,
  ALL_SERVICE_FAIL,

  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_DETAILS_FAIL,

  CLEAR_ERRORS,
} from "../constants/serviceConstants";




  export const serviceReducer =(state = { services: [] }, action) => {
    switch (action.type) {
      case ALL_SERVICE_REQUEST:
        return {
          loading: true,
          services: [],
        };

      case ALL_SERVICE_SUCCESS:
        return {
          loading: false,
          services: action.payload.services,
          servicesCount: action.payload.servicesCount,
          resultPerPage: action.payload.resultPerPage,
          filteredServiceCount: action.payload. filteredServiceCount,
        };

      case ALL_SERVICE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };


        case CLEAR_ERRORS:
            return {
             ...state,
              error: null,
            };

 

      default:
        return state;
    }
  };


  export const serviceDetailsReducer =(state = { service: {} }, action) => {
    switch (action.type) {
      case SERVICE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };

      case SERVICE_DETAILS_SUCCESS:
        return {
          loading: false,
          service: action.payload.service,
         
        };

      case SERVICE_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };


        case CLEAR_ERRORS:
            return {
             ...state,
              error: null,
            };

 

      default:
        return state;
    }
  };





 


