import React, { useState } from 'react'
import Reg from '../Reg'
import Log from '../Log'

const Form = (props) => {
  const [component,setComponent]=useState('Login');

  return (
    <div >
    { component === "Register"?
    <div >
      <Reg component={component} setComponent={setComponent}/>
    </div>:
    <div><Log component={component} setComponent={setComponent}/></div>}
    </div>

  )
}

export default Form
