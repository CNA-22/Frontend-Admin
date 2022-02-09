import React, { useEffect, useState } from "react";
import Style from "./Cards.module.css";
import checkJWT from '../../utils/helpers';
import { Grid, Drawer, Typography, Button, Box, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Products() {

  const navigate = useNavigate()
  const [procuts, setProducts] = useState([])

  useEffect(async () => {

    let jwt = checkJWT();

    // const requestOptions = {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers : {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjAzN2Y5ZTAwY2RiODc5ZjA0MzRiZDgiLCJlbWFpbCI6ImZyb250ZW5kQWRtaW5AY25hMjIuY29tIiwidXNlckxldmVsIjoiYWRtaW4iLCJpYXQiOjE2NDQ0MzE2NTYsImV4cCI6MTY0OTYxNTY1Nn0.xQfEvPNKZTgcOYhp33gShWxpRFNWvl81DIerGK0CnEQ`}
    // }
    // console.log(requestOptions);
    // const req = await fetch('https://cna22-products-service.herokuapp.com/products', requestOptions)
    //   .then(res => res.json())
    //   .then(data => data)
    //   console.log(req)

    // const requestOptions = {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`
    //   }
    // };
    // const req = await axios.get(`https://cna22-products-service.herokuapp.com/products`, requestOptions).then((res) => res?.data);

  }, [])

  return (
    <Card className={Style.card}>
      <h1>Hello world</h1>
      <h2>Products displayed here</h2>
    </Card>
  );
};
