
import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";

import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = ({match}) => {


    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(getOrderDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id]);
    return (
        <div>
       
        </div>
    )
}

export default OrderDetails
