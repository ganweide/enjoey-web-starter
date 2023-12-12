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
const appointmentUrl = "http://localhost:8000/api/appointment/";
const timeSlotUrl = "http://localhost:8000/api/appointment-time-slots/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Parent", "Date", "Time", "Age Interest"];
  const [addAppointmentDialog, setAddAppointmentDialog]   = useState(false);
  const [createTimeSlotsDialog, setCreateTimeSlotsDialog] = useState(false);
  const [appointments, setAppointments]                   = useState([]);
  const [appointmentTimeSlots, setAppointmentTimeSlots]   = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [refresh, setRefresh]                             = useState([]);
  const [date, setDate]                                   = useState([]);
  const [time, setTime]                                   = useState([]);
  const [branch, setBranch]                               = useState([]);
  const [phone, setPhone]                                 = useState([]);
  const [startTime, setStartTime]                         = useState("09:00");
  const [endTime, setEndTime]                             = useState("17:00");
  const [error, setError]                                 = useState('');
  const [name, setName]                                   = useState([]);
  const [ageInterest, setAgeInterest]                     = useState([]);
  const [ageInterestTimeSlots, setAgeInterestTimeSlots]   = useState([]);

  useEffect(() => {
    try {
      Axios.get("http://127.0.0.1:8000/api/appointment/").then((response) => {
        setAppointments(response.data);
      });

      Axios.get("http://127.0.0.1:8000/api/appointment-time-slots/").then((response) => {
        setAppointmentTimeSlots(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  const openAddAppointmentDialog = async () => {
    setAddAppointmentDialog (true);
  };

  useEffect(() => {
    if (ageInterest) {
      const newFilteredTimeSlots = appointmentTimeSlots.filter(slot => slot.ageInterest === ageInterest);
      setFilteredTimeSlots(newFilteredTimeSlots);
    } else {
      setFilteredTimeSlots([]);
    }
  }, [ageInterest]);

  const closeAddAppointmentDialog = async () => {
    setDate                 ("");
    setTime                 ("");
    setBranch               ("");
    setName                 ("");
    setPhone                ("");
    setAgeInterest          ("");
    setAddAppointmentDialog(false);
  }

  const openCreateTimeSlotsDialog = () => {
    setCreateTimeSlotsDialog (true);
  }

  const validateTimeRange = (selectedStartTime, selectedEndTime) => {
    const minTime = '09:00';
    const maxTime = '17:00';

    if (selectedStartTime < minTime || selectedEndTime > maxTime) {
      setError('Selected time must be within 9:00 am to 5:00 pm.');
    } else {
      setError('');
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    validateTimeRange(e.target.value, endTime);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    validateTimeRange(startTime, e.target.value);
  };

  const closeCreateTimeSlotsDialog = () => {
    setBranch     ("");
    setAgeInterestTimeSlots("");
    setStartTime  ("");
    setEndTime    ("");
    setCreateTimeSlotsDialog (false);
  }

  const newAppointment = async () => {
    const appointmentData = new FormData();
    appointmentData.append("name", name);
    appointmentData.append("ageInterest", ageInterest);
    appointmentData.append("branchId", branch);
    appointmentData.append("time", time);
    appointmentData.append("date", date);
    appointmentData.append("phone", phone);

    try {
      const response = await Axios({
        method  : "POST",
        url     : appointmentUrl,
        data    : appointmentData,
        headers : {"Content-Type": "multipart/form-data"},
      });
      setRefresh(response.data)
    } catch (error) {
      console.log("error", error);
    }
    setAddAppointmentDialog(false);
  };

  const newTimeSlot = async () => {
    const timeSlotData = new FormData();
    timeSlotData.append("branchId", branch);
    timeSlotData.append("ageInterest", ageInterestTimeSlots);
    timeSlotData.append("startTime", startTime);
    timeSlotData.append("endTime", endTime);

    try {
      const response = await Axios({
        method  : "POST",
        url     : timeSlotUrl,
        data    : timeSlotData,
        headers : {"Content-Type": "multipart/form-data"},
      });
      setRefresh(response.data)
    } catch (error) {
      console.log("error", error);
    }
    setCreateTimeSlotsDialog(false);
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
        fullWidth
        maxWidth          ="sm"
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
              <FormControl fullWidth margin="dense">
                <InputLabel id="time-select">Time</InputLabel>
                <Select
                  labelId ="time-select"
                  id      ="time-select"
                  value   ={time}
                  label   ="Time"
                  onChange={(e) => {setTime(e.target.value)}}
                >
                  {filteredTimeSlots.map((slot) => (
                    <MenuItem key={slot.startTime} value={slot.startTime}>
                      {slot.startTime}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          <Button onClick={newAppointment}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={createTimeSlotsDialog}
        onClose           ={closeCreateTimeSlotsDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Create Time Slots</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
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
                  onChange={(e) => {setAgeInterestTimeSlots(e.target.value)}}
                >
                  <MenuItem value="6-12 months">6 - 12 months</MenuItem>
                  <MenuItem value="1-4 years">1 - 4 years</MenuItem>
                  <MenuItem value="5-7 years">5 - 7 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3">Time</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => handleStartTimeChange(e)}
                InputLabelProps={{ shrink: true }}
                margin="dense"
                label="From"
                type="time"
                fullWidth
                variant="outlined"
                value={startTime}
                error={error !== ''}
                helperText={error}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange={(e) => handleEndTimeChange(e)}
                InputLabelProps={{ shrink: true }}
                margin="dense"
                label="To"
                type="time"
                fullWidth
                variant="outlined"
                value={endTime}
                error={error !== ''}
                helperText={error}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={newTimeSlot}>Save</Button>
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
            {appointments.map((prop, index) => (
              <TableRow key={index}>
                <TableCell style={{textAlign: "center"}}>{index + 1}</TableCell>
                <TableCell style={{textAlign: "center"}}>{prop.name}</TableCell>
                <TableCell style={{textAlign: "center"}}>{prop.date}</TableCell>
                <TableCell style={{textAlign: "center"}}>{prop.time}</TableCell>
                <TableCell style={{textAlign: "center"}}>{prop.ageInterest}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
