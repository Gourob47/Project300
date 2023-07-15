import { Fragment, useEffect } from "react";

import "./Navbar.css";

import { clearErrors, getAllService } from "../../actions/serviceAction";
import { useSelector, useDispatch } from "react-redux";
import Service from "../Home/Pr";
import Loader from "../layout/Loader/Loader";


import {useAlert} from "react-alert";

/*const service = {
  name: "CONCERT",
  image: [
    {
      url: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?cs=srgb&dl=pexels-vishnu-r-nair-1105666.jpg&fm=jpg",
    },
  ],
  price: "$500",
  _id: "Gourob",
};*/

const Navbar = () => {
  const alert= useAlert();
  const dispatch = useDispatch();

  const { loading, error, services, servicesCount } = useSelector(
    (state) => state.services
  );

  useEffect(() => {

    if(error)
    {
       alert.error(error);
       dispatch(clearErrors());
    }

    dispatch(getAllService());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="banner">
            <div className="banner1">
              <h1>WelCome to Unlocked_Creations</h1>
              <h2>Please Visit and enjoy your desired package</h2>
            </div>
            <div className="banner2"></div>
          </div>

          <div className="head my-2">
            <h4>Featured On</h4>
            <hr className="line2" />
          </div>

          <div className="Featers">
            <div className="container2">
              {services &&
                services.map((service,index) => <Service key={index} service={service} />)}

            
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Navbar;
