// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Box,
  Typography,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["ROOM", "STUDENTS IN", "STAFF IN", "RATIO"];
  const tableData = [
    ["All Rooms", 13, 6],
    ["Hibiscus Rooms", 6, 3],
    ["Banana Rooms", 4, 2],
    ["Kitty Rooms", 5, 3],
  ];
  const calculateRatio = (student, staff) => {
    if (staff === 0) {
      return student;
    }
    return calculateRatio(staff, student % staff);
  }

  return (
    <div>
      <Box 
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Room Check Report
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Check real-time student:staff ratios for all of your classrooms.
        </Typography>
        <Divider sx={{ my: 5 }}/>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Room check as of 11/09/2023 03:37:00 am. Check in/out is completed on the mobile apps.
        </Typography>
      </Box>
      <Card>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop) => (
                  <TableCell
                    className={classes.tableCell + classes.tableHeadCell}
                    key={prop}
                  >
                    {prop}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((prop) => {
              const [room, student, staff] = prop;
              const gcd = calculateRatio(student, staff);
              const ratio = `${student / gcd}:${staff / gcd}`;
              return(
                <TableRow key={prop}>
                  <TableCell>{room}</TableCell>
                  <TableCell>{student}</TableCell>
                  <TableCell>{staff}</TableCell>
                  <TableCell>{ratio}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
