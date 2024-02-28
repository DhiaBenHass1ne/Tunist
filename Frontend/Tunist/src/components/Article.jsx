import React, { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    media: [],
  });
  const [errors, setErrors] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
        "http://localhost:8080/api/articles/new/" + Cookies.get("user_id"),
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
      });
    // .catch(err => setErrors(err.response.data.errors))
  };

  // const getOnePublisher=(publisher_id)=>{
  //   axios.get("http://localhost:8080/api/users/"+publisher_id)
  // }

  return (
    <>
      <div>
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
      </div>

      <div>
        <h1> Create</h1>
        {JSON.stringify(articles[0])}
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

      <table>
        <thead>
          <tr>
            <th>Title </th>
            <th>Media</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((v, idx) => (
            <tr key={idx}>
              <td>{v.title}</td>
              <td>{v.media}</td>
              <td>{v.content}</td>
              {/* <td>{axios.get}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Article;
