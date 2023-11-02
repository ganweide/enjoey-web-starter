// React Imports
import React, { useEffect, useState } from "react";

import Axios from "axios";

import {
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";


const Page2 = () => {
  // const handleDownloadClick = () => {
  //   Axios
  //     .get('/generate-pdf/', {
  //       responseType: 'blob', // Ensure the response is treated as a binary blob
  //     })
  //     .then((response) => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'invoice.pdf';
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => {
  //       console.error('Error downloading PDF:', error);
  //     });
  // };

  const handleDownloadClick = async () => {
    try {
      await Axios.get(`http://127.0.0.1:8000/api/generate-pdf/`);
      console.log('PDF Generated.');
    } catch (error) {
      console.error('Error starting scheduler:', error);
    }
  }

  return (
    <div>
      <Card sx={{ p: 5}}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Button variant ="contained" onClick={handleDownloadClick}>
              <Typography variant="button" component="div">
                Download PDF
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" component="div">
              Click button above to download the PDF
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Page2;
