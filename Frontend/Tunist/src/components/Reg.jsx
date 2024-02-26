// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService'
import Cookies from 'js-cookie'
import axios from 'axios'

const Reg = ({ refreshPage }) => {
    const [userId, setUserId] = useState('');

    useEffect(() => {

        const userIdFromCookie = Cookies.get('user_id');
        if (userIdFromCookie) {
            setUserId(userIdFromCookie);
        }
    }, []);

    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        image:''
    });

    const clearForm = () => {
        setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm: '',
            image:''
        });
    }
    const [imgStatus,setImageStatus]=useState("Empty")
    const [image, setImage] = useState({image:""});
    
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setImageStatus("Uploading");
    
    
    
        try {
            const form = new FormData();
            form.append("file", selectedFile);
            form.append("upload_preset", "ahmedsm");
    
            const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dljarbi3r/image/upload",
            form
        );
    
            setNewUser({...newUser,image: response.data.secure_url });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.register(newUser)
            .then(res => {
                Cookies.set('user_id', `${res.data.id}`);
                console.log(res);
                refreshPage();
                clearForm();
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }

    const test = ()=>{
        UserService.test()
        .then(res =>{console.log(Cookies.get('user_id')); console.log(res)})
        .catch(err=>console.log(err))
    }

    return (
        <div className="container d-flex justify-content-around">
		<div>
			<h3>Register:</h3>
            {JSON.stringify(newUser)}
            <h3 className='text-danger'>{Cookies.get('user_id')}</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>First Name:</label>
					<input name="firstName" className="form-control" onChange={(e)=>{setNewUser({...newUser,firstName:e.target.value})}} value={newUser.firstName}/>
				</div>
				<div className="form-group">
					<label>Last Name:</label>
					<input name="lastName" className="form-control" onChange={(e)=>{setNewUser({...newUser,lastName:e.target.value})}} value={newUser.lastName}/>
				</div>
				<div className="form-group">
					<label>Email:</label>
					<input name="email" className="form-control" onChange={(e)=>{setNewUser({...newUser,email:e.target.value})}} value={newUser.email}/>
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input type='password' name="password" className="form-control" onChange={(e)=>{setNewUser({...newUser,password:e.target.value})}} value={newUser.password}/>
					
				</div>
				<div className="form-group">
					<label>Confirm Password:</label>
					<input type='password' name="confirm" className="form-control" onChange={(e)=>{setNewUser({...newUser,confirm:e.target.value})}}/>
				
				</div>

                <div className="mb-3 btn log-btn btn-rounded">
                    <label className="form-label">Profile Picture</label>
                    { imgStatus === "Empty"?<p></p>: imgStatus ==="Uploading"? <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div> :<img src={newUser.image} alt="uploading" width={100} className='uploaded'/>}
                    <input type="file" name="image" onChange={handleFileChange} className="form-control"/>
                </div>
				<input type="submit" value="Register" className="btn btn-primary" />
			</form>
            <button onClick={()=>{test()}}>TEST</button>
		</div>
    </div>
    )
}

export default Reg;
