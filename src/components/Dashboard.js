import React, { useState } from "react";
import Style from "./Dashboard.module.css";
import { useNavigate } from 'react-router-dom';
import { Grid, Drawer, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Dashboard() {
  const [state, setState] = React.useState({left: false});
  const navigate = useNavigate()

  const signOut = () => {
    navigate("/login");
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    } 
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      className={Style.Drawer}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h6">User Name</Typography>
      <Button color="secondary" variant="contained" className={Style.usersBtn}>Products</Button>
      <Button color="secondary" variant="contained" className={Style.usersBtn}>Users</Button>
      <Button onClick={() => { signOut() }} color="secondary" variant="contained" className={Style.usersBtn}>Signout</Button>
    </Box>
  );

  return (
    <div>
      <Grid className={Style.header} container alignItems="center" justifyContent="center">
        <Grid xs={1}>
          <MenuIcon className={Style.menuIco} onClick={toggleDrawer("left", true)} />
        </Grid>
        <Grid xs={10}>
          <Typography variant="h6" className={Style.center}>Dashboard</Typography>
        </Grid>
        <Grid xs={1}>
          
        </Grid>
      </Grid>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};