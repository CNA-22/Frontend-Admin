import React, { useRef, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from 'axios';
import checkJWT from "../../../utils/helpers";

function DisplayOneProduct(props) {
  const {
    showSnackBar,
    goBack,
    prevImage,
    name,
    pid,
    description,
    manufacturer,
    price,
    chip,
    memory,
    rating,
    picUrl,
    packageDimensionsWidth,
    packageDimensionsHeight,
    packageDimensionsDepth,
    weight,
  } = props;

  const nameRef = useRef(name);
  const descriptionRef = useRef(description);
  const manufacturerRef = useRef(manufacturer);
  const priceRef = useRef(price);
  const chipRef = useRef(chip);
  const memoryRef = useRef(memory);
  const ratingRef = useRef(rating);
  const packageDimensionsWidthRef = useRef(packageDimensionsWidth);
  const packageDimensionsHeightRef = useRef(packageDimensionsHeight);
  const packageDimensionsDepthRef = useRef(packageDimensionsDepth);
  const weightRef = useRef(weight);

  useEffect(async () => {
    nameRef.current.value = name;
    descriptionRef.current.value = description;
    manufacturerRef.current.value = manufacturer;
    priceRef.current.value = price;
    chipRef.current.value = chip;
    memoryRef.current.value = memory;
    ratingRef.current.value = rating;
    packageDimensionsWidthRef.current.value = packageDimensionsWidth;
    packageDimensionsHeightRef.current.value = packageDimensionsHeight;
    packageDimensionsDepthRef.current.value = packageDimensionsDepth;
    weightRef.current.value = weight;
  });

  const deleteProduct = async () => {
    let jwt = checkJWT();

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    await axios
      .delete(
        `https://cna22-products-service.herokuapp.com/product/${pid}`,
        requestOptions
      )
    await axios
      .delete(
        `https://cna22-products-service.herokuapp.com/product/${pid}/image`,
        requestOptions
      ).then(
        (res) => {
          showSnackBar('Product deleted', "success" )
          goBack()
        },
        (err) => {
          showSnackBar('Product deleted', "success" )
          goBack()
        }
      )
  }

  const changeProduct = async () => {
    let jwt = checkJWT();

    const body = {
      "name": nameRef.current.value,
      "description": descriptionRef.current.value,
      "manufacturer": manufacturerRef.current.value,
      "price": Number(priceRef.current.value),
      "chip": chipRef.current.value,
      "memory": Number(memoryRef.current.value),
      "rating": Number(ratingRef.current.value),
      "packageDimensions": {
        "width": Number(packageDimensionsWidthRef.current.value),
        "height": Number(packageDimensionsHeightRef.current.value),
        "depth": Number(packageDimensionsDepthRef.current.value)
      },
      "packageWeight": Number(weightRef.current.value)
    }
    await axios
      .put(
        `https://cna22-products-service.herokuapp.com/product/${pid}`,
        body, { headers: { "Authorization": `Bearer ${jwt}` } }
      ).then(
        (res) => {
          showSnackBar('Product was edited', "success" )
          goBack()
        },
        (err) => showSnackBar(err, "error")
      )

  };

  return (
    <>
      <div style={{ height: "250px" }}>
        {picUrl ? (
          <>
            <img src={prevImage} width="250" height="250" />
            <br />
          </>
        ) : (
          <>
            <p>No image found</p> <br />
          </>
        )}
        <label>Product ID: </label>
        <TextField
          size="small"
          type="text"
          value={pid}
          disabled
        />
        <br />
        <label>Name: </label>
        <TextField
          inputRef={nameRef}
          size="small"
          type="text"
          value={nameRef.current.value}
        />{" "}
        <br />
        <label>Description: </label>
        <TextField
          inputRef={descriptionRef}
          size="small"
          type="text"
          value={descriptionRef.current.value}
        />
        <br />
        <label>Manufacturer: </label>
        <TextField
          inputRef={manufacturerRef}
          size="small"
          type="text"
          value={manufacturerRef.current.value}
        />
        <br />
        <label>Price: </label>
        <TextField inputRef={priceRef} size="small" type="number" value={priceRef.current.value} />
        <br />
        <label>Chip: </label>
        <TextField inputRef={chipRef} size="small" type="text" value={chipRef.current.value} />
        <br />
        <label>Memory: </label>
        <TextField
          inputRef={memoryRef}
          size="small"
          type="number"
          value={memoryRef.current.value}
        />
        <br />
        <label>Rating: </label>
        <TextField
          inputRef={ratingRef}
          size="small"
          type="number"
          value={ratingRef.current.value}
        />
        <br />
        <label>PackageDimensionsWidth: </label>
        <TextField
          inputRef={packageDimensionsWidthRef}
          size="small"
          type="number"
          value={packageDimensionsWidthRef.current.value}
        />
        <br />
        <label>PackageDimensionsHeight: </label>
        <TextField
          inputRef={packageDimensionsHeightRef}
          size="small"
          type="number"
          value={packageDimensionsHeightRef.current.value}
        />
        <br />
        <label>PackageDimensionsDepth: </label>
        <TextField
          inputRef={packageDimensionsDepthRef}
          size="small"
          type="number"
          value={packageDimensionsDepthRef.current.value}
        />
        <br />
        <label>Package weight: </label>
        <TextField
          inputRef={weightRef}
          size="small"
          type="number"
          value={weightRef.current.value}
        />
        <br />
        <Button onClick={goBack} color="primary" variant="outlined">
          Go Back
        </Button>
        <Button onClick={changeProduct} color="success" variant="outlined">
          Save
        </Button>
        <Button onClick={deleteProduct} color="error" variant="outlined">
          Delete
        </Button>
      </div>
    </>
  );
}

export default DisplayOneProduct;
