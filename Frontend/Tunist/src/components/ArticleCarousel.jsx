import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {Link} from 'react-router-dom';

const ArticleCarousel = ({media, publisher}) => {

    const logoStyle = {
        position:'absolute',
        zIndex:"998",
        marginLeft:"10px",
        bottom:'10px',
        left:'10px',
        height:'80px',
        width:'80px',
        backgroundImage: `url(${publisher.image})`,
        backgroundSize: 'cover',
        borderRadius:"50%",
    }

    const nameStyle ={
        textDecoration:'none',
        color:'white',
        position:'absolute',
        zIndex:"999",
        bottom:'35px',
        left:"110px",
    }
    
    const spanStyle = {
        padding: '20px',
        color: '#FFFFFFFF'

      }

    const containerStyle = {
        position: "relative",
        height: '50vh',
        width: '150vh',
        margin:'auto'
      }

      const buttonStyle = {
        color: '#FFFFFFFF',
        width: "30px",
        background: 'none',
        border: '0px'
    };

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><i className="bi bi-caret-left-fill"></i></button>,
        nextArrow: <button style={{ ...buttonStyle }}><i className="bi bi-caret-right-fill"></i></button>
    }
      const divStyle = {
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '50vh',
        backgroundPosition:'center',
        borderRadius:'15px'
        
      }
      const slideImages = media
  return (
        <div className="slide-container" style={containerStyle}>

            
            <Link to={`/profile/${publisher.id}`}><div style={{...logoStyle}}></div>
            <div style={{...nameStyle}}>{publisher.firstName} {publisher.lastName}</div>
            </Link>
        <Slide {...properties}>
         {media.map((slideImage, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                <span style={spanStyle}>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
  )
}

export default ArticleCarousel
