import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import blogStyle from "./blog.module.css";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import { Carousel, Col, Row } from "react-bootstrap";

const Profile = () => {
  const [articles, setArticles] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/"+Cookies.get("user_id"));
        setArticles(response.data.articles);

        const extractedMedia = response.data.articles.map((article) =>
          article.media.map((mediaItem) => mediaItem)
        );

        setCarouselImagesPerArticle(extractedMedia);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <hr></hr>
      <MDBRow className="justify-content-around">
        {/* Sidebar */}
        <MDBCard className="mb-4 p-2 " style={{height:"73vh",width:"40%"}}>
          <MDBCardBody className="text-center">
            <MDBCardImage
              src="https://i.imgur.com/7D7I6dI.png"
              alt="avatar"
              className="rounded-circle"
              style={{ width: '150px' }}
              fluid
            />
            <h3 className="text-muted mb-5 mt-3">Dhaieddine Amri</h3>
            <p className="text-muted mb-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam nemo praesentium totam, recusandae corporis pariatur? Minima, porro voluptatem fugiat quia alias aliquam unde harum natus, temporibus consequatur minus sed magnam?</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
               
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
          </MDBCardBody>
        </MDBCard>

        {/* Main Section */}
        <MDBCard className="mb-4 p-2" style={{height:"73vh",width:"28%",display:"flex"}}>
          {/* Articles Section */}
          <h1  className="text-muted" style={{textAlign:"center",marginBottom:"2rem"}}>Articles</h1>
          {articles.map((a, index) => (
            <Row className="justify-content-evenly" key={a.id} style={{ marginBottom: "40px" }}>
              <Col sm={2} md={5}>
                <Carousel>
                  {carouselImagesPerArticle[index].map((image, i) => (
                    <Carousel.Item key={i}>
                      <img
                        className={`d-block w-100 ${blogStyle.carouselImage}`}
                        src={image}
                        alt={`Slide ${i + 1}`}
                        style={{
                          width: "10rem",
                          height: "5rem",
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
                    width:"10rem",
                    height: "5rem",
                    borderRadius: "15px",
                    boxShadow: "4px 4px 4px #930412",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className=" d-flex align-items-center justify-content-evenly mb-1 ">
                    <h6 style={{ color: "#930412", textAlign: "center" }}>{a.title}</h6>
                    {/* ... (Rest of the code for displaying articles) */}
                  </div>
                </div>
              </Col>
            </Row>
          ))}

          {/* Another MDBCard next to it */}
          
        </MDBCard>

        {/* replace this with Attraction */}

        <MDBCard className="mb-4 p-2" style={{height:"73vh",width:"28%",display:"flex"}}>
        <h1 className="text-muted" style={{textAlign:"center",marginBottom:"2rem"}}>Attractions</h1>

          {/* Articles Section */}
          {articles.map((a, index) => (
            <Row className="justify-content-around" key={a.id} style={{ marginBottom: "40px" }}>
              <Col sm={2} md={5}>
                <Carousel>
                  {carouselImagesPerArticle[index].map((image, i) => (
                    <Carousel.Item key={i}>
                      <img
                        className={`d-block w-100 ${blogStyle.carouselImage}`}
                        src={image}
                        alt={`Slide ${i + 1}`}
                        style={{
                          width: "15rem",
                          height: "5rem",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col sm={2} md={6}>
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "#FFF5E1",
                    width:"10rem",
                    height: "5rem",
                    borderRadius: "15px",
                    boxShadow: "4px 4px 4px #930412",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className=" d-flex align-items-center justify-content-evenly mb-1 ">
                    <h6 style={{ color: "#930412", textAlign: "center" }}>{a.title}</h6>
                    {/* ... (Rest of the code for displaying articles) */}
                  </div>
                </div>
              </Col>
            </Row>
          ))}

          {/* Another MDBCard next to it */}
          
        </MDBCard>
        
      </MDBRow>
    </>
  );
};

export default Profile; 