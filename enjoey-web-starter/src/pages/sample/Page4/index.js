// React Imports
import React, { useEffect, useState } from "react";

import {
  makeStyles,
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
  TableContainer,
  TableRow,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
} from "@mui/material";

const useStyles = makeStyles();

const Page2 = () => {
  const classes = useStyles();
  const today = new Date().getDate();
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
  const [food, setFood]                       = useState([]);
  const [foodCategory, setFoodCategory]       = useState([]);
  const [quantity, setQuantity]               = useState([]);
  const [measureUnit, setMeasureUnit]         = useState([]);

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
  }
  const handleDuplicate = (event, newDuplicate) => {
    setDuplicate(newDuplicate);
  };
  const closeMenuDialog = async () => {
    setMenuOpen(false);
  }

// Food Dialog
  const openFoodDialog = async () => {
    setMenuOpen(false);
    setFoodOpen(true);
    setFood("");
    setFoodCategory("");
    setQuantity("");
    setMeasureUnit("");
  }
  const closeFoodDialog = async () => {
    setFoodOpen(false);
  }

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
    <div>
      <div 
        style={{
          display       : "flex",
          flexDirection : "row",
          justifyContent: "space-between",
          alignItems    : "center",
        }}
      >
        <h2>Menu Planning</h2>
        <Button variant ="contained" onClick ={openMenuDialog}>New Menu</Button>
        {/* Add Menu Dialog */}
        <Dialog
          open              ={menuOpen}
          onClose           ={closeMenuDialog}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Add menu details</h2>
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
                  label="Note"
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
                  onChange        ={(e) => setDate(e.target.value)}
                  InputLabelProps ={{ shrink: true }}
                  margin          ="dense"
                  label           ="Up until"
                  type            ="date"
                  fullWidth
                  variant         ="outlined"
                  value           ={date}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={openFoodDialog}>Add Food</Button>
          </DialogActions>
        </Dialog>
        {/* Add Food Dialog*/}
        <Dialog
          fullWidth
          maxWidth          = "xl"
          open              ={foodOpen}
          onClose           ={closeFoodDialog}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Add food items</h2>
          </DialogTitle>
          <DialogContent dividers>
            <Table>
              <TableHead>
                <TableCell>Food Name</TableCell>
                <TableCell>USDA Food Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit of measure</TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      onChange={(e) => setFood(e.target.value)}
                      margin="dense"
                      label="Food Name"
                      type="text"
                      fullWidth
                      rows={4}
                      variant="outlined"
                      value={food}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id="food-category-select">USDA food category</InputLabel>
                      <Select
                        labelId="food-category-select"
                        id="food-category-select"
                        value={foodCategory}
                        label="USDA food category"
                        onChange={(e) => {
                          setFoodCategory(e.target.value);
                        }}
                      >
                        <MenuItem value="Fruits">Fruits</MenuItem>
                        <MenuItem value="Snacks">Snacks</MenuItem>
                        <MenuItem value="Bread">Bread</MenuItem>
                        <MenuItem value="Rice">Rice</MenuItem>
                        <MenuItem value="Noodles">Noodles</MenuItem>
                        <MenuItem value="Soup">Soup</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => setQuantity(e.target.value)}
                      margin="dense"
                      label="Quantity"
                      type="text"
                      fullWidth
                      rows={4}
                      variant="outlined"
                      value={quantity}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id="measure-unit-select">Unit of measure</InputLabel>
                      <Select
                        labelId="measure-unit-select"
                        id="measure-unit-select"
                        value={measureUnit}
                        label="Unit of measure"
                        onChange={(e) => {
                          setMeasureUnit(e.target.value);
                        }}
                      >
                        <MenuItem value="item-each">Item (Each)</MenuItem>
                        <MenuItem value="packet-each">Packet (Each)</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={openClassrooms}>Assign to classrooms</Button>
          </DialogActions>
        </Dialog>
        {/* Assign Classroom Dialog*/}
        <Dialog
          fullWidth
          open              ={classroomsOpen}
          onClose           ={closeClassrooms}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Assign to classrooms</h2>
          </DialogTitle>
          <DialogContent dividers>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3>Classroom</h3>
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  }
                  label="Select all"
                />
            </div>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={hibiscusChecked}
                    onChange={handleClassroom}
                    name="hibiscus"
                  />
                }
                label="Hibiscus Room"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bananaChecked}
                    onChange={handleClassroom}
                    name="banana"
                  />
                }
                label="Banana Room"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={kittyChecked}
                    onChange={handleClassroom}
                    name="kitty"
                  />
                }
                label="Kitty Room"
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={openPreview}>Preview Menu</Button>
          </DialogActions>
        </Dialog>
        {/* Preview Dialog*/}
        <Dialog
          fullWidth
          maxWidth          ="xl"
          open              ={previewOpen}
          onClose           ={closePreview}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Preview & confirm</h2>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <h3>Details & Schedule</h3>
              <Grid item xs={12} md={12}>
                <h4>Meal type:</h4>
                <h4>Meal is served:</h4>
                <h4>Assigned classrooms:</h4>
              </Grid>
              <Grid item xs={12} md={12}>
                <Table>
                  <TableHead>
                    <TableCell>Food Name</TableCell>
                    <TableCell>USDA Food Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit of measure</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Example Food</TableCell>
                      <TableCell>Example Type</TableCell>
                      <TableCell>Example Quantity</TableCell>
                      <TableCell>Example Unit</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closePreview}>Create Menu</Button>
          </DialogActions>
        </Dialog>
      </div>
      <FormControlLabel
        control={<Checkbox checked={excludeWeekends} onChange={handleCalendarChange} />}
        label="Exclude weekends"
      />
      <Grid container spacing={2}>
        {dates.map(({ day, dayDate }) => (
          <Grid
            item
            xs={excludeWeekends ? 2.4 : 1.714285714285714}
            md={excludeWeekends ? 2.4 : 1.714285714285714}
            key={dayDate}
          >
            <Card style={{backgroundColor: dayDate === today ? "primary" : "inherit"}}>
              <div style={{textAlign: "center"}}>
                <p>{day}</p>
                <h2>{dayDate}</h2>
              </div>
              <Card style={{margin: "10px", backgroundColor: dayDate === today ? "inherit" : classes.theme.palette.primary.main}}>
                <p>Test Test Test</p>
              </Card>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Page2;
