// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Student", "Date", "Time", "Temperature"];

  const [open, setOpen]               = useState(false);
  const [child, setChild]             = useState([]);
  const [student, setStudent]         = useState([]);
  const [date, setDate]               = useState([]);
  const [time, setTime]               = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [unit, setUnit]               = useState([]);
  const [note, setNote]               = useState([]);

  useEffect(() => {
    try {
      Axios.get(childUrl).then((response) => {
        setChild(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openDialog = async () => {
    setOpen         (true);
    setStudent      ("");
    setDate         ("");
    setTime         ("");
    setTemperature  ("");
    setNote         ("");
    setUnit         ("");
  };

  const closeDialog = async () => {
    setOpen(false);
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
          Health Table
        </Typography>
        <Button variant ="contained" onClick ={openDialog}>
          <Typography variant="button" component="div">
            + Add Record
          </Typography>
        </Button>
      </Box>
      {/* Add Health Record */}
      <Dialog
        fullWidth
        open              ={open}
        onClose           ={closeDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Health Check</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="student-select">Student</InputLabel>
                <Select
                  multiple
                  labelId="student-select"
                  id="student-select"
                  value={student || []}
                  label="Student"
                  onChange={(e) => setStudent(e.target.value)}
                >
                  {child.map((childData) => {
                    return (
                      <MenuItem
                        key   ={childData.childId}
                        value ={childData.childNameENG}
                      >
                        {childData.childNameENG}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Input Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={date}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setTime(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Input Time"
                type            ="time"
                fullWidth
                variant         ="outlined"
                value           ={time}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={8} md={8} container alignItems="center">
              <TextField
                onChange        ={(e) => setTemperature(e.target.value)}
                margin          ="dense"
                label           ="Temperature"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={temperature}
              />
            </Grid>
            <Grid item xs={4} md={4} container alignItems="center">
              <ToggleButtonGroup
                color="primary"
                value={unit}
                exclusive
                fullWidth
                onChange={(e) => setUnit(e.target.value)}
              >
                <ToggleButton value="fahrenheit">F</ToggleButton>
                <ToggleButton value="celsius">C</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setNote(e.target.value)}
                margin          ="dense"
                label           ="Note"
                type            ="text"
                fullWidth
                multiline
                rows            ={4}
                variant         ="outlined"
                value           ={note}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button>Create</Button>
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
              <TableCell style={{textAlign: "center"}}>1</TableCell>
              <TableCell style={{textAlign: "center"}}>Student 1</TableCell>
              <TableCell style={{textAlign: "center"}}>2023-07-17</TableCell>
              <TableCell style={{textAlign: "center"}}>16:00</TableCell>
              <TableCell style={{textAlign: "center"}}>36</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
