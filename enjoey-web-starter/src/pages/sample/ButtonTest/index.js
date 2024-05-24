// React Imports
import React, { useState, useEffect } from "react";

import Axios from 'axios';

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
  Divider,
  TextField,
  Checkbox,
  CardContent,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import VisaIcon from './cc-visa.svg';
import MastercardIcon from './cc-mastercard.svg';
import AlipayIcon from './alipay.svg';
import ApplePayIcon from './cc-apple-pay.svg';

import './style.css';

const TouchnGoIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Touch_%27n_Go_eWallet_logo.svg/1200px-Touch_%27n_Go_eWallet_logo.svg.png";
const FPXIcon = "https://seeklogo.com/images/F/fpx-logo-8BD7586AD8-seeklogo.com.png";

const PaymentCard = ({ label, icon, color, onSelect, selected }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(selected ? true : false);
  };

  useEffect(() => {
    setHovered(false);
  }, [selected]);

  return (
    <Card
      sx={{
        border: hovered ? `2px solid ${color}` : "1px solid #ccc",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
    >
      <CardContent>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 1,
            visibility: selected ? "visible" : "hidden",
          }}
        >
          <Checkbox
            checked={selected}
            color="primary"
            style={{ padding: 0 }}
            onChange={() => onSelect()}
          />
        </Box>
        {icon}
        <Typography variant="body2">{label}</Typography>
      </CardContent>
    </Card>
  );
};

