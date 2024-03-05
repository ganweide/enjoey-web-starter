// React Imports
import React, { useEffect, useState, useCallback } from "react";

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

// Dropzone Imports
import Dropzone from 'react-dropzone';

// React Big Calendar Imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer       = momentLocalizer(moment);
const DnDCalendar     = withDragAndDrop(Calendar);
// const appointmentUrl  = "http://localhost:8000/api/appointment/";

const Page2 = () => {
  const [appointments, setAppointments]                 = useState([]);
  const [openNewEventDialog, setOpenNewEventDialog]     = useState(false);
  const [show, setShow]                                 = useState(false);
  const [openAddOptionsDialog, setOpenAddOptionsDialog] = useState(false);
  const [showTextfield, setShowTextfield]               = useState(false);
  const [showRadio, setShowRadio]                       = useState(false);
  const [showSelect, setShowSelect]                     = useState(false);
  const [coverImg, setCoverImg]                         = useState("");
  const [title, setTitle]                               = useState("");
  const [category, setCategory]                         = useState("");
  const [startDate, setStartDate]                       = useState("");
  const [endDate, setEndDate]                           = useState("");
  const [startTime, setStartTime]                       = useState("");
  const [endTime, setEndTime]                           = useState("");
  const [receipt, setReceipt]                           = useState("");
  const [display, setDisplay]                           = useState("");
  const [question, setQuestion]                         = useState("");
  const [radioTitle, setRadioTitle]                     = useState("");
  const [radioItems, setRadioItems]                     = useState([{ id: 1, value: '' }]);
  const [selectTitle, setSelectTitle]                   = useState("");
  const [selectItems, setSelectItems]                   = useState([{ id: 1, value: '' }]);
  const [idCounter, setIdCounter]                       = useState(1);
  const [savedOptions, setSavedOptions]                 = useState([]);
  const [events, setEvents]                             = useState([]);
  const [refresh, setRefresh]                           = useState([]);

  // Dnd Big Calendar
  useEffect(() => {
    const bigCalendarEvents = appointments.map(appointment => {
      const start = moment(appointment.startDate + appointment.startTime, "YYYY-MM-DD HH:mm").toDate();
      const end = moment(appointment.endDate + appointment.endTime, "YYYY-MM-DD HH:mm").toDate();
      const title = appointment.title;
      const category = appointment.category;
      const coverImg = appointment.coverImg;
      const savedOptions = appointment.savedOptions;
      const receipt = appointment.receipt;

      return { start, end, title, category, coverImg, savedOptions };
    })
    setEvents(bigCalendarEvents);
  }, [appointments]);

  const EventComponent = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <div>{event.category}</div>
    </div>
  );

  EventComponent.propTypes = {
    event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      program: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }).isRequired,
  };
  
  // Dialog Constants
  //// New Event Dialog
  const handleOpenNewEventDialog = async () => {
    setOpenNewEventDialog (true);
  };

  const handleCloseNewEventDialog = async () => {
    setCoverImg("");
    setTitle("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setSavedOptions([]);
    setOpenNewEventDialog(false);
  }

  const handleSaveNewEventDialog = () => {
    // Save the inputted data
    const newAppointment = {
      coverImg,
      title,
      category,
      startDate,
      endDate,
      startTime,
      endTime,
      receipt,
      savedOptions, // Assuming savedOptions is an array of objects with necessary data
    };

    // Update the appointments state
    setRefresh((prevAppointments) => [...prevAppointments, newAppointment]);
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);

    // Close the dialog
    setCoverImg("");
    setTitle("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setSavedOptions([]);
    setOpenNewEventDialog(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const imageFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    setCoverImg(imageFiles[0]);
  }, []);

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
    setRadioTitle("")
    setRadioItems([{ id: 1, value: '' }]);
    setSelectTitle("");
    setSelectItems([{ id: 1, value: '' }]);
    setShowTextfield(false);
    setShowRadio(false);
    setShowSelect(false);
    setOpenAddOptionsDialog(false);
  }

  const handleSaveAddOptionsDialog = () => {
    const newOption = {
      display,
      question,
      radioItems: display === 'radio' ? radioItems : [],
      selectItems: display === 'select' ? selectItems : [],
      radioTitle: display === 'radio' ? radioTitle : '',
      selectTitle: display === 'select' ? selectTitle : '',
    };
  
    setSavedOptions((prevOptions) => [...prevOptions, newOption]);
  
    setDisplay("");
    setQuestion("");
    setRadioTitle("");
    setRadioItems([{ id: 1, value: '' }]);
    setSelectTitle("");
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

  const handleShowAdvancedSettings = () => {
    setShow(!show);
  }

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
              <Dropzone onDrop={onDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {coverImg ? (
                      <img src={URL.createObjectURL(coverImg)} alt="CoverImg" className="coverImage" />
                    ) : (
                      <p>Drag &apos;n&apos; drop an image here, or click to select a file</p>
                    )}
                  </div>
                )}
              </Dropzone>
            </Grid>
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
                value={startDate}
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
                value={endDate}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps ={{ shrink: true }}
                onChange={(e) => setStartTime(e.target.value)}
                margin="dense"
                label="Start Time"
                type="time"
                fullWidth
                variant="outlined"
                value={startTime}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                InputLabelProps ={{ shrink: true }}
                onChange={(e) => setEndTime(e.target.value)}
                margin="dense"
                label="End Time"
                type="time"
                fullWidth
                variant="outlined"
                value={endTime}
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
                          <FormLabel component="legend">{option.radioTitle}</FormLabel>
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
                          <InputLabel id="select-label">{option.selectTitle}</InputLabel>
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
          <Button color="error" onClick={handleCloseNewEventDialog}>Cancel</Button>
          <Button onClick={handleSaveNewEventDialog}>Save</Button>
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
                  <Grid item xs={12} md={12}>
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
                <Grid item xs={12} md={12}>
                  <TextField
                    onChange={(e) => setRadioTitle(e.target.value)}
                    margin="dense"
                    label="Radio Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={radioTitle}
                  />
                </Grid>
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
                <Grid item xs={12} md={12}>
                  <TextField
                    onChange={(e) => setSelectTitle(e.target.value)}
                    margin="dense"
                    label="Select Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={selectTitle}
                  />
                </Grid>
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
