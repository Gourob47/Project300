import React from 'react'
import { ImInsertTemplate } from 'react-icons/im';
import { Link } from 'react-router-dom'

import './CartItemCard.css';

const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
            {/*<img src={item.image} alt='ss'></img>*/}
            <div>
                <Link to={`/service/${item.service}`}>{item.name}</Link>
                <h6>{`Price: ${item.price}`}</h6>
                <h6>{`Location: ${item.location}`}</h6>
                <h6>{`Date: ${item.date}`}</h6>

                <p onClick={()=>{deleteCartItems(item.service)}}>Remove</p>
            </div>
            
        </div>
    )
}

export default CartItemCard
