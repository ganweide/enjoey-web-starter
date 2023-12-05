// React Imports
import React, { useState, useEffect } from "react";

import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  MenuItem,
  Menu,
  Button,
  Dialog,
  DialogContent,
  Tab,
  IconButton,
} from "@mui/material";

const Page2 = () => {
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [signature, setSignature] = useState('');


  const handlePay = async () => {
    try {
      const response = await Axios.post('http://127.0.0.1:8000/api/order-id/');
      console.log('Upload successful.', response.data);
      paymentVerification(response.data.order_id, response.data.amount, response.data.key);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const paymentVerification = (orderId, amount, key) => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeRazorpay();
      };
    };

    const initializeRazorpay = () => {
      const options = {
        key: key,
        amount: amount,
        currency: 'MYR',
        name: 'Visualogic Resources Sdn. Bhd.',
        description: 'Payment Description',
        order_id: orderId,
        handler: async function (response) {
          setOrderId(response.razorpay_order_id);
          setPaymentId(response.razorpay_payment_id);
          setSignature(response.razorpay_signature);
          try {
            console.log("order", response.razorpay_order_id);
            console.log("payment", response.razorpay_payment_id);
            console.log("signature", response.razorpay_signature);
            const verificationResponse = await Axios.post('http://127.0.0.1:8000/api/payment-success/', {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            console.log('Payment information saved successfully:', verificationResponse.data);
          } catch (error) {
            console.error('Failed to save payment information:', error);
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9876543210',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    loadRazorpayScript();
  };

  return (
    <div>
      <Card sx={{ p: 2 }}>
        <Typography variant="h3" component="div">
          Checkout Form
        </Typography>
        <Button onClick={handlePay}>
          Pay
        </Button>
      </Card>
    </div>
  );
};

export default Page2;
