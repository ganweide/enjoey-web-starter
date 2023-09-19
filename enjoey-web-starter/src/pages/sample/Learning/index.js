// React Imports
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Tabs,
  Tab,
  TablePagination,
} from "@mui/material";
import PropTypes from 'prop-types';
import Styles from "./style";

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

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Name", "Assigned week", "Theme", ""];
  const [dates, setDates]                     = useState([]);
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  const [menuOpen, setMenuOpen]               = useState(false);
  const [foodOpen, setFoodOpen]               = useState(false);
  const [classroomsOpen, setClassroomsOpen]   = useState(false);
  const [previewOpen, setPreviewOpen]         = useState(false);
  const [selectAll, setSelectAll]             = useState(false);
  const [hibiscusChecked, setHibiscusChecked] = useState(false);
  const [bananaChecked, setBananaChecked]     = useState(false);
  const [kittyChecked, setKittyChecked]       = useState(false);
  const [mealType, setMealType]               = useState([]);
  const [date, setDate]                       = useState([]);
  const [time, setTime]                       = useState([]);
  const [note, setNote]                       = useState([]);
  const [duplicate, setDuplicate]             = useState([]);
  const [upUntil, setUpUntil]                 = useState([]);
  const [rows, setRows]                       = useState([]);
  const newRow = {
    food: "",
    foodCategory: "",
    quantity: "",
    measureUnit: "",
  }
  const [value, setValue]             = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const [page, setPage]               = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

// Exclude Weekends' Checkbox
  const handleCalendarChange = (event) => {
    setExcludeWeekends(event.target.checked);
  };
  useEffect(() => {
    const daysOfWeek  = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const weekDates   = [];
    const currentDate = new Date();
    const firstDayOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    );

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      const day = daysOfWeek[date.getDay()];
      const dayDate = date.getDate();

      if (excludeWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
        continue;
      }

      weekDates.push({ day, dayDate });
    }
    setDates(weekDates);
  }, [excludeWeekends]);
  
// Menu Dialog
  const openMenuDialog = async () => {
    setMenuOpen(true);
    setMealType("");
    setDate("");
    setTime("");
    setNote("");
    setDuplicate("");
    setUpUntil("");
  }
  const handleDuplicate = (event, newDuplicate) => {
    setDuplicate(newDuplicate);
  };
  const closeMenuDialog = async () => {
    setMenuOpen(false);
  }

// Food Dialog
  const openFoodDialog = async () => {
    setRows([newRow]);
    setMenuOpen(false);
    setFoodOpen(true);
  }
  const closeFoodDialog = async () => {
    setFoodOpen(false);
  }
  const handleAddRow = () => {
    setRows(prevRows => [...prevRows, newRow]);
  };
  const handleRowChange = (index, field, value) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index][field] = value;
      return updatedRows;
    });
  };

// Classroom Dialog
  const openClassrooms = async () => {
    setFoodOpen(false);
    setClassroomsOpen(true);
  }
  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    console.log(checked);
    setSelectAll(checked);
    setHibiscusChecked(checked);
    setBananaChecked(checked);
    setKittyChecked(checked);
  };
  const handleClassroom = (event) => {
    const checkboxName = event.target.name;
    const checked = event.target.checked;

    if (checkboxName === 'hibiscus') {
      setHibiscusChecked(checked);
    } else if (checkboxName === 'banana') {
      setBananaChecked(checked);
    } else if (checkboxName === 'kitty') {
      setKittyChecked(checked);
    }
  };
  const closeClassrooms = async () => {
    setClassroomsOpen(false);
  }
  useEffect(() => {
    if (hibiscusChecked && bananaChecked && kittyChecked) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [hibiscusChecked, bananaChecked, kittyChecked]);

// Preview Dialog
  const openPreview = async () => {
    setClassroomsOpen(false);
    setPreviewOpen(true);
  }
  const closePreview = async () => {
    setPreviewOpen(false);
  }

  return (
    <Card sx={{ p: 5 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Room plans" {...a11yProps(0)} />
            <Tab label="Library" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box 
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography variant="h1" component="div" gutterBottom>
              Room plans
            </Typography>
            <Button variant ="contained" onClick ={openMenuDialog}>
              <Typography variant="button" component="div">
                Create room plan
              </Typography>
            </Button>
          </Box>
          <Typography variant="body2" component="div" gutterBottom>
            View all lessons plans in your school that are assigned to a room. Go to the library to assign lesson plan templates to rooms for teachers to use.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
      {/* Add Menu Dialog */}
      <Dialog
        open              ={menuOpen}
        onClose           ={closeMenuDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Add room plan</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <h3>What is the menu for?</h3>
            <Grid item xs={12} md={12}>
            <FormControl fullWidth>
                <InputLabel id="meal-type-select">Meal Type</InputLabel>
                <Select
                  labelId ="meal-type-select"
                  id      ="meal-type-select"
                  value   ={mealType}
                  label   ="Meal Type"
                  onChange={(e) => {setMealType(e.target.value)}}
                >
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="AM Snack">AM Snack</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="PM Snack">PM Snack</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                  <MenuItem value="Late Snack">Late Snack</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <h3>When do you want the menu to be served?</h3>
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
              <TextField
                onChange        ={(e) => setTime(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Time"
                type            ="time"
                fullWidth
                variant         ="outlined"
                value           ={time}
              />
            </Grid>
            <h3>Is there a description or directions you&apos;d like to add?</h3>
            <Grid item xs={12} md={12}>
              <TextField
                onChange={(e) => setNote(e.target.value)}
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={note}
              />
            </Grid>
            <h3>What day&apos;s should the menu duplicate to?</h3>
            <Grid item xs={12} md={12}>
              <ToggleButtonGroup
                value={duplicate}
                onChange={handleDuplicate}
                fullWidth
                style   ={{
                  height: "40px",
                }}
              >
                <ToggleButton value="Monday">
                  <h4>M</h4>
                </ToggleButton>
                <ToggleButton value="Tuesdat">
                  <h4>T</h4>
                </ToggleButton>
                <ToggleButton value="Wednesday">
                  <h4>W</h4>
                </ToggleButton>
                <ToggleButton value="Thursday">
                  <h4>Th</h4>
                </ToggleButton>
                <ToggleButton value="Friday">
                  <h4>F</h4>
                </ToggleButton>
                <ToggleButton value="Saturday">
                  <h4>Sa</h4>
                </ToggleButton>
                <ToggleButton value="Sunday">
                  <h4>Su</h4>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setUpUntil(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Up until"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={upUntil}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openFoodDialog}>Add Food</Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHeadRow}>
            {tableHead.map((prop) => (
              <TableCell
                className={classes.tableCell + classes.tableHeadCell}
                key={prop}
              >
                {prop}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell>Test</TableCell>
            <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button endIcon={<ChevronRightIcon />}>
                <Typography variant="button" component="div">
                  View
                </Typography>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default Page2;
