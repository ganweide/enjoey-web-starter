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
  const [file, setFile] = useState(null);

  const handleDownloadClick = async () => {
    try {
      await Axios.get(`http://127.0.0.1:8000/api/generate-pdf/`);
      console.log('PDF Generated.');
    } catch (error) {
      console.error('Error starting scheduler:', error);
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      if(!file) {
        console.log("Please select a PDF file.");
        return
      }
      const formData = new FormData();
      formData.append('file', file);

      await Axios.post('http://127.0.0.1:8000/api/upload-pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('PDF Uploaded.');
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
            <Typography variant="h3" component="div">
              Click button above to download the PDF
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={12}>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant ="contained" onClick={handleUploadClick}>
              <Typography variant="button" component="div">
                Upload PDF
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" component="div">
              Click button above to upload the PDF to AWS S3 Bucket
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant ="contained" onClick={handleUploadClick}>
              <Typography variant="button" component="div">
                Show PDF
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" component="div">
              Click button above show the uploaded pdf file
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Page2;
