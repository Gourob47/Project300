import React from 'react';
import CheckCircleIcon from "../../../node_modules/@mui/icons-material/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import './OrderSuccess.css';
const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
        <CheckCircleIcon />
  
        <Typography>Your Program Request is succeed </Typography>
        <Link to="/orders">View Your Programs</Link>
      </div>
    )
}

export default OrderSuccess
