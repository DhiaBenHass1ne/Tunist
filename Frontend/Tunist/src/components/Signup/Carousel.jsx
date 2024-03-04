import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {Link} from 'react-router-dom';

const Carousel = () => {
    const logoStyle = {
        position:'absolute',
        zIndex:"999",
        marginLeft:"10px"
    }
    const spanStyle = {
        padding: '20px',
        color: '#FFFFFFFF'

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
        height: '100vh',
        backgroundPosition:'center'
      }
      const slideImages = [
        {
          url: '/images/image1.jpg',
          caption: 'Coast Side - Mehdeia'
        },
        {
          url: '/images/image2.jpg',
          caption: 'Slide 2'
        },
        {
          url: '/images/image5.jpg',
          caption: 'Slide 3'
        },
      ];
  return (
        <div className="slide-container">
            <Link to={"/home"}><img src='/tunisit-logo.png' alt='logo' style={{...logoStyle}} height={60}/></Link>
            
        <Slide {...properties}>
            
         {slideImages.map((slideImage, index)=> (
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

export default Carousel
