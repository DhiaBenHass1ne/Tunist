import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import blogStyle from "./blog.module.css";
import Arrow from "../components/Arrow";
import Modal from "../components/Modal";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import AttractionModal from "../components/AttractionModal";
import LandingPageAttractions from "../components/LandingPageAttractions";
import MapTest from "./MapTest";

const Attractions = () => {
  const [shownPosition ,setPosition] = useState([])
  const [attractions, setAttractions] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
  const [modal, setModal] = useState(false);
  const [choice, setChoice] = useState(0);
  const [status,setStatus] =useState(false)      

 

  

  const toggleModal = () => {
    setModal(!modal);
  };

  const robotoSlabStyles = {
    color: "#930412",
    fontFamily: '"Roboto Slab", serif',
    fontOpticalSizing: "auto",
    fontWeight: 500, // Replace with your desired weight value
    fontStyle: "normal",
    robotoSlabUniqueClass: {
      fontFamily: '"Roboto Slab", serif',
      fontOpticalSizing: "auto",
      fontWeight: 500, // Replace with your desired weight value
      fontStyle: "normal",
    },
  };

  return (
    <div>
      <NavBar ></NavBar>
      <hr></hr>
      <div className="row"  >
        <div className="col-md-6">
          <LandingPageAttractions set choice={choice} setChoice={setChoice} status={status}></LandingPageAttractions>
        </div>
        <div className="col-md-6" style={{ height:"10vh",position: "sticky",top:35,right:0 }}>
          <MapTest shownPosition={shownPosition} choice={choice}  setChoice={setChoice} ></MapTest>
        </div>
      </div>
      {/* <AttractionModal modal={modal} setModal={setModal}></AttractionModal> */}
    </div>
  );
};

export default Attractions;
