import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import PersonIcon from "../../../node_modules/@mui/icons-material/Person";


import "./Profile.css";

export const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />

          <div className="profileContainer">
            <div className="heading1"> 
            <h1>My Profile</h1>
            </div>
         
            <div className="profileContainer-2">
              <PersonIcon/>
              
              {/*<img src={user.avatar.url} alt={user.name}/>*/}
             
        
              <div>
                <p>USER_NAME :</p>
                <p> {` : ${user.name}`} </p>
              </div>
         
               <div>
                 
                <p>EMAIL :</p>
                <p>{` : ${user.email}`}</p>
               </div>
             <div>
                 
             <p>JOINED_ON :</p>
                <p>{` : ${String(user.createdAt).substr(0,10)}`}</p>
             </div>

                
           
           
           
            </div>

            <div className="profileContainer-3">

          <div>
          <Link  to="/me/update">Edit Profile</Link>
             <Link to="/orders">My Program</Link>
            <Link to="/password/update">Change Password</Link>
          </div>

          
            </div>
      
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

