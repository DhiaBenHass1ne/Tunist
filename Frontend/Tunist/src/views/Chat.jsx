import React, { useEffect, useState } from 'react'
import { ChatEngine } from 'react-chat-engine';
import UserService from '../services/UserService'
import Cookies from 'js-cookie'
import './Chat.css'



const Chat = () => {
const id = Cookies.get('user_id');
const [user,setUser] = useState(null)
useEffect(()=>{
  console.log("********************************",id)
  UserService.getOneUser(id)
      .then(response=>{console.log("SUCCES",response);setUser(response.data.user)})
      .catch(error=>console.log("ERROR ❌",error))
// eslint-disable-next-line react-hooks/exhaustive-deps
},[id]);
  return (
    <div>
    {user?
    <ChatEngine
    height="100vh"
    projectID='eaec0c42-f575-4254-9342-2a742d1a19e2'
    userName= {user.email}
    userSecret='Dddd1234'
		/>:<h1>Loading Chat</h1>
    }
    </div>
  )
}

export default Chat
