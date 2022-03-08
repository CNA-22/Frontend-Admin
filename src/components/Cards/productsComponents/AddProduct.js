import React, { useRef } from 'react';
import { TextField, Button, } from "@mui/material";
import axios from 'axios';
import checkJWT from "../../../utils/helpers";

export default function AddProduct(props) {
  const { goBack, showSnackBar } = props
  const nameRef = useRef();
  const descriptionRef = useRef();
  const manufacturerRef = useRef();
  const priceRef = useRef();
  const chipRef = useRef();
  const memoryRef = useRef();
  const ratingRef = useRef();
  const packageDimensionsWidthRef = useRef();
  const packageDimensionsHeightRef = useRef();
  const packageDimensionsDepthRef = useRef();
  const weightRef = useRef();

  const addProduct = async () => {
    const jwt = checkJWT()

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
      .post(
        `https://cna22-products-service.herokuapp.com/product/`,
        body, { headers: { "Authorization": `Bearer ${jwt}` } }
      ).then(
        (res) => {
          showSnackBar('Added ' + res.data.name, "success")
          goBack()
        },
        (err) => showSnackBar("Product was not added! " + err, "error")
      )
  }

  return (
    <>
      <div style={{ height: "250px" }}>
        <label>Name: </label>
        <TextField
          inputRef={nameRef}
          size="small"
          type="text"
        />
        <br />
        <label>Description: </label>
        <TextField
          inputRef={descriptionRef}
          size="small"
          type="text"
        />
        <br />
        <label>Manufacturer: </label>
        <TextField
          inputRef={manufacturerRef}
          size="small"
          type="text"
        />
        <br />
        <label>Price: </label>
        <TextField inputRef={priceRef} size="small" type="number" />
        <br />
        <label>Chip: </label>
        <TextField inputRef={chipRef} size="small" type="text" />
        <br />
        <label>Memory: </label>
        <TextField
          inputRef={memoryRef}
          size="small"
          type="number"
        />
        <br />
        <label>Rating: </label>
        <TextField
          inputRef={ratingRef}
          size="small"
          type="number"
        />
        <br />
        <label>PackageDimensionsWidth: </label>
        <TextField
          inputRef={packageDimensionsWidthRef}
          size="small"
          type="number"
        />
        <br />
        <label>PackageDimensionsHeight: </label>
        <TextField
          inputRef={packageDimensionsHeightRef}
          size="small"
          type="number"
        />
        <br />
        <label>PackageDimensionsDepth: </label>
        <TextField
          inputRef={packageDimensionsDepthRef}
          size="small"
          type="number"
        />
        <br />
        <label>Package weight: </label>
        <TextField
          inputRef={weightRef}
          size="small"
          type="number"
        />
        <br />
        <Button onClick={goBack} color="primary" variant="outlined">
          Go Back
        </Button>
        <Button onClick={addProduct} color="success" variant="outlined">
          Add
        </Button>
      </div>
    </>
  );
}
