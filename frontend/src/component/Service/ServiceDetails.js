import React, { Fragment, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Carousel from "react-material-ui-carousel";

import "./ServiecDetails.css";

import { useSelector, useDispatch } from "react-redux";

import { clearErrors, getServiceDetails, newReview } from "../../actions/serviceAction";

import ReactStars from "react-rating-stars-component";

import ReviewCard from "./ReviewCrad.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import { addItemToCart, removeItemsFromCart } from "../../actions/cartAction";


import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/serviceConstants";

const ServiceDetails = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

 

  const { service, loading, error } = useSelector(
    (state) => state.serviceDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );



  const options = {
 
   
    size: window.innerWidth < 600 ? 20 : 25,
    value: service.ratings,
    readOnly: true,
    precision: 0.5,
 
   
  };


  
  const [open, setOpen] = useState(false);
  const[rating, setRating]= useState(0);
  const[comment, setComment]= useState("");


  const addToCartHandler=()=>{
    dispatch(addItemToCart(match.params.id));
    alert.success("Item Added To Cart");
  }


  const submitReviewToggle=()=>{
    open ? setOpen(false) : setOpen(true);
  }


  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("serviceId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };


  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if(success){
      alert.success("Review Submit SuccessFully");
      dispatch({type: NEW_REVIEW_RESET});
    }

    dispatch(getServiceDetails(match.params.id));
  }, [dispatch, match.params.id, alert, reviewError, success]);




 


 

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
         
          <div className="serviceDetails">
            <div className="serve">
              <div className="img">
                {service.images &&
                  service.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i}`}
                    />
                  ))}
              </div>

              {service._id}

              <div>{service.name}</div>

              <div>{service.price}</div>

              <div>
                <ReactStars {...options} />
              </div>

              <div>{service.numofReviews}</div>
          

              <button onClick={addToCartHandler}>Get Service</button>
              <button onClick={submitReviewToggle}>Submit Review</button>
            </div>
          </div>

          <div className="serve1">


          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
  
  
              

            {service.reviews && service.reviews[0] ? (
              <div className="reviews">
                {service.reviews &&
                  service.reviews.map((reviews) => (
                    <ReviewCard review={reviews} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ServiceDetails;
