import React, { useRef, useEffect } from 'react';
import { Card, TextField, Button } from '@mui/material';
import checkJWT from '../../../utils/helpers';
import axios from 'axios';

function DisplayOne(props) {
  const { id, adress, email, zip, goBack } = props

  const emailRef = useRef();
  const adressRef = useRef();
  const zipRef = useRef();
  const pwdRef = useRef();

  useEffect(async () => {
    emailRef.current.value = email;
    adressRef.current.value = adress;
    zipRef.current.value = zip;
  });

  const saveUser = async () => {
    console.log(id);
    let jwt = checkJWT();
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      body: {
        email: emailRef.current.value,
        password: pwdRef.current.value,
        adress: adressRef.current.value,
        zip: zipRef.current.value
      }
    };
    // const body = {
    //   email: emailRef.current.value,
    //   password: pwdRef.current.value,
    //   adress: adressRef.current.value,
    //   zip: zipRef.current.value
    // }

    // console.log(jwt);
    const patch = await axios.patch(`https://cna22-user-service.herokuapp.com/users/data/${id}`, requestOptions);
    // console.log(patch);
    // goBack()
  }

  return (

    <>
      <TextField inputRef={emailRef} placeholder="Email" size="small" type="text" value={emailRef.current.value} /> <br />
      <TextField inputRef={adressRef} placeholder="Address" size="small" type="text" value={adressRef.current.value} /><br />
      <TextField inputRef={zipRef} placeholder="Zip" size="small" type="text" value={zipRef.current.value} /><br />
      <TextField inputRef={pwdRef} placeholder="Password" size="small" type="password" /><br />
      <Button onClick={goBack} color="primary" variant="outlined">Go Back</Button>
      <Button onClick={saveUser} color="success" variant="outlined">Save</Button>
    </>

  );
}

export default DisplayOne;