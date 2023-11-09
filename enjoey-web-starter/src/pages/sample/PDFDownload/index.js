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

import { saveAs } from 'file-saver';

const Page2 = () => {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleDownloadClick = async () => {
    if (pdfBlob) {
      saveAs(pdfBlob, 'invoice.pdf');
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

  const handleShowPDF = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:8000/api/get-presigned-url/pdf/5fb6c8a5-c8fc-481e-8677-0025d9da01cf/testing.pdf');
      setPdfUrl(response.data.url);
    } catch (error) {
      console.error('Error getting pre-signed URL:', error);
    }
  };

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
            <Button variant ="contained" onClick={handleShowPDF}>
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
          <Grid item xs={12} md={12}>
            {pdfUrl && (
              <iframe
                title="PDF Viewer"
                src={pdfUrl}
                width="100%"
                height="600"
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Page2;
