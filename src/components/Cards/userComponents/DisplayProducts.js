import React from 'react';
import { Grid, Drawer, Typography, Button, Box, Card } from '@mui/material';
import Style from "../Cards.module.css";

export default function DisplayUsers(props) {
  return (
    <Grid item xs={3}>
      <Card className={Style.userCard}>
        <img alt="Qries" src={props.pPhoto} height="40vh" /><br />
        <Typography variant='p'>{props.pName}</Typography><br />
        <Typography variant='p'>{props.pPrice}€</Typography>
      </Card>
    </Grid >
  );
}