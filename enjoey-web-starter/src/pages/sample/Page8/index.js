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
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Student", "Date", "Time", "Type"];

  const [open, setOpen]       = useState(false);
  const [child, setChild]     = useState([]);
  const [student, setStudent] = useState([]);
  const [date, setDate]       = useState([]);
  const [time, setTime]       = useState([]);
  const [type, setType]       = useState([]);

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
    setOpen   (true);
    setStudent("");
    setDate   ("");
    setTime   ("");
    setType   ("");
  };

  const closeDialog = async () => {
    setOpen(false);
  }

  return (
    <div>
      <div 
        style={{
          display       : "flex",
          flexDirection : "row",
          justifyContent: "space-between",
          alignItems    : "center",
        }}
      >
        <h2>Toilet Table</h2>
        <div className="button-group">
          <Button
            variant ="contained"
            onClick ={openDialog}
            style   ={{
              height: "40px",
              marginRight: "10px",
            }}
          >
            + Add Record
          </Button>
        </div>
        {/* Add Toilet Record */}
        <Dialog
          fullWidth
          open              ={open}
          onClose           ={closeDialog}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Toilet Check</h2>
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
              <Grid item xs={12} md={12}>
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
              <Grid item xs={8} md={8}>
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
              <Grid item xs={4} md={4} container alignItems="center">
                <ToggleButtonGroup
                  color="primary"
                  value={type}
                  exclusive
                  fullWidth
                  onChange={(e) => setType(e.target.value)}
                >
                  <ToggleButton value="Poo">Poo</ToggleButton>
                  <ToggleButton value="Pee">Pee</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
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
              <TableCell style={{textAlign: "center"}}>2023-07-18</TableCell>
              <TableCell style={{textAlign: "center"}}>12:11</TableCell>
              <TableCell style={{textAlign: "center"}}>Poo</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
