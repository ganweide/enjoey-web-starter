// React Imports
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import ClassIcon from '@mui/icons-material/Class';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Tabs,
  Tab,
  TablePagination,
} from "@mui/material";
import PropTypes from 'prop-types';
import Styles from "./style";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Name", "Assigned week", "Theme", ""];
  const [createRoomPlanOpen, setCreateRoomPlanOpen]     = useState(false);
  const [mainTabPanelValue, setMainTabPanelValue]       = useState(0);
  const [libraryTabPanelValue, setLibraryTabPanelValue] = useState(0);
  const [roomPlansPage, setRoomPlansPage]                                   = useState(0);
  const [roomPlansRowsPerPage, setRoomPlansRowsPerPage]                     = useState(10);
  const [lessonPlanTemplatesPage, setLessonPlanTemplatesPage]               = useState(0);
  const [lessonPlanTemplatesRowsPerPage, setLessonPlanTemplatesRowsPerPage] = useState(10);

  const handleChange = (event, newValue) => {
    setMainTabPanelValue(newValue);
  };

  const handleLibraryTabChange = (event, newValue) => {
    setLibraryTabPanelValue(newValue);
  };

  const handleChangeRoomPlansPage = (event, newPage) => {
    setRoomPlansPage(newPage);
  };

  const handleChangeRoomPlansRowsPerPage = (event) => {
    setRoomPlansRowsPerPage(parseInt(event.target.value, 10));
    setRoomPlansPage(0);
  };

  const handleChangeLessonPlanTemplatesPage = (event, newPage) => {
    setLessonPlanTemplatesPage(newPage);
  };

  const handleChangeLessonPlanTemplatesRowsPerPage = (event) => {
    setLessonPlanTemplatesRowsPerPage(parseInt(event.target.value, 10));
    setLessonPlanTemplatesPage(0);
  };

  const openCreateRoomPlan = async () => {
    setCreateRoomPlanOpen(true);
  }
  const closeCreateRoomPlan = async () => {
    setCreateRoomPlanOpen(false);
  }

  

  return (
    <Card sx={{ p: 5 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={mainTabPanelValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Room plans" {...a11yProps(0)} />
            <Tab label="Library" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={mainTabPanelValue} index={0}>
          <Box 
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <Typography variant="h1" component="div" gutterBottom>
              Room plans
            </Typography>
            <Button variant ="contained" onClick ={openCreateRoomPlan}>
              <Typography variant="button" component="div">
                Create room plan
              </Typography>
            </Button>
          </Box>
          <Typography variant="body2" component="div" gutterBottom>
            View all lessons plans in your school that are assigned to a room. Go to the library to assign lesson plan templates to rooms for teachers to use.
          </Typography>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                {tableHead.map((prop) => (
                  <TableCell
                    className={classes.tableCell + classes.tableHeadCell}
                    key={prop}
                  >
                    {prop}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Test</TableCell>
                <TableCell sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button endIcon={<ChevronRightIcon />}>
                    <Typography variant="button" component="div">
                      View
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={100}
            page={roomPlansPage}
            onPageChange={handleChangeRoomPlansPage}
            rowsPerPage={roomPlansRowsPerPage}
            onRowsPerPageChange={handleChangeRoomPlansRowsPerPage}
          />
        </TabPanel>
        <TabPanel value={mainTabPanelValue} index={1}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Tabs
                value={libraryTabPanelValue}
                onChange={handleLibraryTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Lesson plan templates" {...a11yProps(0)} />
                <Tab label="Learning activities" {...a11yProps(1)} />
              </Tabs>
              <Button variant ="contained" onClick ={openCreateRoomPlan}>
                <Typography variant="button" component="div">
                  Create room plan
                </Typography>
              </Button>
            </Box>
            <TabPanel value={libraryTabPanelValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%', alignSelf: 'center' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Test</Typography>
                        <Typography variatn="caption">Test</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }}><ClassIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Test 2</Typography>
                        <Typography variatn="caption">Test 2</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }}><ClassIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Test 3</Typography>
                        <Typography variatn="caption">Test 3</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }}><ClassIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
              <TablePagination
                component="div"
                count={100}
                page={lessonPlanTemplatesPage}
                onPageChange={handleChangeLessonPlanTemplatesPage}
                rowsPerPage={lessonPlanTemplatesRowsPerPage}
                onRowsPerPageChange={handleChangeLessonPlanTemplatesRowsPerPage}
              />
            </TabPanel>
            <TabPanel value={libraryTabPanelValue} index={1}>
              Item Two
            </TabPanel>
          </Box>
        </TabPanel>
      </Box>
      {/* Create Room Plan Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={createRoomPlanOpen}
        onClose           ={closeCreateRoomPlan}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Add room plan</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" fullWidth style={{ height:"100%" }}>
                <div style={{ padding: 10 }}>
                  <PlagiarismIcon fontSize="large" />
                  <Typography variant="h3" style={{ textTransform: 'none', marginTop: 10 }}>Select from existing</Typography>
                  <Typography variant="body2" style={{ textTransform: 'none', marginTop: 10 }}>Select an existing lesson plan template from the library to assign to rooms.</Typography>
                </div>
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" fullWidth style={{ height:"100%" }}>
                <div style={{ padding: 10 }}>
                  <NoteAddIcon fontSize="large" />
                  <Typography variant="h3" style={{ textTransform: 'none', marginTop: 10 }}>Create your own</Typography>
                  <Typography variant="body2" style={{ textTransform: 'none', marginTop: 10 }}>Create a new lesson plan template from scratch to assign to rooms.</Typography>
                </div>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setCreateRoomPlanOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Page2;
