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

const childrenTempURL       = "http://127.0.0.1:8000/api/data_migration/childrencsvupload/";
const childrenMigrationURL  = "http://127.0.0.1:8000/api/data_migration/children-migration/"
const familyMigrationURL  = "http://127.0.0.1:8000/api/data_migration/family-migration/"

const Page2 = () => {
  const[classNameSelectMenuItem, setClassNameSelectMenuItem]  = useState([]);
  const[badgeNoSelectMenuItem, setBadgeNoSelectMenuItem]      = useState([]);
  const[className, setClassName]                              = useState("");
  const[badgeNo, setBadgeNo]                                  = useState("");
  const[openStatusDialog, setOpenStatusDialog]                = useState(false);
  const[openSummaryDialog, setOpenSummaryDialog]              = useState(false);
  const[progress, setProgress]                                = useState(0);
  const[totalRecords, setTotalRecords]                        = useState(0);
  const[migratedRecords, setMigratedRecords]                  = useState(0);
  const[duplicatedRecords, setDuplicatedRecords]              = useState(0);
  const[failedRecords, setFailedRecords]                      = useState(0);
  const[migrationSummary, setMigrationSummary]                = useState({
    total_records: 0,
    migrated_records: 0,
    failed_records: 0,
    duplicated_records: 0,
  });

  useEffect(() => {
    try {
      Axios.get(childrenTempURL).then((response) => {
        const className = response.data.map(entry => entry.className || 'null');
        const badgeNo = response.data.map(entry => entry.badgeNo || 'null');
        const uniqueClassName = [...new Set(className)];
        const uniqueBadgeNo = [...new Set(badgeNo)];
        setClassNameSelectMenuItem(['All', ...uniqueClassName]);
        setBadgeNoSelectMenuItem(['All', ...uniqueBadgeNo]);
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleStartMigration = () => {
    setProgress(0);
    setMigratedRecords(0);
    setDuplicatedRecords(0);
    setFailedRecords(0);
    try {
      Axios.post(childrenMigrationURL, { badgeNo, className }).then((response) => {
        const { total_records, migrated_records, failed_records, duplicated_records, progress_updates } = response.data;
        setOpenStatusDialog(true);
        setTotalRecords(total_records);

        let updateIndex = 0;
        const updateInterval = 50;
        const totalUpdates = progress_updates.length;

        const updateProgress = () => {
          if (updateIndex < totalUpdates) {
            const update = progress_updates[updateIndex];
            setMigratedRecords(update.migrated_records);
            setFailedRecords(update.failed_records);
            setDuplicatedRecords(update.duplicated_records);
            setProgress(update.progress);
            updateIndex++;
            setTimeout(updateProgress, updateInterval);
          } else {
            setMigrationSummary({
              total_records,
              migrated_records,
              failed_records,
              duplicated_records
            });
            setOpenStatusDialog(false);
            setOpenSummaryDialog(true);
          }
        };
        updateProgress();
      });
    } catch (error) {
      console.error('Error occurred during migration', error);
    };
  };

  const handleStartMigrationFamily = () => {
    try {
      Axios.post(familyMigrationURL, { badgeNo, className }).then((response) => {
        console.log('Migration response:', response.data);
        // Check if the migration was successful
        if (response.data.migrated_records > 0) {
          alert(`Migration successful! ${response.data.migrated_records} records migrated.`);
        } else {
          alert('No records were migrated.');
        }
      }).catch(error => {
        console.error('Error occurred during migration', error);
        alert('An error occurred during migration. Please check the console for details.');
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  // const handleStartMigrationFamily = () => {
  //   setProgress(0);
  //   setMigratedRecords(0);
  //   setDuplicatedRecords(0);
  //   setFailedRecords(0);
  //   try {
  //     Axios.post(familyMigrationURL, { badgeNo, className }).then((response) => {
  //       const { total_records, migrated_records, failed_records, duplicated_records, progress_updates } = response.data;
  //       setOpenStatusDialog(true);
  //       setTotalRecords(total_records);

  //       let updateIndex = 0;
  //       const updateInterval = 50;
  //       const totalUpdates = progress_updates.length;

  //       const updateProgress = () => {
  //         if (updateIndex < totalUpdates) {
  //           const update = progress_updates[updateIndex];
  //           setMigratedRecords(update.migrated_records);
  //           setFailedRecords(update.failed_records);
  //           setDuplicatedRecords(update.duplicated_records);
  //           setProgress(update.progress);
  //           updateIndex++;
  //           setTimeout(updateProgress, updateInterval);
  //         } else {
  //           setMigrationSummary({
  //             total_records,
  //             migrated_records,
  //             failed_records,
  //             duplicated_records
  //           });
  //           setOpenStatusDialog(false);
  //           setOpenSummaryDialog(true);
  //         }
  //       };
  //       updateProgress();
  //     });
  //   } catch (error) {
  //     console.error('Error occurred during migration', error);
  //   };
  // };

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
            <Button variant="contained" onClick={handleStartMigration} disabled={!badgeNo || !className}>
              <Typography variant="button">Start Migration</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h2" component="div">
              Choose Family Data to Migrate
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
            <Button variant="contained" onClick={handleStartMigrationFamily} disabled={!badgeNo || !className}>
              <Typography variant="button">Start Migration</Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
      {/* Migration Dialog */}
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
            Migrating {migratedRecords + duplicatedRecords + failedRecords}/{totalRecords} records...
          </Typography>
          <LinearProgress variant="determinate" value={progress} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)} disabled={progress < 100}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Summary Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="xs"
        open              ={openSummaryDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography>Migration Summary</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1">
            Total Records: {migrationSummary.total_records}
          </Typography>
          <Typography variant="body1">
            Migrated Successfully: {migrationSummary.migrated_records}
          </Typography>
          <Typography variant="body1">
            Failed Migrations: {migrationSummary.failed_records}
          </Typography>
          <Typography variant="body1">
            Duplicated Records: {migrationSummary.duplicated_records}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSummaryDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Page2;
