import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";
import Arrow from "./Arrow";
import MyModal from "./Modal"

const Article = () => {
  const [articles, setArticles] = useState([]);
   const [imgStatus,setImageStatus]=useState("Empty")
    const imageList=[];
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
<<<<<<< HEAD
    media: [],
=======
    media: ["test"] ,
>>>>>>> cc8107af94a2d883e29eb6d8e928eab299870c98
    publisher:{id:Cookies.get('user_id')}
  });
  const [errors, setErrors] = useState([]);
  const [publisherNames, setPublisherNames] = useState([]);
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
      })
      .catch((err) => {
        setErrors(err);
        console.log("--->", err);
      });
<<<<<<< HEAD
=======
    setPublisher(Cookies.get("user_id"));
    
>>>>>>> cc8107af94a2d883e29eb6d8e928eab299870c98

    axios
      .get("http://localhost:8080/api/articles")
      .then((res) => {
        setArticles(res.data);
        console.log(res.data);
        // Fetch publisher names for all articles
        const promises = res.data.map((article) => getOnePublisher(article.id));
        Promise.all(promises).then((names) => setPublisherNames(names));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    await axios.post("http://localhost:8080/api/articles", newArticle)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    await axios.get("http://localhost:8080/api/articles")
      .then(res => {
        setArticles(res.data);
        console.log(res.data);
        // Fetch publisher names for all articles
        const promises = res.data.map((article) => getOnePublisher(article.id));
        Promise.all(promises).then((names) => setPublisherNames(names));
      })
      .catch(err => console.log(err));
  }
=======
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
>>>>>>> cc8107af94a2d883e29eb6d8e928eab299870c98

  const getOnePublisher = async (publisher_id) => {
    const response = await axios.get("http://localhost:8080/api/users/" + publisher_id);
    return response.data.firstName;
  }

  return (
    <>
      {/* <div>
        <h1>Upload and Display Image usign React Hook's</h1>
        <MyModal></MyModal>

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
<<<<<<< HEAD

      <table>
        <thead>
          <tr>
            <th>Title </th>
            <th>Media</th>
            <th>Content</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          
          {articles.map((v, idx) => (
            <tr key={idx}>
              <td>{v.article.title}</td>
              <td>{v.article.media}</td>
              <td>{v.article.content}</td>
              <td>{publisherNames[idx]}</td>
            </tr>
          ))}
        </tbody>
      </table>
=======
      {/* {articles && articles[0].publisher}
      {articles[0].publisher} */}
    
>>>>>>> cc8107af94a2d883e29eb6d8e928eab299870c98
    </>
  );
};

export default Article;
