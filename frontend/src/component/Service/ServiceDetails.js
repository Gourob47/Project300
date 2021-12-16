import React, { Fragment, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Carousel from "react-material-ui-carousel";

import "./ServiecDetails.css";

import { useSelector, useDispatch } from "react-redux";

import { clearErrors, getServiceDetails } from "../../actions/serviceAction";

import ReactStars from "react-rating-stars-component";

import ReviewCard from "./ReviewCrad.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ServiceDetails = ({ match }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { service, loading, error } = useSelector(
    (state) => state.serviceDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getServiceDetails(match.params.id));
  }, [dispatch, match.params.id, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: service.ratings,
    isHalf: true,
  };

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

              <button>Get Service</button>
            </div>
          </div>

          <div className="serve1">
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
