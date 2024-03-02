import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

const Article = () => {
  const [articles, setArticles] = useState([]);
   const [imgStatus,setImageStatus]=useState("Empty")
    const imageList=[];
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    media: ["test"] ,
    publisher:{id:Cookies.get('user_id')}
  });
  const [errors, setErrors] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);

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


const handleRemoveImage = (index) => {
  const updatedFiles = Array.from(selectedFiles);
  updatedFiles.splice(index, 1);
  setSelectedFiles(updatedFiles);
  newArticle.media.splice(index,1);

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/" + Cookies.get("user_id"), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("===>", res);
        setPublisher(res.data);
      })
      .catch((err) => {
        setErrors(err);

        console.log("--->", err);
      });
    setPublisher(Cookies.get("user_id"));
    

    axios
      .get("http://localhost:8080/api/articles")
      .then((res) => {
        setArticles(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/articles" ,
        newArticle,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setNewArticle({
          title: "",
          content: "",
          media: [],
        })
      })
      .catch((err) => {console.log(err) ;setErrors(err.response.data.errors)})
  };

  // const getOnePublisher=(publisher_id)=>{
  //   axios.get("http://localhost:8080/api/users/"+publisher_id)
  // }

  return (
    <>
      {/* <div>
        <h1>Upload and Display Image usign React Hook's</h1>

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

        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div> */}
 <p>Ajoute jusqu'à 5 photos</p>
        <div className=" p-3 d-flex gap-5 imageCompo " >
            <div className="file-btn upload col-2" >
                <input className="inputPic " type="file" multiple onChange={handleFileChange} />
                <span className="material-symbols-rounded"><i className="bi bi-cloud-plus"></i></span> Upload File
            </div>
            <div className="d-flex flex-row flex-wrap gap-2">
                {selectedFiles && Array.from(selectedFiles).map((file, idx) => (
                    <div key={idx} className="imgsel">
                        <img src={URL.createObjectURL(file)} className="selectedImg " alt={`preview-${idx}`} width={150}/>
                        <button  className="x rounded-circle " type="button" onClick={() => handleRemoveImage(idx)}><i className="bi bi-trash-fill"></i></button>
                    </div>
                ))}
            </div>
        </div>
      <div>
        <h1> Create</h1>
        {JSON.stringify(newArticle)}
        <form onSubmit={handleSubmit}>
          <div>
            <p> Title</p>
            <input
              onChange={(e) =>  setNewArticle({ ...newArticle, title: e.target.value })}
              className="form-control"
              value={newArticle.title}
            />
          </div>
          <div>
            <p> Content</p>
            <input
              onChange={(e) =>setNewArticle({ ...newArticle, content: e.target.value })}
              className="form-control"
              value={newArticle.content}
            />
          </div>

          <button className="btn btn-success"> Submit</button>
        </form>
        {/* {
            errors.map((err, idx)=>(
                <p style={{color: "red"}} key={idx}> {err.defaultMessage}</p>
            ))
        }
         */}
      </div>
      {/* {articles && articles[0].publisher}
      {articles[0].publisher} */}
    
    </>
  );
};

export default Article;
