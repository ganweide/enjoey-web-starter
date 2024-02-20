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
  Alert,
  AlertTitle,
  IconButton,
  Collapse,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// Local Imports
import Styles from "./style";

// Global Constants
const useStyles = makeStyles(Styles);
const documentsURL  = "http://127.0.0.1:8000/api/documents/";

const DocumentsUploadTable = () => {
  const classes   = useStyles();
  const tableHead = ["Id", "Name", "Requirements", "Action"];
  const [documentsTableData, setDocumentsTableData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ severity: null, message: null });
  const [open, setOpen] = useState(true);

  const handleUpload = (id) => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/pdf,image/*';

      // Trigger file selection dialog
      input.click();

      // Listen for file selection
      input.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
          setSelectedFiles((prevFiles) => ({ ...prevFiles, [id]: selectedFile }));
        }
      });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  const handleGlobalSubmit = async () => {
    try {
      setLoading(true);

      // Iterate through the selected files and send them to the server
      for (const [id, file] of Object.entries(selectedFiles)) {
        const formData = new FormData();
        formData.append('documentURL', file);

        await Axios.put(`http://127.0.0.1:8000/api/documents/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('All files uploaded successfully');
      setLoading(false);
      setSelectedFiles({});
      setEnableSubmit(false);
      setAlert({ severity: 'success', message: 'Files uploaded successfully' });
    } catch (error) {
      console.error('Error uploading files', error);
      setAlert({ severity: 'error', message: `Error uploading files: ${error.message}` });
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if all mandatory files have been selected
    const mandatoryFilesSelected = documentsTableData.every((data) => {
      return !data.isRequired || (selectedFiles[data.id] && selectedFiles[data.id] instanceof File);
    });
  
    setEnableSubmit(mandatoryFilesSelected);
  }, [selectedFiles, documentsTableData]);

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
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
        <Button sx={{ m: 3, alignSelf: "flex-end" }} onClick={handleGlobalSubmit} disabled={!enableSubmit}>
          Submit All
        </Button>
        <Collapse in={open}>
          {alert.severity && alert.message && (
            <Alert 
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity='success'
            >
              <AlertTitle>Success</AlertTitle>
                <strong>{alert.message}</strong>
            </Alert>
          )}
        </Collapse>
      </Card>
    </div>
  );
};

export default DocumentsUploadTable;
