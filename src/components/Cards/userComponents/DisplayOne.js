import React, { useRef, useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import checkJWT from '../../../utils/helpers';
import axios from 'axios';

function DisplayOne(props) {
  const { id, adress, email, zip, goBack, signOut } = props
  const [open, setOpen] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const showSnackBar = (msg) => {
    setSnackBarMsg(msg)
    setOpen(true)
  }

  const emailRef = useRef(email);
  const adressRef = useRef(adress);
  const zipRef = useRef(zip);
  const pwdRef = useRef();

  useEffect(() => {
    emailRef.current.value = email;
    adressRef.current.value = adress;
    zipRef.current.value = zip;
  }, []);

  const saveUser = async () => {
    const jwt = checkJWT();
    if (!jwt) {
      signOut()
    }
    const body = {
      "email": emailRef.current.value,
      "password": pwdRef.current.value,
      "adress": adressRef.current.value,
      "zip": zipRef.current.value
    }
    if (emailRef.current.value == "" || pwdRef.current.value == "" || adressRef.current.value == "" || zipRef.current.value == "") {
      showSnackBar("Please fill out all the fields! ");
    } else {
      await axios.patch(`https://cna22-user-service.herokuapp.com/users/data/${id}`,
        body, { headers: { "Authorization": `Bearer ${jwt}` } }).then(
          (res) => {
            if (res.data.message == "User successfully updated") {
              goBack()
            } else {
              showSnackBar(res.data.message)
            }
          }
        )
    }
  }

  const deleteProduct = async () => {
    const jwt = checkJWT();
    if (!jwt) {
      signOut()
    }
    await axios
      .delete(
        `https://cna22-user-service.herokuapp.com/users/data/${id}`,
        { headers: { "Authorization": `Bearer ${jwt}` } }
      ).then(
        (res) => {
          if (res.data.message == "User deleted successfully") {
            goBack()
          } else {
            showSnackBar(res.data.message)
          }
        }
      )
  }

  return (
    <>
      <TextField inputRef={emailRef} placeholder="Email" size="small" type="text" value={emailRef.current.value} /> <br />
      <TextField inputRef={adressRef} placeholder="Address" size="small" type="text" value={adressRef.current.value} /><br />
      <TextField inputRef={zipRef} placeholder="Zip" size="small" type="text" value={zipRef.current.value} /><br />
      <TextField inputRef={pwdRef} placeholder="Password" size="small" type="password" /><br />
      <Button onClick={goBack} color="primary" variant="outlined">Go Back</Button>
      <Button onClick={deleteProduct} color="error" variant="outlined">Delete</Button>
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

export default DisplayOne;