import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Tours = ({ refreshPage }) => {
    const [logged,setLogged] = useState({})
    const [publicTour, setPublicTour] = useState({
        publicGuide: {id:12},
        publicTourist: {id:7},
        publicAttractions : [{id:2},{id:1}],
        date : ""
    })
    const [privateTour, setPrivateTour] = useState({
      privateGuide: {id:8},
      privateTourist: {id:7},
      privateAttractions : [{id:2},{id:1}],
      date : ""
  })
    const handleSubmitPublic = (e)=>{
      e.preventDefault()
      console.log("public tour===>", publicTour)
      axios.post( "http://localhost:8080/api/publicTours",publicTour)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
    }
    const handleSubmitPrivate = (e)=>{
      e.preventDefault()
      console.log("private tour===>", privateTour)
      axios.post( "http://localhost:8080/api/privateTours",privateTour)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
    }
    return ( 
    <div>
      <form onSubmit={handleSubmitPublic}>
        <label>Select Date time for public tour with guide id {publicTour.publicGuide.id} and tourist id {publicTour.publicTourist.id}</label>
      <input type='datetime-local' onChange={(e)=>{setPublicTour( {...publicTour,date:e.target.value}); console.log(publicTour)} }/>
      <button>Submit public tour</button>
        
      </form>

      <form onSubmit={handleSubmitPrivate}>
      <label>Select Date time for private tour with guide id {privateTour.privateGuide.id} and tourist id {privateTour.privateTourist.id}</label>
      <input type='datetime-local' onChange={(e)=>{setPrivateTour( {...privateTour,date:e.target.value}); console.log(privateTour)} }/>
      <button>Submit private tour</button>
      </form>
    </div>
  )
}

export default Tours