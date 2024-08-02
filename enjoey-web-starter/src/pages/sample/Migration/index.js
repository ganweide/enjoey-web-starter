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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const childrenTempURL = "http://127.0.0.1:8000/api/data_migration/childrencsvupload/";

const Page2 = () => {
  const[childrenTempTableData, setChildrenTempTableData]  = useState([]);
  const[classNameSelectMenuItem, setClassNameSelectMenuItem] = useState([]);
  const[badgeNoSelectMenuItem, setBadgeNoSelectMenuItem] = useState([]);
  const[className, setClassName] = useState('All');
  const[badgeNo, setBadgeNo] = useState('All');
  const[openStatusDialog, setOpenStatusDialog] = useState(false);

  useEffect(() => {
    try {
      Axios.get(childrenTempURL).then((response) => {
        setChildrenTempTableData(response.data);
        const className = response.data.map(entry => entry.className || 'null');
        const badgeNo = response.data.map(entry => entry.badgeNo || 'null');
        const uniqueClassName = [...new Set(className)];
        const uniqueBadgeNo = [...new Set(badgeNo)];
        setClassNameSelectMenuItem(['All', ...uniqueClassName]);
        setBadgeNoSelectMenuItem(['All', ...uniqueBadgeNo]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleStartMigration = () => {
    setOpenStatusDialog(true);
  }

  return (
    <Box>
      <Card sx={{ p: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" component="div">
              Choose Data to Migrate
            </Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="badge-select">Select Badge</InputLabel>
              <Select
                labelId="badge-select"
                id="badge-select"
                value={badgeNo}
                label="Select Badge"
                onChange={(e) => setBadgeNo(e.target.value)}
              >
                {badgeNoSelectMenuItem.map((badgeNo, index) => (
                  <MenuItem key={index} value={badgeNo}>{badgeNo}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="className-select">Select Class</InputLabel>
              <Select
                labelId="className-select"
                id="className-select"
                value={className}
                label="Select Class"
                onChange={(e) => setClassName(e.target.value)}
              >
                {classNameSelectMenuItem.map((className, index) => (
                  <MenuItem key={index} value={className}>{className}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="outlined" onClick={handleStartMigration}>
              <Typography variant="button">Start Migration</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        fullWidth
        maxWidth          ="xs"
        open              ={openStatusDialog}
        onClose           ={() => setOpenStatusDialog(false)}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Migrating</Typography>  
        </DialogTitle>
        <DialogContent dividers>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Page2;
