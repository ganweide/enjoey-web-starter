// React Imports
import React, { useState, useEffect } from "react";

import Axios from "axios";

import {
  Card,
  Typography,
  Box,
  Button,
  Grid,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  Select,
  TextField,
  CardContent,
} from "@mui/material";

import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, startOfDay, addMinutes } from "date-fns";

import zoomIcon from "./zoom.png";
import meetIcon from "./meet.png";
import phoneIcon from "./phone.png";
import otherIcon from "./other.png";

const Page2 = () => {
  const [meetingName, setMeetingName] = useState("");
  const [allowOptions, setAllowOptions] = useState(true);
  const [duration, setDuration] = useState(30);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [selectedMeetingMethods, setSelectedMeetingMethods] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const meetingMethods = [
    { name: "Zoom", icon: zoomIcon },
    { name: "Meet", icon: meetIcon },
    { name: "Phone", icon: phoneIcon },
    { name: "Direct", icon: otherIcon },
  ];
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Meeting Name"
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={<Switch checked={allowOptions} onChange={(e) => setAllowOptions(e.target.checked)} />}
                  label='Allow Options'
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Duration</InputLabel>
                  <Select
                    label="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <MenuItem value={15}>15 Min</MenuItem>
                    <MenuItem value={30}>30 Min</MenuItem>
                    <MenuItem value={45}>45 Min</MenuItem>
                    <MenuItem value={60}>60 Min</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {allowOptions ? (
                <>
                  <Grid item xs={6} md={6}>
                    <TextField
                      label="Start Time"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      type="time"
                      InputLabelProps ={{ shrink: true }}
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      label="End Time"
                      variant="outlined"
                      margin="dense"
                      type="time"
                      InputLabelProps ={{ shrink: true }}
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      margin="dense"
                      variant="outlined"
                      type="date"
                      InputLabelProps ={{ shrink: true }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      margin="dense"
                      variant="outlined"
                      type="date"
                      InputLabelProps ={{ shrink: true }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={6} md={6}>
                    <TextField
                      label="Time"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      label="Date"
                      margin="dense"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Grid>
                </>
              )}
              <Grid container item xs={12} md={12} spacing={2}>
                {meetingMethods.map((option) => (
                  <Grid item md={3} xs={3} key={option.name}>
                    <Card
                      onClick={() => setSelectedMeetingMethods(option.name)}
                      style={{
                        flex: "0 0 auto",
                        cursor: "pointer",
                        border: `2px solid ${selectedMeetingMethods === option.name ? "#3f51b5" : "#ccc"}`,
                        transition: "border-color 0.3s",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "5px",
                        boxSizing: "border-box",
                      }}
                    >
                      <img
                        src={option.icon}
                        alt={option.name}
                        style={{ width: 35, height: 35, marginBottom: 0 }}
                      />
                      <CardContent>
                        <Typography variant="h6">{option.name}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} md={12}>
                {selectedMeetingMethods === "Zoom" || selectedMeetingMethods === "Meet" ? (
                  <TextField
                    label="Location URL"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={inviteLink}
                    onChange={(e) => setInviteLink(e.target.value)}
                  />
                ) : null}
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    color: "#ffffff",
                  }}
                  disabled={!meetingName || !duration || !selectedMeetingMethods || !locationUrl}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page2;
