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
  const [shownPosition ,setShownPosition] = useState([])
  const [attractions, setAttractions] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
  const [modal, setModal] = useState(false);
  const [choice, setChoice] = useState(0);
  const [status,setStatus] =useState(true)      
  const [position, setPosition] = useState([36.5780, 10.1815])
  const [positions, setPositions] = useState([
    [36.8065, 10.1815],
    [50.6210, 10.1815],
    [36.4730, 10.1815],
    [36.5340, 10.1815],
    [36.5780, 10.1815]
  ]);
 

  

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
          <LandingPageAttractions setStatus={setStatus} positions={positions}  setPositions={setPositions} setPosition={setPosition} position={position} set choice={choice} setChoice={setChoice} status={status}></LandingPageAttractions>
        </div>
        <div className="col-md-6" style={{ height:"10vh",position: "sticky",top:35,right:0 }}>
          <MapTest  positions={positions} setPositions={setPositions} setPosition={setPosition} position={position} choice={choice} status={status} setChoice={setChoice} ></MapTest>
        </div>
      </div>
      {/* <AttractionModal modal={modal} setModal={setModal}></AttractionModal> */}
    </div>
  );
};

export default Attractions;
