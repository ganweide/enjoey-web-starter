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
  Divider,
  TextField,
  Checkbox,
  CardContent,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
  const [openAddNewPlanDialog, setOpenAddNewPlanDialog]                       = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    card: false,
    cash: false,
    ewallet: false,
  });
  const [duration, setDuration] = useState("");
  const [name, setName]         = useState("");
  const [price, setPrice]       = useState("");
  const [tag, setTag]           = useState("");
  const [tagColor, setTagColor] = useState("");
  const [type, setType]         = useState("");
  const [features, setFeatures] = useState([]);

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

  const handleOpenAddNewPlanDialog = () => {
    setOpenAddNewPlanDialog(true);
  }

  const handleCloseAddNewPlanDialog = () => {
    setOpenAddNewPlanDialog(false);
  }

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleDeleteFeature = (index) => {
    if (features.length === 1) {
      return;
    }
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  return (
    <div>
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
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography variant="h1">Create Plans</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Button variant="outlined" onClick={handleOpenAddNewPlanDialog}>
              Add New Plan
            </Button>
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
      {/* Add New Plan Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={openAddNewPlanDialog}
        onClose           ={handleCloseAddNewPlanDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Subscription Plan</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                onChange        ={(e) => setName(e.target.value)}
                margin          ="dense"
                label           ="Plan's Name"
                type            ="text"
                variant         ="outlined"
                value           ={name}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                onChange        ={(e) => setDuration(e.target.value)}
                margin          ="dense"
                label           ="Subscription's Duration (Months)"
                type            ="number"
                variant         ="outlined"
                value           ={duration}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                onChange        ={(e) => setPrice(e.target.value)}
                margin          ="dense"
                label           ="Price"
                type            ="number"
                variant         ="outlined"
                value           ={price}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                onChange        ={(e) => setTag(e.target.value)}
                margin          ="dense"
                label           ="Tag"
                type            ="text"
                variant         ="outlined"
                value           ={tag}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                onChange        ={(e) => setTagColor(e.target.value)}
                margin          ="dense"
                label           ="Tag Color"
                type            ="text"
                variant         ="outlined"
                value           ={tagColor}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" gutterBottom>Plan&apos;s Details</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                onChange        ={(e) => setType(e.target.value)}
                margin          ="dense"
                label           ="Plan Type"
                type            ="text"
                variant         ="outlined"
                value           ={type}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h4" gutterBottom>Features</Typography>
            </Grid>
            {features.map((feature, index) => (
              <Grid container item xs={12} md={12} key={index}>
                <Grid item xs={features.length === 1 ? 12 : 10} md={features.length === 1 ? 12 : 10}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      const updatedFeatures = [...features];
                      updatedFeatures[index] = e.target.value;
                      setFeatures(updatedFeatures);
                    }}
                    margin="dense"
                    label={`Feature ${index + 1}`}
                    type="text"
                    variant="outlined"
                    value={feature}
                  />
                </Grid>
                <Grid item xs={2} md={2}>
                  {features.length > 1 && ( // Display delete button if there's more than one feature
                    <Button
                      aria-label='delete'
                      onClick={() => handleDeleteFeature(index)}
                      style={{ width: "100%", height: "100%" }}
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} md={12}>
              <Button
                aria-label='add'
                onClick={handleAddFeature}
                style={{ width: "100%", height: "100%" }}
              >
                <AddCircleIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseAddNewPlanDialog}>Save</Button>
          <Button variant="outlined" color="error" onClick={handleCloseAddNewPlanDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page2;
