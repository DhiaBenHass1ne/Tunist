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

const NewAttraction = () => {

        
        const [attractions, setAttractions] = useState([]);
        const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
        const [modal, setModal] = useState(false);
        const [choice, setChoice] = useState(0);
        const [status,setStatus] =useState(true) 
        const [pos,setPos] = useState([36.8065, 10.1815])
        
      
      
       
      
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
      
//  const [positions, setPositions] = useState([
//     [33.8869, 9.5863],
//     [37.2744, 9.8730],
//     [36.4730, 10.1815],
//     [36.5340, 10.1815],
//     [36.5780, 10.1815]
//   ]);
  const[positions,setPositions]=useState([])
  const [position,setPosition]=   useState([34,10])
  const [newCenter,setNewCenter] = useState([34,10])
  
  return (
    <div>
      <NavBar ></NavBar>
      <hr></hr>
      <div className="row"  >
        <div className="col-md-6">
          <LandingPageAttractions  setNewCenter={setNewCenter} newCenter={newCenter}  choice={choice} status={status} setStatus={setStatus} setChoice={setChoice} pos={pos} position={position} setPosition={setPosition} positions={positions} setPositions={setPositions}></LandingPageAttractions>
        </div>
        <div className="col-md-6" style={{ height:"10vh",position: "sticky",top:35,right:0 }}>
          <MapTest choice={choice} newCenter={newCenter} setNewCenter={setNewCenter}   setPos={setPos} status={status} setStatus={setStatus} pos={pos} setChoice={setChoice} position={position} setPosition={setPosition} positions={positions} setPositions={setPositions} ></MapTest>
        </div>
      </div>
      <AttractionModal  pos={pos} modal={modal} setModal={setModal}  ></AttractionModal>
    </div>
  )
}

export default NewAttraction