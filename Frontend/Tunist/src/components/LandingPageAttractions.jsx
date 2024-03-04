import styles from "./attractions.module.css";
import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
// import blogStyle from "./blog.module.css";
import Arrow from "../components/Arrow";
import Modal from "../components/Modal";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import AttractionModal from "../components/AttractionModal";

const LandingPageAttractions = ({setChoice,choice}) => {

  const [attractions, setAttractions] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
  const [modal, setModal] = useState(false);
 

  useEffect(() => {
    // console.log(Cookies.get("user_id"));
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/attractions");
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

  const handleChoice = (choice) => {
    // Handle the choice here
    console.log("Selected choice:", choice);
    // You can perform any other logic or state updates based on the choice
  };


  
  return (
    <div style={{ backgroundColor: "white", margin: "5rem" }}>
      {/* <h1 className=' text-center fw-bold m-5'>Welcome to the Real World!</h1> */}

      <ul className={styles.cards}>
      {attractions.map((a, index) => 

        <li  key={index}>
          <div onClick={() => {setChoice(index);console.log("this is the choice", choice);}}   className={styles.card}>
            <img
              src={a.attraction.media[1]}
              className={styles.card__image}
              alt=""
            />
            <div className={styles.card__overlay}>
              <div className={styles.card__header}>
                <svg
                  className={styles.card__arc}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path />
                </svg>
                <img
                  className={styles.card__thumb}
                  src={a.author.image}
                  alt=""
                />
                <div className={styles.card__headerText}>
                  <h3 className={styles.card__title} >{a.attraction.title}</h3>
                  <span className={styles.card__status}>{moment(a.attraction.createdAt).fromNow()}</span>
                </div>
              </div>
              <p className={styles.card__description}>
                {a.attraction.description}
              </p>
            </div>
          </div>
        </li>
        )}

        {/* ... (Repeat the structure for other list items) ... */}
      </ul>
    </div>
  );
};

export default LandingPageAttractions;
