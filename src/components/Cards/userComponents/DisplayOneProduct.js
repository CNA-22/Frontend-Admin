import React, { useRef } from 'react';
import { Card, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router';

export default function DisplayOneProduct(props) {

  return (
    <>
      <TextField size="small" type="text" /> <br />
      <TextField size="small" type="text" /><br />
      <TextField size="small" type="text" /><br />
      <Button color="success" variant="outlined">Save</Button>
    </>

  );
}

