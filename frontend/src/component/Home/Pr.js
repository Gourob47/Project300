import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import { Rating } from "@material-ui/lab";

import "./Pr.css";


const Service = ({service}) => {

    const options={

        size: window.innerWidth < 600 ? 20 : 25,
        value: service.ratings,
        readOnly: true,
        precision: 0.5,
      
        
    }
    return (
        <Link className="card" to={`/service/${service._id}`} >
            <img   src={service.images[0].url} alt={service.name} />
            <p>{` ${service.name}`} </p>

            <div>   <ReactStars {...options}/></div>
          

            <div>
              
                <span>{`Reviews: ${service.numofReviews}`}</span>
            </div>

            <span>{`Price: ${service.price}$`}</span>


        </Link>
    )
}

export default Service
