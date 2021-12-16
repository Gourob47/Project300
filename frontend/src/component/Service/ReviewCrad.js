import React from 'react';
import ReactStars from "react-rating-stars-component";



const ReviewCrad = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
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
