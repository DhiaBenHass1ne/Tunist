import React, { useState } from 'react'
import Log from '../components/Log'
import Reg from '../components/Reg'
const LogReg = () => {
    const [refresh, setRefresh] = useState(true)

    const updateList = ()=>{
        setRefresh(!refresh);
    }

    

  return (
    <>
    <Log/>
    <Reg refreshPage={updateList}/>
    </>
  )
}

export default LogReg
