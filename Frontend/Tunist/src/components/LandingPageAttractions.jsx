import styles from "./attractions.module.css";
import React, { useEffect, useState } from "react";
import { Row, Col, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import buttonn from "../components/button.module.css";
import NavBar from "../components/NavBar";
// import blogStyle from "./blog.module.css";
import Arrow from "../components/Arrow";
import Modal from "../components/Modal";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import AttractionModal from "../components/AttractionModal";
import style from "./modal.module.css";
import inputStyle from "./input.module.css";

const LandingPageAttractions = ({setChoice,choice,status,pos,position,setNewCenter,newCenter, setPosition, positions,setPositions, setStatus}) => {
  const [attractions, setAttractions] = useState([]);
  const [carouselImagesPerArticle, setCarouselImagesPerArticle] = useState([]);
  const [modal, setModal] = useState(false);

  const [imgStatus, setImageStatus] = useState("Empty");

  const imageList = [];
  const [selectedFiles, setSelectedFiles] = useState(null);

  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    media: [],
    author: { id: Cookies.get("user_id") },
    state: "Bizerte",
    position:pos
  });

  const [errors, setErrors] = useState([]);
  const [publisherNames, setPublisherNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "ahmedsm");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dljarbi3r/image/upload",
        form
      );
      imageList.push(response.data.secure_url);
      setNewArticle({ ...newArticle, media: imageList });
      setImageStatus("Uploaded");
      console.log("IMAGE UPLOADED");
    } catch (error) {
      console.error("Error uploading image:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
    console.log("FILES =====> :", files);
    setImageStatus("Uploading");

    await Array.from(files).map((selectedFile, idx) => {
      handleImageUpload(selectedFile);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("position from form ===>"+position)
    await axios
      .post("http://localhost:8080/api/attractions", newArticle)
      .then((res) => {
        console.log(res.data);
        console.log("positions before setter ===>"+positions)
        // setPositions(positions.push(position))
        console.log("positions after setter ===>"+positions)

        setNewArticle({
          title: "",
          description: "",
          media: [],
          author: { id: Cookies.get("user_id") },
          state: "Bizerte",
          position:position
        });
        toggleModal();
      })
      .catch((err) => console.log(err));
      setPositions([...positions,position])
      setPosition([37,10])
    await axios
      .get("http://localhost:8080/api/attractions")
      .then((res) => {
        // setArticles(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };


 

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
    <>
      {status==true ? 

<div className={`container  ${style.createAttractionContainer}`} style={{marginTop:"8em"}}>
      <div className={`card ${style.createAttractionCard}`}>
        <div className={`card-body ${style.createAttractionCardBody}`}>
          <h2 className="card-title text-center text-muted">Add an Attraction</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="text-muted form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                value={newArticle.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="text-muted form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                value={newArticle.description}
              />
            </div>

            {selectedImage && (
              <div className="mb-3">
                <img alt="not found" width="250px" src={URL.createObjectURL(selectedImage)} />
                <br />
                <button onClick={() => setSelectedImage(null)} className={`btn btn-danger ${style.removeImageButton}`}>
                  Remove
                </button>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="myImage" className={`form-label text-muted  ${style.customFileUpload}`}>
                Select Images
              </label>
              <input
                multiple
                type="file"
                className="form-control"
                id="myImage"
                name="myImage"
                onChange={handleFileChange}
                // style={{ display: 'none' }}
              />
            </div>

            <button type="submit" className={`btn btn-success ${style.submitButton}`}>
              Submit
            </button>
            <a className="offset-2" style={{textDecoration:"none", color:"blakc"}}  onClick={()=>{setStatus(false)}}>Go Back</a>
          </form>
          
        </div>
      </div>
    </div>
      
      :
    <div style={{ backgroundColor: "white", margin: "5rem" }}>
      {/* <h1 className=' text-center fw-bold m-5'>Welcome to the Real World!</h1> */}
        <div className="text-center">
        <button   onClick={()=>{setStatus(true)}} className={`text-center ${buttonn.button17}`} >Add an attraction</button>
        </div>
      <ul className={styles.cards} >
      {attractions.map((a, index) => 

        <li  key={index}>
          <div onClick={() => {setChoice(index);setNewCenter(positions[index]);console.log("this is position =>"+newCenter+" and these are poses =>"+positions); console.log("this is the choice", choice);}}   className={styles.card}>
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
    }
    </>
  );
};

export default LandingPageAttractions;