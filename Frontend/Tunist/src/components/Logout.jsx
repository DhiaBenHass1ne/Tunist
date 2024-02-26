import React from 'react'
import Cookies from 'js-cookie'
import UserService from '../services/UserService'
const Logout = ({refreshPage}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.logout()
            .then(res => {
                Cookies.set('user_id', `${res.data.id}`);
                console.log(res);
                refreshPage();
            })
            .catch(err => {
                console.log(err);
            });
    }
  return (
    <form onSubmit={handleSubmit}>
        <button>Logout</button>
    </form>
  )
}

export default Logout