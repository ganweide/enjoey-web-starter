// React Imports
import React, { useState } from "react";

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
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  DialogTitle,
  Collapse,
  Tooltip,
  IconButton,
} from "@mui/material";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Styles from "./style";

const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Children", "Paid by", "Date", "Amount Paid"];
  const [openPaymentDetailDialog, setOpenPaymentDetailDialog] = useState(false);
  const [drop, setDrop] = useState(true);

  const handleOpenPaymentDetailDialog = () => {
    setOpenPaymentDetailDialog(true);
  };

  const handleClosePaymentDetailDialog = () => {
    setOpenPaymentDetailDialog(false);
  };

  const handleToggleDropdown = () => {
    setDrop(!drop);
  };

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h3" component="div">
          Payment Details
        </Typography>
      </Box>
      <Card>
        <Box style={{ overflowX: 'auto', maxHeight: '400px' }}>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop) => (
                  <TableCell
                    className={classes.tableCell + classes.tableHeadCell}
                    key={prop}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <Tooltip title="View Details">
                <TableRow
                  className={classes.clickableRow}
                  onClick={handleOpenPaymentDetailDialog}
                >
                  <TableCell style={{textAlign: "center"}}>Test Children 1</TableCell>
                  <TableCell style={{textAlign: "center"}}>Test Father 1</TableCell>
                  <TableCell style={{textAlign: "center"}}>2024-06-04</TableCell>
                  <TableCell style={{textAlign: "center"}}>RM20.00</TableCell>
                </TableRow>
              </Tooltip>
              <Tooltip title="View Details">
                <TableRow
                  className={classes.clickableRow}
                  onClick={handleOpenPaymentDetailDialog}
                >
                  <TableCell style={{textAlign: "center"}}>Test Children 2</TableCell>
                  <TableCell style={{textAlign: "center"}}>Test Father 2</TableCell>
                  <TableCell style={{textAlign: "center"}}>2024-06-05</TableCell>
                  <TableCell style={{textAlign: "center"}}>RM120.00</TableCell>
                </TableRow>
              </Tooltip>
              <Tooltip title="View Details">
                <TableRow
                  className={classes.clickableRow}
                  onClick={handleOpenPaymentDetailDialog}
                >
                  <TableCell style={{textAlign: "center"}}>Test Children 3</TableCell>
                  <TableCell style={{textAlign: "center"}}>Test Father 3</TableCell>
                  <TableCell style={{textAlign: "center"}}>2024-06-06</TableCell>
                  <TableCell style={{textAlign: "center"}}>RM60.00</TableCell>
                </TableRow>
              </Tooltip>
            </TableBody>
          </Table>
        </Box>
      </Card>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openPaymentDetailDialog}
        onClose={handleClosePaymentDetailDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Payment Details</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" gutterBottom>Payment #</Typography>
              <Typography variant="body1" gutterBottom>P0-20240618-1</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" gutterBottom>Paid On</Typography>
              <Typography variant="body1" gutterBottom>2024-06-13 11:32:AM</Typography>
            </Grid>
            <Grid item container xs={12} md={12} alignItems="center">
              <Grid item xs={11} md={11}>
                <Typography variant="h3">Fees, Method Description</Typography>
              </Grid>
              <Grid item xs={1} md={1} style={{ cursor: 'pointer' }}>
                <Tooltip title={drop ? "Click to collapse" : "Click to expand"}>
                  <IconButton onClick={handleToggleDropdown}>
                    {drop ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Collapse in={drop} timeout="auto" unmountOnExit>
                <Grid item xs={12} md={12}>
                  <Typography variant="h2" gutterBottom>Fees Breakup</Typography>
                </Grid>
                <Grid item container xs={12} md={12}>
                  <Grid item xs={9} md={9}>
                    <Typography variant="body1" gutterBottom>Test Fee for Invoice</Typography>
                    <Typography variant="body1" gutterBottom>SST (10.00%)</Typography>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <Typography variant="body1" gutterBottom>RM 150.00</Typography>
                    <Typography variant="body1" gutterBottom>RM 15.00</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h3" gutterBottom>Method</Typography>
                  <Typography variant="body1" gutterBottom>Cheque</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="h3" gutterBottom>Description</Typography>
                  <Typography variant="body1" gutterBottom>-</Typography>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body1" gutterBottom>Payer Details</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid item xs={2} md={2}>
              <Avatar>H</Avatar>
            </Grid>
            <Grid item xs={10} md={10}>
              <Typography variant="h4" gutterBottom>Test Father 1</Typography>
              <Typography variant="body1" gutterBottom>FATHER of Test Children 1</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDetailDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page2;
