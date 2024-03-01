// React Imports
import React, { useState, useEffect, useRef } from "react";

import Axios from "axios";

import {
  Button,
  Card,
  Divider,
  Grid,
  Typography,
  Box,
} from "@mui/material";

import CKEditor from "./CKEditor";
import DevExtremeEditor from "./DevExtremeEditor";
import TipTapEditor from "./TipTapEditor";

import { Document, Page, pdfjs } from 'react-pdf';

const Page2 = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [image, setImage] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfData, setPdfData] = useState(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const handleDownloadClick = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:8000/api/generate-pdf/');
      setPdfData(response.data);
      console.log('PDF Generated');
    } catch (error) {
      console.error('Error generating PDF', error);
    }
  };

  const handleFileChange = (e) => {
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


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const uploadImage = async () => {
    try {
      if (!image) {
        console.log("Please select an image");
        return;
      }
      const formData = new FormData();
      formData.append('image', image);
      await Axios.post('http://127.0.0.1:8000/api/upload-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful.');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleUploadClick = async () => {
  //   try {
  //     if(!file) {
  //       console.log("Please select a PDF file.");
  //       return
  //     }
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     await Axios.post('http://127.0.0.1:8000/api/upload-pdf/', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('PDF Uploaded.');
  //   } catch (error) {
  //     console.error('Error Upload PDF:', error);
  //   }
  // }

  const handleShowPDF = async () => {
    try {
      const fileKey = 'pdf/invoice.pdf'
      const response = await Axios.get(`http://127.0.0.1:8000/api/show/${fileKey}/`);
      console.log('PDF URL:', response.data.url);
      setPdfUrl(response.data.url);
    } catch (error) {
      console.error('Error getting pre-signed URL:', error);
    }
  };

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
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
              {/* <Grid item xs={12} md={12}>
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
              </Grid> */}
              <Grid item xs={12} md={12}>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
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
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h2">Announcement Editor (CKEditor)</Typography>
            <CKEditor />
          </Card>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h2">Announcement Editor (DevExtreme React)</Typography>
            <DevExtremeEditor />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h2">Announcement Editor (Tip Tap)</Typography>
            <TipTapEditor />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Page2;
