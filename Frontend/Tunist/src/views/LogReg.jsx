import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";


const LogReg = ({ refreshPage }) => {

  //*****************STYLES*******************
  const buttonStyle = {
    width: "175px",
    height: "175px",
    borderRadius: "15px",
    boxShadow: "0px 0px 15px -1px black",
    border: "0px",
  };
  const containerStyle = {
    margin:"auto",
    height: "50vh",
    width: "100vh",
    borderRadius: "25px",
    backgroundColor: "#F5F5F5",
  };
  const iconStyle = {
    fontSize: "35px",
  };
//*********************************************


  const [description, setDescription] = useState("");
  const [userType, setUserType] = useState("none");
  const [logged, setLogged] = useState({ id: Cookies.get("user_id") });



  return (
    <div className="container d-flex flex-column">
      <div className="row justify-content-center">
        <img src="/tunisit-logo.png" alt="logo" style={{ width: "30vh" }} />
      </div>
      <div className="row text-center">
        <p className="display-5">Select user type</p>
      </div>
      <div className="row" style={containerStyle}>
        <div className="d-flex justify-content-center mt-5">
          <button
            className="btn btn-outline-danger align-content-center me-3 p-5 fs-4"
            style={buttonStyle}
            onClick={()=>{setDescription("Tourist"); setUserType("tourist")}}
          >
            <i className="bi bi-airplane-engines" style={iconStyle}></i>
            <p className="">Tourist</p>
          </button>
          <button
            className="btn btn-outline-danger align-content-center p-5 fs-4"
            style={buttonStyle}
            onClick={()=>{setDescription("Non-Tourist"); setUserType("guide")}}
          >
            <i className="bi bi-geo" style={iconStyle}></i>
            <p className="">Local</p>
          </button>
        </div>
        <p className="text-center text-muted">{description}</p>
      </div>
      <div className="row justify-content-center"><button className="button17">Continue &rarr;</button></div>
    </div>
  );
};

export default LogReg;
