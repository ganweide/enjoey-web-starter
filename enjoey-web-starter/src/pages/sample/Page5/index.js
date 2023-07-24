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
  const tableHead = [" ", "Student", "Date", "Time", "Activity", "Observation", "Position"];
  const [open, setOpen]                     = useState(false);
  const [switchActivity, setSwitchActivity] = useState(false);
  const [child, setChild]                   = useState([]);
  const [refreshData, setRefreshData]       = useState([]);
  const [activity, setActivity]             = useState([]);
  const [activityType, setActivityType]     = useState("Food");
  const [student, setStudent]               = useState([]);
  const [date, setDate]                     = useState([]);
  const [time, setTime]                     = useState([]);
  const [foodType, setFoodType]             = useState([]);
  const [foodQuantity, setFoodQuantity]     = useState([]);
  const [mealType, setMealType]             = useState([]);
  const [mealItems, setMealItems]           = useState([]);
  const [note, setNote]                     = useState([]);

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
          Sleep Table
        </Typography>
        <Button variant ="contained" onClick ={openDialog}>
          <Typography variant="button" component="div">
            + Add Record
          </Typography>
        </Button>
      </Box>
      <Dialog
        open              ={open}
        onClose           ={closeDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Nap</h2>
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
              <Divider variant="middle" />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="food-type-radio-label">Activity</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="food-type-radio-label"
                  value           ={foodType}
                  onChange        ={(e) => setFoodType(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={4} md={4}>
                    <FormControlLabel value="start-nap" control={<Radio />} label="Start nap" />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControlLabel value="sleep-check" control={<Radio />} label="Sleep check" />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControlLabel value="end-nap" control={<Radio />} label="End nap" />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="food-quantity-radio-label">Observation</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="food-quantity-radio-label"
                  value           ={foodQuantity}
                  onChange        ={(e) => setFoodQuantity(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={6} md={6}>
                    <FormControlLabel value="labored-breathing" control={<Radio />} label="Labored Breathing" />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControlLabel value="restless" control={<Radio />} label="Restless" />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControlLabel value="flushed" control={<Radio />} label="Flushed" />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControlLabel value="high-body-temperature" control={<Radio />} label="High body temperature" />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="food-quantity-radio-label">Position</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="food-quantity-radio-label"
                  value           ={foodQuantity}
                  onChange        ={(e) => setFoodQuantity(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={4} md={4}>
                    <FormControlLabel value="back" control={<Radio />} label="Back" />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControlLabel value="side" control={<Radio />} label="Side" />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControlLabel value="stomach" control={<Radio />} label="Stomach" />
                  </Grid>
                </RadioGroup>
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
            <TableRow>
              <TableCell style={{textAlign: "center"}}>1</TableCell>
              <TableCell style={{textAlign: "center"}}>Student 1</TableCell>
              <TableCell style={{textAlign: "center"}}>2022/01/03</TableCell>
              <TableCell style={{textAlign: "center"}}>13:00</TableCell>
              <TableCell style={{textAlign: "center"}}>Sleep Check</TableCell>
              <TableCell style={{textAlign: "center"}}>Laboured Breathing</TableCell>
              <TableCell style={{textAlign: "center"}}>Back</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
