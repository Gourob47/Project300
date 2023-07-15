import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { removeItemsFromCart } from '../../actions/cartAction';
import OutService from "../../../node_modules/@mui/icons-material/NotAccessible";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cart = ({history}) => {

    const dispatch= useDispatch ();
    const {cartItems}= useSelector((state)=>state.cart);

 

    const deleteCartItems=(id)=>{
        
        dispatch(removeItemsFromCart(id));
    }


    const checkOutBtn=()=>{
        history.push("/login?redirect=order/confirm");
    }




  /*  const item={
        service:"Service",
        name:"Nirloy",
        price:4000,
        image:"https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        
    }*/

    return (
              <Fragment>
                {cartItems.length===0?(
                    
                <div className='emptyCart'>
                 <OutService/>
                 <Typography>"No Service Selected"</Typography>

                <Link to="/services">View Services</Link>
                    </div>
                  ):
                        <Fragment>
                     
                        <div className='cartPage'>
                            <div className='cartHeader'>
                                <p>Service</p>
                                <p>Price</p>
                            </div>
            
                            {cartItems && cartItems.map((item)=>
                            (
                                <div className='cartContainer' key={item.service}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
            
                         
                              <p className='cartSubtotal'>{item.price}</p>
                          
                            </div>
            
                            ))}
            
            
                         
            
            
                            <div className='cartGrossProfit'>
                                <div></div>
                                <div className='cartGrossProfitBox'>
                                    <p>Total Cost</p>
                                    <p>{`${cartItems.reduce((
                                        acc, item
                                    )=> acc+item.price, 0)}`}</p> 
            
                                </div>
                                <div></div>
                                <div className='checkOutBtn'>
                                    <button onClick={checkOutBtn}> CheckOut</button>
                                </div>
            
                                  
                            </div>
                        </div>
                    </Fragment>
                  }
              </Fragment>
    )
}

export default Cart
