import React, { Fragment, useEffect} from 'react'

import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid'

import './ServiceList.css';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import EditIcon from "../../../node_modules/@mui/icons-material/Edit";
import DeleteIcon from "../../../node_modules/@mui/icons-material/Delete"
import Sidebar from './Sidebar'
import { getAdminService, clearErrors, deleteService } from '../../actions/serviceAction';
import { useAlert } from 'react-alert';


import {DELETE_SERVICE_RESET} from "../../constants/serviceConstants"




const ServiceList = ({history}) => {

    const dispatch = useDispatch();

    const alert= useAlert();


    

    const {services, error }= useSelector((state)=>state.services);

     const{error:deleteError, isDeleted}= useSelector((state)=>state.deleteService)

    const deleteServiceHandler=(id)=>{
      dispatch(deleteService(id));
     }
   
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
      
        alert.success("SERVICE Deleted Successfully");
       
        history.push("/admin/services");
        dispatch({ type: DELETE_SERVICE_RESET });

      
       
      }
  
      dispatch(getAdminService());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);
   
    const colums=[
        {field: "id", headerName:'Service ID', minWidth: 200, flex: 0.5},

        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
          },

          {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 100,
            flex: 0.5,
          },

          {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <Fragment>
                  <Link to={`/admin/service/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                  </Link>
      
                  <Button
                onClick={()=>
                  deleteServiceHandler(params.getValue(params.id, "id"))
                }
                  >
                    <DeleteIcon />
                  </Button>
                </Fragment>
              );
            },
          },

    ];

    const rows=[];

  

    services &&
    services.forEach((item) => {
      rows.push({
        id: item._id,
      
        price: item.price,
        name: item.name,
      });
    });

    return (
        <div>
            
            <div className='heading'>Services</div>

            <div className='serviceTableContainer'>

    
            <DataGrid
            
            rows={rows}
            columns={colums}
            pageSize={10}
            disableSelectionOnClick
            className='serviceListTable'
            autoHeight
            
            />
            </div>
        
        </div>
    )
}

export default ServiceList
