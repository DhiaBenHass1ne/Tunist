import React from 'react'
import Form from '../components/Signup/Form'
import Carousel from '../components/Signup/Carousel'
import './Signup.css'

const SignUp = () => {
  return (
    <div className='row signup'>
        <div className='col-6'><Form/></div>
        <div className='col-6'><Carousel/></div>
    </div>
  )
}

export default SignUp
