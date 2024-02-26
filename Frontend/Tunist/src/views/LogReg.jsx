import React, { useState } from 'react'
import Log from '../components/Log'
import Reg from '../components/Reg'
import Logout from '../components/Logout'
import { Route, Routes } from 'react-router-dom'
import UserType from './UserType'
const LogReg = ({refreshPage}) => {


    

  return (
    <>
    <Log refreshPage={refreshPage}g/>
    <Reg refreshPage={refreshPage}/>
    <Logout refreshPage={refreshPage}/>
    </>
  )
}

export default LogReg
