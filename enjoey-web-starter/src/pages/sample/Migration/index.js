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
  LinearProgress,
} from "@mui/material";

const childrenTempURL = "http://127.0.0.1:8000/api/data_migration/childrencsvupload/";
const childrenMigrationURL = "http://127.0.0.1:8000/api/data_migration/children-migration/"

const Page2 = () => {
  const[classNameSelectMenuItem, setClassNameSelectMenuItem] = useState([]);
  const[badgeNoSelectMenuItem, setBadgeNoSelectMenuItem] = useState([]);
  const[className, setClassName] = useState("");
  const[badgeNo, setBadgeNo] = useState("");
  const[openStatusDialog, setOpenStatusDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [migratedRecords, setMigratedRecords] = useState(0);

  useEffect(() => {
    try {
      Axios.get(childrenTempURL).then((response) => {
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


  useEffect(() => {
    let intervalId;
    if (openStatusDialog && totalRecords > 0) {
      intervalId = setInterval(() => {
        Axios.get(childrenMigrationURL)
          .then((response) => {
            const { migrated_records } = response.data;
            setMigratedRecords(migrated_records);
            setProgress((migrated_records / totalRecords) * 100);

            if (migrated_records >= totalRecords) {
              clearInterval(intervalId);
            }
          })
          .catch((error) => {
            console.error('Error occurred during polling', error);
            clearInterval(intervalId);
          });
      }, 1000); // Poll every second
    }

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [openStatusDialog, totalRecords]);

  const handleStartMigration = () => {
    setOpenStatusDialog(true);
    setProgress(0);
    setMigratedRecords(0);
  
    Axios.post(childrenMigrationURL, { badgeNo, className })
    .then((response) => {
      const { total_records } = response.data;
      setTotalRecords(total_records);
    })
    .catch((error) => {
      console.error('Error occurred during migration', error);
    });
  };

  return (
    <Box>
      <Card sx={{ p: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h2" component="div">
              Choose Child Data to Migrate
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
            <Button variant="outlined" onClick={handleStartMigration} disabled={!badgeNo || !className}>
              <Typography variant="button">Start Migration</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h2" component="div">
              Choose Parents Data to Migrate
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
            <Button variant="outlined" onClick={handleStartMigration} disabled={!badgeNo || !className}>
              <Typography variant="button">Start Migration</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        fullWidth
        maxWidth          ="xs"
        open              ={openStatusDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Migrating</Typography>  
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            Migrating {migratedRecords}/{totalRecords} records...
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)} disabled={progress < 100}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Page2;
