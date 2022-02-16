import React, { useEffect, useState } from "react";
import Style from "./Cards.module.css";
import checkJWT from '../../utils/helpers';
import { Grid, Drawer, Typography, Button, Box, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DisplayProducts from "./userComponents/DisplayProducts";
import DisplayOneProduct from "./userComponents/DisplayOneProduct";

export default function Products() {

  const [displayOne, setDisplayOne] = useState(false);
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [productToDisplay, setProductToDisplay] = useState({});

  useEffect(async () => {

    let jwt = checkJWT();

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };
    setProducts(await axios.get(`https://cna22-products-service.herokuapp.com/products`, requestOptions).then((res) => res?.data.items));
    console.log(products);
  }, [])

  useEffect(async () => {
    console.log(products);
  }, [products])
  return (
    <Card className={Style.card}>
      {displayOne ? <DisplayOneProduct /> :
        <>
          <Typography variant="h5">Products</Typography> <br />
          <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
            {products.length > 0 ? products.map((e) => {
              return <DisplayProducts onClick={() => { setDisplayOne(true); }} pName={e.name} pPrice={e.price} pPhoto={e.imageURLs[0]} />
            }) : null}
          </Grid>
        </>
      }
    </Card>
  );
};
