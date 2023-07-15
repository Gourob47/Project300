import React, { Fragment, useEffect} from 'react'

import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid'

import './ServiceList.css';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import EditIcon from "../../../node_modules/@mui/icons-material/Edit";
import DeleteIcon from "../../../node_modules/@mui/icons-material/Delete"
import CompleteIcon from "../../../node_modules/@mui/icons-material/CheckOutlined"
import Sidebar from './Sidebar'
//import { getAdminService, clearErrors, deleteService } from '../../actions/serviceAction';
import { useAlert } from 'react-alert';


import {DELETE_SERVICE_RESET} from "../../constants/serviceConstants"
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import { getAllUser } from '../../actions/userAction';




const OrderList = ({history}) => {

   
    const dispatch = useDispatch();

    const alert = useAlert();
  
    const { error, orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);
  
    const { error: deleteError, isDeleted } = useSelector((state) => state.updateOrders);
  
    const deleteOrderHandler = (id) => {
      dispatch(deleteOrder(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Order Deleted Successfully");
        history.push("/admin/orders");
        dispatch({ type: DELETE_ORDER_RESET });
      }
      dispatch(getAllUser());
      dispatch(getAllOrders());

      
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    
  
    const columns = [
        {field: "id", headerName:'Service ID', minWidth: 50, flex: 0.5},


        {
          field: "name",
          headerName: "Service Name",
          minWidth: 50,
          flex: 0.5,
      
        },


        {
          field: "user",
          headerName: "User",
          minWidth: 50,
          flex: 0.5,
      
        },


        {
          field: "date",
          headerName: "Date",
          minWidth: 50,
          flex: 0.5,
      
        },

        {
          field: "location",
          headerName: "Location",
          minWidth: 150,
          flex: 0.5,
      
        },

      

          {
            field: "status",
            headerName: "Status",
            minWidth: 50,
            flex: 0.5,
        
          },
      
      
      
          {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 50,
            flex: 0.5,
          },
      
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              {params.getValue(params.id,"status")==="Pending"?<Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>:<CompleteIcon/>}
              

             
  
              <Button
                onClick={() =>
                  deleteOrderHandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];




  
    orders &&
      orders.forEach((item) => {
        
       
        const userName=users.find((it)=>it._id===item.user)
          
        rows.push({
          id: item._id,  
          date:  item.package[0].date,
          user:  users.length>0?userName.name:'',
          name:  item.package[0].name,  
          location: item.package[0].location,   
          status: item.confirmProgram,
          amount: item.totalCost,
        });
      });


    return (
        <div>
            
            <div className='heading'>User Program Request</div>

            <div className='serviceTableContainer'>
            <DataGrid       
            rows={rows}
            columns={columns}
            pageSize={8}
            disableSelectionOnClick
            className='serviceListTable'
            autoHeight
            
            />
            </div>
        
        </div>
    )
}

export default OrderList
