import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import AccountTreeIcon from "../../../node_modules/@mui/icons-material/AccountTree";

import SpellCheckIcon from "../../../node_modules/@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "../../../node_modules/@mui/icons-material/AttachMoney";

import { useState } from "react";
import { useEffect } from "react";
import { clearErrors, getServiceDetails, updateService} from "../../actions/serviceAction";
import { NEW_SERVICE_RESET, UPDATE_SERVICE_RESET } from "../../constants/serviceConstants";


import './NewService.css';

const UpdateService = ({ history, match }) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, service } = useSelector((state) => state.serviceDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.deleteService);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
 
  const [category, setCategory] = useState("");

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Marriage", "Reception", "Security", "Concert"];

  const serviceId = match.params.id;

  useEffect(() => {
    if (service && service._id !== serviceId) {
      dispatch(getServiceDetails(serviceId));
    } else {
      setName(service.name);
  
      setPrice(service.price);
      setCategory(service.category);
    
      setOldImages(service.images);
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
      alert.success("Service Updated Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: UPDATE_SERVICE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    serviceId,
    service,
    updateError,
  ]);

  const updateServiceSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
   
    myForm.set("category", category);
 

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateService(serviceId, myForm));
  };

  const updateServiceImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  return (

    <Fragment>
   
    <div className="newService">
    
      <div className="newServiceContainer">
        <form
          className="createServiceForm"
          encType="multipart/form-data"
          onSubmit={updateServiceSubmitHandler}
        >
          <h1>Service Product</h1>

          <div>
            <SpellCheckIcon />
            <input
              type="text"
              placeholder="Service Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

       

          <div>
            <AccountTreeIcon />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>


          <div id="createServiceFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateServiceImagesChange}
              multiple
            />
          </div>

          <div className="createServiceFormImage">
            {oldImages &&
              oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old Service Preview" />
              ))}
              </div>

          <div className="createServiceFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Service Preview" />
            ))}
            </div>

          <Button
            id="createServiceBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  </Fragment>

   
  );
};

export default UpdateService
