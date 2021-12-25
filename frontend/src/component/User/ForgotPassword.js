
import React, { Fragment } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

import MailOutlineIcon from "../../../node_modules/@mui/icons-material/MailOutline";
import LockOpenIcon from "../../../node_modules/@mui/icons-material/LockOpen";
import FaceIcon from "../../../node_modules/@mui/icons-material/Face";

import VpnKeyIcon from "../../../node_modules/@mui/icons-material/VpnKey";
import LockIcon from "../../../node_modules/@mui//icons-material/Lock";



import { useDispatch, useSelector } from "react-redux";
import { clearErrors,  forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import "./ForgotPassword.css";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, message, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    
    const [email, setEmail]=useState("");
  
  
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  

  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
  
  
    useEffect(() => {
   
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        alert.success(message);
       
  
       
       
      }
    }, [dispatch, error, alert, message]);
  

    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
      

        <Fragment>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            <form
              className="updatePasswordForm"
             
              onSubmit={forgotPasswordSubmit}
            >
           
           <div className="forgotPassword">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
        

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>

       
      )}
    </Fragment>
    )
}

export default ForgotPassword
