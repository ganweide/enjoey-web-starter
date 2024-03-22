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

import DeleteIcon from "@mui/icons-material/Delete";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const tenantPaymentKeySettingsURL  = "http://127.0.0.1:8000/api/tenant-payment-key-settings/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Tenant ID", "Currency", "Provider", "Mode", "Active", ""];

  const [open, setOpen]                 = useState(false);
  const [loading, setLoading]           = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [refresh, setRefresh]           = useState([]);
  const [data, setData]                 = useState([]);
  const [selectedRow, setSelectedRow]   = useState([]);
  const [tenantID, setTenantID]         = useState("");
  const [branchID, setBranchID]         = useState("");
  const [currency, setCurrency]         = useState("");
  const [provider, setProvider]         = useState("");
  const [merchantID, setMerchantID]     = useState("");
  const [mode, setMode]                 = useState("");
  const [authKey1, setAuthKey1]         = useState("");
  const [authKey2, setAuthKey2]         = useState("");
  const [creator, setCreator]           = useState("");

  useEffect(() => {
    try {
      Axios.get(tenantPaymentKeySettingsURL).then((response) => {
        setData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://127.0.0.1:8000/api/tenant-payment-key-settings/${id}`);
      
      setRefresh((prevData) => prevData.filter((row) => row.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const openDialog = async () => {
    setOpen       (true);
    setTenantID   ("");
    setBranchID   ("");
    setCurrency   ("");
    setProvider   ("");
    setMerchantID ("");
    setMode       ("");
    setAuthKey1   ("");
    setAuthKey2   ("");
    setCreator    ("");
  };

  const handleCreate = async () => {
    try {
        setLoading(true);
        const formData = new FormData();
        formData.append('tenantId', tenantID);
        formData.append('branchId', branchID);
        formData.append('currency', currency);
        formData.append('provider', provider);
        formData.append('merchantId', merchantID);
        formData.append('mode', mode);
        formData.append('authKey1', authKey1);
        formData.append('authKey2', authKey2);
        formData.append('creator', creator);

        await Axios.post(`http://127.0.0.1:8000/api/tenant-payment-key-settings/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setRefresh(formData);
        setLoading(false);
        setOpen(false);
      } catch (error) {
        setLoading(false);
        setOpen(false);
      }
    };

  const closeDialog = async () => {
    setOpen(false);
  }

  const openUpdateDialog = (rowData) => {
    setUpdateDialog(true);
    setSelectedRow(rowData);
    setTenantID   (rowData.tenantId);
    setBranchID   (rowData.branchId);
    setCurrency   (rowData.currency);
    setProvider   (rowData.provider);
    setMerchantID (rowData.merchantId);
    setMode       (rowData.mode);
    setAuthKey1   (rowData.authKey1);
    setAuthKey2   (rowData.authKey2);
    setCreator    (rowData.creator);
  };

  const closeUpdateDialog = () => {
    setUpdateDialog(false);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
  
      const updatedData = await Axios.put(
        `http://127.0.0.1:8000/api/tenant-payment-key-settings/${selectedRow.id}/`,
        {
          tenantId: tenantID,
          branchId: branchID,
          currency: currency,
          provider: provider,
          merchantId: merchantID,
          mode: mode,
          authKey1: authKey1,
          authKey2: authKey2,
          creator: creator,
        }
      );
  
      // Update the state with the new data
      setData((prevData) =>
        prevData.map((row) =>
          row.id === selectedRow.id ? { ...row, ...updatedData.data } : row
        )
      );
  
      // Close the update dialog and reset selectedRow
      closeUpdateDialog();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          Payment Keys
        </Typography>
        <Button variant ="contained" onClick ={openDialog}>
          <Typography variant="button" component="div">
            + Add Key
          </Typography>
        </Button>
      </Box>
      {/* Add Key Dialog */}
      <Dialog
        fullWidth
        open              ={open}
        onClose           ={closeDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Key Settings</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setTenantID(e.target.value)}
                margin          ="dense"
                label           ="Tenant ID"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={tenantID}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setBranchID(e.target.value)}
                margin          ="dense"
                label           ="Branch ID"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={branchID}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setCurrency(e.target.value)}
                margin          ="dense"
                label           ="Currency"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={currency}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="provider-select">Provider</InputLabel>
                <Select
                  labelId="provider-select"
                  id="provider-select"
                  value={provider || ""}
                  label="Provider"
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <MenuItem value="Razorpay">Razorpay</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setMerchantID(e.target.value)}
                margin          ="dense"
                label           ="Merchant ID"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={merchantID}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="student-select">Mode</InputLabel>
                <Select
                  labelId="mode-select"
                  id="mode-select"
                  value={mode || ""}
                  label="Mode"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <MenuItem value="Test">Test</MenuItem>
                  <MenuItem value="Live">Live</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setAuthKey1(e.target.value)}
                margin          ="dense"
                label           ="Auth Key 1"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={authKey1}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setAuthKey2(e.target.value)}
                margin          ="dense"
                label           ="Auth Key 2"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={authKey2}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setCreator(e.target.value)}
                margin          ="dense"
                label           ="Creator"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={creator}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCreate()} disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}
      <Dialog
        fullWidth
        open              ={updateDialog}
        onClose           ={closeUpdateDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Key Settings</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setTenantID(e.target.value)}
                margin          ="dense"
                label           ="Tenant ID"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={tenantID}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setBranchID(e.target.value)}
                margin          ="dense"
                label           ="Branch ID"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={branchID}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setCurrency(e.target.value)}
                margin          ="dense"
                label           ="Currency"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={currency}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="student-select">Provider</InputLabel>
                <Select
                  labelId="provider-select"
                  id="provider-select"
                  value={provider || ""}
                  label="Provider"
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <MenuItem value="Razorpay">Razorpay</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setMerchantID(e.target.value)}
                margin          ="dense"
                label           ="Merchant ID"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={merchantID}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="student-select">Mode</InputLabel>
                <Select
                  labelId="mode-select"
                  id="mode-select"
                  value={mode || ""}
                  label="Mode"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <MenuItem value="Test">Test</MenuItem>
                  <MenuItem value="Live">Live</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setAuthKey1(e.target.value)}
                margin          ="dense"
                label           ="Auth Key 1"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={authKey1}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setAuthKey2(e.target.value)}
                margin          ="dense"
                label           ="Auth Key 2"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={authKey2}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange        ={(e) => setCreator(e.target.value)}
                margin          ="dense"
                label           ="Creator"
                type            ="text"
                fullWidth
                variant         ="outlined"
                value           ={creator}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleUpdate()} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
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
            {data.map((datas) => (
              <TableRow
                key={datas.id}
                onClick={() => openUpdateDialog(datas)}
                style={{ cursor: "pointer" }}
              >
                  <TableCell style={{ textAlign: 'center' }}>{datas.tenantId}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{datas.currency}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{datas.provider}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{datas.mode}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{datas.isActive}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    <IconButton onClick={() => handleDelete(datas.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }            
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
