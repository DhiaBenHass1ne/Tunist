import React from 'react'
import styles from "./attractions.module.css"

const LandingPageAttractions = () => {
  return (
    <div style={{backgroundColor:'white',margin:"5rem"}}>
        <h1 className=' text-center fw-bold m-5'>Welcome to the Real World!</h1>

<ul className={styles.cards}>
      <li>
        <a href="" className={styles.card}>
          <img src="https://c1.wallpaperflare.com/preview/835/994/337/tunisia-komachi-seaside-sea.jpg" className={styles.card__image} alt="" />
          <div className={styles.card__overlay}>
            <div className={styles.card__header}>
              <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg"><path /></svg>
              <img className={styles.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt="" />
              <div className={styles.card__headerText}>
                <h3 className={styles.card__title}>Dhiaeddine Amri</h3>
                <span className={styles.card__status}>1 hour ago</span>
              </div>
            </div>
            <p className={styles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
          </div>
        </a>

      </li> 
      
      <li>
        <a href="" className={styles.card}>
          <img src="https://wallpapercave.com/wp/wp2030724.jpg" className={styles.card__image} alt="" />
          <div className={styles.card__overlay}>
            <div className={styles.card__header}>
              <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg"><path /></svg>
              <img className={styles.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt="" />
              <div className={styles.card__headerText}>
                <h3 className={styles.card__title}>Dhiaeddine Amri</h3>
                <span className={styles.card__status}>1 hour ago</span>
              </div>
            </div>
            <p className={styles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
          </div>
        </a>
      </li>
      <li>
        <a href="" className={styles.card}>
          <img src="https://c1.wallpaperflare.com/preview/835/994/337/tunisia-komachi-seaside-sea.jpg" className={styles.card__image} alt="" />
          <div className={styles.card__overlay}>
            <div className={styles.card__header}>
              <svg className={styles.card__arc} xmlns="http://www.w3.org/2000/svg"><path /></svg>
              <img className={styles.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt="" />
              <div className={styles.card__headerText}>
                <h3 className={styles.card__title}>Dhiaeddine Amri</h3>
                <span className={styles.card__status}>1 hour ago</span>
              </div>
            </div>
            <p className={styles.card__description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
          </div>
        </a>
      </li>
      {/* ... (Repeat the structure for other list items) ... */}
    </ul>
    </div>
  )
}

export default LandingPageAttractions