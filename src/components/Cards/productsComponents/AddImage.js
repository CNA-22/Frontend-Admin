import React, { useRef, useState } from 'react';
import { Card, TextField, Button, Input } from '@mui/material';
import axios from 'axios';
import checkJWT from "../../../utils/helpers";

export default function AddImage({ goBack }) {


    let jwt = checkJWT();
    const productId = useRef('')
    const [image, setImage] = useState()


    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    };

    const saveImage = async () => {
        let formdata = new FormData()
        formdata.append("image", image)
        // console.log(image.buffer)
        const body = {
            "image": image
        }
        // console.log(body)
        const post = await axios.post(`https://cna22-products-service.herokuapp.com/product/${productId.current.value}/image`, formdata, { headers: { "Authorization": `Bearer ${jwt}`, 'Content-Type': 'multipart/form-data', } });
        console.log(post.status)
        if (post.status === 200) {
            goBack()
        }
    }

    return (
        <>
            <label>Product ID: </label>
            <TextField inputRef={productId} placeholder="Product ID" size="small" type="text" /> <br />
            <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
            />
            <Button onClick={goBack} color="error" variant="outlined">Go Back</Button>
            <Button onClick={saveImage} color="success" variant="outlined">Save</Button>
        </>
    );
}
