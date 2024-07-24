// React Imports
import React, { useEffect, useState } from "react";
import {useAuthUser} from '@enjoey/utility/AuthHooks';
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
  Box,
  Typography,
  Divider,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Application Date", "Leave Type", "Starting Date", "Ending Date", "Total Days", "Approved By", "Approved Date", "Reason"];
  const [openDialog, setOpenDialog]         = useState(false);
  const [name, setName]                     = useState([]);
  const [nric, setNRIC]                     = useState([]);
  const [leaveType, setLeaveType]           = useState([]);
  const [reason, setReason]                 = useState([]);
  const [totalDays, setTotalDays]           = useState([]);
  const [startDate, setStartDate]           = useState([]);
  const [endDate, setEndDate]               = useState([]);
  const {user} = useAuthUser();

  console.log(user);

  const handleOpenDialog = async () => {
    setOpenDialog   (true);
    setName([]);
    setNRIC([]);
    setLeaveType([]);
    setReason([]);
    setTotalDays([]);
    setStartDate([]);
    setEndDate([]);
  };

  const handleCloseDialog = async () => {
    setOpenDialog(false);
  }
  
  return (
    <Box>
      <Box 
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Box>
          <Typography variant="h1" component="div" gutterBottom>
            Leave Application Form
          </Typography>
          <Typography variant="subtitle2" component="div">
            User: {user.displayName}
          </Typography>
        </Box>
        <Button variant ="contained" onClick ={handleOpenDialog}>
          <Typography variant="button" component="div">
            + Create
          </Typography>
        </Button>
      </Box>
      <Dialog
        maxWidth          ="md"
        open              ={openDialog}
        onClose           ={handleCloseDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Leave Application Form</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="button">Notes :</Typography>
              <br />
              <Typography variant="subtitle1">All Annual Leave applications must be submitted five (5) working days before commencement of leave.</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setName(e.target.value)}
                margin          ="dense"
                label           ="Name"
                type            ="text"
                variant         ="outlined"
                value           ={name}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setNRIC(e.target.value)}
                margin          ="dense"
                label           ="NRIC"
                type            ="text"
                variant         ="outlined"
                value           ={nric}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="leave-type-select">Type of Leave</InputLabel>
                <Select
                  labelId="leave-type-select"
                  id="leave-type-select"
                  value={leaveType || []}
                  label="Type of Leave"
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <MenuItem value="SST">Annual Leave (AL)</MenuItem>
                  <MenuItem value="SST">Emergency Leave (EL)</MenuItem>
                  <MenuItem value="SST">Maternity Leave (ML)</MenuItem>
                  <MenuItem value="SST">Paternity Leave (PL)</MenuItem>
                  <MenuItem value="SST">Compassionate Leave (CL)</MenuItem>
                  <MenuItem value="SST">Sick Leave (SL)</MenuItem>
                  <MenuItem value="SST">Hospitalization Leave (HL)</MenuItem>
                  <MenuItem value="SST">Unpaid Leave (UL)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setReason(e.target.value)}
                margin          ="dense"
                label           ="Reason"
                type            ="text"
                variant         ="outlined"
                value           ={reason}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setTotalDays(e.target.value)}
                margin          ="dense"
                label           ="Total No. of Days"
                type            ="number"
                variant         ="outlined"
                value           ={totalDays}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setStartDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="From"
                type            ="date"
                variant         ="outlined"
                value           ={startDate}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setEndDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="To"
                type            ="date"
                variant         ="outlined"
                value           ={endDate}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button>Send</Button>
        </DialogActions>
      </Dialog>
      <Card>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop) => (
                <TableCell
                  className ={classes.tableCell + classes.tableHeadCell}
                  key       ={prop}
                  style     ={{
                    textAlign: "center",
                  }}
                >
                  {prop}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
        <Box sx={{px: 5}}>
          <Typography variant="subtitle2" component="div">
            AL Balance: 14  SL Balance: 7  HL Balance: 7  UL Balance: 10
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Page2;
