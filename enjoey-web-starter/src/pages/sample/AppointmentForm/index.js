// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
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

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

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

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
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
  const [customDateOpen, setCustomDateOpen]               = useState(false);
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
  const [filterDate, setFilterDate]                       = useState("");
  const [filterAgeInterest, setFilterAgeInterest]         = useState("");
  const [filterTime, setFilterTime]                       = useState("");
  const [filteredAppointments, setFilteredAppointments]   = useState([]);
  const [events, setEvents]                               = useState([]);

  const handleFilterDateChange = (e) => {
    const selectedValue = e.target.value;
    setFilterDate(selectedValue);

    if (selectedValue === 'custom') {
      setCustomDateOpen(true);
    } else {
      setCustomDateOpen(false);
    }
  };

  const handleCustomDateClose = () => {
    setCustomDateOpen(false);
  };

  const handleFilterAgeInterestChange = (e) => {
    setFilterAgeInterest(e.target.value);
  };

  const handleFilterTimeChange = (e) => {
    setFilterTime(e.target.value);
  };

  const filterAppointments = () => {
    let filteredData = appointments;

    if (filterAgeInterest) {
      filteredData = filteredData.filter(appointment => appointment.ageInterest === filterAgeInterest);
    }

    if (filterTime) {
      filteredData = filteredData.filter(appointment => appointment.time === filterTime);
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);

    switch (filterDate) {
      case 'this month':
        filteredData = filteredData.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= startDate && appointmentDate <= endDate;
        });
        break;
      case 'last month':
        const lastMonthStartDate = new Date(currentYear, currentMonth - 1, 1);
        const lastMonthEndDate = new Date(currentYear, currentMonth, 0);
        filteredData = filteredData.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= lastMonthStartDate && appointmentDate <= lastMonthEndDate;
        });
        break;
      case 'next month':
        const nextMonthStartDate = new Date(currentYear, currentMonth + 1, 1);
        const nextMonthEndDate = new Date(currentYear, currentMonth + 2, 0);
        filteredData = filteredData.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= nextMonthStartDate && appointmentDate <= nextMonthEndDate;
        });
        break;
      case 'this year':
        filteredData = filteredData.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate.getFullYear() === currentYear;
        });
        break;
      case 'year to date':
        filteredData = filteredData.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= startDate && appointmentDate <= currentDate;
        });
        break;
      case 'last year':
        filteredData = filteredData.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate.getFullYear() === currentYear - 1;
        });
        break;
      case 'custom':
        // Handle custom date range logic here if needed
        break;
      default:
        // No filter selected
    }
    setFilteredAppointments(filteredData);
  };

  useEffect(() => {
    filterAppointments(); // Trigger filtering logic when filter values change
  }, [filterAgeInterest, filterTime, filterDate]);

  const handleReset = () => {
    setFilterDate('');
    setFilterAgeInterest('');
    setFilterTime('');
  };


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
        setFilteredAppointments(response.data);
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

  useEffect(() => {
    const bigCalendarEvents = appointments.map(appointment => {
      const start = moment(appointment.date + appointment.time, "YYYY-MM-DD HH:mm").toDate();
      const end = moment(start).add(1, "hours").toDate();
      const title = appointment.name;
      const time = appointment.time;
      const program = appointment.ageInterest;
      const id = appointment.id;

      return { start, end, title, program, time, id };
    })
    setEvents(bigCalendarEvents);
  }, [appointments]);

  const EventComponent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <div>{event.time}</div>
      <div>{event.program}</div>
    </div>
  );

  EventComponent.propTypes = {
    event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      program: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
  };

  const onEventResize = (data) => {
    const { start, end } = data;

    setEvents((prevEvents) => [
      {
        ...prevEvents[0],
        start,
        end,
      },
    ]);
  };

  const onEventDrop = async (data) => {
    const { start, end } = data;
  
    // Assuming you are only updating the first event
    const formattedDate = moment(start).format("YYYY-MM-DD");
    const updatedEvent = {
      ...events[0],
      date: formattedDate,
      start,
      end,
    };
  
    try {
      // Update the server with the new event information
      await Axios({
        method: "PUT", // Use the appropriate HTTP method for updating
        url: `${appointmentUrl}${updatedEvent.id}/`, // Adjust the URL based on your server API
        data: updatedEvent,
      });
  
      // Update the local state with the new event
      setEvents([updatedEvent, ...events.slice(1)]); // Assuming you are only updating the first event
    } catch (error) {
      console.error("Error updating event:", error);
    }
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
          <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={events}
            localizer={localizer}
            components={{
              event: EventComponent,
            }}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            resizable
            style={{ height: "100vh" }}
          />
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
      {/* Custom Date Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={customDateOpen}
        onClose           ={handleCustomDateClose}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Custom Date Selection</h2>
        </DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCustomDateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCustomDateClose} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Page2;
