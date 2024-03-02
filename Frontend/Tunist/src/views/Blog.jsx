import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import blogStyle from "./blog.module.css";
import Arrow from "../components/Arrow";
import Modal from "../components/Modal"

const Blog = () => {
  const carouselImagesPerArticle = [
    [
      "https://c4.wallpaperflare.com/wallpaper/868/182/441/desert-sand-dune-sky-sahara-wallpaper-preview.jpg", // Replace with your image URLs
      "https://c4.wallpaperflare.com/wallpaper/100/297/74/desert-sand-tourism-camels-wallpaper-preview.jpg",
    ],
    [
      "https://c1.wallpaperflare.com/preview/501/915/801/tunisia-monastir-holiday-relaxation.jpg",
      "https://c1.wallpaperflare.com/preview/910/959/806/sea-holiday-water-headland.jpg",
    ],
    // Add more arrays as needed
  ];

  const articles = [
    {
      id: 1,
      title: "The Desert In Tunisia",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit...Lorem ipsum dolor sit amet, consectetur adipiscing elit... ",
      author: "John Doe",
      publicationDate: "2022-05-15",
    },
    {
      id: 2,
      title: "Join Us to go to the beach",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      author: "Jane Smith",
      publicationDate: "2022-06-20",
    },
    // Add more articles as needed
  ];






  return (
    <>
      <NavBar></NavBar>
      <div style={{ padding: "5rem" }}>
        {articles.map((article, index) => (
            index%2==0 ? 
          <Row key={article.id} style={{ marginBottom: "40px" }}>
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
                <div className="d-flex align-items-center gap-5 mb-5">

                  <img
                    className={blogStyle.cardThumb}
                    src="https://i.imgur.com/7D7I6dI.png"
                    alt=""
                  />
                  <h2>{article.title}</h2>
                </div>
                <p>{article.content}</p>
                <div className="d-flex justify-content-between">
                  <h3>{article.author}</h3>
                  <p>
                    <small>{article.publicationDate}</small> 
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        : <Row key={article.id} style={{ marginBottom: "40px" }}>
            <Col sm={12} md={6}>
              <div style={{ padding: "20px", backgroundColor: "#EfE8DB", height: "25rem", borderRadius: "15px", boxShadow: "4px 4px 4px #930412", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className="d-flex align-items-center gap-5 mb-5">

                  <img
                    className={blogStyle.cardThumb}
                    src="https://i.imgur.com/7D7I6dI.png"
                    alt=""
                  />
                  <h2>{article.title} </h2>
                </div>
                <p>{article.content}</p>
                <div className="d-flex justify-content-between">
                  <h3>{article.author}</h3>
                  <p>
                    <small>{article.publicationDate}</small> 
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
        <Modal ></Modal>
       
    </>
  );
};

export default Blog;