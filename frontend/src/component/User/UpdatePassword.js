
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
import { clearErrors,  updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

import "./UpdatePassword.css";
import MetaData from "../layout/MetaData";

const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector(
    (state) => state.profile
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword]=useState("");



  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);

    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };


  useEffect(() => {
 

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
     

      history.push("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
      

        <Fragment>
        <MetaData title="Update Password" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Password</h2>

            <form
              className="updatePasswordForm"
              encType="application/json"
              onSubmit={updatePasswordSubmit}
            >
           
                <div className="loginPassword">
                  <VpnKeyIcon  />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>

       
      )}
    </Fragment>
  );
};

export default UpdatePassword;

