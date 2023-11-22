// React Imports
import React, { useState } from "react";

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


import { Document, Page, pdfjs } from 'react-pdf';

const Page2 = () => {
  const [tag, setTag] = useState('');

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
                <MenuItem value="before-school-care">Before School Care</MenuItem>
                <MenuItem value="after-school-care">After School Care</MenuItem>
                <MenuItem value="infant-care-program">Infant Care Program</MenuItem>
                <MenuItem value="preschool-program">Preschool Program</MenuItem>
                <MenuItem value="toddler-care-program">Toddler Care Program</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Page2;
