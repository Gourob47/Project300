import React, { Fragment } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

import MailOutlineIcon from "../../../node_modules/@mui/icons-material/MailOutline";
import LockOpenIcon from "../../../node_modules/@mui/icons-material/LockOpen";
import FaceIcon from "../../../node_modules/@mui/icons-material/Face";

import "./LoginSignup.css";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUserDetails, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

import "./UpdateProfile.css";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error, user}= useSelector((state)=>state.user);

  const{loading, error:updateError, isUpdated}= useSelector((state)=>state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const userId= match.params.id;

  useEffect(() => {
    if (user)
 
      
  
         
    {
      setName(user.name);
      setEmail(user.email);
   
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(updateError)
    {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated, userId, user, updateError]);


  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);

  
    dispatch(updateProfile(myForm));
  };


  /*const { error, user, isUpdated, loading } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/logo192.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);

    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history.push("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, history, isUpdated]);*/

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
      

        <Fragment>
        <MetaData title="Update Profile" />
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>

            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

             {/*} <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
      </div>*/}
              <input
                type="submit"
                value="Update"
                className="updateProfileBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>

       
      )}
    </Fragment>
  );
};

export default UpdateProfile;
