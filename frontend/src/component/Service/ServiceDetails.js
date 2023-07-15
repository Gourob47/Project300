import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "bootstrap/dist/css/bootstrap.min.css";

import Carousel from "react-material-ui-carousel";

import "./ServiecDetails.css";

import { useSelector, useDispatch } from "react-redux";

import Calender from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import '../../App.css'
import {
  clearErrors,
  getServiceDetails,
  newReview,
} from "../../actions/serviceAction";

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
  styled,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/serviceConstants";
import axios from "axios";




const ServiceDetails = ({ match, history }) => {


  const dispatch = useDispatch();

  const alert = useAlert();

  const {isAuthenticated,user}=useSelector((state)=>state.user)

  

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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const options1 = { day: '2-digit', month: 'numeric', year: 'numeric' };
  const dd=new Date();
  const dates=(dd.toLocaleString('en-GB',options1).split('/').reverse().join('-'));
  
  const [date,setDate]= useState(dates);

  const [location,setLocation]=useState('');

 

  const changeDate=date=>{

   const  dates= (date.toLocaleString('en-GB',options1).split('/').reverse().join('-'))
   setDate(dates);
  }


  const addToCartHandler = async() => {
   

    if(isAuthenticated===false)
    {
      toast("Please Login First");
      return;
    }
    
   
    if(location==='')
    {
       toast("Please Enter Your Location");
       return;
    }
    const config= {headers: {"Content-Type": "application/json"}};
    const data={user,date};
    const confirm=await axios.put(`/api/v1/programs/date`,data,config);
    if(confirm.data.message==='Fill')
    {
        toast('Schedule Already Complete');
    }
    else if(confirm.data.message==='userExist')
    {
        toast('Plese Select Any Other Day');
    }
    else if(confirm.data.message==='Blank')
    {
      
      const data={location,date}
      dispatch(addItemToCart(match.params.id,data));
      alert.success("Item Added To Cart");
       history.push("/Cart");
    }
  
   
   

  };

  const submitReviewToggle = () => {
    if(isAuthenticated===false)
    {
       toast("Plase Login First before Submit Review");
       return;
    }
    
    open ? setOpen(false) : setOpen(true);
  };

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

    if (success) {
      alert.success("Review Submit SuccessFully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getServiceDetails(match.params.id));
  }, [dispatch, match.params.id, alert, reviewError, success]);

 
let x=date.split('-');

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
           <ToastContainer autoClose={3000} closeOnClick={false}/>
          <div className="container p-3">
            <div className="row">

            <div className="col ">

              <div className="card " style={{maxWidth:'400px'}}>                     
                 {service.images &&
                  service.images.map((item, i) => (
                    <img
                       
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i}`}
                    />
                  ))} 

                    <div>
                    

                        <h5 style={{color:'#5D001E', padding:'10px'}}>{`PACKAGE : ${service.name}`} </h5>

                    <h6 style={{color:'#5D001E', padding:'10px'}}>{`PRICE : ${service.price}BDT`} </h6>
                <div style={{ padding:'10px'}}>
                 
                  <ReactStars {...options} />
                </div>

                <h6 style={{color:'#5D001E', padding:'10px'}}>{`REVIEWS : ${service.numofReviews}`} </h6>
                       </div>
              </div>

            
              <div className="card p-4 mt-5" style={{maxWidth:'400px'}}>
                  <h5 className="border-bottom" style={{color:'#5D001E'}}>SERVICE DESCRIPTION</h5>
                 <p> {service.description}</p>

                </div>
         

              </div>

              <div className="col p-5">
                   
             

                      <Calender 
                      
                       minDate={new Date()}
                       onChange={changeDate}
                       value={date}               
                      />

                      

                      <div>
                        <label style={{color:'#5D001E', paddingLeft:'0',padding:'20px 0'}} >ENTER YOUR PROGRAM LOCATION</label>
                        <div style={{width:'100%'}}>
                        <input onChange={(e)=>setLocation(e.target.value)} className="my-input" type="text" placeholder="Meghna 55,DariaPara,Sylhet" required/>
                        
                        </div>
                      </div>
                      

              

                <div className="" style={{display:'flex', flexDirection:'row',justifyContent:'center'}}>
                <div className="p-3 m-3">
                <button className="button1" onClick={addToCartHandler}>Get Service</button>
                </div>
                <div className="p-3 m-3">
                <button className="button1" onClick={submitReviewToggle}>Submit Review</button>

                </div>
              </div>

              </div>
        

         
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
                <Button  onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button  onClick={reviewSubmitHandler} color="primary">
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
