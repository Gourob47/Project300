import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { removeItemsFromCart } from "../../actions/cartAction";
import { clearErrors, createOrder } from "../../actions/orderAction";
import { useAlert } from "react-alert";

import PersonIcon from "../../../node_modules/@mui/icons-material/Person";
const ConfirmOrder = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart);

 
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  

  const order = {
    package: cartItems,
    totalCost: totalPrice,
    
  };

  const proceed = (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
    dispatch(removeItemsFromCart(cartItems[0].service));
    history.push("/success");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <div className="ConfirmOrderPage">
      <div className="ConfirmOrderPageBox">
        <div className="userInformation">
          <PersonIcon />

          <p>{`User_Name: ${user.name}`}</p>
          <p>{`Email: ${user.email}`}</p>
        </div>

        <div className="confirmCartItems">
          <div>
            <p>{`${user.name}'s Confirm Orders List`}</p>
          </div>

          <div className="conPrice">
            <div>
             
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.service}>
                    <Link to={`/service/${item.service}`}>{item.name}</Link>

                    <h5>Location: {item.location}</h5>
                    <h5>Date: {item.date}</h5>
                    <h5>Total_Cost: {item.price}</h5>
            
                  </div>
              
                ))}
              
            </div>

            {/* <div>
              <h4>Price</h4>
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.service}>
                    <span>{item.price}</span>
                  </div>
                ))}
              <span>{totalPrice}</span>
            </div> */}
          </div>

          <button className="btn" onClick={proceed}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
