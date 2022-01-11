import React from "react";
import Style from "./Login.module.css";
import { Grid, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()

  const signIn = () => {
    navigate("/");
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
            <TextField size="small" className={Style.loginInput} />
          </Grid>
        </Grid>
        <Grid className={Style.gridBorder} container alignItems="center" justifyContent="center">
          <Grid xs={6}>
            <Typography variant="h6" className={Style.loginTxt}>Password: </Typography>
          </Grid>
          <Grid xs={6}>
            <TextField size="small" type="password" className={Style.loginInput} />
          </Grid>
        </Grid>
        <Grid className={Style.grid} container alignItems="center" justifyContent="center">
          <Grid xs={6}>
          </Grid>
          <Grid xs={6}>
            <Button  onClick={() => { signIn() }} variant="contained" className={Style.loginInput}>Signin</Button>
          </Grid>
        </Grid>
      </div>
      <div className={Style.bottomDiv} />
    </div>
  );
};
