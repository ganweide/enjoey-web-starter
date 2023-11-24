// React Imports
import React, { useState, useEffect } from "react";

import Axios from "axios";

import {
  Card,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const Page2 = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setUploadStatus('');
  };
  const uploadImage = async () => {
    try {
      if (!image) {
        setUploadStatus("Please select an image");
        return;
      }
      setUploadStatus('Uploading...');
      const formData = new FormData();
      formData.append('image', image);
      await Axios.post('http://127.0.0.1:8000/api/upload-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('Completed');
      console.log('Upload successful.');
    } catch (error) {
      setUploadStatus('Upload failed');
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <Card sx={{ p: 5, mb: 5 }}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography gutterBottom variant="h3" component="div">
              Activity Media Upload
            </Typography>
          </Grid>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={3} md={3}>
              <input type="file" onChange={handleImageChange} />
            </Grid>
            <Grid item xs={3} md={3}>
              <Button variant ="contained" onClick={uploadImage}>
                <Typography variant="button" component="div">
                  Upload Image
                </Typography>
              </Button>
            </Grid>
          </Grid>
          {uploadStatus && (
            <Grid item xs={12} md={6}>
              <Typography variant="body1">{uploadStatus}</Typography>
            </Grid>
          )}
        </Grid>
      </Card>
    </div>
  );
};

export default Page2;
