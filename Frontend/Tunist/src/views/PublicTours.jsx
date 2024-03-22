import axios from 'axios'
import NavBar from "../components/NavBar";
import React, { useEffect, useState } from 'react'
import styles from "../components/attractions.module.css"

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
import Cookies from 'js-cookie';
import EnrolledButton from '../components/EnrolledButton';
import NewAvatar from '../components/NewAvatar';


const PublicTours = () => {
  const [publicTours,setPublicTours]=useState([])
  const [publicTour, setPublicTour] = useState({
    publicGuide: {id:12},
    publicTourists: [{id:7},{id:3}],
    publicAttractions : [{id:2}],  
    date : ""
})
  const [enrollerdTour,setEnrolledTour]=useState(null)
  const [enrolledTours,setEnrolledTours]=useState([])
  useEffect(()=>{
    setEnrolledTours([...enrolledTours,enrollerdTour])
  },[enrollerdTour,])
  const [logged,setLogged]= useState({})
  


    // const handleSubmitPublic = (e)=>{
      //   e.preventDefault()
      //   console.log("public tour===>", publicTour)
      //   axios.post( "http://localhost:8080/api/publicTours",publicTour)
      //         .then(res=>{setPublicTours(res.data) ;console.log(res.data)})
      //         .catch(err=>console.log(err))
      // }
    useEffect(()=>{
        axios.get("http://localhost:8080/api/publicTours")
            .then(res=>{console.log(res.data); setPublicTours(res.data)})
            .catch(err=>console.log(err))
         if (Cookies.get("user_id")) {
           axios.get("http://localhost:8080/api/users/"+Cookies.get("user_id"))
            .then(res=>{console.log(res.data); setLogged(res.data)})
            .catch(err=>console.log(err))
         }
    },[ ])
    const[enrolled,setEnrolled]=useState(false);
    const [enrolledIdx,setEnrolledIdx]=useState(null);
    const handleEnroll =(idx)=>{
    var newList = enrolledTours
    newList=[...newList, idx]
    console.log("before ===>",enrolledTours)
    setEnrolledTours(newList)
    console.log("after ===>",enrolledTours)
    }
  return (<>
    <NavBar></NavBar>
    <h1 className=' text-center fw-bold m-5'>Welcome to the House Page!</h1>
    
    <ul className={styles.cards}>
        {   publicTours &&
            publicTours.map((p,index)=>{
                return (
                  <div className="d-flex justify-content-center mt-4 mb-4" key={index}>
                    
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
        <Avatar src={p.guide && p.guide.user && p.guide.user.image} size="lg" />
        <AvatarGroup size="sm" sx={{ '--Avatar-size': '28px' }}>
          {
            p.tourists &&  p.tourists.map((t,idx)=>{
              return(<>
              <Avatar key={idx} src={t.user && t.user.image} />
              </>
              )})}
              <NewAvatar enrolled={enrolled} logged={logged} index={index} enrolledIdx={enrolledIdx} />
            
        </AvatarGroup>
      </Box>
      <CardContent>
        <Typography level="title-lg">{p.guide && p.guide.user && p.guide.user.firstName} {p.guide && p.guide.user && p.guide.user.lastName}</Typography>
        <Typography level="body-sm"> 
        {p.guide && p.guide.bio}
        </Typography>
        <Typography level="body-sm"> 
         <b>Languages :</b> {p.guide && p.guide.languages.map((lang)=>{return(<> {lang} </>)})}
        </Typography>
        <Typography level="body-sm"> 
        <b>Price per hour :</b>{p.guide && p.guide.price}
        </Typography>
        
        <Typography level="body-sm"> 
        <b>Gouvernorate :</b>{p.guide && p.guide.state}
        </Typography>
        <Typography level="body-sm"> 
        <b>Attractions :</b>{p.attractions && p.attractions.map((a)=>{return(<> {a.title} </>)})}
        </Typography>
        <Typography level="body-sm"> 
        <b>Date :</b>{p.attractions && p.date}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}  buttonFlex="0 1 120px">
        <EnrolledButton setEnrolled={setEnrolled} enrolledIdx={enrolledIdx} setEnrolledIdx={setEnrolledIdx} index={index} />
        
        <Button variant="solid" color="primary" >
          Contact
        </Button>
      </CardActions>
    </Card>
    </div>
                )
        })
            }

           
           
          </ul>
  </>
    )
}

export default PublicTours