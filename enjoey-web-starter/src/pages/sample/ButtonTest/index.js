// React Imports
import React, { useState, useEffect } from "react";

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
  CardContent,
} from "@mui/material";

import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import PaypalIcon from './paypal.svg';
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
  const [selectedItems, setSelectedItems] = useState({
    card: false,
    cash: false,
    ewallet: false,
  });

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


  return (
    <div>
      <Button variant="outlined">Share</Button>
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
                  // Add more card items as needed
                ]}
                color="#00FFFF"
              />
            )}
            {selectedItems.cash && (
              <SelectedItemCard
                title="Supported Cash"
                items={[
                  { label: "FPX Transfer", icon: FPXIcon },
                  // Add more cash items as needed
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
                  // Add more e-wallet items as needed
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
