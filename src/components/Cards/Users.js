import React from "react";
import Style from "./Cards.module.css";
import { useNavigate } from 'react-router-dom';
import { Grid, Drawer, Typography, Button, Box, Card } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Users() {


  return (
    <Card className={Style.card}>
    <h1>Hello world</h1>
    <h2>Users displayed here</h2>
    </Card>
  );
};