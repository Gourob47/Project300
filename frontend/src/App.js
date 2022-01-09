import "./App.css";

import Header from "./component/layout/Header/Header.js";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import webfont from "webfontloader";
import React from "react";

import Footer from "./component/layout/Footer/Footer.js";

import Nav from "./component/Nav/Nav.js";
import Navbar from "./component/Navbar/Navbar.js";

import Service from "./component/Service/Service.js";
import About from "./component/About/About.js";
import Home from "./component/Home/home.js";
import Contact from "./component/Contact/Contact.js";

import MetaData from "./component/layout/MetaData";
import Loader from "./component/layout/Loader/Loader";

import ServiceDetails from "./component/Service/ServiceDetails";

import Search from "./component/Service/Search.js"

import LoginSignup from "./component/User/LoginSignup";

import {Profile} from "./component/User/Profile";

import UpdateProfile from "./component/User/UpdateProfile.js";

import store from "./Store";
import { loadUser } from "./actions/userAction";

import ProtectedRoute from "./component/Route/ProtectedRoute";

import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import UpdatePassword from "./component/User/UpdatePassword";


import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart.js";

import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder";

import OrderSuccess from "./component/Cart/OrderSuccess.js";

import MyOrders from "./component/Orders/MyOrders.js";

import OrderDetails from "./component/Orders/OrderDetails.js";

import Dashboard from "./component/Admin/Dashboard.js";

import ServiceList from "./component/Admin/ServiceList.js";

import NewService from "./component/Admin/NewService.js";


import UpdateService from "./component/Admin/UpdateService.js";

import OrderList from "./component/Admin/OrderList.js";


import ProcessOrder from "./component/Admin/ProcessOrder.js";

import UserList from "./component/Admin/UserList.js";

import UpdateUser from "./component/Admin/UpdateUser.js";


import ServiceReviews from "./component/Admin/ServiceReviews.js"






//import { getServiceDetails } from "./actions/serviceAction";

function App() {


  const {isAuthenticated, user}= useSelector((state)=>state.user);

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roborto", "Droid sans", "chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  window.addEventListener("contextmenu",(e)=>e.preventDefault());

  return (
    <Router>
      <MetaData title="Unlocked_Creations" />

      {/*<Header/>
    <Route exact path="/" component={Nav} />
    <Nav/>


     
    
    <Route exact path="/service/:id" component={serviceDetails}/>
    <Navbar/>*/}
      <Header />
      <Nav />
      {isAuthenticated && <UserOptions user={user}/>}
     


      <Route exact path="/" component={Home} />
      <Route exact path="/" component={Navbar} />

     
      <Route exact path="/home" component={Home} />

      <Route exact path="/home" component={Navbar}/>
      

     
      <Route exact path="/service/:id" component={ServiceDetails} />

      <Route exact path="/search" component={Search}/>
      
      
    
     
      <Route exact path="/services" component={Service} />
    
      
      <Route exact path="/services/:keyword" component={Service}/>

      <Route exact path="/login" component={LoginSignup} />

      <ProtectedRoute exact path="/account" component={Profile}/>

      <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>

      <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>

      <Route exact path="/password/forgot" component={ForgotPassword }/>

      <Route exact path="/password/reset/:token" component={ResetPassword } />

      <Route exact path="/cart" component={Cart} />

      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>

      <ProtectedRoute exact path="/success" component={OrderSuccess}/>

      <ProtectedRoute exact path="/orders" component={MyOrders}/>


      <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>

      <ProtectedRoute isAdmin={true} exact path="/admin/services" component={ServiceList}/>

     
      <ProtectedRoute isAdmin={true} exact path="/admin/service" component={NewService}/>

      <ProtectedRoute isAdmin={true} exact path="/admin/service/:id" component={UpdateService}/>
    
      <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>

      <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>

      <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList}/>
  
      <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>
 

      <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ServiceReviews}/>
     
     
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
       
      

      

      <Footer />
    
    </Router>
  );
}

export default App;
