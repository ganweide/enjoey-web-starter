// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Action", "On", "Off"];
  const [schedulerCreationOpen, setSchedulerCreationOpen] = useState(false);
  const [checkRunningScheduler, setCheckRunningScheduler] = useState(false);

  // useEffect(() => {
  //   checkStatus()
  // }, []);

  // const checkStatus = async () => {
  //   try {
  //     const response = await Axios.get('http://127.0.0.1:8000/api/check-status/');
  //     setCheckRunningScheduler(response.data.isRunning);
  //     console.log(response.data.isRunning)
  //   } catch (error) {
  //     console.log('Error checking status:', error);
  //   }
  // }

  const start = async () => {
    try {
      await Axios.post('http://127.0.0.1:8000/api/start-scheduler/');
      console.log('Scheduler started.');
    } catch (error) {
      console.error('Error starting scheduler:', error);
    }
  }

  const stop = async () => {
    try {
      await Axios.post('http://127.0.0.1:8000/api/stop-scheduler/');
      console.log('Scheduler stopped.');
    } catch (error) {
      console.error('Error stopping scheduler:', error);
    }
  }
  
  const openAddScheduler = async () => {
    setSchedulerCreationOpen(true);
  }
  const closeAddScheduler = async () => {
    setSchedulerCreationOpen(false);
  }

  return (
    <div>
      <Box 
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Scheduler Settings
        </Typography>
        <Button variant ="contained" onClick={openAddScheduler}>
          <Typography variant="button" component="div">
            + Add Scheduler
          </Typography>
        </Button>
      </Box>
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={schedulerCreationOpen}
        onClose           ={closeAddScheduler}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>New Scheduler</h2>
          <Typography variant="body2">Create a new scheduler</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label           ="Job Name"
                margin          ="dense"
                type            ="text"
                variant         ="outlined"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                InputLabelProps ={{ shrink: true }}
                label           ="Assign week"
                margin          ="dense"
                type            ="date"
                variant         ="outlined"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                InputLabelProps ={{ shrink: true }}
                label           ="Assign time"
                margin          ="dense"
                type            ="time"
                variant         ="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={closeAddScheduler}>Save</Button>
        </DialogActions>
      </Dialog>
      <Card>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop) => (
                  <TableCell
                    className={classes.tableCell + classes.tableHeadCell}
                    key={prop}
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    {prop}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{textAlign: "center", width: '15%'}}>1</TableCell>
              <TableCell style={{textAlign: "center"}}>Testing 1</TableCell>
              <TableCell style={{textAlign: "center"}}>
                <Button onClick={start}>On</Button>
              </TableCell>
              <TableCell style={{textAlign: "center"}}>
                <Button onClick={stop}>Off</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
