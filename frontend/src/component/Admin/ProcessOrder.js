import React,{Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom';
import { removeItemsFromCart } from '../../actions/cartAction';
import { clearErrors, createOrder, getAllOrders, myOrders, updateOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants';
import Loader from '../layout/Loader/Loader';

import AccountTreeIcon from "../../../node_modules/@mui/icons-material/AccountTree";

import "./processOrder.css";
const ProcessOrder = ({history, match}) => {


    

        const dispatch = useDispatch();
        const alert = useAlert();
      
    
      
     

        const { loading,error, orders } = useSelector((state) => state.myOrder);
  
        const { error: updateError, isUpdated} = useSelector((state) => state.updateOrders);
      
     
 
      const [status, setStatus] = useState("");
    
      
      
        const ProcessStatus = (e) => {
          e.preventDefault();
      
          const myForm = new FormData();
      
          myForm.set("status",status);
        
          dispatch(updateOrder(match.params.id, myForm));
        };


        useEffect(() => {
        
            if (error) {
              alert.error(error);
              dispatch(clearErrors());
            }
        
            if (updateError) {
              alert.error(updateError);
              dispatch(clearErrors());
            }
        
            if (isUpdated) {
              alert.success("Order Updated Successfully");
              history.push("/admin/orders");
              dispatch({ type: UPDATE_ORDER_RESET });
            }
          }, [
            dispatch,
            alert,
            error,
            history,
            isUpdated,
            match.params.id,
            updateError,
          ]);
        
      




    return (

        <Fragment>
            {loading ? (<Loader/>):
            
            (


               

                <Fragment>
               <div className='processOrderPage'>
                  
       
                  <form  className='processOrderForm'
                         
                          onSubmit={ProcessStatus}
                          >
                                <h1>Process Order</h1>
                               
                               
       
                                <div>
                               
                                    <select 
                                    onChange={(e)=>setStatus(e.target.value)}
                                    >
                                      
                                        <option value="">Choose Option</option>
                                       
                                        <option value="Confirm">Confirm</option>
       
                                    </select>
                                    <Button
                                    id="processOrderBtn"
                                    type="submit"
                                    disabled={loading ? true: false|| status===""? true:false}
                                    >
                                     Procceed
                                    </Button>
                                </div>
       
                          </form>
                  
              </div>
                </Fragment>
       
            )
           
            }

</Fragment>
      
       
       
    )
    }


export default ProcessOrder
