import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import AccountTreeIcon from "../../../node_modules/@mui/icons-material/AccountTree";
import StorageIcon from "../../../node_modules/@mui/icons-material/Storage";
import SpellCheckIcon from "../../../node_modules/@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "../../../node_modules/@mui/icons-material/AttachMoney";
import DescriptionIcon from "../../../node_modules/@mui/icons-material/Description";
import { useState } from "react";
import { useEffect } from "react";
import { clearErrors, createService, newService } from "../../actions/serviceAction";
import { NEW_SERVICE_RESET } from "../../constants/serviceConstants";


import './NewService.css';

const NewService = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newService);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
 
  const [category, setCategory] = useState("");

  const [description,setDescription]=useState("")
  
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Marriage", "Reception", "Security", "Concert","Birthday"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Service Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_SERVICE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createServiceSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("description",description);
 

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createService(myForm));
  };

  const createServiceImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
            onSubmit={createServiceSubmitHandler}
          >
            <h1>Create Service</h1>

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
              />
            </div>

             <div>
              <DescriptionIcon />
              <input
                type="text"
                placeholder="Description"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div> 

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Catagory</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className="createServiceFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createServiceImagesChange}
                multiple
              />
            </div>

            <div className="createServiceFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="service Image" />
              ))}
              </div>

            <Button
              id="createServiceBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewService
