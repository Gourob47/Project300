import React from 'react';
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const options={
    edit:false,
    color: "rgba(20,20,20,.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 2.5,
    isHalf: true,
  
    
}

const Pr = ({pr}) => {
    return (
        <Link className="card" to={pr._id}>
            <img src={pr.image[0].url} alt={pr.name} />
            <p>{pr.name}</p>

            <div>
                <ReactStars {...options}/>
                <span>(256 Reviews)</span>
            </div>

            <span>{pr.price}</span>


        </Link>
    )
}

export default Pr
