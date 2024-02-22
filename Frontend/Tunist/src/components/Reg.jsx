// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService'
import Cookies from 'js-cookie'

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
        confirm: ''
    });

    const clearForm = () => {
        setNewUser({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm: ''
        });
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
				<input type="submit" value="Register" className="btn btn-primary" />
			</form>
            <button onClick={()=>{test()}}>TEST</button>
		</div>
    </div>
    )
}

export default Reg;
