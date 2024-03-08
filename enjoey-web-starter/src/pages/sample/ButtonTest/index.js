// React Imports
import React, { useState } from "react";

import {
  Button,
  Card,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaypalIcon from './paypal.svg';

const Page2 = () => {
  const [openPaymentMethodSettingsDialog, setOpenPaymentMethodSettingsDialog] = useState(false);
  const [methods, setMethods] = useState([]);

  const handleOpenPaymentMethodSettingsDialog = () => {
    setOpenPaymentMethodSettingsDialog(true);
    console.log(PaypalIcon);
  }

  const handleClosePaymentMethodSettingsDialog = () => {
    setOpenPaymentMethodSettingsDialog(false);
  }


  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Typography variant="h1">Payment Method</Typography>
        <Button variant="outlined" onClick={handleOpenPaymentMethodSettingsDialog}>Payment Method Settings</Button>
      </Card>
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={openPaymentMethodSettingsDialog}
        onClose           ={handleClosePaymentMethodSettingsDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Allowed Payment Methods</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" sx={{ display: 'flex', alignItems: 'center' }}>
                <FormLabel component="legend">CHOOSE PAYMENT METHODS</FormLabel>
                <FormGroup aria-label="position" row sx={{ width: '70%', justifyContent: 'space-between' }}>
                  <FormControlLabel control={<Checkbox />} label={<CreditCardIcon />} labelPlacement="start"/>
                  <FormControlLabel control={<Checkbox />} label={<AccountBalanceWalletIcon />} labelPlacement="start"/>
                  <FormControlLabel control={<Checkbox />} label={<img src={PaypalIcon} alt="Paypal" />} labelPlacement="start"/>
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClosePaymentMethodSettingsDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page2;
