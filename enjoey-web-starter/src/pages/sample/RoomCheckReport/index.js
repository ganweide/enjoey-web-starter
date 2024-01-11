// React Imports
import React from "react";

// Material UI Imports
import {
  Card,
  Divider,
  Box,
  Typography,
} from "@mui/material";

// Material UI X Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Global Constants
const calculateRatio = (student, staff) => {
  if (staff === 0) {
    return student;
  }
  return calculateRatio(staff, student % staff);
}

const columns = [
  { field: 'id', headerName: 'ID', flex: 0.5 },
  {
    field: 'room',
    headerName: 'ROOM',
    editable: true,
    flex: 1,
  },
  {
    field: 'studentsIn',
    headerName: 'STUDENTS IN',
    type: 'number',
    editable: true,
    flex: 1,
  },
  {
    field: 'staffsIn',
    headerName: 'STAFFS IN',
    type: 'number',
    editable: true,
    flex: 1,
  },
  {
    field: 'ratio',
    headerName: 'RATIO',
    type: 'number',
    editable: false,
    sortable: false,
    flex: 1,
    valueGetter: (params) => {
      const gcd = calculateRatio(params.row.studentsIn, params.row.staffsIn);
      const ratio = `${params.row.studentsIn/gcd}:${params.row.staffsIn/gcd}`;
      return ratio
    }
  },
];

const rows = [
  { id: 1, room: 'All Rooms', studentsIn: 13, staffsIn: 6 },
  { id: 2, room: 'Hibiscus Room', studentsIn: 6, staffsIn: 3 },
  { id: 3, room: 'Banana Room', studentsIn: 4, staffsIn: 2 },
  { id: 4, room: 'Kitty Room', studentsIn: 5, staffsIn: 3 },
];

const Page2 = () => {
  const CustomToolbar = () => (
    <GridToolbar
      csvOptions={{
        fileName: (() => {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().slice(0, 19).replace(/[-T]/g, '').replace(':', '');
          return `room_check_report_${formattedDate}`;
        })(),
      }}
    />
  );
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h1" component="div" gutterBottom>
          Room Check Report
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Check real-time student:staff ratios for all of your classrooms.
        </Typography>
        <Divider sx={{ my: 5 }}/>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Room check as of 11/09/2023 03:37:00 am. Check in/out is completed on the mobile apps.
        </Typography>
      </Box>
      <Card>
        <DataGrid
          sx={{ m: 5 }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{toolbar: CustomToolbar}} 
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Card>
    </div>
  );
};

export default Page2;
