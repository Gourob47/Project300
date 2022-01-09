import React, { Fragment, useEffect, useState} from 'react'

import { Link } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid'

import './ServiceList.css';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import Star from "../../../node_modules/@mui/icons-material/Star";
import DeleteIcon from "../../../node_modules/@mui/icons-material/Delete";
import Sidebar from './Sidebar'
import { getAdminService, clearErrors, deleteService, getAllReviews, deleteReviews } from '../../actions/serviceAction';
import { useAlert } from 'react-alert';


import {DELETE_REVIEW_RESET, DELETE_SERVICE_RESET} from "../../constants/serviceConstants"
import Loader from '../layout/Loader/Loader';




const ServiceReviews = ({history}) => {

    const dispatch = useDispatch();

    const alert= useAlert();


    

    const {reviews, error, loading }= useSelector((state)=>state.allReviews);

     const{error:deleteError, isDeleted  }= useSelector((state)=>state.deleteReviews);

     const [serviceId, setServiceId]= useState("");

    const deleteReviewsHandler=(reviewId)=>{
      dispatch(deleteReviews(reviewId,serviceId));
     }

     const serviceReviewsHandler=(e)=>{
         e.preventDefault();
        dispatch(getAllReviews(serviceId));
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
        dispatch({ type: DELETE_REVIEW_RESET });
      
        alert.success("Review Deleted Successfully");
       
        history.push("/admin/reviews");
       
      

      
       
      }
  
     
    }, [dispatch, alert, error, deleteError, history, isDeleted,serviceId]);
   
    const colums=[
        {field: "id", headerName:'Service ID', minWidth: 200, flex: 0.5},

        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 1,
          },

          {
            field: "comment",
            headerName: "Comment",
           
            minWidth: 200,
            flex: 0.5,
          },

          {
            field: "rating",
            headerName: "Rating",
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
           
      
                  <Button
                onClick={()=>
                  deleteReviewsHandler(params.getValue(params.id, "id"))
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

  

    reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating:item.rating,
        comment: item.comment,
        name: item.name,
      });
    });

    return (


       <Fragment>
      

            <div className="newService">
            <div className="newServiceContainer">
              <form
                className="createServiceForm"
                encType="multipart/form-data"
                onSubmit={serviceReviewsHandler}
              >
                <h1>Service Reviews</h1>
    
                <div>
                  <Star />
                  <input
                    type="text"
                    placeholder="Service Id"
                    required
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                  />
                </div>
    
        
    
              
    
                <Button
                  id="createServiceBtn"
                  type="submit"
                  disabled={loading ? true : false|| serviceId===""? true : false}
                >
                 Proceed
                </Button>
              </form>
    
    
           
                
              
    
                <div className='serviceTableContainer'>
    
    
    
              {reviews && reviews.length>0?(
    
    
               <DataGrid
                
                rows={rows}
                columns={colums}
                pageSize={10}
                disableSelectionOnClick
                className='serviceListTable'
                 autoHeight
    
                 />
              ):(<h1>No Reviews Found</h1>)}
        
            
                </div>
            
         
    
        
            </div>
    
    
       
    
    
       </div>

           
       </Fragment>
       
    )
}

export default ServiceReviews
