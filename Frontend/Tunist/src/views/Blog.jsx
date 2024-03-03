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


const Blog = () => {

  const [articles, setArticles] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
  const [modal, setModal] = useState(false);


  useEffect(() => {
    // console.log(Cookies.get("user_id"));
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/articles");
        setArticles(response.data);

        const extractedMedia = response.data.map((article) =>
          article.media.map((mediaItem) => mediaItem.url)
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




  return (
    <>
      <NavBar></NavBar>
      <div style={{ padding: "5rem" }}>
        {articles.map((a, index) => (
            index%2==0 ? 
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
              <div style={{ padding: "20px", backgroundColor: "#EfE8DB", height: "25rem", borderRadius: "15px", boxShadow: "4px 4px 4px #930412", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className=" d-flex align-items-center justify-content-evenly mb-1 ">

                  <img
                    className={blogStyle.cardThumb}
                    src="https://i.imgur.com/7D7I6dI.png"
                    alt=""
                  />
                  <h2>{a.article.title}</h2>
                  {Cookies.get("user_id")==a.publisher.id && <div style={{cursor:"pointer"}} onClick={toggleModal}> 
                  <i className="bi bi-pencil-square" ></i>

                  </div> }
                 
                </div>
                <p>{a.article.content}</p>
                <div className="d-flex justify-content-between">
                  <h3>{a.publisher.firstName}</h3>
                  <p>
              <small>{moment(a.article.createdAt).fromNow()}</small>
            </p>
                </div>
              </div>
            </Col>
          </Row>
        : <Row key={a.id} style={{ marginBottom: "40px" }}>
            <Col sm={12} md={6}>
              <div style={{ padding: "20px", backgroundColor: "#EfE8DB", height: "25rem", borderRadius: "15px", boxShadow: "4px 4px 4px #930412", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className=" d-flex align-items-center justify-content-evenly mb-1 ">

                  <img
                    className={blogStyle.cardThumb}
                    src="https://i.imgur.com/7D7I6dI.png"
                    alt=""
                  />
                  <h2>{a.article.title}</h2>
                  {Cookies.get("user_id")==a.publisher.id && <div style={{cursor:"pointer"}} onClick={toggleModal}> 
                  <i className="bi bi-pencil-square" ></i>

                  </div> }
                 
                </div>
                <p>{a.article.content}</p>
                <div className="d-flex justify-content-between">
                  <h3>{a.publisher.firstName}</h3>
                  <p>
              <small>{moment(a.article.createdAt).fromNow()}</small>
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

        </Row> ))}
       
      </div>
        <Modal modal={modal} setModal={setModal} ></Modal>
       
    </>
  );
};

export default Blog;