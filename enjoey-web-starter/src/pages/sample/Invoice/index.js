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
} from "@mui/material";

import Styles from "./style";

const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Child Name", "Age", "Program(s)", "Actions"];
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
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Action
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Share Payment Link</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Page2;
