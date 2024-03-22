import React, { useEffect } from 'react'
import Avatar from '@mui/joy/Avatar';
import axios from 'axios';
import Cookies from 'js-cookie';

const NewAvatar = ({logged,enrolled,index,enrolledIdx}) => {
    useEffect(()=>{
     
         if (Cookies.get("user_id")) {
           axios.get("http://localhost:8080/api/users/"+Cookies.get("user_id"))
            .then(res=>{console.log(res.data); setLogged(res.data)})
            .catch(err=>console.log(err))
         }
    },[ ])
  return (
    <div>
        { enrolled && enrolledIdx==index ? <Avatar src={logged && logged.image }/> : ""}
    </div>
  )
}

export default NewAvatar