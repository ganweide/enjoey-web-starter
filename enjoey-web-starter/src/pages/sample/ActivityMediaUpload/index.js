// React Imports
import React, { useState, useEffect } from "react";

import Axios from "axios";

import { useTheme } from '@mui/material/styles';
import {
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  Autocomplete,
  FormControl,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Page2 = () => {
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [activityName, setActivityName] = useState([]);
  const [activity, setActivity]     = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValue, setDialogValue] = useState({ name: '' });
  const [tenant, setTenant]           = useState('');
  const [branch, setBranch]           = useState('');
  const [refresh, setRefresh]         = useState('');

  useEffect(() => {
    try {
      Axios.get("http://127.0.0.1:8000/api/activitytags/").then((response) => {
        const namesArray = response.data.map((item) => item.name);
        setActivityName(namesArray);
      });
    } catch (error) {
      console.log(error);
    }
  }, [dialogValue, refresh]);

  const handleSelectChange = (e, newValue) => {
    const newValues = newValue
    .filter((value) => typeof value === 'string' || (value.name && value.inputValue === undefined))
    .map((value) => (typeof value === 'string' ? value : value.name));

    setActivity(newValues);

    if (newValue.some((value) => value.inputValue !== undefined)) {
      setOpenDialog(true);
      setDialogValue({
        name: newValue.find((value) => value.inputValue !== undefined).inputValue,
      });
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddNewCategory = async () => {
    try {
      const response = await Axios.post("http://127.0.0.1:8000/api/activitytags/", {
        tenantId: "123",
        branchId: "1",
        name: dialogValue.name,
      });
      const newCategory = response.data;
      setRefresh(newCategory);
      console.log("New category added:", newCategory);
    } catch (error) {
      console.error("Error adding new category:", error);
    }
    setOpenDialog(false);
  };

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
      <Card sx={{ p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <Autocomplete
                multiple
                id="demo-multiple-chip"
                options={activityName.map((name) => ({ name }))}
                value={activity}
                isOptionEqualToValue={(option, value) => {
                  return (
                    option && value && option.name === value
                  )
                }}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                filterOptions={(options, params) => {
                  const filtered = options.filter((option) => {
                    const optionName = option.name || '';
                    return optionName.toLowerCase().includes(params.inputValue.toLowerCase());
                  });
                
                  if (params.inputValue !== '' && filtered.length === 0) {
                    filtered.push({
                      inputValue: params.inputValue,
                      name: `Add "${params.inputValue}" Category`,
                    });
                  }
                
                  return filtered;
                }}
                onChange={handleSelectChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Activity Type"
                    id="select-multiple-chip"
                    variant="outlined"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} label={typeof option === 'string' ? option : option.name} {...getTagProps({ index })} />
                  ))
                }
                MenuProps={MenuProps}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl sx={{ m: 1, width: '100%' }}>
              <Autocomplete
                multiple
                id="demo-multiple-chip"
                options={activityName.map((name) => ({ name }))}
                value={activity}
                isOptionEqualToValue={(option, value) => {
                  return (
                    option && value && option.name === value
                  )
                }}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                filterOptions={(options, params) => {
                  const filtered = options.filter((option) => {
                    const optionName = option.name || '';
                    return optionName.toLowerCase().includes(params.inputValue.toLowerCase());
                  });
                
                  if (params.inputValue !== '' && filtered.length === 0) {
                    filtered.push({
                      inputValue: params.inputValue,
                      name: `Add "${params.inputValue}" Category`,
                    });
                  }
                
                  return filtered;
                }}
                onChange={handleSelectChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Activity Type"
                    id="select-multiple-chip"
                    variant="outlined"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} label={typeof option === 'string' ? option : option.name} {...getTagProps({ index })} />
                  ))
                }
                MenuProps={MenuProps}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add a new category</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                label="Tenant ID"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setTenant(e.target.value)}
                value={tenant}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                label="Branch ID"
                type="text"
                fullWidth
                variant="outlined"
                onChange={(e) => setBranch(e.target.value)}
                value={branch}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                label="Activity Name"
                type="text"
                fullWidth
                variant="outlined"
                value={dialogValue.name}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddNewCategory}>Save</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page2;