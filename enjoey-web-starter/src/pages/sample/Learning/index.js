// React Imports
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import ClassIcon from '@mui/icons-material/Class';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
  const [cardText, setCardText]                         = useState([]);
  const [createRoomPlanOpen, setCreateRoomPlanOpen]     = useState(false);
  const [assignRoomOpen, setAssignRoomOpen]             = useState(false);
  const [lessonTemplateOpen, setLessonPlanTemplateOpen] = useState(false);
  const [mainTabPanelValue, setMainTabPanelValue]       = useState(0);
  const [libraryTabPanelValue, setLibraryTabPanelValue] = useState(0);
  const [selectedRooms, setSelectedRooms]               = useState([]);
  const [selectedSkill, setSelectedSkill]               = useState([]);
  const [selectedCategory, setSelectedCategory]         = useState([]);
  const [selectedType, setSelectedType]                 = useState([]);
  const [selectedLearningFramework, setSelectedLearningFramework]           = useState([]);
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

  const openAssignRoom = async () => {
    setAssignRoomOpen(true);
  }

  const closeAssignRoom = async () => {
    setAssignRoomOpen(false);
  }

  const openLessonTemplate = async (title) => {
    setLessonPlanTemplateOpen(true);
    setCardText(title);
  }
  
  const closeLessonTemplate = async () => {
    setLessonPlanTemplateOpen(false);
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
              {/* Template Section */}
              <Grid container spacing={2}>
                <Grid item xs={3} md={3}>
                  <Card
                    sx={{
                      border: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onClick={() => openLessonTemplate("Test")}
                  >
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%', alignSelf: 'center' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Test</Typography>
                        <Typography variatn="caption">Test</Typography>
                      </Box>
                      <Button
                        sx={{ mx: 3, mb: 3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openAssignRoom();
                        }}
                      >
                        <ClassIcon />
                      </Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Card
                    sx={{
                      border: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onClick={() => openLessonTemplate("Test 2")}
                  >
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Test 2</Typography>
                        <Typography variatn="caption">Test 2</Typography>
                      </Box>
                      <Button
                        sx={{ mx: 3, mb: 3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openAssignRoom();
                        }}
                      >
                        <ClassIcon />
                      </Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={3} md={3}>
                  <Card
                    sx={{
                      border: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onClick={() => openLessonTemplate("Test 3")}
                  >
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Test 3</Typography>
                        <Typography variatn="caption">Test 3</Typography>
                      </Box>
                      <Button
                        sx={{ mx: 3, mb: 3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openAssignRoom();
                        }}
                      >
                        <ClassIcon />
                      </Button>
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
              {/* Filtering Section */}
              <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={2.7} md={2.7}>
                  <FormControl fullWidth>
                    <InputLabel id={"learning-framework-select"}>Learnig framework</InputLabel>
                    <Select
                      multiple
                      labelId={'learning-framework-select'}
                      id={'learning-framework-select'}
                      label="Learning framework"
                      value={selectedLearningFramework}
                      onChange={(e) => setSelectedLearningFramework(e.target.value)}
                    >
                      <MenuItem value='test 1'>Test 1</MenuItem>
                      <MenuItem value='test 2'>Test 2</MenuItem>
                      <MenuItem value='test 3'>Test 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2.7} md={2.7}>
                  <FormControl fullWidth>
                    <InputLabel id={"skill-select"}>Skill</InputLabel>
                    <Select
                      multiple
                      labelId={'skill-select'}
                      id={'skill-select'}
                      label="Skill"
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                    >
                      <MenuItem value='test 1'>Test 1</MenuItem>
                      <MenuItem value='test 2'>Test 2</MenuItem>
                      <MenuItem value='test 3'>Test 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2.7} md={2.7}>
                  <FormControl fullWidth>
                    <InputLabel id={"category-select"}>Category</InputLabel>
                    <Select
                      multiple
                      labelId={'category-select'}
                      id={'category-select'}
                      label="Category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <MenuItem value='test 1'>Test 1</MenuItem>
                      <MenuItem value='test 2'>Test 2</MenuItem>
                      <MenuItem value='test 2'>Test 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2.7} md={2.7}>
                  <FormControl fullWidth>
                    <InputLabel id={"type-select"}>Type</InputLabel>
                    <Select
                      multiple
                      labelId={'type-select'}
                      id={'type-select'}
                      label="Type"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <MenuItem value='test 1'>Test 1</MenuItem>
                      <MenuItem value='test 2'>Test 2</MenuItem>
                      <MenuItem value='test 2'>Test 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={1.2} md={1.2}>
                  <Button variant="outlined" fullWidth style={{ height:"100%" }}>Reset all</Button>
                </Grid>
              </Grid>
              {/* Class Content Section */}
              <Grid container spacing={5} sx={{ my: 2 }}>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%', alignSelf: 'center' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Sheep Escape</Typography>
                        <Typography variant="caption">Center · Blocks</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Star Cutting Station</Typography>
                        <Typography variant="caption">Center · Art</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Up & Down Spiders</Typography>
                        <Typography variant="caption">Center · Outside discovery</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Sheep Bell</Typography>
                        <Typography variant="caption">Center · Dramatic play</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Sheep in the Corn</Typography>
                        <Typography variant="caption">Center · Sensory</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Birdwatching</Typography>
                        <Typography variant="caption">Large group · Discussion</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Peacock</Typography>
                        <Typography variant="caption">Large group · Discussion</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Blue Crane</Typography>
                        <Typography variant="caption">Large group · Discussion</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Sheep Escape</Typography>
                        <Typography variant="caption">Large group · Discussion</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Penguin</Typography>
                        <Typography variant="caption">Large group · Discussion</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Ostrich</Typography>
                        <Typography variant="caption">Large group · Discussion</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ border: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ m: 3, backgroundColor: 'rgba(33, 150, 243, 0.2)', height: '100px', width: '90%' }}></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ mx: 3, mb: 3 }}>
                        <Typography variant="h3">Mary Had a Little Lamb</Typography>
                        <Typography variant="caption">Large group · Song</Typography>
                      </Box>
                      <Button sx={{ mx: 3, mb: 3 }} onClick={openAssignRoom}><AddIcon /></Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
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
      {/* Assign Room Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={assignRoomOpen}
        onClose           ={closeAssignRoom}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Assign to room</h2>
          <Typography variant="body2">Select rooms to assign your lesson plan template to. Assigning a lesson plan template to a room will make it visible in the web and mobile app to all staff assigned to that room.</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="room-select">Room</InputLabel>
                <Select
                  multiple
                  labelId="room-select"
                  id="room-select"
                  label="Room"
                  value={selectedRooms}
                  onChange={(e) => setSelectedRooms(e.target.value)}
                >
                  <MenuItem value="hibiscus room">Hibiscus Room</MenuItem>
                  <MenuItem value="banana room">Banana Room</MenuItem>
                  <MenuItem value="kitty room">Kitty Room</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                InputLabelProps ={{ shrink: true }}
                label           ="Assign week"
                margin          ="dense"
                type            ="date"
                variant         ="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setAssignRoomOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAssignRoomOpen(false)}>Assign</Button>
        </DialogActions>
      </Dialog>
      {/* Lesson Template Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={lessonTemplateOpen}
        onClose           ={closeLessonTemplate}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>{cardText}</h2>
          <Typography variant="body2">This is a lesson plan template, you can assign it to rooms in your school.</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label           ="Template title"
                margin          ="dense"
                type            ="text"
                variant         ="outlined"
                value           ={cardText}
                onChange        ={(e) => setCardText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="room-select">Room</InputLabel>
                <Select
                  multiple
                  labelId="room-select"
                  id="room-select"
                  label="Room"
                  value={selectedRooms}
                  onChange={(e) => setSelectedRooms(e.target.value)}
                >
                  <MenuItem value="hibiscus room">Hibiscus Room</MenuItem>
                  <MenuItem value="banana room">Banana Room</MenuItem>
                  <MenuItem value="kitty room">Kitty Room</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="room-select">Theme</InputLabel>
                <Select
                  multiple
                  labelId="room-select"
                  id="room-select"
                  label="Room"
                  value={selectedRooms}
                  onChange={(e) => setSelectedRooms(e.target.value)}
                >
                  <MenuItem value="hibiscus room">Hibiscus Room</MenuItem>
                  <MenuItem value="banana room">Banana Room</MenuItem>
                  <MenuItem value="kitty room">Kitty Room</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setAssignRoomOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setAssignRoomOpen(false)}>Assign</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Page2;
