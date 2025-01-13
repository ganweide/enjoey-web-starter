// React Imports
import React, { useState, useEffect } from "react";

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
  TextField,
} from "@mui/material";

const Page2 = () => {
  const [file, setFile] = useState(null);
  const [childrenCSV, setChildrenCSV] = useState(null);
  const [staffCSV, setStaffCSV] = useState(null);
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [uploadResults, setUploadResults] = useState({});
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if(!file) {
        console.error('No File Selected');
        return;
      }
      
      const formData = new FormData();
      formData.append('file', file);

      // Read the contents of the file before uploading
      const fileContents = await readFileContents(file);
      
      // Log the data to the console
      console.log('CSV File Contents:', fileContents);

      // Replace 'YOUR_DJANGO_UPLOAD_API_URL' with your actual Django API endpoint for file upload
      setStatus('Status: Populating');
      const response = await Axios.post('http://127.0.0.1:8000/api/csvupload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Optionally, you can perform additional actions after successful upload
      setSuccess(`Uploaded: ${response.data.uploaded}`);
      setSkipped(`Ignored: ${response.data.ignored}`);
      setStatus('Status: Completed');
      setTimeout(() => {
        setStatus('');
      }, 3000);
      console.log('File uploaded successfully');
    } catch (error) {
      setStatus('Status: Failed');
      console.error('Error uploading file', error);
    }
  };
  
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
      setStatus('Status: Completed');
      setUploadResults(response.data);
      setOpenStatusDialog(true);
      setTimeout(() => {
        setStatus('');
      }, 3000);
    } catch (error) {
      setStatus('Status: Failed');
      console.error('Error uploading file', error);
    }
  };

  const handleStaffCSVChange = (e) => {
    const selectedFile = e.target.files[0];
    setStaffCSV(selectedFile);
  };

  const handleStaffCSVUpload = async () => {
    try {
      if(!staffCSV) {
        console.error('No File Selected');
        return;
      }
      
      const formData = new FormData();
      formData.append('file', staffCSV);

      // Read the contents of the file before uploading
      const fileContents = await readFileContents(staffCSV);
      
      // Log the data to the console
      console.log('CSV File Contents:', fileContents);

      // Replace 'YOUR_DJANGO_UPLOAD_API_URL' with your actual Django API endpoint for file upload
      setStatus('Status: Populating');
      const response = await Axios.post('http://127.0.0.1:8000/api/data_migration/staffcsvupload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('Status: Completed');
      setUploadResults(response.data);
      setOpenStatusDialog(true);
      setTimeout(() => {
        setStatus('');
      }, 3000);
    } catch (error) {
      setStatus('Status: Failed');
      console.error('Error uploading file', error);
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5, mb: 5 }}>
            <Typography variant="h3" component="div">
              Import CSV
            </Typography>
            <Box>
              <input type="file" onChange={handleFileChange} />
              <Button onClick={handleUpload} disabled={!file}>
                <Typography>Upload CSV</Typography>
              </Button>
              <div>{status}</div>
              <div>{success}</div>
              <div>{skipped}</div>
            </Box>
          </Card>
        </Grid>
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
              <div>{status}</div>
              <div>{success}</div>
              <div>{skipped}</div>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5, mb: 5 }}>
            <TextField
              fullWidth
              label='Select a xlsx file'
              type='file'
              variant='outlined'
              onChange={handleStaffCSVChange}
              margin='dense'
              InputLabelProps={{shrink: true}}
              inputProps={{accept: '.xlsx'}}
            />
            <Button
              size='large'
              variant='outlined'
              onClick={handleStaffCSVUpload}
              disabled={!staffCSV}
            >
              <Typography variant='button'>Import</Typography>
            </Button>
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
