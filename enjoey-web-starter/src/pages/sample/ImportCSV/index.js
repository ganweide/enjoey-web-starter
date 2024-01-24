// React Imports
import React, { useState, useEffect } from "react";

import Axios from "axios";

import {
  Card,
  Typography,
  Box,
  Button,
} from "@mui/material";

const Page2 = () => {
  const [file, setFile] = useState(null);
  
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
      const response = await Axios.post('http://127.0.0.1:8000/api/csvupload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
  
      // Optionally, you can perform additional actions after successful upload
      console.log('File uploaded successfully');
    } catch (error) {
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

  return (
    <div>
      <Card sx={{ p: 5, mb: 5 }}>
        <Typography variant="h3" component="div">
          Import CSV
        </Typography>
        <Box>
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={!file}>
            <Typography>Upload CSV</Typography>
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default Page2;
