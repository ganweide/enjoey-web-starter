// React Imports
import React from "react";

// Material UI Imports
import {
  Card,
  Box,
  Typography,
} from "@mui/material";

// Material UI X Imports
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// Global Constants
const columns = [
  { field: 'id', headerName: 'ID', flex: 0.5 },
  {
    field: 'student',
    headerName: 'STUDENT',
    editable: true,
    flex: 1,
  },
  {
    field: 'room',
    headerName: 'ROOM',
    editable: true,
    flex: 1,
  },
  {
    field: 'checkin',
    headerName: 'CHECK-IN',
    editable: true,
    flex: 1,
    renderCell: (params) => (
      <div>
        {params.value && params.value.date && (
          <div>{params.value.date}</div>
        )}
        {params.value && params.value.time && (
          <div>{params.value.time}</div>
        )}
      </div>
    ),
  },
  {
    field: 'healthscreen',
    headerName: 'HEALTH SCREEN',
    editable: true,
    flex: 1,
  },
  {
    field: 'signedinby',
    headerName: 'SIGNED IN BY',
    editable: true,
    flex: 1,
  },
  {
    field: 'checkout',
    headerName: 'CHECKOUT',
    editable: true,
    flex: 1,
    renderCell: (params) => (
      <div>
        {params.value && params.value.date && (
          <div>{params.value.date}</div>
        )}
        {params.value && params.value.time && (
          <div>{params.value.time}</div>
        )}
      </div>
    ),
  },
  {
    field: 'signedoutby',
    headerName: 'SIGNED OUT BY',
    editable: true,
    flex: 1,
  },
  {
    field: 'totalhours',
    headerName: 'TOTAL HOURS',
    editable: true,
    flex: 1,
  },
];

const rows = [
  { id: 1, student: 'Student 1', room: "Hibiscus Room", checkin: { date: '11/09/2023', time: '11:46am' }, healthscreen: "Healthy", signedinby: "Jane Lead Staff", checkout: { date: '11/09/2023', time: '11:49am' }, signedoutby: "Jane Lead Staff", totalhours: "00:02:53"},
];

const Page2 = () => {
  const CustomToolbar = () => (
    <GridToolbar
      csvOptions={{
        fileName: (() => {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().slice(0, 19).replace(/[-T]/g, '').replace(':', '');
          return `check_in_report_${formattedDate}`;
        })(),
      }}
    />
  );

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h1" component="div" gutterBottom>
          Check-in Report
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
          disableRowSelectionOnClick
        />
      </Card>
    </div>
  );
};

export default Page2;
