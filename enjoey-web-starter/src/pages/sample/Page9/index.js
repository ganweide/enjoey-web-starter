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

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Student", "Date", "Time", "Type"];

  const [open, setOpen]           = useState(false);
  const [child, setChild]         = useState([]);
  const [student, setStudent]     = useState([]);
  const [date, setDate]           = useState([]);
  const [time, setTime]           = useState([]);
  const [location, setLocation]   = useState([]);
  const [other, setOther]         = useState(false);
  const [equipment, setEquipment] = useState([]);

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
    setOpen     (true);
    setStudent  ("");
    setDate     ("");
    setTime     ("");
    setLocation ("");
    setEquipment("");
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    {value==="other" ? setOther(true) : console.log(value)};
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
                label           ="Input Date"
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
                label           ="Input Time"
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
                <FormLabel id="equipment-label">Equipment / Product Involved</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby ="equipment-label"
                  value           ={location}
                  onChange        ={(e) => setLocation(e.target.value)}
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
