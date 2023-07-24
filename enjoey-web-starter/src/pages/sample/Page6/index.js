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
  FormControlLabel,
  FormGroup,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
  Chip,
  Box,
  Typography,
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
  const [recordItems, setRecordItems] = useState({
    'Hep B': false,
    'DTaP': false,
    'Hib': false,
    'PCV': false,
    'Polio': false,
    'Rotavirus': false,
    'Flu': false,
    'MMR': false,
    'VAR': false,
    'Hep A': false
  });
  const [vacineDate, setVacineDate] = useState({
    "Hep B": "",
    "DTaP": "",
    "Hib": "",
    "PCV": "",
    "Polio": "",
    "Rotavirus": "",
    "Flu": "",
    "MMR": "",
    "VAR": "",
    "Hep A": ""
  });
  const [open, setOpen]                     = useState(false);
  const [openEdit, setOpenEdit]             = useState(false);
  const [child, setChild]                   = useState([]);
  const [student, setStudent]               = useState([]);
  const [recordDate, setRecordDate]         = useState([]);

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
  const handleRecordCheckbox = (event) => {
    const { name, checked } = event.target;
    setRecordItems((prevRecordItems) => ({
      ...prevRecordItems,
      [name]: checked
    }));
  };
  const handleRecordDateChange = (event) => {
    const { name, value } = event.target;
    setVacineDate((prevVacineDate) => ({
      ...prevVacineDate,
      [name]: value
    }));
  };
  const handleCreate = () => {
    console.log('vacineDate:', vacineDate);
    console.log('recordItems:', recordItems);
  };

  const openDialog = async () => {
    setOpen         (true);
    setStudent      ("");
    setRecordDate   ("");
    setVacineDate   ("");
  };

  const closeDialog = async () => {
    setOpen(false);
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
          Immunizations Table
        </Typography>
        <div>
          <Button variant ="contained" onClick ={openDialog} sx={{ mr: 2 }}>
            <Typography variant="button" component="div">
              + Add Record
            </Typography>
          </Button>
          <Button variant ="contained" onClick ={openEditDialog}>
            <Typography variant="button" component="div">
              Edit Table
            </Typography>
          </Button>
        </div>
      </Box>
      {/* Add Immunization Record */}
      <Dialog
        fullWidth
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
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setRecordDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Input Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={recordDate}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider variant="middle" />
            </Grid>
            {Object.keys(recordItems).map((key) => (
              <Grid item xs={12} md={12} key={key}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={recordItems[key]} onChange={handleRecordCheckbox} name={key} />}
                    label={key}
                  />
                </FormGroup>
                {recordItems[key] && (
                  <Grid item xs={12} md={12}>
                    <TextField
                      onChange={handleRecordDateChange}
                      InputLabelProps={{ shrink: true }}
                      margin="dense"
                      label="Taken Date"
                      type="date"
                      fullWidth
                      variant="outlined"
                      value={vacineDate[key]}
                      name={key}
                    />
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
      {/* Edit Immunization Table */}
      <Dialog
        fullWidth
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
          <TableBody>
            <TableRow>
              <TableCell style={{textAlign: "center"}}>1</TableCell>
              <TableCell style={{textAlign: "center"}}>Student 1</TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="taken" color="success" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="not taken" color="warning" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="taken" color="success" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="not taken" color="warning" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="taken" color="success" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="taken" color="success" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="taken" color="success" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="taken" color="success" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="not taken" color="warning" /></TableCell>
              <TableCell style={{textAlign: "center"}}><Chip label="taken" color="success" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
