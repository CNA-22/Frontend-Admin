import React, { useRef, useState } from "react";
import Style from "./Login.module.css";
import { Grid, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const showSnackBar = (msg) => {
    setSnackBarMsg(msg)
    setOpen(true)
  }

  const signIn = async () => {

    const body = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };

    const req = await fetch('https://cna22-user-service.herokuapp.com/users/login', requestOptions)
      .then(res => res.json())
      .then(data => data)
    if (req.message == 'Login success!') {
      var data = req.accessToken.split('.')[1];
      var jsonPayload = decodeURIComponent(atob(data).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const tokenUserLevel = JSON.parse(jsonPayload).userLevel
      const exp = JSON.parse(jsonPayload).exp
      if (tokenUserLevel === "admin") {
        document.cookie = `user-session=${req.accessToken};max-age=${exp}`;
        navigate("/");
      } else {
        showSnackBar("Not an admin")
      }
    } else {
      showSnackBar(req.message)
    }
  }

  return (
    <div className={Style.background}>
      <div className={Style.topDiv} />
      <div className={Style.midDiv}>
        <Typography variant="h2">Sign in</Typography>
        <Grid className={Style.gridBorder} container alignItems="center" justifyContent="center">
          <Grid xs={6}>
            <Typography variant="h6" className={Style.loginTxt}>Username: </Typography>
          </Grid>
          <Grid xs={6}>
            <TextField inputRef={emailRef} size="small" className={Style.loginInput} />
          </Grid>
        </Grid>
        <Grid className={Style.gridBorder} container alignItems="center" justifyContent="center">
          <Grid xs={6}>
            <Typography variant="h6" className={Style.loginTxt}>Password: </Typography>
          </Grid>
          <Grid xs={6}>
            <TextField inputRef={passwordRef} size="small" type="password" className={Style.loginInput} />
          </Grid>
        </Grid>
        <Grid className={Style.grid} container alignItems="center" justifyContent="center">
          <Grid xs={6}>
          </Grid>
          <Grid xs={6}>
            <Button onClick={() => { signIn() }} variant="contained" className={Style.loginInput}>Signin</Button>
          </Grid>
        </Grid>
      </div>
      <div className={Style.bottomDiv} />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        severety="error"
      >
        <Alert severity="error">{snackBarMsg}</Alert>
      </Snackbar>
    </div>
  );
};
