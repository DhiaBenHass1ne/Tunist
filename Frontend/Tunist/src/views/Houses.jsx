import styles from "../components/attractions.module.css";
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
import style from "../components/modal.module.css";
import inputStyle from "../components/input.module.css";
import buttonn from "../components/button.module.css";

const Houses = () => { 
    const [selectedImage, setSelectedImage] = useState(null);

    const [houses, setHouses] = useState([])
    const [status,  setStatus] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState(null);
    const imageList = [];
    const [imgStatus, setImageStatus] = useState("Empty");

    const [newHouse,setNewHouse] = useState({})
    useEffect(()=>{
        axios.get("http://localhost:8080/api/houses")
            .then(res=>{setHouses(res.data);console.log(res.data)})
            .catch(err=>console.log(err))
            console.log(Cookies.get("user_id"))
        axios.get("http://localhost:8080/api/users/"+Cookies.get("user_id"))
            .then(res=>console.log(res.data))
    },[])
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
          setNewHouse({ ...newHouse, media: imageList });
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
    const handleSubmit = (e)=>{
        e.preventDefault()
        setNewHouse({...newHouse,loaner:{id:Cookies.get("user_id")}})
        axios.post(" http://localhost:8080/api/houses",newHouse)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }
  return (<>
  <NavBar></NavBar>

    {status==true ? 
          <>

        <div className={`container  ${style.createAttractionContainer}`} style={{marginTop:"8em"}}>
              <div className={`card ${style.createAttractionCard}`}>
                <div className={`card-body ${style.createAttractionCardBody}`}>
                  <h2 className="card-title text-center text-muted">Add an Attraction</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="text-muted form-label">
                        Adress
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={(e) => setNewHouse({ ...newHouse, adress: e.target.value })}
                        value={newHouse.adress}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="text-muted form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={(e) => setNewHouse({ ...newHouse, state: e.target.value })}
                        value={newHouse.state}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="text-muted form-label">
                        Price
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="title"
                        onChange={(e) => setNewHouse({ ...newHouse, price: e.target.value })}
                        value={newHouse.price}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="text-muted form-label">
                        
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={(e) => setNewHouse({ ...newHouse, phone: e.target.value })}
                        value={newHouse.phone}
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
                        style={{ display: 'none' }}
                      />
                    </div>
        
                    <button type="submit" className={`btn btn-success ${style.submitButton}`}>
                      Submit
                    </button>
                    <a className="offset-3" onClick={()=>{setStatus(false)}}>Go back</a>
                  </form>
                  
                </div>
              </div>
            </div>
            </>
                        :

      <>
      <div className="text-center">
          <button   onClick={()=>{setStatus(true)}} className={`text-center ${buttonn.button17}`} >Post a house</button>
      </div>

    <ul className={styles.cards}>
      
    {houses.map((a, index) => (
        <li  key={index}>
          <div 
            onClick={() => {
                setChoice(index);
                console.log("this is the choice", choice);
            }}
            className={styles.card}
            >
            <img
              src={a.house.media[0]}
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
                  src={a.loaner&& a.loaner.image}
                  alt=""
                  />
                <div className={styles.card__headerText}>
                  <h3 className={styles.card__title}>{a.house.adress}</h3>
                  {/* <span className={styles.card__status}>
                    {moment(a.house.createdAt).fromNow()}
                  </span> */}
                  <p><b>Phone :</b>  {a.house.phone}</p>
                  <p> <b>Price :</b>  {a.house.price}</p>

                </div>
              </div>
              <p className={styles.card__description}>
                {a.loaner && a.loaner.firstName} {a.loaner && a.loaner.lastName} 
                
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </>}
    </>)
      }
 

export default Houses;
