import React, { Fragment, useState } from "react";

import "./Header.css";

import { SpeedDial, SpeedDialAction } from "@mui/material";

import { Backdrop } from "@mui/material";

import DashboardIcon from "../../../../node_modules/@mui/icons-material/Dashboard";
import PersonIcon from "../../../../node_modules/@mui/icons-material/Person";
import ExitToAPPIcon from "../../../../node_modules/@mui/icons-material/ExitToApp";
import ListAltIcon from "../../../../node_modules/@mui/icons-material/ListAlt";

import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import { color } from "@mui/system";

const UserOptions = ({ user }) => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "profile", func: account },
    { icon: <ExitToAPPIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role == "Admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/dashboard");
  }
  function orders() {
    history.push("/orders");
  }

  function account() {
    history.push("/account");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Success");
  }

  return (
    <Fragment>
     
        <Backdrop open={open} style={{zIndex: "10"}} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
    
        open={open}
        direction="down"
        className="speedDial"
        style={{zIndex:"11"}}
    
        icon={<PersonIcon/>
    // <img className="speedDialIcon" src={user.avatar.url}  />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            //     tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
