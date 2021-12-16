import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";




const Service = ({service}) => {

    const options={
        edit:false,
        color: "rgba(20,20,20,.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: service.ratings,
        isHalf: true,
      
        
    }
    return (
        <Link className="card" to={`/service/${service._id}`} >
            <img src={service.images[0].url} alt={service.name} />
            <p>{service.name}</p>

            <div>
                <ReactStars {...options}/>
                <span>{service.numofReviews}</span>
            </div>

            <span>{service.price}</span>


        </Link>
    )
}

export default Service
