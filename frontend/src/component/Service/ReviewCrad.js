import React from 'react';
import ReactStars from "react-rating-stars-component";

import { Rating } from "@material-ui/lab";



const ReviewCrad = ({review}) => {
    const options = {
   
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        readOnly: true,
    precision: 0.5,
      };

   
      return (
        <div className="reviewCard">
          {/*<img src={profilePic} alt="User" />*/}
          <p>{review.name}</p>
          <ReactStars {...options} />
          <span className="reviewCardComment">{review.comment}</span>
        </div>
      );
}

export default ReviewCrad
