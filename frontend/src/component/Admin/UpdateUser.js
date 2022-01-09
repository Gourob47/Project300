import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import AccountTreeIcon from "../../../node_modules/@mui/icons-material/AccountTree";

import SpellCheckIcon from "../../../node_modules/@mui/icons-material/Spellcheck";
import MailIcon from "../../../node_modules/@mui/icons-material/Mail";



import { useState } from "react";
import { useEffect } from "react";
import { clearErrors, getServiceDetails, updateService} from "../../actions/serviceAction";
import { NEW_SERVICE_RESET, UPDATE_SERVICE_RESET } from "../../constants/serviceConstants";


import './NewService.css';
import { getUserDetails, updateUser } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = ({ history, match }) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, user} = useSelector((state) => state.userDetails);



  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  const [role, setRole] = useState("");

 


  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
  
      setEmail(user.email);
      setRole(user.role);
    
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    userId,
    user,
    updateError,
  ]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
   
    myForm.set("role", role);
 


    dispatch(updateUser(userId, myForm));
  };




  return (

    <Fragment>
   
    <div className="newService">
    
      <div className="newServiceContainer">
        <form
          className="createServiceForm"
          encType="multipart/form-data"
          onSubmit={updateUserSubmitHandler}
        >
          <h1>Service Product</h1>

          <div>
            <SpellCheckIcon />
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div>
            <MailIcon />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
     
       

          <div>
            <AccountTreeIcon />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Choose role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>


    

          <Button
            id="createServiceBtn"
            type="submit"
            disabled={loading ? true : false|| role===""?true: false}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  </Fragment>

   
  );
};

export default UpdateUser
