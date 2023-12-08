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
const activityUrl  = "http://127.0.0.1:8000/api/activity/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Parent", "Date", "Time", "Age Interest"];
  const [addAppointmentDialog, setAddAppointmentDialog]   = useState(false);
  const [createTimeSlotsDialog, setCreateTimeSlotsDialog] = useState(false);
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
  const [branch, setBranch]                 = useState([]);
  const [phone, setPhone]                   = useState([]);
  const [name, setName]                     = useState([]);
  const [ageInterest, setAgeInterest]       = useState([]);

  useEffect(() => {
    try {
      Axios.get(activityUrl).then((response) => {
        setActivity(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      Axios.get(childUrl).then((response) => {
        setChild(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refreshData]);

  console.log(activity);

  const openAddAppointmentDialog = async () => {
    setAddAppointmentDialog (true);
    setDate                 ("");
    setTime                 ("");
    setBranch               ("");
    setName                 ("");
    setPhone                ("");
    setAgeInterest          ("");
  };

  const closeAddAppointmentDialog = async () => {
    setAddAppointmentDialog(false);
  }

  const openCreateTimeSlotsDialog = () => {
    setCreateTimeSlotsDialog (true);
  }

  const closeCreateTimeSlotsDialog = () => {
    setCreateTimeSlotsDialog (false);
  }

  const newActivity = async () => {
    const activityData = new FormData();
    activityData.append("student", student);
    activityData.append("activityType", activityType);
    activityData.append("date", date);
    activityData.append("time", time);
    activityData.append("foodType", foodType);
    activityData.append("foodQuantity", foodQuantity);
    activityData.append("mealType", mealType);
    activityData.append("mealItem", mealItems);
    activityData.append("note", note);
  
    try {
      const response = await Axios({
        method  : "POST",
        url     : activityUrl,
        data    : activityData,
        headers : {"Content-Type": "multipart/form-data"},
      });
      setRefreshData(response.data)
    } catch (error) {
      console.log("error", error);
    }
    setOpen(false);
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
          Appointment Table
        </Typography>
        <Box>
          <Button variant ="contained" onClick ={openAddAppointmentDialog}>
            <Typography variant="button" component="div">
              + Add Appointment
            </Typography>
          </Button>
          <Button variant ="contained" onClick ={openCreateTimeSlotsDialog} sx={{ ml: 2 }}>
            <Typography variant="button" component="div">
              + Create Time Slot
            </Typography>
          </Button>
        </Box>
      </Box>
      <Dialog
        open              ={addAppointmentDialog}
        onClose           ={closeAddAppointmentDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Add Appointment</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="branch-select">Branch</InputLabel>
                <Select
                  labelId="branch-select"
                  id="branch-select"
                  value={branch || []}
                  label="Branch"
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <MenuItem value="1">Branch 1</MenuItem>
                  <MenuItem value="2">Branch 2</MenuItem>
                  <MenuItem value="3">Branch 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="age-interest-select">Age Interest</InputLabel>
                <Select
                  labelId ="age-interest-select"
                  id      ="age-interest-select"
                  value   ={ageInterest}
                  label   ="Age Interest"
                  onChange={(e) => {setAgeInterest(e.target.value)}}
                >
                  <MenuItem value="6-12 months">6 - 12 months</MenuItem>
                  <MenuItem value="1-4 years">1 - 4 years</MenuItem>
                  <MenuItem value="5-7 years">5 - 7 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
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
            <Grid item xs={12} md={12}>
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
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                margin="dense"
                label="Parent's Name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                margin="dense"
                label="Handphone No."
                type="text"
                fullWidth
                variant="outlined"
                value={phone}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={newActivity}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open              ={createTimeSlotsDialog}
        onClose           ={closeCreateTimeSlotsDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Create Time Slots</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="branch-select">Branch</InputLabel>
                <Select
                  labelId="branch-select"
                  id="branch-select"
                  value={branch || []}
                  label="Branch"
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <MenuItem value="1">Branch 1</MenuItem>
                  <MenuItem value="2">Branch 2</MenuItem>
                  <MenuItem value="3">Branch 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
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
              <FormControl fullWidth margin="dense">
                <InputLabel id="age-interest-select">Age Interest</InputLabel>
                <Select
                  labelId ="age-interest-select"
                  id      ="age-interest-select"
                  value   ={ageInterest}
                  label   ="Age Interest"
                  onChange={(e) => {setAgeInterest(e.target.value)}}
                >
                  <MenuItem value="6-12 months">6 - 12 months</MenuItem>
                  <MenuItem value="1-4 years">1 - 4 years</MenuItem>
                  <MenuItem value="5-7 years">5 - 7 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={newActivity}>Add</Button>
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
            {activity.map((activityData, index) => {
              return (
                <TableRow key={activityData.activityId}>
                  <TableCell style={{textAlign: "center"}}>{index + 1}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{activityData.student}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{activityData.date}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{activityData.time}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{activityData.activityType}</TableCell>
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
