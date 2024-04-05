// React Imports
import React, { useEffect, useState } from "react";

import Axios from "axios";

// Material UI Imports
import {
  Card,
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

import { downloadPdf } from "./downloadpdf";

// Global Constants
const attendanceURL  = "http://127.0.0.1:8000/api/attendance/";
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

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${date} ${time}`;
};

const Page2 = () => {
  const [data, setData] = useState([]);
  const currentDateTime = getCurrentDateTime();

  useEffect(() => {
    try {
      Axios.get(attendanceURL).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const exportAsHtml = (dateTime) => {
    const groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.name]) {
        groupedData[item.name] = {};
      }
      groupedData[item.name][item.date] = item.status;
    });
    // Create HTML content
    let htmlContent = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Room Check Report</title>
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 1cm;
            }
            .table-container {
              width: 21cm;
              margin: auto;
              box-sizing: border-box;
              border: 1px solid #ccc;
            }
            .table {
              width: 100%;
              border-collapse: collapse;
            }
            .table th,
            .table td {
              border: 1px solid black;
              text-align: center;
            }
            .table th {
              background-color: #f2f2f2;
            }
            .weekend {
              background-color: #f0f0f0;
            }
            .holiday {
              background-color: #ffffcc;
            }
            .button-container {
              position: absolute;
              top: 10px;
              right: 10px;
            }
            .footer-container {
              position: relative;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: #f2f2f2;
              padding: 10px;
              text-align: right;
              display: block;
            }
            .table th:first-child,
            .table td:first-child {
              width: 10%;
            }
            /* Calculate and set the width for date columns */
            .table th:not(:first-child),
            .table td:not(:first-child) {
              width: calc(90% / 31); /* 31 is the number of days in a month */
            }
          </style>
          <div id="table-container" class="table-container">
            <div class="container">
              <h2>Check In Report</h2>
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
    `;
    
    // Generate column headers for days
    const daysInMonth = new Date(new Date(dateTime).getFullYear(), new Date(dateTime).getMonth() + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      htmlContent += `<th>${i}</th>`;
    }
  
    htmlContent += "</tr></thead><tbody>";
  
    // Populate rows with data
    for (const name in groupedData) {
      htmlContent += "<tr>";
      // Add name column
      htmlContent += `<td>${name}</td>`;
      // Add day columns
      for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${new Date(dateTime).getFullYear()}-${(new Date(dateTime).getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const dayOfWeek = new Date(dateStr).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          // Weekend
          htmlContent += `<td class="weekend"></td>`;
        } else {
          // Check if data available for the day
          if (groupedData[name][dateStr]) {
            // Data available for the day
            if (groupedData[name][dateStr] === 'present') {
              // Use tick icon for present
              htmlContent += `<td>&#10003;</td>`;
            } else {
              // Use cross icon for absent
              htmlContent += `<td>&#10005;</td>`;
            }
          } else {
            // No data available for the day
            htmlContent += `<td class="holiday"></td>`;
          }
        }
      }
      htmlContent += "</tr>";
    }

    htmlContent += `</tbody></table></div><div class="footer-container">Generated on: ${dateTime.replace(/\/|:|\s/g, '')}</div></div>`;

    const newWindow = window.open();
    newWindow.document.write(htmlContent);

    newWindow.document.write(`
      <div class="button-container">
        <button onclick="convertToPdf()">Convert to PDF</button>
      </div>
    `);

    newWindow.convertToPdf = () => {
      downloadPdf(newWindow, false, false, "table-container", `room_check_report_${dateTime.replace(/\/|:|\s/g, '')}.pdf`);
    }
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
        <MenuItem onClick={()=>exportAsHtml(currentDateTime)}>Export as HTML</MenuItem>
      </GridToolbarExportContainer>
    </GridToolbarContainer>
  );

  return (
    <Box>
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
    </Box>
  );
};

export default Page2;
