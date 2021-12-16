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
            <div>
              <h1>My Profile</h1>
              {/*<img src={user.avatar.url} alt={user.name}/>*/}
              <Link  to="/me/update">Edit Profile</Link>
        
             
                <h4>Full Name</h4>
                <p>{user.name}</p>
           
                <h4>Email</h4>
                <p>{user.email}</p>
            
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0,10)}</p>

                
           
             
                <Link to="/program">My Program</Link>
                <Link to="/password/update">Change Password</Link>
           
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

