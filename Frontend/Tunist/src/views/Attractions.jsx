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
  const [attractions, setAttractions] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
  const [modal, setModal] = useState(false);
  const [choice, setChoice] = useState(0);



  useEffect(() => {
    // console.log(Cookies.get("user_id"));
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/attractions"
        );
        setAttractions(response.data);

        console.log(response.data);
        const extractedMedia = response.data.map((data) =>
          data.attraction.media.map((mediaItem) => mediaItem)
        );

        setCarouselImagesPerArticle(extractedMedia);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
          <LandingPageAttractions choice={choice} setChoice={setChoice}></LandingPageAttractions>
        </div>
        <div className="col-md-6" style={{ height:"10vh",position: "sticky", top: 0,right:0 }}>
          <MapTest choice={choice}  setChoice={setChoice} ></MapTest>
        </div>
      </div>
      <AttractionModal modal={modal} setModal={setModal}></AttractionModal>
    </div>
  );
};

export default Attractions;
