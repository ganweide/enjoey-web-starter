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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const auditLogUrl  = "http://127.0.0.1:8000/api/audit-logs/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Id", "Actor", "Action", "Changes", "Timestamp"];
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

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
        // Create filter options from unique models
        const uniqueModels = [...new Set(models)];
        setFilterOptions(['All', ...uniqueModels]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const filteredData = selectedFilter === 'All' ? data : data.filter(entry => {
    const match = entry.object_repr.match(/([A-Za-z]+) object/);
    const modelName = match ? match[1] : 'Unknown';
    return modelName === selectedFilter;
  });
  
  return (
    <div>
      <Box 
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Audit Log Table
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="filter-label">Filter by Model</InputLabel>
          <Select
            labelId="filter-label"
            value={selectedFilter}
            onChange={handleFilterChange}
            label="Filter by Model"
          >
            {filterOptions.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Card>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop) => (
                <TableCell
                  className ={classes.tableCell + classes.tableHeadCell}
                  key       ={prop}
                  style     ={{
                    textAlign: "center",
                  }}
                >
                  {prop}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell style={{ textAlign: "center" }}>{entry.id}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{entry.actor}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{entry.action}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{JSON.stringify(entry.changes)}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{entry.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
