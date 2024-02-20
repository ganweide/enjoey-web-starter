// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const documentsURL  = "http://127.0.0.1:8000/api/documents/";

const DocumentsViewTable = () => {
  const classes   = useStyles();
  const tableHead = ["Id", "Name", "Requirements", "Document URL", "Action"];
  const [documentsTableData, setDocumentsTableData] = useState([]);

  const handleView = (documentURL) => {
    window.open(documentURL, '_blank');
  };

  useEffect(() => {
    try {
      Axios.get(documentsURL).then((response) => {
        setDocumentsTableData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
          Documents View
        </Typography>
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
            {
              documentsTableData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell style={{textAlign: "center"}}>{data.id}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{data.documentName}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{data.isRequired ? "Mandatory" : "Optional"}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{data.documentURL}</TableCell>
                  <TableCell style={{textAlign: "center"}}>
                    <Button onClick={() => handleView(data.documentURL)}>View</Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DocumentsViewTable;
