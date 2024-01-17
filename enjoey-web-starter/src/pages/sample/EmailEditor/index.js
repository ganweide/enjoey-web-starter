import React, {useRef, useState, useEffect} from 'react';
import Axios from 'axios';
import EmailEditor from 'react-email-editor';

import {
  Card,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  IconButton,
} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const Page2 = () => {
  const editorRef = useRef(null);
  const [key, setKey] = useState(0);
  const [saveDialog, setSaveDialog] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [designName, setDesignName] = useState([]);
  const [template, setTemplate]   = useState([]);
  const [refresh, setRefresh]     = useState([]);

  useEffect(() => {
    try {
      Axios.get("http://127.0.0.1:8000/api/email-editor-json/").then((response) => {
        setJsonData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  const exportHtml = async () => {
    const unlayer = editorRef.current?.editor;
    unlayer?.exportHtml( async (data) => {
      const { html } = data;
      // Parse the HTML string
      const parsedHtml = new DOMParser().parseFromString(html, 'text/html');

      // Get all image elements
      const imageElements = parsedHtml.querySelectorAll('img');

      // Extract source URLs from image elements
      const imageSources = Array.from(imageElements).map(img => img.src);
      try {
        const response = await Axios.post("http://127.0.0.1:8000/api/html-upload-image/", { image: imageSources, name: designName });
        const uploadedUrls = response.data.uploadedUrls;
        imageElements.forEach((img, index) => {
          img.src = uploadedUrls[index];
        });

        const updatedHtml = parsedHtml.documentElement.outerHTML;
        const blob = new Blob([updatedHtml], { type: 'text/html' });
        const link = document.createElement('a');
  
        link.href = URL.createObjectURL(blob);
        link.download = `${designName}.html`;
  
        document.body.appendChild(link);
        link.click();
  
  
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
      } catch (error) {
        console.error('Error saving image', error);
      }

      try {
        Axios.post("http://127.0.0.1:8000/api/email-editor-html/", { templateName: designName, htmlFormat: html });
        console.log('Design successfully saved');
      } catch (error) {
        console.error('Error saving design', error);
      } 
    });
    setExportDialog(false);
  };
  

  const exportDialogOpen = () => {
    setExportDialog(true);
  }

  const exportDialogClose = () => {
    setExportDialog(false);
  }

  const saveDialogOpen = () => {
    setSaveDialog(true);
  }

  const saveDialogClose = () => {
    setSaveDialog(false);
  }

  const saveDesign = async () => {
    const unlayer = editorRef.current?.editor;

    if (unlayer) {
      unlayer.saveDesign(async(data) => {
        try {
          Axios.post("http://127.0.0.1:8000/api/email-editor-json/", { templateName: designName, jsonFormat: JSON.stringify(data) });
          setRefresh(data);
          // console.log('JSON successfully saved', data);
        } catch (error) {
          console.error('Error saving design', error);
        }
      })
      unlayer?.exportHtml((data) => {
        const { design, html } = data;
        try {
          Axios.post("http://127.0.0.1:8000/api/email-editor-html/", { templateName: designName, htmlFormat: html });
          console.log('HTML successfully saved', data);
        } catch (error) {
          console.error('Error saving design', error);
        }
      });
    };

    setSaveDialog(false);
  };

  const onLoad = (e) => {
    setTemplate(e.target.value)
    try {
      const selectedTemplate = jsonData.find(data => data.templateName === e.target.value);
      if (selectedTemplate) {
        editorRef.current?.editor.loadDesign(JSON.parse(selectedTemplate.jsonFormat));
        console.log('Template successfully loaded', selectedTemplate.jsonFormat);
      } else {
        console.error('Selected template not found.');
      }
    } catch (error) {
      console.error('Error loading template', error);
    }
  }

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1);
  };


  return (
    <Card sx={{ p: 5 }}>
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Grid item xs={4} md={4}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="template-select">Select Template</InputLabel>
            <Select
              labelId={'template-select'}
              id={'template-select'}
              label="Select Template"
              value={template}
              onChange={onLoad}
            >
              {jsonData.map((data, index) => (
                <MenuItem key={index} value={data.templateName}>{data.templateName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={0.3} md={0.3}>
          <IconButton aria-label="reset" fullWidth onClick={handleReset}>
            <RestartAltIcon />
          </IconButton>
        </Grid>
      </Grid>
      <EmailEditor
        key={key}
        ref={editorRef}
      />
      <Grid container spacing={2} sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Grid item xs={2} md={2}>
          <Button
            variant="outlined"
            onClick={exportDialogOpen}
            sx={{height: "100%"}}
            fullWidth
          >
            Export HTML
          </Button>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button
            variant="outlined"
            onClick={saveDialogOpen}
            sx={{height: "100%"}}
            fullWidth
          >
            Save Design
          </Button>
        </Grid>
      </Grid>
      {/* Save Design Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={saveDialog}
        onClose           ={saveDialogClose}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Save Template</h2>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDesignName(e.target.value)}
                margin="dense"
                label="Template Name"
                type="text"
                fullWidth
                variant="outlined"
                value={designName}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={saveDialogClose} color="warning">
            Cancel
          </Button>
          <Button onClick={saveDesign} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Export Html Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={exportDialog}
        onClose           ={exportDialogClose}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Export Html</h2>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setDesignName(e.target.value)}
                margin="dense"
                label="Template Name"
                type="text"
                fullWidth
                variant="outlined"
                value={designName}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={exportDialogClose} color="warning">
            Cancel
          </Button>
          <Button onClick={exportHtml} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Page2;