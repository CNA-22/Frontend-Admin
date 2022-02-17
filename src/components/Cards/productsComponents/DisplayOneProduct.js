import React, { useRef } from 'react';
import { Card, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router';

function DisplayOneProduct(props) {
  const { goBack,name, description, manufacturer, price, chip, memory, rating, picUrl, packageDimensionsWidth, packageDimensionsHeight, packageDimensionsDepth } = props
  console.log(props)

  const nameRef = useRef()
  const descriptionRef = useRef()
  const manufacturerRef = useRef()
  const priceRef = useRef()
  const chipRef = useRef()
  const memoryRef = useRef()
  const ratingRef = useRef()
  const picUrlRef = useRef()
  const packageDimensionsWidthRef = useRef()
  const packageDimensionsHeightRef = useRef()
  const packageDimensionsDepthRef = useRef()
  return (

    <>
      <div style={{ height: '250px' }}>
        {picUrl ? (<><img src={picUrl} width="250" height="250" />
          <br /></>) : (<><p>No image found</p> <br /></>)}
        <label>Name: </label>
        <TextField inputRef={nameRef} size="small" type="text" value={name} /> <br />
        <label>Description: </label>
        <TextField inputRef={descriptionRef} size="small" type="text" value={description} /><br />
        <label>Manufacturer: </label>
        <TextField inputRef={manufacturerRef} size="small" type="text" value={manufacturer} /><br />
        <label>price: </label>
        <TextField inputRef={priceRef} size="small" type="text" value={price} /><br />
        <label>chip: </label>
        <TextField inputRef={chipRef} size="small" type="text" value={chip} /><br />
        <label>memory: </label>
        <TextField inputRef={memoryRef} size="small" type="text" value={memory} /><br />
        <label>rating: </label>
        <TextField inputRef={ratingRef} size="small" type="text" value={rating} /><br />
        <label>picUrl: </label>
        <TextField inputRef={picUrlRef} size="small" type="text" value={picUrl} /><br />
        <label>packageDimensionsWidth: </label>
        <TextField inputRef={packageDimensionsWidthRef} size="small" type="text" value={packageDimensionsWidth} /><br />
        <label>packageDimensionsHeight: </label>
        <TextField inputRef={packageDimensionsHeightRef} size="small" type="text" value={packageDimensionsHeight} /><br />
        <label>packageDimensionsDepth: </label>
        <TextField inputRef={packageDimensionsDepthRef} size="small" type="text" value={packageDimensionsDepth} /><br />
        <Button onClick={goBack} color="error" variant="outlined">Go Back</Button>
        <Button color="success" variant="outlined">Save</Button>
      </div>
    </>

  );
}

export default DisplayOneProduct;