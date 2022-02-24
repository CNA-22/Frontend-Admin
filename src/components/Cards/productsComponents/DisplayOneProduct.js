import React, { useRef, useEffect } from "react";
import { Card, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import axios from 'axios';
import checkJWT from "../../../utils/helpers";



function DisplayOneProduct(props) {
  const {
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
    weight
  } = props;

  const nameRef = useRef(name);
  const descriptionRef = useRef(description);
  const manufacturerRef = useRef(manufacturer);
  const priceRef = useRef(price);
  const chipRef = useRef(chip);
  const memoryRef = useRef(memory);
  const ratingRef = useRef(rating);
  const picUrlRef = useRef();
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
      )
    console.log(picUrl);
  }

  const changeProduct = async () => {
    let jwt = checkJWT();


    // const headers = { Authorization: `Bearer ${jwt}` }
    const headers = { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjAzN2Y5ZTAwY2RiODc5ZjA0MzRiZDgiLCJlbWFpbCI6ImZyb250ZW5kQWRtaW5AY25hMjIuY29tIiwidXNlckxldmVsIjoiYWRtaW4iLCJpYXQiOjE2NDU3MjY5NjIsImV4cCI6MTY1MDkxMDk2Mn0.Y_0bZcK1WNxZULbEWWevKVrxs4KOeTi7WMkOune_yhk` }
    // const body = {
    //   "name": nameRef.current.value,
    //   "description": descriptionRef.current.value,
    //   "manufacturer": manufacturerRef.current.value,
    //   "price": priceRef.current.value,
    //   "chip": chipRef.current.value,
    //   "memory": memoryRef.current.value,
    //   "rating": ratingRef.current.value,
    //   "imageURLs": [""],
    //   "packageDimensions": {
    //     "width": packageDimensionsWidthRef.current.value,
    //     "height": packageDimensionsHeightRef.current.value,
    //     "depth": packageDimensionsDepthRef.current.value
    //   },
    //   "packageWeight": weightRef.current.value,
    // }

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
    console.log(body)
    await axios
      .put(
        `https://cna22-products-service.herokuapp.com/product/${pid}`,
        body, { headers: {"Authorization" : `Bearer ${jwt}`} }
      ).then(res => console.log(res))

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
        <label>price: </label>
        <TextField inputRef={priceRef} size="small" type="number" value={priceRef.current.value} />
        <br />
        <label>chip: </label>
        <TextField inputRef={chipRef} size="small" type="text" value={chipRef.current.value} />
        <br />
        <label>memory: </label>
        <TextField
          inputRef={memoryRef}
          size="small"
          type="number"
          value={memoryRef.current.value}
        />
        <br />
        <label>rating: </label>
        <TextField
          inputRef={ratingRef}
          size="small"
          type="number"
          value={ratingRef.current.value}
        />
        <br />
        <label>picUrl: </label>
        <TextField
          multiline
          size="small"
          type="text"
          value={picUrl.join(", ")}
        />
        <br />
        <label>packageDimensionsWidth: </label>
        <TextField
          inputRef={packageDimensionsWidthRef}
          size="small"
          type="number"
          value={packageDimensionsWidthRef.current.value}
        />
        <br />
        <label>packageDimensionsHeight: </label>
        <TextField
          inputRef={packageDimensionsHeightRef}
          size="small"
          type="number"
          value={packageDimensionsHeightRef.current.value}
        />
        <br />
        <label>packageDimensionsDepth: </label>
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
