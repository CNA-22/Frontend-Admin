import React, { useRef, useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

export default function AddUser(props) {
  const { goBack } = props;
  const [open, setOpen] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const showSnackBar = (msg) => {
    setSnackBarMsg(msg)
    setOpen(true)
  }

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
        () => goBack(),
        (err) => showSnackBar(err)
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        severety="error"
      >
        <Alert severity="error">{snackBarMsg}</Alert>
      </Snackbar>
    </>
  );
}
