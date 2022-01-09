

import Navbar from "../Navbar/Navbar";

import Loader from "../layout/Loader/Loader";
import Slider from "./Slider";
import ServiceDetails from "../Service/ServiceDetails";


import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";


import Services1 from "../Home/Pr";
import { getAllService } from "../../actions/serviceAction";


const home = () => {


    
    
    return (


       
         
           
 

        <Router>

    
                 
                       
       <Slider/> 
        
        

   

       
       
      
              
    </Router>
    

  
    )
}

export default home;
