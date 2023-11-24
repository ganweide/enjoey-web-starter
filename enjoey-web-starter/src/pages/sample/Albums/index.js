// React Imports
import React, { useState, useEffect } from "react";

import Axios from "axios";

import {
  Card,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";

const Page2 = () => {
  const [tag, setTag] = useState('');
  const [imageURL, setImageURL] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/api/upload-image/?tag=${tag}`);
        console.log(response.data);
        setImageURL(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [tag]);

  return (
    <div>
      <Card sx={{ p: 5, mb: 5 }}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={9} md={9}>
            <Typography variant="h3" component="div">
              Albums
            </Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            <FormControl fullWidth>
              <InputLabel id="add-tag-label">Add a tag</InputLabel>
              <Select
                labelId="add-tag"
                id="add-tag"
                label="Add a tag"
                value={tag || []}
                onChange={(e) => setTag(e.target.value)}
              >
                <MenuItem disabled value="">Pick a tag</MenuItem>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="outdoor">Outdoor</MenuItem>
                <MenuItem value="ball">Ball</MenuItem>
                <MenuItem value="rock-climbing">Rock Climbing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={2} alignItems="center" justify="center">
        {imageURL.map((prop, index) => {
          console.log(prop.file)
          return (
            <Grid key={index} item md={3} xs={3} style={{ height: '200px' }}>
              <img src={prop.file} alt={`Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
};

export default Page2;
