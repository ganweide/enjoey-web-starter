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
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Typography,
  Box,
} from "@mui/material";

// Local Imports
import Styles from "./style";
import { parseTwoDigitYear } from "moment";

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Student", "Date", "Time", "Type"];

  const [open, setOpen]             = useState(false);
  const [child, setChild]           = useState([]);
  const [student, setStudent]       = useState([]);
  const [date, setDate]             = useState([]);
  const [time, setTime]             = useState([]);
  const [location, setLocation]     = useState([]);
  const [other, setOther]           = useState(false);
  const [equipment, setEquipment]   = useState([]);
  const [cause, setCause]           = useState([]);
  const [parts, setParts]           = useState([]);
  const [type, setType]             = useState([]);
  const [treatment, setTreatment]   = useState([]);
  const [provide, setProvide]       = useState([]);
  const [corrective, setCorrective] = useState([]);
  const [management, setManagement] = useState([]);

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
    setOpen       (true);
    setStudent    ("");
    setDate       ("");
    setTime       ("");
    setLocation   ("");
    setOther      (false);
    setEquipment  ("");
    setParts      ("");
    setType       ("");
    setTreatment  ("");
    setProvide    ("");
    setCorrective ("");
    setManagement ("");
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    value==="other" ? setOther(true) : setOther(false);
  };

  const closeDialog = async () => {
    setOpen(false);
  }

  return (
    <div>
      {/* Title Bar */}
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
          Injuries Form
        </Typography>
        <Button variant ="contained" onClick ={openDialog}>
          <Typography variant="button" component="div">
            + Add Record
          </Typography>
        </Button>
      </Box>
      {/* Add Toilet Record */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={open}
        onClose           ={closeDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h1" sx={{ py: 4 }}>Injuries Form</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Student Select Field */}
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="student-select">Student</InputLabel>
                <Select
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
            {/* Input Date Field */}
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Incident Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={date}
              />
            </Grid>
            {/* Input Time Field */}
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setTime(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Incident Time"
                type            ="time"
                fullWidth
                variant         ="outlined"
                value           ={time}
              />
            </Grid>
            {/* Divider */}
            <Grid item xs={12} md={12}>
              <Divider variant="middle" />
            </Grid>
            {/* Location Radio Field */}
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="location-label">Location</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="location-label"
                  value           ={location}
                  onChange        ={(e) => setLocation(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="playground"
                      control={<Radio onChange={handleRadioChange} />}
                      label="playground" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="classroom"
                      control={<Radio onChange={handleRadioChange} />}
                      label="classroom" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="bathroom"
                      control={<Radio onChange={handleRadioChange} />}
                      label="bathroom" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="staircase"
                      control={<Radio onChange={handleRadioChange} />}
                      label="staircase" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="kitchen"
                      control={<Radio onChange={handleRadioChange} />}
                      label="kitchen" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="doorway"
                      control={<Radio onChange={handleRadioChange} />}
                      label="doorway" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="office"
                      control={<Radio onChange={handleRadioChange} />}
                      label="office" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="dining-room"
                      control={<Radio onChange={handleRadioChange} />}
                      label="dining room" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="unknown"
                      control={<Radio onChange={handleRadioChange} />}
                      label="unknown" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="other"
                      control={<Radio onChange={handleRadioChange}/>}
                      label="other (specify)"
                    >
                      {other && 
                        <TextField
                          onChange={(e) => setLocation(e.target.value)}
                          label="Specify details"
                          margin="dense"
                          fullWidth
                          variant="outlined"
                          value={location}
                        />
                      }
                    </FormControlLabel>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Equipment Radio Field */}
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="equipment-label">Equipment / Product involved</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="equipment-label"
                  value           ={equipment}
                  onChange        ={(e) => setEquipment(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="climber"
                      control={<Radio onChange={handleRadioChange} />}
                      label="climber" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="slide"
                      control={<Radio onChange={handleRadioChange} />}
                      label="slide" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="playground-surface"
                      control={<Radio onChange={handleRadioChange} />}
                      label="playground surface" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="sandbox"
                      control={<Radio onChange={handleRadioChange} />}
                      label="sandbox" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="trike-bike"
                      control={<Radio onChange={handleRadioChange} />}
                      label="trike / bike" />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControlLabel
                      value="hand-other"
                      control={<Radio onChange={handleRadioChange} />}
                      label="hand toy / other quipment" />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Cause Radio Field */}
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="cause-label">Cause of injury</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="cause-label"
                  value           ={cause}
                  onChange        ={(e) => setCause(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="fall-to-surface"
                      control={<Radio onChange={handleRadioChange} />}
                      label="fall to surface" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="carpet"
                      control={<Radio onChange={handleRadioChange} />}
                      label="carpet" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="wood"
                      control={<Radio onChange={handleRadioChange} />}
                      label="wood" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="stone"
                      control={<Radio onChange={handleRadioChange} />}
                      label="stone" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="tile"
                      control={<Radio onChange={handleRadioChange} />}
                      label="tile" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="fall-from-running-or-tripping"
                      control={<Radio onChange={handleRadioChange} />}
                      label="fall from running or tripping" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="bitten-by-child"
                      control={<Radio onChange={handleRadioChange} />}
                      label="bitten by child" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="hit-or-pushed-by-child"
                      control={<Radio onChange={handleRadioChange} />}
                      label="hit or pushed by child" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="injured-by-object"
                      control={<Radio onChange={handleRadioChange} />}
                      label="injured by object" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="eating-or-choking"
                      control={<Radio onChange={handleRadioChange} />}
                      label="eating or choking" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="insect-sting-bite"
                      control={<Radio onChange={handleRadioChange} />}
                      label="insect sting / bite" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="other"
                      control={<Radio onChange={handleRadioChange} />}
                      label="other (specify)" />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Injured Parts Radio Field */}
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="parts-label">Parts of body injured</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="parts-label"
                  value           ={parts}
                  onChange        ={(e) => setParts(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="eye"
                      control={<Radio onChange={handleRadioChange} />}
                      label="eye" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="ear"
                      control={<Radio onChange={handleRadioChange} />}
                      label="ear" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="nose"
                      control={<Radio onChange={handleRadioChange} />}
                      label="nose" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="mouth"
                      control={<Radio onChange={handleRadioChange} />}
                      label="mouth" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="part-of-face"
                      control={<Radio onChange={handleRadioChange} />}
                      label="part of face" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="neck"
                      control={<Radio onChange={handleRadioChange} />}
                      label="neck" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="arm-wrist-hand"
                      control={<Radio onChange={handleRadioChange} />}
                      label="arm/wrist/hand" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="leg-ankle-foot"
                      control={<Radio onChange={handleRadioChange} />}
                      label="leg/ankle/foot" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="other"
                      control={<Radio onChange={handleRadioChange} />}
                      label="other (specify)" />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Type Radio Field */}
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel id="type-label">Type of Injury</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="type-label"
                  value           ={type}
                  onChange        ={(e) => setType(e.target.value)}
                  name            ="radio-buttons-group"
                >
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="cut"
                      control={<Radio onChange={handleRadioChange} />}
                      label="cut" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="bruise-or-swelling"
                      control={<Radio onChange={handleRadioChange} />}
                      label="bruise or swelling" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="puncture"
                      control={<Radio onChange={handleRadioChange} />}
                      label="puncture" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="scrape"
                      control={<Radio onChange={handleRadioChange} />}
                      label="scrape" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="broken-bone-or-dislocation"
                      control={<Radio onChange={handleRadioChange} />}
                      label="broken bone or dislocation" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="sprain"
                      control={<Radio onChange={handleRadioChange} />}
                      label="sprain" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="arm-wrist-hand"
                      control={<Radio onChange={handleRadioChange} />}
                      label="arm/wrist/hand" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="crushing-injury"
                      control={<Radio onChange={handleRadioChange} />}
                      label="crushing injury" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="burn"
                      control={<Radio onChange={handleRadioChange} />}
                      label="burn" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="loss-of-consciousness"
                      control={<Radio onChange={handleRadioChange} />}
                      label="loss of consciousness" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="unknown"
                      control={<Radio onChange={handleRadioChange} />}
                      label="unknown" />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControlLabel
                      value="other"
                      control={<Radio onChange={handleRadioChange} />}
                      label="other (specify)" />
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* Treatment Text Field */}
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setTreatment(e.target.value)}
                margin="dense"
                label="First aide given at the facility (eg. comfort, pressure, elevation, cold pack, washing, bandage)"
                type="text"
                fullWidth
                variant="outlined"
                value={treatment}
              />
            </Grid>
            {/* Provided Text Field */}
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setProvide(e.target.value)}
                margin="dense"
                label="Treatment provided by"
                type="text"
                fullWidth
                variant="outlined"
                value={provide}
              />
            </Grid>
            {/* Corrective Text Field */}
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setCorrective(e.target.value)}
                margin="dense"
                label="Corrective action needed to prevent reoccurence"
                type="text"
                fullWidth
                variant="outlined"
                value={corrective}
              />
            </Grid>
            {/* Management Text Field */}
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setManagement(e.target.value)}
                margin="dense"
                label="Name of management notified"
                type="text"
                fullWidth
                variant="outlined"
                value={management}
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
                    className={classes.tableCell + classes.tableHeadCell}
                    key={prop}
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    {prop}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{textAlign: "center"}}>1</TableCell>
              <TableCell style={{textAlign: "center"}}>Student 1</TableCell>
              <TableCell style={{textAlign: "center"}}>2023-07-18</TableCell>
              <TableCell style={{textAlign: "center"}}>12:11</TableCell>
              <TableCell style={{textAlign: "center"}}>Poo</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
