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
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
  Typography,
  Box,
  Divider,
} from "@mui/material";

// Local Imports
import Styles from "./style";
import { parseTwoDigitYear } from "moment";

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Student", "Category", "Description", "Amount", "Due Date"];

  const [open, setOpen]                     = useState(false);
  const [schedule, setSchedule]             = useState(false);
  const [preview, setPreview]               = useState(false);
  const [child, setChild]                   = useState([]);
  const [student, setStudent]               = useState([]);
  const [exist, setExist]                   = useState([]);
  const [showTable, setShowTable]           = useState(false);
  const [showDiscount, setShowDiscount]     = useState(false);
  const [rows, setRows]                     = useState([]);
  const [date, setDate]                     = useState([]);
  const newRow = {
    category: "",
    description: "",
    notes: "",
    amount: "",
  }

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
    setStudent      ("");
    setRows         ([newRow]);
    setExist        ("");
    setShowTable    (false);
    setShowDiscount (false);
  };
  const handleRowChange = (index, field, value) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index][field] = value;
      return updatedRows;
    });
  };
  const handleTable = () => {
    setShowTable(!showTable);
  }
  const handleDiscount = () => {
    setShowDiscount(!showDiscount);
  }
  const closeDialog = async () => {
    setOpen(false);
  }

  const openSetSchedule = async() => {
    setOpen     (false);
    setSchedule (true);
    setDate     ("");
  }
  const closeSetSchedule = async() => {
    setSchedule(false);
  }

  const openPreview = async() => {
    setSchedule (false);
    setPreview  (true);
  }
  const closePreview = async() => {
    setPreview(false);
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
          Charges Form
        </Typography>
        <Button variant ="contained" onClick ={openDialog}>
          <Typography variant="button" component="div">
            + Add a one time charge 
          </Typography>
        </Button>
      </Box>
      {/* Add One Time Charge Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="xl"
        open              ={open}
        onClose           ={closeDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h1" sx={{ py: 4 }}>Add charges</Typography>
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
            <Grid item xs={12} md={12}>
              <Table>
                <TableHead>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Notes (optional)</TableCell>
                  <TableCell>Amount</TableCell>
                </TableHead>
                <TableBody>
                  <TableCell>Registration Fee</TableCell>
                  <TableCell>application for preschool program</TableCell>
                  <TableCell></TableCell>
                  <TableCell>100</TableCell>
                </TableBody>
              </Table>
            </Grid>
            {/* Existing Charge Select */}
            <Grid item xs={5.5} md={5.5}>
              <FormControl fullWidth>
                <InputLabel id="existing-charge-select-label">Add an existing charge from the library</InputLabel>
                <Select
                  labelId="existing-charge-select-label"
                  id="existing-charge-select"
                  label="Add an existing charge from the library"
                  value={exist || []}
                  onChange={(e) => setExist(e.target.value)}
                >
                  <MenuItem value="before-school-care">Before School Care</MenuItem>
                  <MenuItem value="after-school-care">After School Care</MenuItem>
                  <MenuItem value="infant-care-program">Infant Care Program</MenuItem>
                  <MenuItem value="preschool-program">Preschool Program</MenuItem>
                  <MenuItem value="toddler-care-program">Toddler Care Program</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Or */}
            <Grid item xs={1} md={1}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography variant="h3" component="div">Or</Typography>
              </Box>
            </Grid>
            {/* Create New Charge Button */}
            <Grid item xs={5.5} md={5.5}>
              <Button onClick={handleTable} fullWidth style={{ height:"100%" }} variant="contained">
                 + Create a new charge
              </Button>
            </Grid>
            {/* Create A New Change */}
            {showTable && (
              <>
                <Grid item xs={12} md={12}>
                  <Table>
                    <TableHead>
                      <TableCell>Category</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Notes (optional)</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              onChange={(e) => handleRowChange(index, 'category', e.target.value)}
                              margin="dense"
                              placeholder="Select or create category"
                              type="text"
                              fullWidth
                              rows={4}
                              variant="outlined"
                              value={row.category}
                            />
                          </TableCell>
                          <TableCell>
                          <TextField
                              onChange={(e) => handleRowChange(index, 'description', e.target.value)}
                              margin="dense"
                              placeholder="Describe your change"
                              type="text"
                              fullWidth
                              rows={4}
                              variant="outlined"
                              value={row.description}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              onChange={(e) => handleRowChange(index, 'notes', e.target.value)}
                              margin="dense"
                              placeholder="Add notes"
                              type="text"
                              fullWidth
                              rows={4}
                              variant="outlined"
                              value={row.notes}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                              margin="dense"
                              fullWidth
                              rows={4}
                              variant="outlined"
                              value={row.amount}
                              placeholder="0.00"
                              id='outlined-start-adornment'
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position='start'>$</InputAdornment>
                                ),
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Button onClick={handleDiscount}>Discount</Button>
                </Grid>
                {showDiscount && (
                  <Grid item xs={12} md={12}>
                    <Table>
                      <TableHead>
                        <TableCell>Discount amount</TableCell>
                        <TableCell>Discount description</TableCell>
                        <TableCell>Notes (optional)</TableCell>
                        <TableCell>New charge total</TableCell>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <TextField
                                fullWidth
                                onChange={(e) => handleRowChange(index, 'Discount amount', e.target.value)}
                                margin="dense"
                                variant="outlined"
                                value={row.amount}
                                placeholder="0.00"
                                id='outlined-start-adornment'
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>$</InputAdornment>
                                  ),
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                onChange={(e) => handleRowChange(index, 'discount description', e.target.value)}
                                margin="dense"
                                placeholder="Select or create category"
                                type="text"
                                fullWidth
                                rows={4}
                                variant="outlined"
                                value={row.category}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                onChange={(e) => handleRowChange(index, 'notes', e.target.value)}
                                margin="dense"
                                placeholder="Add notes"
                                type="text"
                                fullWidth
                                rows={4}
                                variant="outlined"
                                value={row.notes}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                disabled
                                onChange={(e) => handleRowChange(index, 'new charge total', e.target.value)}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                value={row.amount}
                                placeholder="0.00"
                                id='outlined-start-adornment'
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>$</InputAdornment>
                                  ),
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                )}
                <Grid item xs={9} md={9}>
                  <Button variant="contained" color="secondary">Cancel</Button>
                </Grid>
                <Grid item xs={3} md={3} container justifyContent="flex-end">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Save to library"
                    />
                  </FormGroup>
                  <Button variant="contained">Save</Button>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openSetSchedule}>Set Schedule</Button>
        </DialogActions>
      </Dialog>
      {/* Set Schedule Dialog */}
      <Dialog
        fullWidth
        open              ={schedule}
        onClose           ={closeSetSchedule}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h1" sx={{ py: 4 }}>Set schedule</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Student Field */}
            <Typography variant="h3" sx={{ py: 4 }}>Student receiving charge</Typography>
            <Grid item xs={12} md={12}>
              <TextField
                disabled
                fullWidth
                margin          ="dense"
                type            ="text"
                variant         ="outlined"
                value           ={student}
              />
            </Grid>
            {/* Date Field */}
            <Typography variant="h3" sx={{ py: 4 }}>What date should payment be due?</Typography>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Desired Due Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={date}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openPreview}>Preview & confirm</Button>
        </DialogActions>
      </Dialog>
      {/* Preview Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="xl"
        open              ={preview}
        onClose           ={closePreview}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h1" sx={{ py: 4 }}>Preview & confirm</Typography>
        </DialogTitle>
        <DialogContent dividers>
        <Grid container spacing={2}>
            <Typography variant="h3" sx={{ py: 4 }}>Schedule</Typography>
            <Grid item xs={12} md={12}>
              <Typography variant="h4">First payment will be due:</Typography>
              <p>{date}</p>
              <Typography variant="h4">Payer receives invoice:</Typography>
              <p>Today</p>
              <Typography variant="h4">Student receving charge:</Typography>
              <p>{student}</p>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" sx={{ py: 4 }}>Charges</Typography>
              <Table>
                <TableHead>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Amount</TableCell>
                </TableHead>
                <TableBody>
                  <TableCell>Registration Fee</TableCell>
                  <TableCell>application for preschool program</TableCell>
                  <TableCell></TableCell>
                  <TableCell>100</TableCell>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePreview}>Create Charges</Button>
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
              <TableCell style={{textAlign: "center"}}>Registration Fee</TableCell>
              <TableCell style={{textAlign: "center"}}>application for preschool program</TableCell>
              <TableCell style={{textAlign: "center"}}>100</TableCell>
              <TableCell style={{textAlign: "center"}}>2023-07-28</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
