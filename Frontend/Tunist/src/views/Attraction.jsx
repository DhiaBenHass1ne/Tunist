import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'

const Attraction = () => {
    const [imgStatus,setImageStatus]=useState("Empty")
    const imageList=[];
    const [allAttractions, setAllAttractions] = useState([]);
    const [attraction, setAttraction] = useState({
        title:"",
        description:"",
        media:[],
        state:"Bizerte",
        author:{id:Cookies.get('user_id')}
    });

    const [selectedFiles, setSelectedFiles] = useState(null);




    const handleRemoveImage = (index) => {
        const updatedFiles = Array.from(selectedFiles);
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
        attraction.media.splice(index,1);

    };

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
                setAttraction({...attraction,media:imageList})
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
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await  axios.post("http://localhost:8080/api/attractions",attraction)
                    .then(res=> console.log(res.data))
                    .catch(err=>console.log(err))
        await axios.get("http://localhost:8080/api/attractions")
                    .then(res=>{setAllAttractions(res.data); console.log(res.data)})
                    .catch(err=>console.log(err))

    }

  return (
    <div>
      <form onSubmit={handleSubmit} >
				<div className="form-group">
					<label>Title:</label>
					<input name="firstName" className="form-control" onChange={(e)=>setAttraction({...attraction,title:e.target.value})} value={attraction.title} />
				</div>
				<div className="form-group">
					<label>Description:</label>
					<input name="lastName" className="form-control" onChange={(e)=>setAttraction({...attraction,description:e.target.value})} value={attraction.description}/>
				</div>


                {/* <div className="mb-3 btn log-btn btn-rounded">
                    <label className="form-label">Image</label>
                    { imgStatus === "Empty"?<p></p>: imgStatus ==="Uploading"? <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div> :<img src={imageList[0]} alt="uploading" width={100} className='uploaded'/>}
                    <input type="file" name="image" onChange={handleFileChange} className="form-control"/>
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
				<input type="submit" value="Register" className="btn btn-primary" />
			</form>
            <h3>images:{imageList}</h3>
            <h3>files:{JSON.stringify (attraction)}</h3>
    </div>
  )
}

export default Attraction
