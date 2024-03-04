import React, { useState } from "react";
import buttonn from "./button.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      color: "#fff",
      position: "relative",
      zIndex: 2, // Adjust the z-index as needed
    },
    left: {
      marginRight: "auto",
      marginLeft: "10%",
    },
    middle: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    right: {
      marginLeft: "auto",
    },
    button: {
      padding: "8px 16px",
      margin: "0 25px",
      borderRadius: "4px",
      backgroundColor: "#930412",
      color: "#fff",
      cursor: "pointer",
    },
    logo: {
      maxWidth: "300px",
      maxHeight: "120px",
    },

    hypnos: {
      width: "200px",
    },
    overlay: {
      position: "fixed",
      top: "10rem",
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 3, // Make sure it's above the navbar
    },
  };

  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const [rotation, setRotation] = useState(0);

  const logout = () => {
    axios
      .get("http://localhost:8080/api/users/logout")
      .then((res) => {
        console.log(res);
        Cookies.remove("user_id");
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.left} onClick={toggleOverlay}>
          <i
            className="bi bi-list"
            style={{ fontSize: "4rem", color: "#930412", cursor: "pointer" }}
          ></i>
          {/* <button style={styles.button}>Button</button> */}
        </div>
        <div style={styles.middle}>
          <Link to="/home">
            <img src="/tunisit-logo.png" alt="Logo" style={styles.logo} />
          </Link>
        </div>
        {Cookies.get("user_id") ? (
          <div style={styles.right}>
            <button className={buttonn.button17}>
              Profile
            </button>
            <button className={buttonn.button17} onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div style={styles.right}>
            <Link to="/signup" className={buttonn.button17}>
              {" "}
              Register
            </Link>
            <Link to="/signup" className={buttonn.button17}>
              {" "}
              Login
            </Link>
          </div>
        )}
      </nav>
      {showOverlay && (
        <div style={styles.overlay} onClick={toggleOverlay}>
          <i
            className="bi bi-x-square"
            style={{
              color: "white",
              top: "1rem",
              fontSize: "2rem",
              position: "absolute",
              right: "1rem",
              cursor: "pointer",
            }}
          ></i>
          <div style={{ position: "absolute", top: "1rem" }}>
            <button className={buttonn.button17}>Attractions</button>
            <Link to="/blog" className={buttonn.button17}>
              {" "}
              Blog
            </Link>
            <button className={buttonn.button17}>Guides</button>
            <button className={buttonn.button17}>Houses</button>
          </div>
          {/* Content for the overlay page */}
        </div>
      )}
    </>
  );
};

export default NavBar;
