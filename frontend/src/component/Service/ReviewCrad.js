import React from 'react';
import ReactStars from "react-rating-stars-component";

import { Rating } from "@material-ui/lab";

import PersonIcon from "../../../node_modules/@mui/icons-material/Person"



const ReviewCrad = ({review}) => {
    const options = {
   
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        readOnly: true,
    precision: 0.5,
      };

   
      return (
        <div className="reviewCard">
          {/*<img src={<PersonIcon/>} alt="User" /.*/}
          <PersonIcon/>
          <p>{`USER : ${review.name}`} </p>
          <ReactStars {...options} />
          <span className="reviewCardComment">{`REVIEW : ${review.comment}`} </span>
        </div>
      );
}

export default ReviewCrad
