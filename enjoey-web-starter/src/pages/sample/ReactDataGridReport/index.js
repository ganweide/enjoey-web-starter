// React Imports
import React from "react";

// Material UI Imports
import {
  Card,
  Divider,
  Box,
  Typography,
} from "@mui/material";

import "./style.css";


import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';


const columns = [
  { key: 'id', name: 'ID' },
  { key: 'room', name: 'ROOM' },
  { key: 'studentsIn', name: 'STUDENTS IN' },
  { key: 'staffsIn', name: 'STAFFS IN' },
];

const rows = [
  { id: 1, room: 'All Rooms', studentsIn: 13, staffsIn: 6 },
  { id: 2, room: 'Hibiscus Room', studentsIn: 6, staffsIn: 3 },
  { id: 3, room: 'Banana Room', studentsIn: 4, staffsIn: 2 },
  { id: 4, room: 'Kitty Room', studentsIn: 5, staffsIn: 3 },
  { id: 5, room: 'Dog Room', studentsIn: 9, staffsIn: 3 },
  { id: 7, room: 'Elephant Room', studentsIn: 12, staffsIn: 4 },
  { id: 8, room: 'Rose Room', studentsIn: 8, staffsIn: 1 },
  { id: 9, room: 'Lily Room', studentsIn: 7, staffsIn: 2 },
  { id: 10, room: 'Lily Room', studentsIn: 7, staffsIn: 2 },
];

const Page2 = () => {
  return (
    <Box id="container">
      <Card sx={{ p: 2 }}>
        <Typography variant="h1" component="div" gutterBottom>
          Room Check Report
        </Typography>
        <Divider sx={{ my: 5 }}/>
        <DataGrid columns={columns} rows={rows} />
      </Card>
    </Box>
  );
};

export default Page2;
