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

const Attractions = () => {
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

  return (
    <>
      <NavBar></NavBar>
      <hr></hr>
      <div style={{ padding: "5rem" }}>
        {attractions.map((a, index) =>
          index % 2 == 0 ? (
            <Row key={a.id} style={{ marginBottom: "40px" }}>
              <Col sm={2} md={6}>
                <Carousel>
                  {carouselImagesPerArticle[index].map((image, i) => (
                    <Carousel.Item key={i}>
                      <img
                        className={`d-block w-100 ${blogStyle.carouselImage}`}
                        src={image}
                        alt={`Slide ${i + 1}`}
                        style={{
                          width: "300px",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col sm={12} md={6}>
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "#FFF5E1",
                    height: "25rem",
                    borderRadius: "15px",
                    boxShadow: "4px 4px 4px #930412",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className=" d-flex align-items-center justify-content-evenly mb-1 ">
                    <h1 style={robotoSlabStyles}>{a.attraction.title}</h1>
                    {Cookies.get("user_id") == a.author.id && (
                      <div style={{ cursor: "pointer" }} onClick={toggleModal}>
                        <i className="bi bi-pencil-square"></i>
                      </div>
                    )}
                  </div>
                  <p
                  className="text-muted"
                    style={{
                      fontFamily: '"Roboto Slab", serif',
                      fontOpticalSizing: "auto",
                      fontWeight: 500, // Replace with your desired weight value
                      fontStyle: "normal",
                    }}
                  >
                    {a.attraction.description}
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-3">
                    <Link
                        style={{ textDecorationLine: "none", color: "black" }}
                        to={`/profile/${a.author.id}`}
                      > <img
                        className={blogStyle.cardThumb}
                        style={{ border: "3px solid #930412" }}
                        src="https://i.imgur.com/7D7I6dI.png"
                        alt=""
                      />
                      </Link>

                      {/* {JSON.stringify(a.publisher.id)} */}
                      <Link
                        style={{ textDecorationLine: "none", color: "black" }}
                        to={`/profile/${a.author.id}`}
                      >
                        <h2 style={robotoSlabStyles}>
                          {a.author.firstName.charAt(0).toUpperCase() +
                            a.author.firstName.slice(1)}
                        </h2>
                      </Link>
                    </div>

                    <p>
                      <strong className="text-muted opacity-75">
                        {moment(a.attraction.createdAt).fromNow()}
                      </strong>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row key={a.id} style={{ marginBottom: "40px" }}>
              <Col sm={12} md={6}>
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "#FFF5E1",
                    height: "25rem",
                    borderRadius: "15px",
                    boxShadow: "4px 4px 4px #930412",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div className=" d-flex align-items-center justify-content-evenly mb-1 ">
                    <h1 style={robotoSlabStyles}>{a.attraction.title}</h1>
                    {Cookies.get("user_id") == a.author.id && (
                      <div style={{ cursor: "pointer" }} onClick={toggleModal}>
                        <i className="bi bi-pencil-square"></i>
                      </div>
                    )}
                  </div>
                  <p
                  className="text-muted"
                    style={{
                      fontFamily: '"Roboto Slab", serif',
                      fontOpticalSizing: "auto",
                      fontWeight: 500, // Replace with your desired weight value
                      fontStyle: "normal",
                    }}
                  >
                    {a.attraction.content}
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex gap-3">
                    <Link
                        style={{ textDecorationLine: "none", color: "black" }}
                        to={`/profile/${a.author.id}`}
                      > <img
                        className={blogStyle.cardThumb}
                        style={{ border: "3px solid #930412" }}
                        src="https://i.imgur.com/7D7I6dI.png"
                        alt=""
                      />
                      </Link>

                      {/* {JSON.stringify(a.publisher.id)} */}
                      <Link
                        style={{ textDecorationLine: "none", color: "black" }}
                        to={`/profile/${a.author.id}`}
                      >
                        <h2 style={robotoSlabStyles}>
                          {a.author.firstName.charAt(0).toUpperCase() +
                            a.author.firstName.slice(1)}
                        </h2>
                      </Link>
                    </div>

                    <p>
                      <strong className="text-muted opacity-75">
                        {moment(a.attraction.createdAt).fromNow()}
                      </strong>
                    </p>
                  </div>
                </div>
              </Col>
              <Col sm={2} md={6}>
                <Carousel>
                  {carouselImagesPerArticle[index].map((image, i) => (
                    <Carousel.Item key={i}>
                      <img
                        className={`d-block w-100 ${blogStyle.carouselImage}`}
                        src={image}
                        alt={`Slide ${i + 1}`}
                        style={{
                          width: "300px",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
          )
        )}
      </div>
      <AttractionModal modal={modal} setModal={setModal}></AttractionModal>
    </>
  )
}

export default Attractions