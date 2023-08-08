// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

// Global Constants
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const [open, setOpen]                     = useState(false);
  const [settings, setSettings]             = useState(false);
  const [create, setCreate]                 = useState(false);
  const [showResult, setShowResult]         = useState([]);
  const [recipientType, setRecipientType]   = useState([]);
  const [sendTo, setSendTo]                 = useState([]);
  const [selectClass, setSelectClass]       = useState([]);
  const [schoolName, setSchoolName]         = useState([]);
  const [child, setChild]                   = useState([]);
  const [student, setStudent]               = useState([]);
  const [surveyTitle, setSurveyTitle]       = useState([]);
  const [description, setDescription]       = useState([]);
  const [surveyType, setSurveyType]         = useState([]);
  const [startDate, setStartDate]           = useState([]);
  const [endDate, setEndDate]               = useState([]);

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
    setRecipientType("");
    setSendTo       ("");
    setSelectClass  ("");
  };

  const openSettings = async () => {
    setSettings   (true);
    setShowResult ("");
  }

  const closeSettings = async () => {
    setSettings(false);
  }

  const renderGrid = () => {
    if (sendTo === "class") {
      return (
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="class-select">Select Class</InputLabel>
            <Select
              labelId="class-select"
              id="class-select"
              value={selectClass}
              label="Select Class"
              onChange={(e) => setSelectClass(e.target.value)}
            >
              <MenuItem value ="hibiscus">Hibiscus Room</MenuItem>
              <MenuItem value ="banana">Banana Room</MenuItem>
              <MenuItem value ="kitty">Kitty Room</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )
    } else if (sendTo === "school") {
      return (
        <Grid item xs={12} md={12}>
          <TextField
            onChange  ={(e) => setSchoolName(e.target.value)}
            margin    ="dense"
            label     ="Typing School Name"
            type      ="string"
            fullWidth
            variant   ="outlined"
            value     ={schoolName}
          />
        </Grid>
      )
    } else if (sendTo === "customise-list") {
      return (
        <>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="class-select">Select Class</InputLabel>
              <Select
                labelId="class-select"
                id="class-select"
                value={selectClass}
                label="Select Class"
                onChange={(e) => setSelectClass(e.target.value)}
              >
                <MenuItem value ="hibiscus">Hibiscus Room</MenuItem>
                <MenuItem value ="banana">Banana Room</MenuItem>
                <MenuItem value ="kitty">Kitty Room</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
        </>
      )
    }
    return null;
  }

  const closeDialog = async () => {
    setOpen(false);
  }

  const openCreate = async () => {
    setOpen(false);
    setCreate(true);
  }

  const addQuestion = () => {
    return (
      <Grid item xs={12} md={12}>
        <FormControl fullWidth>
          <InputLabel id="class-select">Select Class</InputLabel>
          <Select
            labelId="class-select"
            id="class-select"
            value={selectClass}
            label="Select Class"
            onChange={(e) => setSelectClass(e.target.value)}
          >
            <MenuItem value ="hibiscus">Hibiscus Room</MenuItem>
            <MenuItem value ="banana">Banana Room</MenuItem>
            <MenuItem value ="kitty">Kitty Room</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )
  }

  const closeCreate = async () => {
    setCreate(false);
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
          Survey Settings
        </Typography>
        <Button variant ="contained" onClick ={openDialog}>
          <Typography variant="button" component="div">
            + Compose
          </Typography>
        </Button>
      </Box>
      {/* Initialise Survey */}
      <Dialog
        fullWidth
        open              ={open}
        onClose           ={closeDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8} md={8}>
              <h2>Surveys</h2>
            </Grid>
            <Grid item xs={4} md={4} container justifyContent="flex-end">
              <Button endIcon={<SettingsIcon />} onClick={openSettings}>
                Survey Settings
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="recipient-type-select">Recipient Type</InputLabel>
                <Select
                  labelId="recipient-type-select"
                  id="recipient-type-select"
                  value={recipientType}
                  label="Recipient Type"
                  onChange={(e) => setRecipientType(e.target.value)}
                >
                  <MenuItem value ="student">Student</MenuItem>
                  <MenuItem value ="parent">Parent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="send-select">Send To</InputLabel>
                <Select
                  labelId="send-select"
                  id="send-select"
                  value={sendTo}
                  label="Send To"
                  onChange={(e) => setSendTo(e.target.value)}
                >
                  <MenuItem value ="class">Class</MenuItem>
                  <MenuItem value ="school">School</MenuItem>
                  <MenuItem value ="customise-list">Customise List</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {renderGrid()}
            <Grid item xs={12} md={12}>
              <TextField
                onChange  ={(e) => setSurveyTitle(e.target.value)}
                margin    ="dense"
                label     ="Survey Title"
                type      ="string"
                fullWidth
                variant   ="outlined"
                value     ={surveyTitle}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange  ={(e) => setDescription(e.target.value)}
                margin    ="dense"
                label     ="Description"
                type      ="string"
                fullWidth
                variant   ="outlined"
                value     ={description}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="survey-type-select">Survey Type</InputLabel>
                <Select
                  labelId="survey-type-select"
                  id="survey-type-select"
                  value={surveyType}
                  label="Survey Type"
                  onChange={(e) => setSurveyType(e.target.value)}
                >
                  <MenuItem value ="class">One-Time Survey</MenuItem>
                  <MenuItem value ="school">Campaign</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setStartDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Start Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={startDate}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setEndDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="End Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={endDate}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCreate}>Next</Button>
        </DialogActions>
      </Dialog>
      {/* Survey Settings */}
      <Dialog
        fullWidth
        open              ={settings}
        onClose           ={closeSettings}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Survey Settings</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Include withdrawn students"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="This survey will be anonymouse"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="show-result-select">Show survey result to</InputLabel>
                <Select
                  labelId="show-result-select"
                  id="show-result-select"
                  value={showResult}
                  label="Show surevey result to"
                  onChange={(e) => setShowResult(e.target.value)}
                >
                  <MenuItem value ="all">All</MenuItem>
                  <MenuItem value ="hq admins & school admins">HQ Admins & School Admins</MenuItem>
                  <MenuItem value ="hq admins only">HQ Admins Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSettings}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Survey Questions */}
      <Dialog
        maxWidth          ="xl"
        fullWidth
        open              ={create}
        onClose           ={closeCreate}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2" gutterBottom>Create Questions</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid container xs={2} md={2}>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Radio Button Group</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Rating Scale</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Checkboxes</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Dropdown</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Multi-Select Dropdown</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Yes/No Boolean</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Date</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Time</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Short Answers</Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button style={{ width:"100%", height:"100%" }}>Paragraph</Button>
              </Grid>
            </Grid>
            <Grid item xs={10} md={10}>
              <Grid item xs={12} md={12}>
                <TextField
                  onChange  ={(e) => setSurveyTitle(e.target.value)}
                  margin    ="dense"
                  label     ="Survey Title"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={surveyTitle}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  onChange  ={(e) => setDescription(e.target.value)}
                  margin    ="dense"
                  label     ="Description"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={description}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Divider variant="middle" />
              </Grid>
              {addQuestion()}
              <Grid item xs={12} md={12}>
                <Button variant="contained" style={{ width:"100%", height:"100%" }} onClick={addQuestion}>
                  Add Question
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCreate}>Next</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page2;
