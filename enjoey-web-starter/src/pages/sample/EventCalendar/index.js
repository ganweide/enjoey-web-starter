// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  Box,
  Typography,
  Collapse,
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// PropTypes Imports
import PropTypes from 'prop-types';

// Local Imports
import TipTapEditor from "./TipTapEditor";

// React Big Calendar Imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer       = momentLocalizer(moment);
const DnDCalendar     = withDragAndDrop(Calendar);
const appointmentUrl  = "http://localhost:8000/api/appointment/";
const timeSlotUrl     = "http://localhost:8000/api/appointment-time-slots/";
const branchUrl       = "http://localhost:8000/api/branch/";

const Page2 = () => {
  const [openNewEventDialog, setOpenNewEventDialog]       = useState(false);
  const [show, setShow] = useState(false);
  const [openAddOptionsDialog, setOpenAddOptionsDialog]       = useState(false);
  const [showTextfield, setShowTextfield] = useState(false);
  const [showRadio, setShowRadio] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
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
  const [title, setTitle]               = useState("");
  const [category, setCategory]         = useState("");
  const [startDate, setStartDate]       = useState("");
  const [endDate, setEndDate]           = useState("");
  const [receipt, setReceipt]           = useState("");
  const [display, setDisplay]           = useState("");
  const [question, setQuestion]         = useState("");
  const [radioItems, setRadioItems]     = useState([{ id: 1, value: '' }]);
  const [selectItems, setSelectItems]   = useState([{ id: 1, value: '' }]);
  const [idCounter, setIdCounter]       = useState(1);
  const [savedOptions, setSavedOptions] = useState([]);
  const [ageInterest, setAgeInterest]                     = useState("");
  const [events, setEvents]                               = useState([]);

  useEffect(() => {
    try {
      Axios.get(appointmentUrl).then((response) => {
        setAppointments(response.data);
      });
      Axios.get(timeSlotUrl).then((response) => {
        setAppointmentTimeSlots(response.data);
      });
      Axios.get(branchUrl).then((response) => {
        setBranchData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  // Dnd Big Calendar
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

  const onEventDrop = async (data) => {
    const { start, end, event } = data;
  
    // Assuming you are only updating the first event
    const formattedDate = moment(start).format("YYYY-MM-DD");
    const updatedEvent = {
      ...event,
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
      setEvents((prevEvents) => 
        prevEvents.map((prevEvent) => 
          prevEvent.id === updatedEvent.id ? updatedEvent : prevEvent
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  
  // Dialog Constants
  //// New Event Dialog
  const handleOpenNewEventDialog = async () => {
    setOpenNewEventDialog (true);
  };

  const handleCloseNewEventDialog = async () => {
    setDate                 ("");
    setTime                 ("");
    setBranch               ("");
    setPhone                ("");
    setAgeInterest          ("");
    setOpenNewEventDialog(false);
  }

  const handleDeleteOption = (index) => {
    const updatedOptions = [...savedOptions];
    updatedOptions.splice(index, 1);
    setSavedOptions(updatedOptions);
  };

  const handleOpenAddOptionsDialog = async () => {
    setOpenAddOptionsDialog (true);
  };

  const handleCloseAddOptionsDialog = async () => {
    setDisplay("");
    setQuestion("");
    setRadioItems([{ id: 1, value: '' }]);
    setSelectItems([{ id: 1, value: '' }]);
    setShowTextfield(false);
    setShowRadio(false);
    setShowSelect(false);
    setOpenAddOptionsDialog(false);
  }

  const handleSaveAddOptionsDialog = () => {
    // Save the data based on display, question, radioItems, selectItems
    const newOption = {
      display,
      question,
      radioItems: display === 'radio' ? radioItems : [],
      selectItems: display === 'select' ? selectItems : [],
    };
  
    // Update the savedOptions state with the new option
    setSavedOptions((prevOptions) => [...prevOptions, newOption]);
  
    // Close the dialog
    setDisplay("");
    setQuestion("");
    setRadioItems([{ id: 1, value: '' }]);
    setSelectItems([{ id: 1, value: '' }]);
    setShowTextfield(false);
    setShowRadio(false);
    setShowSelect(false);
    setOpenAddOptionsDialog(false);
  };

  const handleDisplayChange = (e) => {
    setDisplay(e.target.value);

    setShowTextfield(false);
    setShowRadio(false);
    setShowSelect(false);

    if (e.target.value === 'textfield') {
      setShowTextfield(true);
    } else if (e.target.value === 'radio') {
      setShowRadio(true);
    } else if (e.target.value === 'select') {
      setShowSelect(true);
    }
  };

  const handleRadioItemChange = (id, value) => {
    setRadioItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleAddRadioItems = () => {
    setIdCounter((prevCounter) => prevCounter + 1);
    setRadioItems((prevItems) => [
      ...prevItems,
      { id: idCounter + 1, value: '' },
    ]);
  };

  const handleDeleteRadioItem = (id) => {
    setRadioItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const handleSelectItemChange = (id, value) => {
    setSelectItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleAddSelectItems = () => {
    setIdCounter((prevCounter) => prevCounter + 1);
    setSelectItems((prevItems) => [
      ...prevItems,
      { id: idCounter + 1, value: '' },
    ]);
  };

  const handleDeleteSelectItem = (id) => {
    setSelectItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Filters For Dialog
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

  const handleShowAdvancedSettings = () => {
    setShow(!show);
  }
  
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8.4} md={8.4}>
          <Card sx={{ p: 5 }}>
            <Box sx={{ width: '100%' }}>
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
                  School Calendar
                </Typography>
                <Box>
                  <Button variant ="contained" onClick ={handleOpenNewEventDialog}>
                    <Typography variant="button" component="div">
                      + New Event
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
                resizable
                style={{ height: "200vh" }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={3.6} md={3.6}>
          <Card sx={{ p: 5 }}>
            <Box sx={{ width: '100%' }}>
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
                  Events List
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* New Event Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={openNewEventDialog}
        onClose           ={handleCloseNewEventDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Compose : Events</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={title}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="category-select">Category</InputLabel>
                <Select
                  labelId ="category-select"
                  id      ="category-select"
                  value   ={category}
                  label   ="Category"
                  onChange={(e) => {setCategory(e.target.value)}}
                >
                  <MenuItem value="physical">Physical</MenuItem>
                  <MenuItem value="virtual">Virtual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps ={{ shrink: true }}
                onChange={(e) => setStartDate(e.target.value)}
                margin="dense"
                label="Start Date"
                type="date"
                fullWidth
                variant="outlined"
                value={startDate || getCurrentDate()}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps ={{ shrink: true }}
                onChange={(e) => setEndDate(e.target.value)}
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
                variant="outlined"
                value={endDate || getCurrentDate()}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button fullWidth onClick={handleShowAdvancedSettings}>Advanced Settings {show ? <ExpandLess /> : <ExpandMore />}</Button>
            </Grid>
            <Grid item xs={12} md={12}>
              <Collapse in={show} timeout="auto" unmountOnExit>
                {savedOptions.map((option, index) => (
                  <Grid item container spacing={2} xs={12} md={12} key={index}>
                    <Grid item xs={11} md={11} key={index}>
                      {option.display === 'textfield' && (
                        <TextField
                          margin="dense"
                          label={option.question}
                          type="text"
                          fullWidth
                          variant="outlined"
                          value=""
                          disabled
                        />
                      )}
                      {option.display === 'radio' && (
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Radio Items</FormLabel>
                          <RadioGroup>
                            {option.radioItems.map((item) => (
                              <FormControlLabel
                                key={item.id}
                                value={item.value}
                                control={<Radio />}
                                label={item.value}
                                disabled
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                      {option.display === 'select' && (
                        <FormControl fullWidth>
                          <InputLabel id="select-label">Select Items</InputLabel>
                          <Select labelId="select-label" id="select-label" label="Select Items" disabled>
                            {option.selectItems.map((item) => (
                              <MenuItem key={item.id} value={item.value}>
                                {item.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Grid>
                    <Grid item xs={1} md={1}>
                      <Button color="error" style={{ width: "100%", height: "100%" }} onClick={() => handleDeleteOption(index)}><DeleteIcon /></Button>
                    </Grid>
                  </Grid>
                ))} 
                <Grid item xs={12} md={12}>
                  <Button fullWidth onClick={handleOpenAddOptionsDialog}>Add Options <AddIcon /></Button>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="receipt-label">Receipt</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="receipt-label"
                  value           ={receipt}
                  onChange        ={(e) => setReceipt(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="to-school"
                      control={<Radio />}
                      label="To School"
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="to-all-staff-only"
                      control={<Radio />}
                      label="To All Staff Only"
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="to-all-parents-only"
                      control={<Radio />}
                      label="To All Parents Only"
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="individual-classroom"
                      control={<Radio />}
                      label="Individual Classroom"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TipTapEditor />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewEventDialog}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* New Options Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={openAddOptionsDialog}
        onClose           ={handleCloseAddOptionsDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Options</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="display-select">Display</InputLabel>
                <Select
                  labelId ="display-select"
                  id      ="display-select"
                  value   ={display}
                  label   ="Display"
                  onChange={(e) => handleDisplayChange(e)}
                >
                  <MenuItem value="textfield">Textfield</MenuItem>
                  <MenuItem value="radio">Radio</MenuItem>
                  <MenuItem value="select">Select</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Collapse in={showTextfield} timeout="auto" unmountOnExit>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <TextField
                      onChange={(e) => setQuestion(e.target.value)}
                      margin="dense"
                      label="Question"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={question}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12} md={12}>
              <Collapse in={showRadio} timeout="auto" unmountOnExit>
                {radioItems.map((item) => (
                  <Grid container item xs={12} md={12} key={item.id}>
                    <Grid item xs={11} md={11}>
                      <TextField
                        onChange={(e) => handleRadioItemChange(item.id, e.target.value)}
                        margin="dense"
                        label="Radio Items"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={item.value}
                      />
                    </Grid>
                    <Grid item xs={1} md={1}>
                      <Button color="error" style={{ width: "100%", height: "100%" }} onClick={() => handleDeleteRadioItem(item.id)}><DeleteIcon /></Button>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} md={12}>
                  <Button fullWidth onClick={handleAddRadioItems}>
                    Add Radio Items <AddIcon />
                  </Button>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12} md={12}>
              <Collapse in={showSelect} timeout="auto" unmountOnExit>
                {selectItems.map((item) => (
                  <Grid container item xs={12} md={12} key={item.id}>
                    <Grid item xs={11} md={11}>
                      <TextField
                        onChange={(e) => handleSelectItemChange(item.id, e.target.value)}
                        margin="dense"
                        label="Select Items"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={item.value}
                      />
                    </Grid>
                    <Grid item xs={1} md={1}>
                      <Button color="error" style={{ width: "100%", height: "100%" }} onClick={() => handleDeleteSelectItem(item.id)}><DeleteIcon /></Button>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} md={12}>
                  <Button fullWidth onClick={handleAddSelectItems}>
                    Add Select Items <AddIcon />
                  </Button>
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleCloseAddOptionsDialog}>Cancel</Button>
          <Button variant="outlined" onClick={handleSaveAddOptionsDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page2;
