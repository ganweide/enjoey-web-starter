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
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const taxFormUrl  = "http://127.0.0.1:8000/api/tax-form/";

const Page2 = () => {
  const classes   = useStyles();
  const currentDate = new Date();
  const tableHead = ["Date Added", "Tax Cateory", "Tax Code", "Tax Rate (%)", "Effective From", "Until", "Status", "Action"];
  const [openDialog, setOpenDialog]         = useState(false);
  const [data, setData]                     = useState([]);
  const [taxType, setTaxType]               = useState([]);
  const [taxRate, setTaxRate]               = useState([]);
  const [effectiveDate, setEffectiveDate]   = useState([]);
  const [minEffectiveDate, setMinEffectiveDate] = useState("");
  const [refreshData, setRefreshData]       = useState([]);

  useEffect(() => {
    try {
      Axios.get(taxFormUrl).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refreshData]);

  const handleSelectTaxType = async (tax) => {
    setTaxType(tax);

    // Determine the minimum effective date based on the ongoing data
    const ongoingData = data.filter(d => {
      const startDate = new Date(d.startDate);
      const endDate = d.endDate ? new Date(d.endDate) : null;
      return startDate <= currentDate && !endDate && d.taxCategory !== taxType;
    });

    if (ongoingData.length > 0) {
      const ongoingStartDate = new Date(ongoingData[0].startDate);
      const minDate = new Date(ongoingStartDate);
      minDate.setDate(minDate.getDate() + 1);
      setMinEffectiveDate(minDate.toISOString().split('T')[0]);
    } else {
      setMinEffectiveDate('');
    }
  }

  const handleOpenDialog = async () => {
    setOpenDialog   (true);
    setTaxType      ("");
    setTaxRate      ("");
    setEffectiveDate("");
  };

  const handleCloseDialog = async () => {
    setOpenDialog(false);
  }

  const handleAddTaxRate = async () => {
    try {
      // Fetch the existing data to determine if there's a previous rate to update
      const existingDataResponse = await Axios.get(taxFormUrl);
      const existingData = existingDataResponse.data;
  
      // Sort the existing data by startDate in descending order to find the most recent one
      const sortedData = existingData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      const mostRecentEntry = sortedData.length > 0 ? sortedData[0] : null;
  
      const newStartDate = new Date(effectiveDate);
      let previousEndDate = null;
  
      // If there is a most recent entry, update its endDate
      if (mostRecentEntry && new Date(mostRecentEntry.startDate) < newStartDate) {
        previousEndDate = new Date(newStartDate);
        previousEndDate.setDate(previousEndDate.getDate() - 1); // Set endDate to one day before the new startDate
        
        await Axios({
          method: "PUT",
          url: `${taxFormUrl}${mostRecentEntry.id}/`,
          data: {
            ...mostRecentEntry,
            endDate: previousEndDate.toISOString().split('T')[0] // Format to YYYY-MM-DD
          },
          headers: { "Content-Type": "application/json" },
        });
      }

      const data = new FormData();
      data.append("taxCategory", taxType);
      data.append("taxCode", taxType);
      data.append("taxRate", taxRate);
      data.append("startDate", effectiveDate);

      try {
        const response = await Axios({
          method  : "POST",
          url     : taxFormUrl,
          data    : data,
          headers : {"Content-Type": "multipart/form-data"},
        });
        setRefreshData(response.data)
      } catch (error) {
        console.log("error", error);
      }
      setOpenDialog(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  
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
          Tax Rate Settings
        </Typography>
        <Button variant ="contained" onClick ={handleOpenDialog}>
          <Typography variant="button" component="div">
            + Add
          </Typography>
        </Button>
      </Box>
      <Dialog
        open              ={openDialog}
        onClose           ={handleCloseDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} md={9}>
              <Typography variant="h2">Add Tax Rate</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="tax-type-select">Your Tax Type</InputLabel>
                <Select
                  labelId="tax-type-select"
                  id="tax-type-select"
                  value={taxType || []}
                  label="Your Tax Type"
                  onChange={(e) => handleSelectTaxType(e.target.value)}
                >
                  <MenuItem value="SST">SST</MenuItem>
                  <MenuItem value="GST">GST</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setTaxRate(e.target.value)}
                margin          ="dense"
                label           ="Tax Rate (%)"
                type            ="number"
                variant         ="outlined"
                value           ={taxRate}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setEffectiveDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                inputProps      ={{ min: minEffectiveDate }}
                margin          ="dense"
                label           ="Effective From"
                type            ="date"
                variant         ="outlined"
                value           ={effectiveDate}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTaxRate}>Add</Button>
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
            {data.map((datas) => {
              const startDate = new Date(datas.startDate);
              const endDate = datas.endDate ? new Date(datas.endDate) : null;
      
              let status = '';
      
              if (startDate > currentDate) {
                status = 'Upcoming';
              } else if (startDate <= currentDate && !endDate) {
                status = 'OnGoing';
              } else if (startDate <= currentDate && endDate) {
                status = 'Expired';
              }

              return (
                <TableRow key={datas.id}>
                  <TableCell style={{textAlign: "center"}}>{datas.dateAdded}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{datas.taxCategory}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{datas.taxCode}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{datas.taxRate}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{datas.startDate}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{datas.endDate || 'N/A'}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{status}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {status === 'Upcoming' && (
                      <>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
