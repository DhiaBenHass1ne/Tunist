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
import { useParams, useNavigate } from "react-router-dom";
import { getOrCreateChat } from 'react-chat-engine'
import UserService from '../services/UserService'

const Profile = () => {
  const [articles, setArticles] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
  const {user_id} = useParams();
  const [user,setUser] = useState({})
  const [currUser,setCurrUser] = useState({})
  const nav = useNavigate();

  const creds = {
    projectID: 'eaec0c42-f575-4254-9342-2a742d1a19e2', // Your Chat Engine project ID
    userName: currUser.email, // The username for authentication
    userSecret: 'Dddd1234' // The user secret for authentication
  }
  

  const styles = {
    truncatedText: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      WebkitLineClamp: 4, // Adjust the number of lines
      textOverflow: 'ellipsis',
    },
  };
  


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/users/"+Cookies.get("user_id"));
  //       setArticles(response.data.articles);

  //       const extractedMedia = response.data.articles.map((article) =>
  //         article.media.map((mediaItem) => mediaItem)
  //       );

  //       setCarouselImagesPerArticle(extractedMedia);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log(user_id);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/"+user_id);
        setArticles(response.data.articles);
        console.log(response);
        setUser(response.data.user)

        const extractedMedia = response.data.articles.map((article) =>
          article.media.map((mediaItem) => mediaItem)
        );

        setCarouselImagesPerArticle(extractedMedia);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    UserService.getOneUser(Cookies.get("user_id"))
      .then(response=>{console.log("SUCCES",response);setCurrUser(response.data.user)})
      .catch(error=>console.log("ERROR ❌",error))

    fetchData();
  }, []);
  const handleMessage = async () => {
    await getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [user.email] },
      (chat) => {
        console.log("Chat created or retrieved:", chat);
        console.log("Current User:", currUser);
        console.log("Target User:", user);
      }
    )
    nav("/chatapp")
  };
  
  return (
    <>
      <NavBar></NavBar>
      <hr></hr>
      <MDBRow className="justify-content-around">
        {/* Sidebar */}
        <MDBCard className="mb-4 p-2 " style={{height:"73vh",width:"40%"}}>
          <MDBCardBody className="text-center">
            <MDBCardImage
              src={user.image}
              alt="avatar"
              className="rounded-circle"
              style={{ width: '150px',border:"2px solid black" }}
              fluid
            />
            <div className=" mb-3 mt-3 d-flex justify-content-center align-items-center gap-3">
            <i className="bi bi-patch-check-fill"></i>
            <h3 className="text-muted ">{user.firstName}</h3></div>
            <p style={styles.truncatedText} className="text-muted mb-5">Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Natus provident dolor voluptatum corporis unde nesciunt,
             assumenda id sapiente voluptatibus veritatis adipisci quos atque. Consequuntur aperiam temporibus in hic, fuga alias? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati omnis incidunt inventore ea ducimus quibusdam quaerat hic blanditiis? Earum nostrum illo, provident nesciunt quod molestiae consectetur voluptate dolores odio illum.</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2" onClick={console.log("test")}>
               
                  <button className="btn btn-outline-info" onClick={handleMessage}>Message</button>
                </div>
          </MDBCardBody>
        </MDBCard>

        {/* Main Section */}
        <MDBCard className="mb-4 p-2" style={{height:"73vh",width:"28%",display:"flex"}}>
          {/* Articles Section */}
          <div style={{ display: 'grid', placeItems: 'center' }}>
      <h2 className="text-muted" style={{ textAlign: 'center' }}>Articles</h2>
    </div>
    <hr />
    
          {articles ?  articles.map((a, index) => (
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
          ))
          :
          <h1>user has no articles</h1>}

          
        

          {/* Another MDBCard next to it */}
          
        </MDBCard>

        {/* replace this with Attraction */}


        <MDBCard className="mb-4 p-2" style={{height:"73vh",width:"28%",display:"flex"}}>
        <div style={{ display: 'grid', placeItems: 'center' }}>
      <h2 className="text-muted" style={{ textAlign: 'center' }}>Attractions</h2>
    </div>
    <hr />
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