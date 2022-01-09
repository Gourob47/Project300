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
  NEW_REVIEW_RESET,
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
  UPDATE_SERVICE_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
} from "../constants/serviceConstants";




  export const serviceReducer =(state = { services: [] }, action) => {
    switch (action.type) {
      case ALL_SERVICE_REQUEST:
        case ADMIN_SERVICE_REQUEST:
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

        case ADMIN_SERVICE_SUCCESS:
          return{
            loading: false,
            services: action.payload,
          }

      case ALL_SERVICE_FAIL:
        case ADMIN_SERVICE_FAIL:
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


  export const newServiceReducer = (state = { service: {} }, action) => {
    switch (action.type) {
      case NEW_SERVICE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_SERVICE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          service: action.payload.service,
        };
      case NEW_SERVICE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_SERVICE_RESET:
        return {
          ...state,
          success: false,
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


  export const deleteServiceReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_SERVICE_REQUEST:
        case UPDATE_SERVICE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_SERVICE_SUCCESS:
        return {
          ...state,

          loading: false,
          isDeleted: action.payload,
        };

        case UPDATE_SERVICE_SUCCESS:
          return {
            ...state,
  
            loading: false,
            isUpdated: action.payload,
          };
      case DELETE_SERVICE_FAIL:
        case UPDATE_SERVICE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_SERVICE_RESET:
        return {
          ...state,
          isDeleted: false,
        };

        case UPDATE_SERVICE_RESET:
        return {
          ...state,
          isUpdated: false,
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



  export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
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


  export const adminReviewReducer = (state = {reviews:[]}, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
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


  export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
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











 


