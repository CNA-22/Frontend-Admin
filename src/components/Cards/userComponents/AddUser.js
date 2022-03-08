import React, { useRef } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

export default function AddUser(props) {
  const { goBack, showSnackBar } = props;

  const emailRef = useRef();
  const adressRef = useRef();
  const zipRef = useRef();
  const pwdRef = useRef();

  const saveUser = async () => {
    const body = {
      "email": emailRef.current.value,
      "password": pwdRef.current.value,
      "adress": adressRef.current.value,
      "zip": zipRef.current.value
    }
    if (emailRef.current.value == "" || pwdRef.current.value == "" || adressRef.current.value == "" || zipRef.current.value == "") {
      showSnackBar("Please fill out all the fields! ");
    } else {
      await axios.post(`https://cna22-user-service.herokuapp.com/users/register/`, body).then(
        () => {
          showSnackBar('User created!')
          goBack()
        }
      );
    }
  }

  return (
    <>
      <TextField inputRef={emailRef} placeholder="Email" size="small" type="text" /> <br />
      <TextField inputRef={adressRef} placeholder="Address" size="small" type="text" /><br />
      <TextField inputRef={zipRef} placeholder="Zip" size="small" type="text" /><br />
      <TextField inputRef={pwdRef} placeholder="Password" size="small" type="password" /><br />
      <Button onClick={goBack} color="error" variant="outlined">Go Back</Button>
      <Button onClick={saveUser} color="success" variant="outlined">Save</Button>
    </>
  );
}
