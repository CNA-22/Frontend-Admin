import React, { useState, useEffect } from "react";
import Style from "./Dashboard.module.css";
import { useNavigate } from 'react-router-dom';
import { Grid, Drawer, Typography, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Users from './Cards/Users';
import Products from './Cards/Products';
import checkJWT from '../utils/helpers'

export default function Dashboard() {
  const [state, setState] = useState({ left: false });
  const [window, setWindow] = useState(1);
  const navigate = useNavigate();

  useEffect(async () => {
    const jwt = checkJWT();
    if (!jwt) {
      signOut();
    }
  }, [])

  const signOut = () => {
    document.cookie = 'user-session' +'=; Path=/;';
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
      <Button onClick={() => { changeDisplay(1) }} color="secondary" variant="contained" className={Style.usersBtn}>Products</Button>
      <Button onClick={() => { changeDisplay(2) }} color="secondary" variant="contained" className={Style.usersBtn}>Users</Button>
      <Button onClick={() => { signOut() }} color="secondary" variant="contained" className={Style.usersBtn}>Signout</Button>
    </Box>
  );

  const changeDisplay = (input) => {
    setWindow(input);
  }

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
      {window === 1 ? (
        <Products />
      ) : window === 2 ? (
        <Users signOut={() => { signOut() }}/>
      ) : null}
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