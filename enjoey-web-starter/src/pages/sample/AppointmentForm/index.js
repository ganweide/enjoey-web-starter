// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
  Box,
  Typography,
  Tabs,
  Tab,
  Menu,
  IconButton,
} from "@mui/material";

// PropTypes import
import PropTypes from 'prop-types';

// Local Imports
import Styles from "./style";

// Global Constants
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(Styles);
const appointmentUrl  = "http://localhost:8000/api/appointment/";
const timeSlotUrl     = "http://localhost:8000/api/appointment-time-slots/";
const branchUrl       = "http://localhost:8000/api/branch/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHeadAppointments = [" ", "Parent", "Age Interest", "Date", "Time", "Branch", "Phone", "Action"];
  const tableHeadTimeSlots    = [" ", "Branch", "Age Interest", "From", "Till", "Action"];
  const [tab, setTab]                                     = useState(0);
  const [actionMenu, setActionMenu]                       = useState(null);
  const [addAppointmentDialog, setAddAppointmentDialog]   = useState(false);
  const [createTimeSlotsDialog, setCreateTimeSlotsDialog] = useState(false);
  const [appointments, setAppointments]                   = useState([]);
  const [appointmentTimeSlots, setAppointmentTimeSlots]   = useState([]);
  const [branchData, setBranchData]                       = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots]         = useState([]);
  const [filteredAgeInterest, setFilteredAgeInterest]     = useState([]);
  const [filteredBranch, setFilteredBranch]               = useState([]);
  const [refresh, setRefresh]                             = useState([]);
  const [date, setDate]                                   = useState("");
  const [time, setTime]                                   = useState("");
  const [branch, setBranch]                               = useState("");
  const [phone, setPhone]                                 = useState([]);
  const [startTime, setStartTime]                         = useState("09:00");
  const [endTime, setEndTime]                             = useState("17:00");
  const [error, setError]                                 = useState('');
  const [name, setName]                                   = useState([]);
  const [ageInterest, setAgeInterest]                     = useState("");
  const [ageInterestTimeSlots, setAgeInterestTimeSlots]   = useState("");
  const [fromDate, setFromDate]                           = useState("");
  const [tillDate, setTillDate]                           = useState("");
  const [filterAgeInterest, setFilterAgeInterest]         = useState("");
  const [filterTime, setFilterTime]                       = useState("");

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleOpenMenu = (event) => {
    setActionMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setActionMenu(null);
  };

  const getBranchNameById = (branchId) => {
    const branch = branchData.find(branch => branch.branchId === branchId);
    return branch ? branch.branchName : 'Unknown Branch';
  }

  useEffect(() => {
    try {
      Axios.get("http://127.0.0.1:8000/api/appointment/").then((response) => {
        setAppointments(response.data);
      });
      Axios.get("http://127.0.0.1:8000/api/appointment-time-slots/").then((response) => {
        setAppointmentTimeSlots(response.data);
      });
      Axios.get(branchUrl).then((response) => {
        setBranchData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  const openAddAppointmentDialog = async () => {
    setAddAppointmentDialog (true);
  };


  useEffect(() => {
    const filteredAppointments = appointments.filter(appointment => {
      const matchingTimeSlots = appointmentTimeSlots.filter(slot => slot.startTime === appointment.time);
      return (
        appointment.branchId === branch &&
        appointment.ageInterest === ageInterest &&
        appointment.date === date &&
        matchingTimeSlots.length > 0
      )
    });
  
    if (filteredAppointments.length > 0) {
      const appointmentTimes = filteredAppointments.map(appointment => appointment.time);
      const newFilteredTimeSlots = appointmentTimeSlots.map(slot => ({
        ...slot,
        isBooked: appointmentTimes.includes(slot.startTime)
      }));
      setFilteredTimeSlots(newFilteredTimeSlots);
    } else {
      const newFilteredTimeSlots = appointmentTimeSlots.map(slot => ({
        ...slot,
        isBooked: false
      }));
      setFilteredTimeSlots(newFilteredTimeSlots);
    }  
  }, [ageInterest, branch, date]);
  
  useEffect(() => {
    if (ageInterest) {
      const newFilteredBranch = branchData.filter((slot) => {
        const programsArray = slot.branchPrograms.split(',').map((program) => program.trim());
        return programsArray.includes(ageInterest);
      });
      setFilteredBranch(newFilteredBranch);
    } else {
      setFilteredBranch([]);
    }
  }, [ageInterest]);

  useEffect(() => {
    if (branch) {
      const newFilteredAgeInterest = branchData.filter(slot => slot.branchId === branch);
      setFilteredAgeInterest(newFilteredAgeInterest);
    } else {
      setFilteredAgeInterest([]);
    }
  }, [branch]);

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
    setBranch               ("");
    setAgeInterestTimeSlots ("");
    setStartTime            ("09:00");
    setEndTime              ("17:00");
    setCreateTimeSlotsDialog(false);
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
    closeAddAppointmentDialog();
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
    closeCreateTimeSlotsDialog();
  };

  return (
    <Card sx={{ p: 5 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Appointments" {...a11yProps(0)} />
            <Tab label="Time Slots" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
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
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ my: 2 }}alignItems="center">
            <Grid item xs={3.9} md={3.9}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="from-date-picker-label">From</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        labelId="from-date-picker-label"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                        format="dd/MM/yyyy"
                        variant="outlined"
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="till-date-picker-label">Till</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        labelId="till-date-picker-label"
                        value={tillDate}
                        onChange={(date) => setTillDate(date)}
                        format="dd/MM/yyyy"
                        variant="outlined"
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3.9} md={3.9}>
              <FormControl fullWidth>
                <InputLabel id={"age-interest-filter-select"}>Filter Age Interest</InputLabel>
                <Select
                  labelId={'age-interest-filter-select'}
                  id={'age-interest-filter-select'}
                  label="Filter Age Interest"
                  value={filterAgeInterest}
                  onChange={(e) => setFilterAgeInterest(e.target.value)}
                >
                  <MenuItem value="6 - 12 months">6 - 12 months</MenuItem>
                  <MenuItem value="1 - 4 years">1 - 4 years</MenuItem>
                  <MenuItem value="5 - 7 years">5 - 7 years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3.9} md={3.9}>
              <FormControl fullWidth>
                <InputLabel id={"skill-select"}>Filter Time</InputLabel>
                <Select
                  labelId={'time-filter-select'}
                  id={'time-filter-select'}
                  label="Filter Time"
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value)}
                >
                  {appointmentTimeSlots.map((prop) => (
                    <MenuItem key={prop.appointmentId} value={prop.startTime}>{prop.startTime}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={0.3} md={0.3}>
              <IconButton aria-label="reset" fullWidth>
                <RestartAltIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHeadAppointments.map((prop) => (
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
                  <TableCell style={{textAlign: "center", width: "5%"}}>{index + 1}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{prop.name}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{prop.ageInterest}</TableCell>
                  <TableCell style={{textAlign: "center", width: "10%"}}>{prop.date}</TableCell>
                  <TableCell style={{textAlign: "center", width: "10%"}}>{prop.time}</TableCell>
                  <TableCell style={{textAlign: "center", width: "10%"}}>
                    {getBranchNameById(prop.branchId)}
                  </TableCell>
                  <TableCell style={{textAlign: "center", width: "10%"}}>{prop.phone}</TableCell>
                  <TableCell style={{textAlign: "center", width: "10%"}}>
                    <Button
                      id="basic-button"
                      aria-controls={actionMenu ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={Boolean(actionMenu) ? 'true' : undefined}
                      onClick={handleOpenMenu}
                    >
                      <EditIcon />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={actionMenu}
                      open={Boolean(actionMenu)}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={tab} index={1}>
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
              Time Slots Table
            </Typography>
            <Box>
              <Button variant ="contained" onClick ={openCreateTimeSlotsDialog}>
                <Typography variant="button" component="div">
                  + Create Time Slot
                </Typography>
              </Button>
            </Box>
          </Box>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHeadTimeSlots.map((prop) => (
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
              {appointmentTimeSlots.map((prop, index) => (
                <TableRow key={index}>
                  <TableCell style={{textAlign: "center", width: "5%"}}>{index + 1}</TableCell>
                  <TableCell style={{textAlign: "center"}}>
                    {getBranchNameById(prop.branchId)}
                  </TableCell>
                  <TableCell style={{textAlign: "center"}}>{prop.ageInterest}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{prop.startTime}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{prop.endTime}</TableCell>
                  <TableCell style={{textAlign: "center", width: "10%"}}>
                    <Button
                      id="basic-button"
                      aria-controls={actionMenu ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={Boolean(actionMenu) ? 'true' : undefined}
                      onClick={handleOpenMenu}
                    >
                      <EditIcon />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={actionMenu}
                      open={Boolean(actionMenu)}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabPanel>
      </Box>
      {/* Add Appointments Dialog */}
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
                  <MenuItem value="6 - 12 months">6 - 12 months</MenuItem>
                  <MenuItem value="1 - 4 years">1 - 4 years</MenuItem>
                  <MenuItem value="5 - 7 years">5 - 7 years</MenuItem>
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
                  {filteredBranch.map((prop) => (
                    <MenuItem key={prop.branchId} value={prop.branchId}>{prop.branchName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3">Details</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
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
            <Grid item xs={12} md={12}>
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
            <Grid item xs={12} md={12}>
              <Typography variant="h3">Appointment Date & Time</Typography>
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
              <FormControl fullWidth margin="dense">
                {
                  ageInterest === "" && branch === "" && date === "" ? (
                    <InputLabel id="time-select">Please select an Age Interest</InputLabel>
                  ) : ageInterest !== "" && branch === "" && date === "" ? (
                    <InputLabel id="time-select">Please select a Branch</InputLabel>
                  ) : ageInterest !== "" && branch !== "" && date === "" ? (
                    <InputLabel id="time-select">Please select a Date</InputLabel>
                  ) : (
                    <InputLabel id="time-select">Time (24 Hour Format)</InputLabel>
                  )
                }
                <Select
                  labelId ="time-select"
                  id      ="time-select"
                  value   ={time}
                  label   ={
                    ageInterest === "" && branch === "" && date === ""
                    ? ("Please select an Age Interest") : ageInterest !== "" && branch === "" && date === ""
                    ? ("Please select a Branch") : ageInterest !== "" && branch !== "" && date === ""
                    ? ("Please select a Date"): ("Time (24 Hour Format)")
                  }
                  onChange={(e) => {setTime(e.target.value)}}
                  disabled={ageInterest === "" || branch === "" || date === ""}
                >
                  {filteredTimeSlots.map((slot) => (
                    <MenuItem
                      key={slot.startTime}
                      value={slot.startTime}
                      disabled={slot.isBooked}
                    >
                      {slot.startTime}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={newAppointment}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Create Time Slots Dialog */}
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
                  {branchData.map((prop) => (
                    <MenuItem key={prop.branchId} value={prop.branchId}>{prop.branchName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                {branch === ""
                  ? 
                    <InputLabel id="age-interest-select">Please select a Branch</InputLabel>
                  : 
                    <InputLabel id="age-interest-select">Age Interest</InputLabel>}
                <Select
                  labelId ="age-interest-select"
                  id      ="age-interest-select"
                  value   ={ageInterestTimeSlots}
                  label   ={branch === "" ? "Please select a Branch" : "Age Interest"}
                  onChange={(e) => {setAgeInterestTimeSlots(e.target.value)}}
                  disabled={branch === ""}
                >
                  {filteredAgeInterest.map((slot) => {
                    const programsArray = slot.branchPrograms.split(',');
                    return programsArray.map((program, index) => (
                      <MenuItem key={`${slot.branchId}-${index}`} value={program}>
                        {program}
                      </MenuItem>
                    ));
                  })}
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
    </Card>
  );
};

export default Page2;
