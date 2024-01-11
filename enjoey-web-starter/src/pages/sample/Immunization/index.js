// React Imports
import React, { useEffect, useState } from "react";

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
  FormGroup,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
  Box,
  Typography,
} from "@mui/material";

// Material UI X Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Global Constants
const columns = [
  { field: 'id', headerName: 'ID', flex: 0.5 },
  {
    field: 'student',
    headerName: 'STUDENT',
    editable: true,
  },
  {
    field: 'hepa',
    headerName: 'HEP A',
    editable: true,
  },
  {
    field: 'hepb',
    headerName: 'HEP B',
    editable: true,
  },
  {
    field: 'dtap',
    headerName: 'DTAP',
    editable: true,
  },
  {
    field: 'hib',
    headerName: 'HIB',
    editable: true,
  },
  {
    field: 'pcv',
    headerName: 'PCV',
    editable: true,
  },
  {
    field: 'polio',
    headerName: 'POLIO',
    editable: true,
  },
  {
    field: 'rotavirus',
    headerName: 'ROTAVIRUS',
    editable: true,
  },
  {
    field: 'flu',
    headerName: 'FLU',
    editable: true,
  },
  {
    field: 'mmr',
    headerName: 'MMR',
    editable: true,
  },
  {
    field: 'var',
    headerName: 'VAR',
    editable: true,
  },
];

const rows = [
  { id: 1, student: 'Student 1', hepa: "taken", hepb: "not taken", dtap: "taken", hib: "taken", pcv: "taken", polio: "not taken", rotavirus: "taken", flu: "not taken", mmr: "not taken", var: "not taken"},
  { id: 2, student: 'Student 2', hepa: "not taken", hepb: "not taken", dtap: "taken", hib: "not taken", pcv: "not taken", polio: "taken", rotavirus: "taken", flu: "not taken", mmr: "not taken", var: "not taken"},
];

const CustomToolbar = () => (
  <GridToolbar
    csvOptions={{
      fileName: (() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace(/[-T]/g, '').replace(':', '');
        return `immunization_${formattedDate}`;
      })(),
    }}
  />
);

const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  // Create Record Dialog Constants -- Start
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
  const [child, setChild]                   = useState([]);
  const [student, setStudent]               = useState([]);
  const [recordDate, setRecordDate]         = useState([]);
  // Create Record Dialog Constants -- End


  // For Create Record Dialog --Start
  useEffect(() => {
    try {
      Axios.get(childUrl).then((response) => {
        setChild(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const handleCreateRecord = () => {
    console.log('vacineDate:', vacineDate);
    console.log('recordItems:', recordItems);
    setOpen(false);
  };

  const openRecordDialog = async () => {
    setOpen         (true);
    setStudent      ("");
    setRecordDate   ("");
    setVacineDate   ("");
  };

  const closeRecordDialog = async () => {
    setOpen(false);
  }
  // For Create Record Dialog --End

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
        <Button variant ="contained" onClick ={openRecordDialog} sx={{ mr: 2 }}>
          <Typography variant="button" component="div">
            + Add Record
          </Typography>
        </Button>
      </Box>
      <Card>
        <DataGrid
          sx={{ m: 5 }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{toolbar: CustomToolbar}} 
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Card>
      {/* Add Immunization Record Dialog --Start */}
      <Dialog
        fullWidth
        open              ={open}
        onClose           ={closeRecordDialog}
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
          <Button onClick={handleCreateRecord}>Create</Button>
        </DialogActions>
      </Dialog>
      {/* Add Immunization Record Dialog --End */}
    </div>
  );
};

export default Page2;
