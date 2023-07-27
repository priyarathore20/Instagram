import React from 'react';
// import './styles.css';
import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box,
  MenuItem,
} from '@mui/material';

const EditPage = () => {
  return (
    <div className="App">
      
      <form>
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type="text"
          label="Set new username"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type="text"
          label="Enter full name"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type="text"
          label="Enter bio"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type="text"
          label="Gender"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: '200px', margin: '5px' }}
          type="text"
          label="Update email"
          variant="outlined"
        />
        <br />
        <input 
        type='file'
        style={{ width: '200px', margin: '5px' }}
        aria-label='Upload image'
        />
        <br />
        <Button variant="contained" color="primary">
          save
        </Button>
      </form>
    </div>
  );
};
export default EditPage;
