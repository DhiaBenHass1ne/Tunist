import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import UserService from '../services/UserService'
import {Link} from 'react-router-dom'

const Log = ({ refreshPage, component, setComponent }) => {
  const [userId, setUserId] = useState('');

useEffect(() => {

    const userIdFromCookie = Cookies.get('user_id');
    if (userIdFromCookie) {
        setUserId(userIdFromCookie);
    }
}, []);

const [loggingUser, setLoggingUserr] = useState({
    email: '',
    password: '',
});

const clearForm = () => {
  setLoggingUserr({
      email: '',
      password: '',
    });
}

const handleSubmit = (e) => {
    e.preventDefault();
    UserService.login(loggingUser)
        .then(res => {
            Cookies.set('user_id', `${res.data.id}`);
            console.log(res);
            // refreshPage();
            clearForm();
        })
        .catch(err => {
            console.log(err);
        });
}

  return (
    <div className=' p-3  text-center'>
    <h3>Welcome Back ❤</h3>
    <p className=' text-secondary'>We missed you!</p>
    <form style={{marginLeft:"29%"}} onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Email</label>
            <input name="email" className="form-control" onChange={(e)=>{setLoggingUserr({...loggingUser,email:e.target.value})}} value={loggingUser.email}/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type='password' name="password" className="form-control" onChange={(e)=>{setLoggingUserr({...loggingUser,password:e.target.value})}} value={loggingUser.password}/>
        </div>
        <input type="submit" value="Login" className="button17" />
    </form>
    <p>New to Tunist ? Create an account <Link style={{cursor:'pointer'}} onClick={()=>setComponent("Register")}>here.</Link></p>
</div>
  )
}

export default Log
