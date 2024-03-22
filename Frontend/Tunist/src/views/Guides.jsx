import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { all } from "axios";
import Cookies from "js-cookie";
import style from "../components/modal.module.css";

import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';


const Guides = () => {
    const [allGuides,setAllGuides]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:8080/api/guides")
            .then(res=>{setAllGuides(res.data); console.log(res.data)})
            .catch(err=>console.log(err))
    },[])
  return (<>
    <NavBar></NavBar>
    <div >
        {
            allGuides.map((g,idx)=>{
                return(
                    
                <div className="d-flex justify-content-center mt-4 mb-4" key={idx}>
                    
    <Card 
      variant="outlined"
      sx={{
        width: 1000,
        // to make the card resizable
        // overflow: 'auto',
        // resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar src={g.user && g.user.image} size="lg" />
        <AvatarGroup size="sm" sx={{ '--Avatar-size': '28px' }}>
          <Avatar src="/static/images/avatar/2.jpg" />
          <Avatar src="/static/images/avatar/3.jpg" />
          <Avatar src="/static/images/avatar/4.jpg" />
          <Avatar>+4K</Avatar>
        </AvatarGroup>
      </Box>
      <CardContent>
        <Typography level="title-lg">{g.user && g.user.firstName} {g.user && g.user.lastName}</Typography>
        <Typography level="body-sm"> 
        {g.guide && g.guide.bio}
        </Typography>
        <Typography level="body-sm"> 
         <b>Languages :</b> {g.guide && g.guide.languages.map((lang)=>{return(<> {lang} </>)})}
        </Typography>
        <Typography level="body-sm"> 
        <b>Price per hour :</b>{g.guide && g.guide.price}
        </Typography>
        
        <Typography level="body-sm"> 
        <b>Gouvernorate :</b>{g.guide && g.guide.state}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}  buttonFlex="0 1 120px">
        
        <Button variant="outlined" color="neutral">
          View
        </Button>
        <Button variant="solid" color="primary" >
          Contact
        </Button>
      </CardActions>
    </Card>
    </div>
    )
})
}
    </div>
  </>
  )
}

export default Guides