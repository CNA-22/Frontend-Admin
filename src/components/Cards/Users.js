import React, { useEffect, useState } from "react";
import Style from "./Cards.module.css";
import { Grid, Drawer, Typography, Button, Box, Card } from '@mui/material';
import axios from 'axios';
import checkJWT from '../../utils/helpers';
import DisplayUsers from "./userComponents/DisplayUsers";
import DisplayOne from "./userComponents/DisplayOne";

export default function Users() {
  const [userData, setUserData] = useState([]);
  const [displayOne, setDisplayOne] = useState(false);
  const [userToDispaly, setUsertToDisplay] = useState({});

  useEffect(async () => {
    let jwt = checkJWT();
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };
    const req = await axios.get(`https://cna22-user-service.herokuapp.com/users/data`, requestOptions).then((res) => res?.data);
    setUserData(req)
  }, []);

  return (
    <Card className={Style.card}>
      { displayOne ? <DisplayOne email={userToDispaly.email} zip={userToDispaly.zip} adress={userToDispaly.adress} ></DisplayOne>: 
      <>
      <Typography variant="h5">Users</Typography> <br />
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
        {userData.length > 0 ? userData.map((e) => {
          return <DisplayUsers  onClick={()=>{setUsertToDisplay({"email" : e.email, "adress" : e.adress, "zip" : e.zip}); setDisplayOne(true);console.log(userToDispaly) }} email={e.email} />
        }) : null}
      </Grid>
      </>
    }
    </Card>
  );
};