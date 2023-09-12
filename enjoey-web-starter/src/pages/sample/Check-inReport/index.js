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
  FormControlLabel,
  FormGroup,
  Checkbox,
  Avatar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import ExportIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Student", " ", "Room", "Check-In", "Health Screen", "Signed In by", "Check-Out", "Signed Out by", "Total Hours"];
  const [showHealthScreen, setShowHealthScreen] = useState(true);

  const handleCheckboxChange = (event) => {
    setShowHealthScreen(event.target.checked);
  };

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
          Check-in Report
        </Typography>
        <div>
          <Button startIcon={<ExportIcon />} variant="contained" sx={{ mr: 2 }}>
            <Typography variant="button" component="div">
              Export
            </Typography>
          </Button>
          <Button startIcon={<PrintIcon />} variant="contained">
            <Typography variant="button" component="div">
              Print
            </Typography>
          </Button>
        </div>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2.5} md={2.5}>
          <FormControl fullWidth>
            <InputLabel id={"room-select"}>Room</InputLabel>
            <Select
              labelId={'room-select'}
              id={'room-select'}
              label="Room"
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='test 1'>Test 1</MenuItem>
              <MenuItem value='test 2'>Test 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={3}>
          <FormControl fullWidth>
            <InputLabel id={"student-status-select"}>Student Status</InputLabel>
            <Select
              labelId={'student-status-select'}
              id={'student-status-select'}
              label="Student Status"
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='test 1'>Test 1</MenuItem>
              <MenuItem value='test 2'>Test 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2.5} md={2.5}>
          <FormControl fullWidth>
            <InputLabel id={"student-select"}>Student</InputLabel>
            <Select
              labelId={'student-select'}
              id={'student-select'}
              label="Student"
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='test 1'>Test 1</MenuItem>
              <MenuItem value='test 2'>Test 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} md={2}>
          <TextField
            fullWidth
            InputLabelProps ={{ shrink: true }}
            label           ="Date From"
            margin          ="dense"
            type            ="date"
            variant         ="outlined"
          />
        </Grid>
        <Grid item xs={2} md={2}>
          <TextField
            fullWidth
            InputLabelProps ={{ shrink: true }}
            label           ="Date To"
            margin          ="dense"
            type            ="date"
            variant         ="outlined"
          />
        </Grid>
        <Grid item xs={2} md={2}>
          <Button variant="contained">
            <Typography variant="button" component="div">
              Apply
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={showHealthScreen} onChange={handleCheckboxChange}/>}
          label="Show Health Screen Results"
        />
      </FormGroup>
      <Card>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, index) => {
                if(index !== 4 || showHealthScreen) {
                  return (
                    <TableCell
                      className={classes.tableCell + classes.tableHeadCell}
                      key={prop}
                    >
                      {prop}
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><Avatar>S1</Avatar></TableCell>
              <TableCell>Student 1</TableCell>
              <TableCell>Hibiscus<br/>Room</TableCell>
              <TableCell>11/09/2023<br/>11:46am</TableCell>
              {showHealthScreen && (<TableCell>Healthy</TableCell>)}
              <TableCell>Jane Lead Staff</TableCell>
              <TableCell>11/09/2023<br/>11:49am</TableCell>
              <TableCell>Jane Lead Staff</TableCell>
              <TableCell>00:02:53</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
