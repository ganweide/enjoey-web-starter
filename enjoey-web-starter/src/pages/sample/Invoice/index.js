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

import {
  TabContext,
  TabPanel,
  TabList,
} from "@mui/lab";

import Styles from "./style";

const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Child Name", "Age", "Program(s)", "Actions"];
  const [anchorEl, setAnchorEl] = useState(null);
  const [paymentLinkDialog, setPaymentLinkDialog] = useState(false);
  const [value, setValue] = React.useState('1');

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenPaymentLinkDialog = () => {
    setPaymentLinkDialog(true);
  };

  const handleClosePaymentLinkDialog = () => {
    setPaymentLinkDialog(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={9} md={9}>
            <Typography variant="h3" component="div">
              Invoice Table
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Card>
        <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop) => (
                  <TableCell
                    className={classes.tableCell + classes.tableHeadCell}
                    key={prop}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Child 1</TableCell>
                <TableCell>0.5</TableCell>
                <TableCell>Infant Care Program</TableCell>
                <TableCell>
                  <Button
                    id="basic-button"
                    aria-controls={anchorEl ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    onClick={handleOpenMenu}
                  >
                    Action
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleOpenPaymentLinkDialog}>Share Payment Link</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={paymentLinkDialog}
        onClose={handleClosePaymentLinkDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
        <DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page2;
