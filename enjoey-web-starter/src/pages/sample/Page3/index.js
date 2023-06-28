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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Student", "Date", "Time", "Activity"];
  const [open, setOpen]                 = useState(false);
  const [activity, setActivity]         = useState([]);
  const [student, setStudent]           = useState([]);
  const [date, setDate]                 = useState([]);
  const [time, setTime]                 = useState([]);
  const [foodType, setFoodType]         = useState([]);
  const [foodQuantity, setFoodQuantity] = useState([]);
  const [mealType, setMealType]         = useState([]);
  const [mealItems, setMealItems]       = useState([]);
  const [note, setNote]                 = useState([]);

  useEffect(() => {
    try {
      Axios.get(childUrl).then((response) => {
        setActivity(response.data);
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
    setFoodType     ("");
    setFoodQuantity ("");
    setMealType     ("");
    setMealItems    ("");
    setNote         ("");
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
        <h2>Activity Table</h2>
        <Button
          variant ="contained"
          onClick ={openDialog}
          style   ={{
            height: "40px",
          }}
        >
          New Admission
        </Button>
        <Dialog
          open              ={open}
          onClose           ={closeDialog}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Food</h2>
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
                    value={student}
                    label="Student"
                    onChange={(e) => setStudent(e.target.value)}
                  >
                    <MenuItem value="Student 1">Student 1</MenuItem>
                    <MenuItem value="Student 2">Student 2</MenuItem>
                    <MenuItem value="Student 3">Student 3</MenuItem>
                    <MenuItem value="Student 4">Student 4</MenuItem>
                    <MenuItem value="Student 5">Student 5</MenuItem>
                    <MenuItem value="Student 6">Student 6</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange        ={(e) => setDate(e.target.value)}
                  InputLabelProps ={{ shrink: true }}
                  margin          ="dense"
                  label           ="Date"
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
                  label           ="Time"
                  type            ="time"
                  fullWidth
                  variant         ="outlined"
                  value           ={time}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel id="food-type-radio-label">Food Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby ="food-type-radio-label"
                    value           ={foodType}
                    onChange        ={(e) => setFoodType(e.target.value)}
                    name            ="radio-buttons-group"
                  >
                    <Grid item xs={6} md={6}>
                      <FormControlLabel value="food" control={<Radio />} label="Food" />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <FormControlLabel value="bottle" control={<Radio />} label="Bottle" />
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel id="food-quantity-radio-label">Food Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby ="food-quantity-radio-label"
                    value           ={foodQuantity}
                    onChange        ={(e) => setFoodQuantity(e.target.value)}
                    name            ="radio-buttons-group"
                  >
                    <Grid item xs={3} md={3}>
                      <FormControlLabel value="all" control={<Radio />} label="All" />
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <FormControlLabel value="most" control={<Radio />} label="Most" />
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <FormControlLabel value="some" control={<Radio />} label="Some" />
                    </Grid>
                    <Grid item xs={3} md={3}>
                      <FormControlLabel value="none" control={<Radio />} label="None" />
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="meal-type-select">Meal Type</InputLabel>
                  <Select
                    labelId ="meal-type-select"
                    id      ="meal-type-select"
                    value   ={mealType}
                    label   ="Meal Type"
                    onChange={(e) => {setMealType(e.target.value)}}
                  >
                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                    <MenuItem value="AM Snack">AM Snack</MenuItem>
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="PM Snack">PM Snack</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                    <MenuItem value="Late Snack">Late Snack</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="meal-items-select">Meal Items</InputLabel>
                  <Select
                    labelId ="meal-items-select"
                    id      ="meal-items-select"
                    value   ={mealItems}
                    label   ="Meal Items"
                    onChange={(e) => {setMealItems(e.target.value)}}
                  >
                    <MenuItem value="Item 1">Item 1</MenuItem>
                    <MenuItem value="Item 1">Item 2</MenuItem>
                    <MenuItem value="Item 1">Item 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  onChange={(e) => setNote(e.target.value)}
                  margin="dense"
                  label="Note"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={note}
                />
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
                  className ={classes.tableCell + classes.tableHeadCell}
                  key       ={prop}
                  style     ={{
                    textAlign: "center",
                  }}
                >
                  {prop}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>1</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
