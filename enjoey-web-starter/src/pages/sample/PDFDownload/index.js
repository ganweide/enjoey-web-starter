// React Imports
import React, { useState } from "react";

import Axios from "axios";

import {
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { saveAs } from 'file-saver';

import { Document, Page, pdfjs } from 'react-pdf';

const Page2 = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfBlob, setPdfBlob] = useState(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const handleDownloadClick = async () => {
    if (pdfBlob) {
      saveAs(pdfBlob, 'invoice.pdf');
    }
  }

  const handleChange = (e) => {
    setFile2(e.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      if (!file2) {
        console.log("Please select a PDF file.");
        return;
      }
      const formData = new FormData();
      formData.append('file', file2);
      await Axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful.');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

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
      console.error('Error Upload PDF:', error);
    }
  }

  const handleShowPDF = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:8000/api/get-presigned-url/pdf/0e971551-923a-428c-8783-457c9da71dec/testing.pdf');
      console.log('PDF URL:', response.data.url);
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
            <input type="file" accept=".pdf" onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant ="contained" onClick={uploadFile}>
              <Typography variant="button" component="div">
                Upload PDF
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" component="div">
              Click button above to upload the PDF to AWS S3 Bucket using django-storages
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
              <Document file={{ url: pdfUrl }} >
                <Page pageNumber={1} width={600} height={800} />
              </Document>
            )}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Page2;
