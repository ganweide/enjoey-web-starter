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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Student", "Hep B", "DTaP", "Hib", "PCV", "Polio", "Rotavirus", "Flu", "MMR", "VAR", "Hep A"];
  const [checkedItems, setCheckedItems] = useState({
    'Hep B': true,
    'DTaP': true,
    'Hib': true,
    'PCV': true,
    'Polio': true,
    'Rotavirus': true,
    'Flu': true,
    'MMR': true,
    'VAR': true,
    'Hep A': true
  });
  const [open, setOpen]                     = useState(false);
  const [openEdit, setOpenEdit]             = useState(false);
  const [child, setChild]                   = useState([]);
  const [student, setStudent]               = useState([]);
  const [date, setDate]                     = useState([]);
  const [time, setTime]                     = useState([]);
  const [foodType, setFoodType]             = useState([]);
  const [foodQuantity, setFoodQuantity]     = useState([]);
  const [note, setNote]                     = useState([]);

  useEffect(() => {
    try {
      Axios.get(childUrl).then((response) => {
        setChild(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openEditDialog = async () => {
    setOpenEdit(true);
  }
  const closeEditDialog = async () => {
    setOpenEdit(false);
  }
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked
    }));
  };

  const openDialog = async () => {
    setOpen         (true);
    setStudent      ("");
    setDate         ("");
    setTime         ("");
  };

  const closeDialog = async () => {
    setOpen(false);
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
        <h2>Immunizations Table</h2>
        <div>
          <Button
            variant ="contained"
            onClick ={openDialog}
            style   ={{
              height: "40px",
              marginRight: "10px",
            }}
          >
            + Add Record
          </Button>
          <Button
            variant ="contained"
            onClick ={openEditDialog}
            style   ={{
              height: "40px",
            }}
          >
            Edit Table
          </Button>
        </div>
        {/* Add Immunization Record */}
        <Dialog
          open              ={open}
          onClose           ={closeDialog}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Immunizations Record</h2>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
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
              <Grid item xs={12} md={12}>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Hep B" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="DTap" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Hib" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="PCV" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Polio" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Rotavirus" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Flu" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="MMR" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="VAR" />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Hep A" />
                </FormGroup>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button>Create</Button>
          </DialogActions>
        </Dialog>
        {/* Edit Immunization Table */}
        <Dialog
          open              ={openEdit}
          onClose           ={closeEditDialog}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Immunizations Settings</h2>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <h4>Edit the table columns</h4>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['Hep B']} onChange={handleCheckboxChange} name="Hep B" />}
                    label="Hep B"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['DTaP']} onChange={handleCheckboxChange} name="DTaP" />}
                    label="DTaP"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['Hib']} onChange={handleCheckboxChange} name="Hib" />}
                    label="Hib"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['PCV']} onChange={handleCheckboxChange} name="PCV" />}
                    label="PCV"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['Polio']} onChange={handleCheckboxChange} name="Polio" />}
                    label="Polio"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['Rotavirus']} onChange={handleCheckboxChange} name="Rotavirus" />}
                    label="Rotavirus"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['Flu']} onChange={handleCheckboxChange} name="Flu" />}
                    label="Flu"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['Hep A']} onChange={handleCheckboxChange} name="Hep A" />}
                    label="Hep A"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['MMR']} onChange={handleCheckboxChange} name="MMR" />}
                    label="MMR"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={checkedItems['VAR']} onChange={handleCheckboxChange} name="VAR" />}
                    label="VAR"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button>Apply</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Card>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, index) => {
                if (index < 2 || checkedItems[prop]) {
                  return (
                    <TableCell
                      className={classes.tableCell + classes.tableHeadCell}
                      key={prop}
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      {prop}
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          </TableHead>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
