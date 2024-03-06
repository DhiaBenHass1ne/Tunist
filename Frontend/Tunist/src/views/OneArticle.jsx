import React from 'react'
import NavBar from '../components/NavBar'
import Article from '../components/Article'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const OneArticle = () => {
    const[article,setArticle] = useState(null)
    const {id} = useParams();
    useEffect(()=>{
        axios.get("http://localhost:8080/api/articles/"+id)
            .then(res=>{console.log(res.data);setArticle(res.data)})
            .catch(err=>console.log(err))
    },[id])
  return (
    <div>
      <NavBar/>
      <hr />
      {article?
      <Article article={article}/>:<></>
    }
    </div>
  )
}

export default OneArticle

