// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import UserService from '../services/UserService'

const Reg = ({refreshPage}) => {
    const [newUser,setNewUser] = useState(
        {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirm:''
        }
    )

    const clearForm =() =>{
        setNewUser(
            {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirm:''
    })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.register(newUser)
        .then(res=>{console.log(res.data); refreshPage(); clearForm();})
        .catch(err=>{console.log(err.response.data)})

    }

  return (
         <div className="container d-flex justify-content-around">
		<div>
			<h3>Register:</h3>
            {JSON.stringify(newUser)}
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
					<input type='password' name="password" className="form-control" onChange={(e)=>{setNewUser({...newUser,password:e.target.value})}}/>
					
				</div>
				<div className="form-group">
					<label>Confirm Password:</label>
					<input type='password' name="confirm" className="form-control" onChange={(e)=>{setNewUser({...newUser,confirm:e.target.value})}}/>
				
				</div>
				<input type="submit" value="Register" className="btn btn-primary" />
			</form>
		</div>
    </div>
  )
}

export default Reg
