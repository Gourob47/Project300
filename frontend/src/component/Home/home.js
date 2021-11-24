import {BrowserRouter as Router, Route, Link} from"react-router-dom";

import Navbar from "../Navbar/Navbar";


import Slider from "./Slider";

const home = () => {
    return (
        <Router>
            <Slider/>  
       
        <Navbar/> 
         
              
        </Router>
    )
}

export default home
