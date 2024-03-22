import React, { useState } from "react";
import Button from '@mui/joy/Button';

const EnrolledButton = ({setEnrolled,enrolledIdx,setEnrolledIdx,index}) => {
    
    const[status,setStatus]= useState(true)
  return (
    <Button
      onClick={() => {
        setStatus(!status)
        setEnrolled(status)
        setEnrolledIdx(index)
        console.log(enrolledIdx)
      }}
      variant="outlined"
      color="neutral"
    >
      {status ? "Enroll": "Unenroll" }
    </Button>
  );
};

export default EnrolledButton;
