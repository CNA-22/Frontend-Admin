import React, { useRef } from 'react';
import { Card, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router';

function DisplayOne(props) {
  const { adress, email, zip,goBack } = props

  const emailRef = useRef()
  const adressRef = useRef()
  const zipRef = useRef()
  return (

    <>
      <TextField inputRef={emailRef} size="small" type="text" value={email} /> <br />
      <TextField inputRef={adressRef} size="small" type="text" value={adress} /><br />
      <TextField inputRef={zipRef} size="small" type="text" value={zip} /><br />
      <Button onClick={goBack} color="error" variant="outlined">Go Back</Button>
      <Button color="success" variant="outlined">Save</Button>
    </>

  );
}

export default DisplayOne;