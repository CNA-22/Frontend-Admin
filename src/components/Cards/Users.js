import React, { useEffect, useState } from "react";
import Style from "./Cards.module.css";
import { Grid, Typography, Button, Card, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import checkJWT from '../../utils/helpers';
import DisplayUsers from "./userComponents/DisplayUsers";
import DisplayOne from "./userComponents/DisplayOne";
import AddUser from "./userComponents/AddUser";

export default function Users(props) {
  const { signOut } = props
  const [userData, setUserData] = useState([]);
  const [displayPage, setDisplayPage] = useState(1);
  const [userToDispaly, setUsertToDisplay] = useState({});
  const [open, setOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('');
  const [severity, setSeverity] = useState('');

  const handleClose = () => {
    setOpen(false)
  }

  const showSnackBar = (msg, severity) => {
    setSnackBarMsg(msg)
    setSeverity(severity)
    setOpen(true)
  }

  useEffect(async () => {
    if (displayPage == 1) {
      const jwt = checkJWT();
      if (!jwt) {
        signOut()
      }
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };
      await axios.get(`https://cna22-user-service.herokuapp.com/users/data`, requestOptions).then(
        (res) => {
          if (res.data[0]?._id) {
            setUserData(res.data)
          } else {
            showSnackBar(res.data.message)
          }
        },
      );
    }
  }, [displayPage]);

  const jsFiles = {
    0: <DisplayOne showSnackBar={(msg, severity) => { showSnackBar(msg, severity) }} signOut={() => { signOut() }} goBack={() => { setDisplayPage(1) }} id={userToDispaly.id} email={userToDispaly.email} zip={userToDispaly.zip} adress={userToDispaly.adress} />,
    1: <>
      <div className={Style.surrDiv}>
        <Typography variant="h5">Users</Typography> <br />
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
          {userData.length > 0 ? userData.map((e) => {
            return <DisplayUsers onClick={() => { setUsertToDisplay({ "id": e._id, "email": e.email, "adress": e.adress, "zip": e.zip }); setDisplayPage(0); }} email={e.email} />
          }) : null}
        </Grid>
      </div>
      <Button onClick={() => { setDisplayPage(2) }} color="primary" variant="outlined" className={Style.addBtn}>Add</Button>
    </>,
    2: <AddUser showSnackBar={(msg, severity) => { showSnackBar(msg, severity) }} goBack={() => { setDisplayPage(1) }} />
  };

  return (
    <Card className={Style.card}>
      {jsFiles[displayPage]}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={severity}>{snackBarMsg}</Alert>
      </Snackbar>
    </Card>
  );
};