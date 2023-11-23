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
        setImageURL(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [tag]);

  return (
    <div>
      <Card sx={{ p: 5 }}>
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
                <MenuItem value="outdoor">Outdoor</MenuItem>
                <MenuItem value="ball">Ball</MenuItem>
                <MenuItem value="rock-climbing">Rock Climbing</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" justify="center">

        </Grid>
      </Card>
    </div>
  );
};

export default Page2;
