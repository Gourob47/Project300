import React from 'react'

import Sidebar from "./Sidebar.js";

import { Link } from 'react-router-dom';

import './dashboard.css';

import {Typography} from "@material-ui/core";



import { useDispatch,  useSelector } from 'react-redux';


import { getAdminService } from '../../actions/serviceAction.js';
import { useEffect } from 'react';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUser } from '../../actions/userAction.js';



const Dashboard = () => {

  const dispatch= useDispatch();

  const{services}= useSelector((state)=>state.services);
  const{orders}= useSelector((state)=>state.allOrders);

  const{users}= useSelector((state)=>state.allUsers)


  useEffect(()=>{
    dispatch(getAdminService());
    dispatch(getAllOrders());
    dispatch(getAllUser());
  }, [dispatch]);

    return (
        <div className='dashboard'>
            <Sidebar/>
        

           <div className='dashboardContainer'>
            <Typography component='h1'>Admin DashBoard</Typography>

           
         <div className="dashboardSummary">
         
          <div className="dashboardSummaryBox2">
            <Link to="/admin/services">
              <p>Services</p>
              <p>{services && services.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>

         
          </div>
        </div>
        
           </div>

           </div>
      
    )
}

export default Dashboard
