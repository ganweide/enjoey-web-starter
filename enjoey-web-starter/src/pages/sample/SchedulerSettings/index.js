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
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Action", "On", "Off"];

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

  // const start = () => {
  //   console.log("Scheduler started.");
  //   Axios.post('http://127.0.0.1:8000/api/start-scheduler/')
  //   .catch((error) => {
  //     console.error('Error starting scheduler:', error);
  //   });
  //   console.log("test");
  // }

  // const stop = () => {
  //   console.log("Scheduler stopped.");
  //   Axios.post('http://127.0.0.1:8000/api/stop-scheduler/')
  //   .catch((error) => {
  //     console.error('Error stopping scheduler:', error);
  //   });
  // }

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
        <Button variant ="contained">
          <Typography variant="button" component="div">
            + Add Scheduler
          </Typography>
        </Button>
      </Box>
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
