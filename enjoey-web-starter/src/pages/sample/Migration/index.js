// React Imports
import React, { useState } from "react";

import Axios from "axios";

import {
  Card,
  Typography,
  Box,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Page2 = () => {
  const [childrenCSV, setChildrenCSV] = useState(null);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [uploadResults, setUploadResults] = useState({});
  
  const readFileContents = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const contents = event.target.result;
        resolve(contents);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsText(file);
    });
  };

  const handleChildrenCSVChange = (e) => {
    const selectedFile = e.target.files[0];
    setChildrenCSV(selectedFile);
  };

  const handleChildrenCSVUpload = async () => {
    try {
      if(!childrenCSV) {
        console.error('No File Selected');
        return;
      }
      
      const formData = new FormData();
      formData.append('file', childrenCSV);

      // Read the contents of the file before uploading
      const fileContents = await readFileContents(childrenCSV);
      
      // Log the data to the console
      console.log('CSV File Contents:', fileContents);

      // Replace 'YOUR_DJANGO_UPLOAD_API_URL' with your actual Django API endpoint for file upload
      setStatus('Status: Populating');
      const response = await Axios.post('http://127.0.0.1:8000/api/data_migration/childrencsvupload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadResults(response.data);
      setOpenStatusDialog(true);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5, mb: 5 }}>
            <Typography variant="h3" component="div">
              Import Children CSV
            </Typography>
            <Box>
              <input type="file" onChange={handleChildrenCSVChange} />
              <Button variant="outlined" onClick={handleChildrenCSVUpload} disabled={!childrenCSV}>
                <Typography variant="button">Import</Typography>
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth          ="xs"
        open              ={openStatusDialog}
        onClose           ={() => setOpenStatusDialog(false)}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Upload Results</Typography>  
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle2">Successfully uploaded: {uploadResults.successful_uploads}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="subtitle2">Failed uploads: {uploadResults.failed_uploads}</Typography>
            </Grid>
            {uploadResults.errors && uploadResults.errors.length > 0 && (
              <Grid item xs={12} md={12}>
                <Typography variant="h2">Errors:</Typography>
                <ul>
                  {uploadResults.errors.map((error, index) => (
                    <li key={index}>{JSON.stringify(error)}</li>
                  ))}
                </ul>
              </Grid>
            )}
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Page2;
