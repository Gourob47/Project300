import {
  ALL_SERVICE_REQUEST,
  ALL_SERVICE_SUCCESS,
  ALL_SERVICE_FAIL,
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
