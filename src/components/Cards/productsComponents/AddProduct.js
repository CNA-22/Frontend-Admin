import React, { useRef, useState } from 'react';
import { Card, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from 'axios';
import checkJWT from "../../../utils/helpers";

export default function AddProduct(props) {



  const { goBack } = props

  const [open, setOpen] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState('')

  const nameRef = useRef();
  const descriptionRef = useRef();
  const manufacturerRef = useRef();
  const priceRef = useRef();
  const chipRef = useRef();
  const memoryRef = useRef();
  const ratingRef = useRef();
  const picUrlRef = useRef()
  const packageDimensionsWidthRef = useRef();
  const packageDimensionsHeightRef = useRef();
  const packageDimensionsDepthRef = useRef();
  const weightRef = useRef();


  const showSnackBar = (msg) => {
    setSnackBarMsg(msg)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
        (res) => goBack(),
        (err) => showSnackBar("Product was not added! " + err)
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

        />{" "}
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
        <label>price: </label>
        <TextField inputRef={priceRef} size="small" type="number" />
        <br />
        <label>chip: </label>
        <TextField inputRef={chipRef} size="small" type="text" />
        <br />
        <label>memory: </label>
        <TextField
          inputRef={memoryRef}
          size="small"
          type="number"

        />
        <br />
        <label>rating: </label>
        <TextField
          inputRef={ratingRef}
          size="small"
          type="number"

        />
        <br />
        <label>packageDimensionsWidth: </label>
        <TextField
          inputRef={packageDimensionsWidthRef}
          size="small"
          type="number"

        />
        <br />
        <label>packageDimensionsHeight: </label>
        <TextField
          inputRef={packageDimensionsHeightRef}
          size="small"
          type="number"

        />
        <br />
        <label>packageDimensionsDepth: </label>
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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        severety="error"
      >
        <Alert severity="error">{snackBarMsg}</Alert>
      </Snackbar>
    </>
  );
}
