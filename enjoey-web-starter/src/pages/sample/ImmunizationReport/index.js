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
  { field: 'id', headerName: 'ID' },
  {
    field: 'student',
    headerName: 'STUDENT',
    editable: true,
  },
  {
    field: 'dose',
    headerName: 'Dose',
    editable: true,
  },
  {
    field: 'hepa',
    headerName: 'HEP A',
    editable: true,
  },
  {
    field: 'hepb',
    headerName: 'HEP B',
    editable: true,
  },
  {
    field: 'dtap',
    headerName: 'DTAP',
    editable: true,
  },
  {
    field: 'hib',
    headerName: 'HIB',
    editable: true,
  },
  {
    field: 'pcv',
    headerName: 'PCV',
    editable: true,
  },
  {
    field: 'polio',
    headerName: 'POLIO',
    editable: true,
  },
  {
    field: 'rotavirus',
    headerName: 'ROTAVIRUS',
    editable: true,
  },
  {
    field: 'flu',
    headerName: 'FLU',
    editable: true,
  },
  {
    field: 'mmr',
    headerName: 'MMR',
    editable: true,
  },
  {
    field: 'var',
    headerName: 'VAR',
    editable: true,
  },
];

const rows = [
  { id: 1, student: 'Student 1', dose: 1, hepa: "02/03/2026", hepb: "", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "", flu: "02/03/2026", mmr: "02/03/2026", var: "02/03/2026"},
  { id: 2, student: 'Student 1', dose: 2, hepa: "02/03/2026", hepb: "02/03/2026", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "02/03/2026", flu: "", mmr: "02/03/2026", var: "02/03/2026"},
  { id: 3, student: 'Student 1', dose: 3, hepa: "02/03/2026", hepb: "02/03/2026", dtap: "02/03/2026", hib: "", pcv: "02/03/2026", polio: "", rotavirus: "02/03/2026", flu: "02/03/2026", mmr: "", var: "02/03/2026"},
  { id: 4, student: 'Student 1', dose: 4, hepa: "02/03/2026", hepb: "02/03/2026", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "02/03/2026", flu: "02/03/2026", mmr: "02/03/2026", var: "02/03/2026"},
  { id: 5, student: 'Student 1', dose: 5, hepa: "", hepb: "02/03/2026", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "02/03/2026", flu: "02/03/2026", mmr: "", var: "02/03/2026"},
  { id: 6, student: 'Student 2', dose: 1, hepa: "02/03/2026", hepb: "", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "", flu: "02/03/2026", mmr: "02/03/2026", var: "02/03/2026"},
  { id: 7, student: 'Student 2', dose: 2, hepa: "02/03/2026", hepb: "02/03/2026", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "02/03/2026", flu: "", mmr: "02/03/2026", var: "02/03/2026"},
  { id: 8, student: 'Student 2', dose: 3, hepa: "02/03/2026", hepb: "02/03/2026", dtap: "02/03/2026", hib: "", pcv: "02/03/2026", polio: "", rotavirus: "02/03/2026", flu: "02/03/2026", mmr: "", var: "02/03/2026"},
  { id: 9, student: 'Student 2', dose: 4, hepa: "02/03/2026", hepb: "02/03/2026", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "02/03/2026", flu: "02/03/2026", mmr: "02/03/2026", var: "02/03/2026"},
  { id: 10, student: 'Student 2', dose: 5, hepa: "", hepb: "02/03/2026", dtap: "02/03/2026", hib: "02/03/2026", pcv: "02/03/2026", polio: "02/03/2026", rotavirus: "02/03/2026", flu: "02/03/2026", mmr: "", var: "02/03/2026"},
];

const Page2 = () => {
  const CustomToolbar = () => (
    <GridToolbar
      csvOptions={{
        fileName: (() => {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().slice(0, 19).replace(/[-T]/g, '').replace(':', '');
          return `immunization_report_${formattedDate}`;
        })(),
      }}
    />
  );

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h1" component="div" gutterBottom>
          Immunizations Report
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          All immunizations by school, room, or student.
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
