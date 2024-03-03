import React, { useEffect, useState } from "react";
import style from "./modal.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import inputStyle from "./input.module.css"

export default function Modal({modal,setModal}) {
  const [imgStatus,setImageStatus]=useState("Empty")

  const imageList=[];
  const [selectedFiles, setSelectedFiles] = useState(null);


  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    media: [],
    publisher: { id: Cookies.get("user_id") },
  });
  const [errors, setErrors] = useState([]);
  const [publisherNames, setPublisherNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);


 

  const handleImageUpload = async (file) =>{
    try {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "ahmedsm");
        
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dljarbi3r/image/upload",
            form
            );
            imageList.push(response.data.secure_url)
            setNewArticle({...newArticle,media:imageList})
            setImageStatus("Uploaded")
            console.log("IMAGE UPLOADED")
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
}


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
    await axios
      .post("http://localhost:8080/api/articles", newArticle)
      .then((res) => {console.log(res.data);setNewArticle({
        title: "",
        content: "",
        media: [],
        publisher: { id: Cookies.get("user_id") },
      });toggleModal()})
      .catch((err) => console.log(err));
    await axios
      .get("http://localhost:8080/api/articles")
      .then((res) => {
        // setArticles(res.data);
        console.log(res.data);

      })
      .catch((err) => console.log(err));
  };

  

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add(style.activeModal);
    } else {
      document.body.classList.remove(style.activeModal);
    }
    return () => {
      document.body.classList.remove(style.activeModal);
    };
  }, [modal]);

  const styles = {
    addButton: {
      transition: "opacity 0.5s ease-in-out", // Add transition property
      boxShadow: "2px 2px 2px black",
      position: "fixed",
      right: "3em",
      bottom: "3em",
      width: "70px",
      height: "70px",
      backgroundColor: "#930412",
      borderRadius: "50%",
      cursor: "pointer",
    },

  };

  return (
    <>
  
      {modal && (
        <div className={style.modal}>
          <div onClick={toggleModal} className={style.overlay}></div>
          <div className={style.modalContent}>
            <p></p>
            <h2>Create an Article</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <p> Title</p>
                <input
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, title: e.target.value })
                  }
                  className="form-control"
                  value={newArticle.title}
                />
              </div>
              <div>
                <p> Content</p>
                <textarea
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, content: e.target.value })
                  }
                  className="form-control"
                  value={newArticle.content}
                />
              </div>

              {selectedImage && (
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
              )}

              <br />
              <br />
              <label htmlFor="myImage" className={inputStyle.customFileUpload}>
        Select Images
      </label>
              <input
              multiple
              className="bi bi-x"
                type="file"
                id="myImage"
                name="myImage"
                onChange={handleFileChange}

                style={{ display: "none" }}
              />

              <button className="btn btn-success"> Submit</button>
            </form>
            <button className={style.closeModal} onClick={toggleModal}>
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>
      )}

      <div
        style={styles.addButton}
        className="d-flex justify-content-center align-items-center"
        onClick={toggleModal}
      >
        <i className="bi bi-plus-square" style={{ fontSize: "2rem" }}></i>
      </div>
    </>
  );
}