const SelectedItemCard = ({ title, items, color }) => {
  return (
    <Grid item xs={12} md={12} sx={{ margin: '10px 0' }}>
      <Card sx={{ border: `1px solid ${color}`, padding: '10px' }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            {title}
          </Typography>
          {items.map((item, index) => (
            <div className="icon-container" key={index}>
              <img src={item.icon} alt={item.label} className="image" />
              <span className="span">{item.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

const Page2 = () => {
  const [openPaymentMethodSettingsDialog, setOpenPaymentMethodSettingsDialog] = useState(false);
  const [openMessageTemplateInputDialog, setOpenMessageTemplateInputDialog]   = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    card: false,
    cash: false,
    ewallet: false,
  });
  const [html, setHtml]         = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [academicYear, setAcademicYear]     = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [minDate, setMinDate]               = useState('');
  const [maxDate, setMaxDate]               = useState('');

  const handleCardSelect = () => {
    setSelectedItems((prev) => ({ ...prev, card: !prev.card }));
  };

  const handleCashSelect = () => {
    setSelectedItems((prev) => ({ ...prev, cash: !prev.cash }));
  };

  const handleEWalletSelect = () => {
    setSelectedItems((prev) => ({ ...prev, ewallet: !prev.ewallet }));
  };

  const handleOpenPaymentMethodSettingsDialog = () => {
    setOpenPaymentMethodSettingsDialog(true);
  }

  const handleClosePaymentMethodSettingsDialog = () => {
    setOpenPaymentMethodSettingsDialog(false);
  }

  const handleOpenMessageTemplateInputDialog = () => {
    setOpenMessageTemplateInputDialog(true);
  }

  const handleCloseMessageTemplateInputDialog = () => {
    setOpenMessageTemplateInputDialog(false);
  }

  const handleFileChange = (e) => {
    setHtml(e.target.files[0]);
  };

  const handleSendEmailTemplate = async () => {
    if (!html) {
      console.error('No HTML file selected');
      return;
    }

    const formData = new FormData();
    formData.append('html', html);
    for (const entry of formData.entries()) {
      console.log(entry);
    }

    if (!csrfToken) {
      console.error('CSRF token not available. Aborting request.');
      return;
    }

    try {
      await Axios.post('http://127.0.0.1:8000/api/send-email-template/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
      });
      console.log('Email template sent successfully');
    } catch (error) {
      console.error('Error sending email template:', error);
    }
  };

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await Axios.get('http://127.0.0.1:8000/api/get-csrf-token/');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleAcademicYearChange = (e) => {
    const value = e.target.value;
    setAcademicYear(value);

    // Extract the min and max dates from the selected value and format them as yyyy-MM-dd
    const [min, max] = value.split('-');
    const formattedMinDate = `${min.substring(0, 4)}-${min.substring(4, 6)}-${min.substring(6, 8)}`;
    const formattedMaxDate = `${max.substring(0, 4)}-${max.substring(4, 6)}-${max.substring(6, 8)}`;

    setMinDate(formattedMinDate);
    setMaxDate(formattedMaxDate);
  };

  return (
    <div>
      {/* Payment Method */}
      <Card sx={{ p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h1">Payment Method</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="outlined" onClick={handleOpenPaymentMethodSettingsDialog}>
              Payment Method Settings
            </Button>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="outlined">Share</Button>
          </Grid>
        </Grid>
      </Card>
      {/* Email Template */}
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h1">Send Email Template</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <input type="file" accept=".html" onChange={handleFileChange} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="outlined" onClick={handleSendEmailTemplate}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Card>
      {/* Message Template */}
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h1">Message Template Input</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="outlined" onClick={handleOpenMessageTemplateInputDialog}>
              Input
            </Button>
          </Grid>
        </Grid>
      </Card>
      {/* Calendar Settings */}
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h1">Calendar Settings</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="academic-year-select">Academic Year</InputLabel>
              <Select
                labelId ="academic-year-select"
                id      ="academic-year-select"
                value   ={academicYear}
                label   ="Academic Year"
                onChange={handleAcademicYearChange}
              >
                <MenuItem value="20240301-20250228">(2024) 20240301-20250228</MenuItem>
                <MenuItem value="20250301-20260228">(2025) 20250301-20260228</MenuItem>
                <MenuItem value="20260301-20270228">(2026) 20260301-20270228</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              onChange={(e) => setEnrollmentDate(e.target.value)}
              InputLabelProps ={{ shrink: true }}
              margin="dense"
              label="EnrollmentDate"
              type="date"
              fullWidth
              variant="outlined"
              value={enrollmentDate}
              InputProps={{
                inputProps: {
                  min: minDate,
                  max: maxDate
                }
              }}
            />
          </Grid>
        </Grid>
      </Card>
      {/* Payment Methods Settings Dialog */}
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
            <Grid item xs={4} md={4}>
              <PaymentCard
                label="Credit Card"
                icon={<CreditCardIcon />}
                color="#00FFFF"
                onSelect={handleCardSelect}
                selected={selectedItems.card}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <PaymentCard
                label="Bank Transfer"
                icon={<AccountBalanceWalletIcon />}
                color="#40E0D0"
                onSelect={handleCashSelect}
                selected={selectedItems.cash}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <PaymentCard
                label="E-Wallet"
                icon={<PhonelinkRingIcon />}
                color="#B4CFEC"
                onSelect={handleEWalletSelect}
                selected={selectedItems.ewallet}
              />
            </Grid>
            {selectedItems.card && (
              <SelectedItemCard
                title="Supported Cards"
                items={[
                  { label: "Visa", icon: VisaIcon },
                  { label: "MasterCard", icon: MastercardIcon },
                ]}
                color="#00FFFF"
              />
            )}
            {selectedItems.cash && (
              <SelectedItemCard
                title="Supported Cash"
                items={[
                  { label: "FPX Transfer", icon: FPXIcon },
                ]}
                color="#40E0D0"
              />
            )}
            {selectedItems.ewallet && (
              <SelectedItemCard
                title="Supported E-Wallet"
                items={[
                  { label: "Touch n' Go", icon: TouchnGoIcon },
                  { label: "Apple Pay", icon: ApplePayIcon },
                  { label: "Alipay", icon: AlipayIcon },
                ]}
                color="#B4CFEC"
              />
            )}
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
