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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
  Chip,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ExportIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Student", "Dose", "Hep B", "DTaP", "Hib", "PCV", "Polio", "Rotavirus", "Flu", "MMR", "VAR", "Hep A"];
  const tableData = [
    ["1", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026"],
    ["2", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "", "02/03/2026", "02/03/2026", "02/03/2026"],
    ["3", "02/03/2026", "02/03/2026", "", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026"],
    ["4", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026"],
    ["5", "02/03/2026", "", "02/03/2026", "", "02/03/2026", "02/03/2026", "02/03/2026", "02/03/2026", "", "02/03/2026"],
  ]
  const [selectedRooms, setSelectedRooms]                 = useState([]);
  const [selectedStudentStatus, setSelectedStudentStatus] = useState([]);
  const [selectedStudents, setSelectedStudents]           = useState([]);

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
          Immunizations Report
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          All immunizations by school, room, or student.
        </Typography>
        <Divider sx={{ my: 5 }}/>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} md={3}>
          <FormControl fullWidth>
            <InputLabel id={"room-select"}>Rooms</InputLabel>
            <Select
              multiple
              labelId={'room-select'}
              id={'room-select'}
              label="Room"
              value={selectedRooms}
              onChange={(e) => setSelectedRooms(e.target.value)}
            >
              <MenuItem value='hibiscus room'>Hibiscus Room</MenuItem>
              <MenuItem value='banana room'>Banana Room</MenuItem>
              <MenuItem value='kitty room'>Kitty Room</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={3}>
          <FormControl fullWidth>
            <InputLabel id={"student-status-select"}>Student Status</InputLabel>
            <Select
              multiple
              labelId={'student-status-select'}
              id={'student-status-select'}
              label="Student Status"
              value={selectedStudentStatus}
              onChange={(e) => setSelectedStudentStatus(e.target.value)}
            >
              <MenuItem value='test 1'>Test 1</MenuItem>
              <MenuItem value='test 2'>Test 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} md={3}>
          <FormControl fullWidth>
            <InputLabel id={"students-select"}>Students</InputLabel>
            <Select
              multiple
              labelId={'students-select'}
              id={'students-select'}
              label="Students"
              value={selectedStudents}
              onChange={(e) => setSelectedStudents(e.target.value)}
            >
              <MenuItem value='test 1'>Test 1</MenuItem>
              <MenuItem value='test 2'>Test 2</MenuItem>
              <MenuItem value='test 2'>Test 3</MenuItem>
              <MenuItem value='test 2'>Test 4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1.5} md={1.5}>
          <FormControl fullWidth>
            <InputLabel id={"min-age-select"}>Min age</InputLabel>
            <Select
              labelId={'min-age-select'}
              id={'min-age-select'}
              label="Min age"
            >
              <MenuItem value='test 1'>Test 1</MenuItem>
              <MenuItem value='test 2'>Test 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1.5} md={1.5}>
          <FormControl fullWidth>
            <InputLabel id={"max-age-select"}>Max age</InputLabel>
            <Select
              labelId={'max-age-select'}
              id={'max-age-select'}
              label="Max age"
            >
              <MenuItem value='test 1'>Test 1</MenuItem>
              <MenuItem value='test 2'>Test 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ my: 5 }}>
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
      </Box>
      <Card>
        <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
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
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((prop, index) => (
                <TableRow key={index}>
                  {index === 0 ?
                    <TableCell rowSpan={tableData.length}>
                      <Typography variant="subtitle1">
                        Student
                      </Typography>
                      <Typography variant="body2">
                        DOB: September 12, 2021<br/>
                        2 years old
                      </Typography>
                    </TableCell>
                  :
                    null
                  }
                  <TableCell style={{textAlign: "center"}}>{prop[0]}</TableCell>
                  <TableCell>{prop[1]}</TableCell>
                  <TableCell>{prop[2]}</TableCell>
                  <TableCell>{prop[3]}</TableCell>
                  <TableCell>{prop[4]}</TableCell>
                  <TableCell>{prop[5]}</TableCell>
                  <TableCell>{prop[6]}</TableCell>
                  <TableCell>{prop[7]}</TableCell>
                  <TableCell>{prop[8]}</TableCell>
                  <TableCell>{prop[9]}</TableCell>
                  <TableCell>{prop[10]}</TableCell>
                </TableRow>
              ))}
              {tableData.map((prop, index) => (
                <TableRow key={index}>
                  {index === 0 ?
                    <TableCell rowSpan={tableData.length}>
                      <Typography variant="subtitle1">
                        Student2
                      </Typography>
                      <Typography variant="body2">
                        DOB: September 12, 2021<br/>
                        2 years old
                      </Typography>
                    </TableCell>
                  :
                    null
                  }
                  <TableCell style={{textAlign: "center"}}>{prop[0]}</TableCell>
                  <TableCell>{prop[1]}</TableCell>
                  <TableCell>{prop[2]}</TableCell>
                  <TableCell>{prop[3]}</TableCell>
                  <TableCell>{prop[4]}</TableCell>
                  <TableCell>{prop[5]}</TableCell>
                  <TableCell>{prop[6]}</TableCell>
                  <TableCell>{prop[7]}</TableCell>
                  <TableCell>{prop[8]}</TableCell>
                  <TableCell>{prop[9]}</TableCell>
                  <TableCell>{prop[10]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Page2;
