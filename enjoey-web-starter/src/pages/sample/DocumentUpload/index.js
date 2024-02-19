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

const DocumentsUploadTable = () => {
  const classes   = useStyles();
  const tableHead = ["Id", "Name", "Requirements", "Document URL", "Action"];
  const [documentsTableData, setDocumentsTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (id) => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/pdf,image/*';  // Accept only PDF and image files

      // Trigger file selection dialog
      input.click();

      // Listen for file selection
      input.addEventListener('change', async (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
          console.error('No File Selected');
          return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('documentURL', selectedFile);

        await Axios.put(`http://127.0.0.1:8000/api/documents/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('File uploaded successfully');
        setLoading(false);
      });
    } catch (error) {
      console.error('Error uploading file', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      Axios.get(documentsURL).then((response) => {
        setDocumentsTableData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [loading]);

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
          Documents Upload
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
                    <Button onClick={() => handleUpload(data.id)} disabled={loading}>
                      {loading ? 'Uploading...' : 'Upload'}
                    </Button>
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

export default DocumentsUploadTable;
