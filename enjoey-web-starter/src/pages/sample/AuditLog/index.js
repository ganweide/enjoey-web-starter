// React Imports
import React, { useEffect, useState } from "react";
// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
  FormHelperText,
  TablePagination,
} from "@mui/material";

// Local Imports
import Styles from "./style";

import { format } from 'date-fns';

// Global Constants
const useStyles = makeStyles(Styles);
const auditLogUrl  = "http://127.0.0.1:8000/api/audit-logs/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["TIMESTAMP", "EVENT", "ACTOR", "SOURCE", "METADATA"];
  const [data, setData] = useState([]);
  // menu item contants
  const [modelFilterOptions, setModelFilterOptions] = useState([]);
  const [sourceFilterOptions, setSourceFilterOptions] = useState([]);
  const [actorFilterOptions, setActorFilterOptions] = useState([]);
  // filtering constants
  const [filterStartDate, setFilterStartDate] = useState([]);
  const [filterEndDate, setFilterEndDate] = useState([]);
  const [selectedFilterTable, setSelectedFilterTable] = useState('All');
  const [selectedFilterActor, setSelectedFilterActor] = useState('All');
  const [selectedFilterSource, setSelectedFilterSource] = useState('All');
  // pagination constants
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(auditLogUrl);
        setData(response.data);
        console.log(response.data);
        const models = response.data.map(entry => {
          const match = entry.object_repr.match(/([A-Za-z]+) object/);
          return match ? match[1] : 'Unknown';
        });
        const source = response.data.map(entry => entry.remote_addr || 'null');
        const actors = response.data.map(entry => entry.actor || 'null');
        // Create filter options from unique models
        const uniqueSource = [...new Set(source)];
        const uniqueModels = [...new Set(models)];
        const uniqueActors = [...new Set(actors)];
        setModelFilterOptions(['All', ...uniqueModels]);
        setSourceFilterOptions(['All', ...uniqueSource]);
        setActorFilterOptions(['All', ...uniqueActors]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFilterTableChange = (event) => setSelectedFilterTable(event.target.value);
  const handleFilterActorChange = (event) => setSelectedFilterActor(event.target.value);
  const handleFilterSourceChange = (event) => setSelectedFilterSource(event.target.value);

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), 'PPpp'); // 'PPpp' is a date-fns format string for a full date and time
  };

  const filteredData = selectedFilterTable === 'All' ? data : data.filter(entry => {
    const match = entry.object_repr.match(/([A-Za-z]+) object/);
    const modelName = match ? match[1] : 'Unknown';
    return modelName === selectedFilterTable;
  });

  const handleClearFilters = () => {
    setSelectedFilterTable('All');
    setSelectedFilterActor('All');
    setSelectedFilterSource('All');
    setFilterStartDate('');
    setFilterEndDate('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <div>
      <Card>
        <Box sx={{ p: 5 }}>
          <Typography variant="h1" component="div" gutterBottom>
            Audit Logs
          </Typography>
        </Box>
        <Box
          sx={{
            px: 6,
            pb: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={2} md={2}>
              <FormControl variant="standard" fullWidth margin="dense">
                <FormHelperText>Table</FormHelperText>
                <Select
                  value={selectedFilterTable}
                  onChange={handleFilterTableChange}
                >
                  {modelFilterOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} md={2}>
              <FormControl variant="standard" fullWidth margin="dense">
              <FormHelperText>Actor</FormHelperText>
                <Select
                  value={selectedFilterActor}
                  onChange={handleFilterActorChange}
                >
                  {actorFilterOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} md={2}>
              <FormControl variant="standard" fullWidth margin="dense">
                <FormHelperText>Source</FormHelperText>
                <Select
                  value={selectedFilterSource}
                  onChange={handleFilterSourceChange}
                >
                  {sourceFilterOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2} md={2}>
              <FormControl variant="standard" fullWidth margin="dense">
                <FormHelperText>Start date</FormHelperText>
                <TextField
                  type="date"
                  variant="standard"
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  value={filterStartDate}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={2} md={2}>
              <FormControl variant="standard" fullWidth margin="dense">
                <FormHelperText>End date</FormHelperText>
                <TextField
                  type="date"
                  variant="standard"
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  value={filterEndDate}
                  fullWidth
                />
              </FormControl>

            </Grid>
          </Grid>
          <Button onClick={handleClearFilters} variant ="outlined" sx={{ ml: 2, mt: 1, height: '55px' }}>
            <Typography variant="button" component="div">
              Clear Filters
            </Typography>
          </Button>
        </Box>
        <Box sx={{ px: 5 }}>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop) => (
                  <TableCell
                    className ={classes.tableCell + classes.tableHeadCell}
                    key       ={prop}
                    style     ={{
                      textAlign: "left",
                    }}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell style={{ textAlign: "left" }}>{formatDate(entry.timestamp)}</TableCell>
                  <TableCell style={{ textAlign: "left" }}>
                    {entry.action === 0 ? <>create<br />{entry.object_repr}</> : entry.action === 1 ? <>update<br />{entry.object_repr}</> : entry.action === 2 ? <>delete<br />{entry.object_repr}</> : entry.action}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>{entry.actor === null ? "null" : entry.actor}</TableCell>
                  <TableCell style={{ textAlign: "center" }}>{entry.remote_addr}</TableCell>
                  <TableCell style={{ textAlign: "left" }}>{JSON.stringify(entry.changes)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </div>
  );
};

export default Page2;
