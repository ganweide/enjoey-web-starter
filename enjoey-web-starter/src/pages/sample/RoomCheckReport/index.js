// React Imports
import React, { useState, useEffect } from "react";

// Material UI Imports
import {
  Card,
  Divider,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";

// Material UI X Imports
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { jsPDF } from "jspdf";

// Global Constants
const calculateRatio = (student, staff) => {
  if (staff === 0) {
    return student;
  }
  return calculateRatio(staff, student % staff);
}

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${date} ${time}`;
};

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'room', headerName: 'ROOM', editable: true },
  { field: 'studentsIn', headerName: 'STUDENTS IN', type: 'number', editable: true },
  { field: 'staffsIn', headerName: 'STAFFS IN', type: 'number', editable: true },
  {
    field: 'ratio',
    headerName: 'RATIO',
    type: 'number',
    editable: false,
    sortable: false,
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
  { id: 5, room: 'Dog Room', studentsIn: 9, staffsIn: 3 },
  { id: 7, room: 'Elephant Room', studentsIn: 12, staffsIn: 4 },
  { id: 8, room: 'Rose Room', studentsIn: 8, staffsIn: 1 },
  { id: 9, room: 'Lily Room', studentsIn: 7, staffsIn: 2 },
];

const Page2 = () => {
  const currentDateTime = getCurrentDateTime();

  const exportAsHtml = () => {
    // Create HTML content
    let htmlContent = `
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
      <table>
        <thead>
          <tr>
    `;

    // Add column headers
    columns.forEach(column => {
      htmlContent += `<th>${column.headerName}</th>`;
    });
    htmlContent += "</tr></thead><tbody>";

    // Add rows
    rows.forEach(row => {
      htmlContent += "<tr>";
      columns.forEach(column => {
        if (column.field === 'ratio') {
          // Calculate ratio manually
          const gcd = calculateRatio(row.studentsIn, row.staffsIn);
          const ratio = `${row.studentsIn / gcd}:${row.staffsIn / gcd}`;
          htmlContent += `<td>${ratio}</td>`;
        } else {
          // Add other fields normally
          htmlContent += `<td>${row[column.field]}</td>`;
        }
      });
      htmlContent += "</tr>";
    });

    htmlContent += "</tbody></table>";

    const newWindow = window.open();
    newWindow.document.write(htmlContent);

    newWindow.document.write(`
      <div style="position: absolute; top: 10px; right: 10px;">
        <button onclick="convertToPdf()">Convert to PDF</button>
      </div>
    `);

    // Define function to convert HTML to PDF
    newWindow.convertToPdf = () => {
      const pdf = new jsPDF();
      pdf.html(htmlContent, {
        callback: function (pdf) {
          pdf.save('room_check_report.pdf');
        }
      });
    };
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExportContainer>
        <GridCsvExportMenuItem
          options={{
            fileName: `room_check_report_${currentDateTime.replace(/\/|:|\s/g, '')}.csv`,
          }}
        />
        <MenuItem onClick={exportAsHtml}>Export as HTML</MenuItem>
      </GridToolbarExportContainer>
    </GridToolbarContainer>
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
          Room check as of {currentDateTime}. Check in/out is completed on the mobile apps.
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
        />
      </Card>
    </div>
  );
};

export default Page2;
