import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import LandingPageAttractions from '../components/LandingPageAttractions';
import Arrow from '../components/Arrow';

const LandingPage = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const styles = {
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 1,
    },
    content: {
      position: 'absolute',
      top: '35%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      width: '100%',
      color: '#fff',
    },
    scrollButton: {
        transition: 'opacity 0.5s ease-in-out', // Add transition property
        opacity: showScrollButton ? 1 : 0, // Use opacity instead of display for transition
      boxShadow: '2px 2px 2px black',
      position: 'fixed',
      right: '3em',
      bottom: '3em',
      width: '70px',
      height: '70px',
      backgroundColor: '#930412',
      borderRadius: '50%',
      cursor: 'pointer',
      display: showScrollButton ? 'block' : 'none',
    },
    
  };

  useEffect(() => {
    // Add a scroll event listener to check the scroll position
    const handleScroll = () => {
      const scrollThreshold = 200; // Adjust the threshold as needed
      setShowScrollButton(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to run the effect only once

  const handleScrollToTop = () => {
    // Scroll to the top with smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollDown = () => {
    window.scrollBy({ top: 720, behavior: 'smooth' });
  };

  return (
    <>
      <div style={styles.videoContainer}>
        <video autoPlay loop muted style={styles.video}>
          <source src="tunisiaa.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.content}>
          <NavBar />
          <div
            style={{ marginTop: '20vh', cursor: 'default' }}
            className="d-flex flex-column flex-start "
          >
            <h1
              style={{
                fontFamily: 'fantasy',
                fontSize: '3.5rem',
                textShadow: '3px 3px 15px black',
                opacity: '50%',
              }}
            >
              Where cultures coexist
            </h1>
            <h1
              style={{
                fontFamily: 'fantasy',
                fontSize: '5rem',
                textShadow: '10px 10px 5px black',
                opacity: '50%',
              }}
            >
              And Memories Persist
            </h1>
           
          </div> 
        </div>
        
      </div>
      <div onClick={handleScrollDown} style={{position:"absolute",bottom:"10%",left:"95%" }}>
        
            <Arrow ></Arrow>
</div>

<h1 className='text-center mt-5 ' style={{color:"#930412",textShadow:"0px 1px 1px black"}}>Our Most Visited Attractions</h1>
      <LandingPageAttractions status={false} />
      
      <div
        style={styles.scrollButton}
        className="d-flex justify-content-center align-items-center"
        onClick={handleScrollToTop}
      >
        <i className="bi bi-box-arrow-up" style={{ fontSize: '2rem' }}></i>
      </div>
    </>
  );
};

export default LandingPage;