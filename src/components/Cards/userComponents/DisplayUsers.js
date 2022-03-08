import React from 'react';
import { Grid, Card } from '@mui/material';
import Style from "../Cards.module.css";

function DisplayUsers(props) {
  const { email,onClick } = props;
  return (
    <Grid item xs={3} onClick={onClick}>
      <Card className={Style.userCard}>
        {email}
      </Card>
    </Grid >
  );
}

export default DisplayUsers;