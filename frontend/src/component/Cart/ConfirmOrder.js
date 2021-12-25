import React,{Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./ConfirmOrder.css";
import { Link } from 'react-router-dom';
import { removeItemsFromCart } from '../../actions/cartAction';
import { clearErrors, createOrder } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
const ConfirmOrder = ({history}) => {

    const dispatch= useDispatch();
    const alert= useAlert();

    const{cartItems}= useSelector((state)=>state.cart);
    const {user}= useSelector((state)=>state.user);
    const {error}= useSelector((state)=>state.order)


    const totalPrice=cartItems.reduce((
        acc, item
    )=> acc+item.price, 0);

    const order={
        package: cartItems,
        totalCost: totalPrice,
    
    }

    const proceed=(e)=>{

        e.preventDefault();
        //const data={
          
            //totalPrice,

       // }
      //  sessionStorage.setItem("orderInfo", JSON.stringify(data));
      dispatch(createOrder(order));
      history.push("/success")

    }



   
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert]);

    return (
        <div className='ConfirmOrderPage'>
            <div className='ConfirmOrderPageBox'>
               
                
              
                <div className='confirmCartItems'>
                <p>{`Name: ${user.name}`}</p>
                <p>{`Email: ${user.email}`}</p>
                <div className="name">User Program</div>
                    {cartItems && cartItems.map((item)=>(
                        <div key={item.service}>
                            
                            <Link to={`/service/${item.service}`}>
                                {item.name}
                                :
                            </Link>
                            <span>
                              
                                {item.price}
                               
                        
                            </span>
                        </div>
                    ))}
                    </div>
                    <div className='price'>
                    Total_Price :
                    <span>
                    {totalPrice}
                    </span>
                   
                    </div>
                    <button className='btn' onClick={proceed}>Proceed</button>
                   
            </div>
            
        </div>
    )
}

export default ConfirmOrder
