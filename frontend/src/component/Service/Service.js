import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getAllService } from "../../actions/serviceAction";
import Loader from "../layout/Loader/Loader";

import Services from "../Home/Pr";

import "./Service.css";

import Pagination from "react-js-pagination";

import Typography from "../../../node_modules/@mui/material/Typography";
import { Slider } from "@mui/material";


const categories = ["Marriage", "Reception", "Security", "Concert"];
const Service = ({ match }) => {
  //  const alert= useAlert();
  const dispatch = useDispatch();

  //  const[currentPage, setCurrentPage]= useState(1);
  const alert= useAlert();



  const [currentPage, setCurrentPage] = useState("");
  const [price, setprice] = useState([1000, 1000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    loading,
    error,
    services,
    servicesCount,
    resultPerPage,
    filteredServiceCount,
  } = useSelector((state) => state.services);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setprice(newPrice);
  };

  let count = filteredServiceCount;
  useEffect(() => {


    if(error)
    {
       alert.error(error);
       dispatch(clearErrors());
    }

    dispatch(getAllService(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert,error]);



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="serviceHeading">Services</h2>

        <div className="ser">


            
          <div className="services">
            <div className="services1">
              {services &&
                services.map((service,index) => <Services key={index} service={service} />)}
              </div>
              </div>


          
    


            <div className="filterBox">
        

            {/*<Typography>Services</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
              </ul>*/}


              <div>

              <fieldset>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1000}
              max={250000}
            />
            </fieldset>
        
              </div>

           <div>
           <fieldset>
              <Typography component="legend">Ratings</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
           </div>

      
      
              </div>









            </div>

          {/*<div className="services">
            <div className="services1">
              {services &&
                services.map((service) => <Services service={service} />)}
            </div>
              </div>

   

          {/*<div className="filterBox">
            <Typography>PRICE</Typography>

            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1000}
              max={100000}
            />

            <Typography>CHOICE:</Typography>

            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">RATING:</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={servicesCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPagetext="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
          </div>)}*/}

    
 
        </Fragment>
      )}
    </Fragment>
  );
};

export default Service;
