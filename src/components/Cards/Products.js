import React, { useEffect, useState } from "react";
import Style from "./Cards.module.css";
import checkJWT from "../../utils/helpers";
import { Grid, Drawer, Typography, Button, Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayProducts from "./productsComponents/DisplayProducts";
import DisplayOneProduct from "./productsComponents/DisplayOneProduct";
import AddProduct from "./productsComponents/AddProduct";

export default function Products() {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [productToDisplay, setProductToDisplay] = useState({});

  const fetchProducts = async () => {
    let jwt = checkJWT();

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    setProducts(
      await axios
        .get(
          `https://cna22-products-service.herokuapp.com/products/?size=200`,
          requestOptions
        )
        .then((res) => res?.data.items)
    );
  }

  useEffect(async () => {
    if(page == 0){
      fetchProducts();
    }
  }, [page]);

  const pages = {
    0: <>
      {products.length > 0
        ? <><div className={Style.surrDiv}>
          <Typography variant="h5">Products</Typography> <br />
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {products.map((e) => {
              return <DisplayProducts
                onClick={() => {
                  setProductToDisplay({
                    "prevImage": e.imageURLs[0],
                    "name": e.name,
                    "description": e.description,
                    "manufacturer": e.manufacturer,
                    "imageURLS": e.imageURLs,
                    "price": e.price,
                    "chip": e.chip,
                    "memory": e.memory,
                    "rating": e.rating,
                    "packageDimensionswidth": e.packageDimensions.width,
                    "packageDimensionsheight": e.packageDimensions.height,
                    "packageDimensionsdepth": e.packageDimensions.depth,
                    "pid": e.pid,
                    "weight": e.packageWeight
                  });
                  setPage(1);
                }}
                pPhoto={e.imageURLs[0]}
                pName={e.name}
                pPrice={e.price}
              />
            })}
          </Grid>
        </div>
          <Button onClick={() => { setPage(2) }} color="primary" variant="outlined" className={Style.addBtn}>Add</Button>
        </>
        : null}
    </>,
    1: <DisplayOneProduct
      goBack={() => {
        setPage(0);
      }}
      prevImage={productToDisplay.prevImage}
      name={productToDisplay.name}
      description={productToDisplay.description}
      manufacturer={productToDisplay.manufacturer}
      picUrl={productToDisplay.imageURLS}
      price={productToDisplay.price}
      chip={productToDisplay.chip}
      memory={productToDisplay.memory}
      rating={productToDisplay.rating}
      packageDimensionsWidth={productToDisplay.packageDimensionswidth}
      packageDimensionsHeight={productToDisplay.packageDimensionsheight}
      packageDimensionsDepth={productToDisplay.packageDimensionsdepth}
      pid={productToDisplay.pid}
      weight={productToDisplay.weight}
    />,
    2: <AddProduct goBack={() => { setPage(0) }} />
  }

  return (
    <Card className={Style.card}>
      {pages[page]}
    </Card>
  );
}
