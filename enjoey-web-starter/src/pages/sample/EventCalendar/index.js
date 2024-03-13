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
  Avatar,
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

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

const Page2 = () => {
  const [appointments, setAppointments]                   = useState([]);
  const [openEventDetailDialog, setOpenEventDetailDialog] = useState(false);
  const [openAcceptEventDialog, setOpenAcceptEventDialog] = useState(false);
  const [openNewEventDialog, setOpenNewEventDialog]       = useState(false);
  const [show, setShow]                                   = useState(false);
  const [openAddOptionsDialog, setOpenAddOptionsDialog]   = useState(false);
  const [showTextfield, setShowTextfield]                 = useState(false);
  const [showRadio, setShowRadio]                         = useState(false);
  const [showSelect, setShowSelect]                       = useState(false);
  const [coverImg, setCoverImg]                           = useState("");
  const [title, setTitle]                                 = useState("");
  const [category, setCategory]                           = useState("");
  const [startDate, setStartDate]                         = useState("");
  const [endDate, setEndDate]                             = useState("");
  const [startTime, setStartTime]                         = useState("");
  const [endTime, setEndTime]                             = useState("");
  const [receipt, setReceipt]                             = useState("");
  const [display, setDisplay]                             = useState("");
  const [question, setQuestion]                           = useState("");
  const [radioTitle, setRadioTitle]                       = useState("");
  const [radioItems, setRadioItems]                       = useState([{ id: 1, value: '' }]);
  const [selectTitle, setSelectTitle]                     = useState("");
  const [selectItems, setSelectItems]                     = useState([{ id: 1, value: '' }]);
  const [idCounter, setIdCounter]                         = useState(1);
  const [savedOptions, setSavedOptions]                   = useState([]);
  const [events, setEvents]                               = useState([]);
  const [eventList, setEventList]                         = useState([]);
  const [selectedEvent, setSelectedEvent]                 = useState([]);

  const handleDateClick = date => {
    const filteredEvents = events.filter(event =>
      moment(event.start).isSame(moment(date.start), 'day')
    );
    setEventList(filteredEvents);
  };

  const handleOpenEventDetailDialog = async (event) => {
    setSelectedEvent(event);
    setOpenEventDetailDialog(true);
  };

  const handleCloseEventDetailDialog = async () => {
    setOpenEventDetailDialog(false);
  }

  const handleOpenAcceptEventDialog = async() => {
    setOpenAcceptEventDialog(true);
  }

  const handleCloseAcceptEventDialog = async() => {
    setOpenAcceptEventDialog(false);
    setOpenEventDetailDialog(false);
  }

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

      return { start, end, title, category, coverImg, savedOptions, receipt };
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
    setReceipt("");
    setSavedOptions([]);
    setShow(false);
    setOpenNewEventDialog(false);
  }

  const handleSaveNewEventDialog = () => {
    const newAppointment = {
      coverImg,
      title,
      category,
      startDate,
      endDate,
      startTime,
      endTime,
      receipt,
      savedOptions,
    };

    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);

    setCoverImg("");
    setTitle("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setReceipt("");
    setSavedOptions([]);
    setShow(false);
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
                onSelectEvent={(event) => {
                  handleDateClick(event);
                }}
                resizable
                style={{ height: "200vh" }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={3.6} md={3.6}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
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
              </Grid>
              {eventList.map(event => (
                <Grid item xs={12} md={12} key={event.title} onClick={() => handleOpenEventDetailDialog(event)} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Box sx={{ mr: 5 }}>
                    <div>
                      {event.coverImg ? <Avatar alt='Cover Image' src={URL.createObjectURL(event.coverImg)} /> : <Avatar sx={{ bgcolor: "#00FFFF" }}>{event.title.charAt([0])}</Avatar>}
                    </div>
                  </Box>
                  <Box>
                    <div>{event.title}</div>
                    <div>{moment(event.start).format('YYYY-MM-DD')} - {moment(event.end).format('YYYY-MM-DD')}</div>
                    <div>{moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</div>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {/* Event Detail Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={openEventDetailDialog}
        onClose           ={handleCloseEventDetailDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>{selectedEvent.title}</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Box>
                {selectedEvent.coverImg && <img src={URL.createObjectURL(selectedEvent.coverImg)} alt="Cover Image" className="coverImage" />}
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <div>{selectedEvent.title}</div>
              <div>{moment(selectedEvent.startDate).format('YYYY-MM-DD')} - {moment(selectedEvent.endDate).format('YYYY-MM-DD')}</div>
              <div>{moment(selectedEvent.startTime).format('HH:mm')} - {moment(selectedEvent.endTime).format('HH:mm')}</div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleOpenAcceptEventDialog}><EventAvailableIcon />Accept</Button>
          <Button onClick={handleOpenAcceptEventDialog}><HelpCenterIcon />Tentative</Button>
          <Button color="error" onClick={handleCloseEventDetailDialog}><EventBusyIcon />Decline</Button>
        </DialogActions>
      </Dialog>
      {/* Accept Event Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={openAcceptEventDialog}
        onClose           ={handleCloseAcceptEventDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>{selectedEvent.title}</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {selectedEvent.savedOptions?.map((event, index) => (
              <Grid item xs={12} md={12} key={index}>
                {event.display === "textfield" && (
                  <TextField
                    margin="dense"
                    label={event.question}
                    type="text"
                    fullWidth
                    variant="outlined"
                    value=""
                  />
                )}
                {event.display === 'radio' && (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{event.radioTitle}</FormLabel>
                    <RadioGroup>
                      {event.radioItems.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          value={item.value}
                          control={<Radio />}
                          label={item.value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
                {event.display === 'select' && (
                  <FormControl fullWidth>
                    <InputLabel id="select-label">{event.selectTitle}</InputLabel>
                    <Select labelId="select-label" id="select-label" label="Select Items">
                      {event.selectItems.map((item) => (
                        <MenuItem key={item.id} value={item.value}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleCloseAcceptEventDialog}>Done</Button>
        </DialogActions>
      </Dialog>
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
                  // eslint-disable-next-line
                  <div {...getRootProps()} className="dropzone">
                    {/* eslint-disable-next-line */}
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
              <Button fullWidth onClick={handleShowAdvancedSettings} disabled={category !== 'physical'}>Advanced Settings {show ? <ExpandLess /> : <ExpandMore />}</Button>
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
