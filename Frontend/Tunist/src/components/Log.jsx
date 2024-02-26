import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import UserService from '../services/UserService'

const Log = ({ refreshPage }) => {
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
            refreshPage();
            clearForm();
        })
        .catch(err => {
            console.log(err);
        });
}

const test = ()=>{
    UserService.test()
    .then(res =>{console.log(Cookies.get('user_id')); console.log(res)})
    .catch(err=>console.log(err))
}
  return (
    <div className="login-reg-main border-round">

    <h3>Login:</h3>
    <h3 className='text-danger'> ID is == {Cookies.get('user_id')}</h3>

    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Email:</label>
            <input name="email" className="form-control" onChange={(e)=>{setLoggingUserr({...loggingUser,email:e.target.value})}} value={loggingUser.email}/>
        </div>
        <div className="form-group">
            <label>Password:</label>
            <input type='password' name="password" className="form-control" onChange={(e)=>{setLoggingUserr({...loggingUser,password:e.target.value})}} value={loggingUser.password}/>
        </div>
        <input type="submit" value="Login" className="btn btn-success" />
    </form>
</div>
  )
}

export default Log
