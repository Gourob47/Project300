
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
import { clearErrors,  resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { reset_PASSWORD_RESET } from "../../constants/userConstants";

import "./ResetPassword.css";
import MetaData from "../layout/MetaData";

const ResetPassword = ({history, match}) => {


    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
  
  
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  

  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
      dispatch(resetPassword(match.params.token,myForm));
    };
  
  
    useEffect(() => {
   
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Reset Successfully");

        history.push("/login")
       
  
       
       
      }
    }, [dispatch, error, alert, history, success]);
  


    return (
        <Fragment>
      {loading ? (
        <Loader />
      ) : (
      

        <Fragment>
        <MetaData title="Reset Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Reset Password</h2>

            <form
              className="resetPasswordForm"
          
              onSubmit={resetPasswordSubmit}
            >
           
            

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>


                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
        

              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>

       
      )}
    </Fragment>
    )
}

export default ResetPassword
