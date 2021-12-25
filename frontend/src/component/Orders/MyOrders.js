import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { addItemToCart } from "../../actions/cartAction";

import LaunchIcon from "../../../node_modules/@mui/icons-material/Launch";

import "./myOrders.css";



const MyOrders = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrder);
  

  const { cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);


  const columns = [
    { field: "id", headerName: "Service ID", minWidth: 150, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,

 
    
    },



    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },


  ];


  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        status: item.confirmProgram,
        amount: item.totalCost,
        
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);




  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>

        

         

             
        

        <div className="myOrdersPage">

        <div className="myOrdersHeading">
          {`User Name:  ${user.name}  User Email:${user.email}`}
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

         
      </div>


    

      
        </Fragment>
      )}
    </Fragment>
  );
};
export default MyOrders;
