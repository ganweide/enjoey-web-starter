// React Imports
import React, { useEffect, useState } from "react";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import ClassIcon from '@mui/icons-material/Class';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Tabs,
  Tab,
  TablePagination,
  Divider,
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
  const [createRoomPlanOpen, setCreateRoomPlanOpen]                         = useState(false);
  const [assignRoomOpen, setAssignRoomOpen]                                 = useState(false);
  const [lessonTemplateOpen, setLessonPlanTemplateOpen]                     = useState(false);
  const [sectionNameOpen, setSectionNameOpen]                               = useState(false);
  const [sectionNoteOpen, setSectionNoteOpen]                               = useState(false);
  const [sectionItemOpen, setSectionItemOpen]                               = useState(false);
  const [roomPlanViewOpen, setRoomPlanViewOpen]                             = useState(false);
  const [selectedRooms, setSelectedRooms]                                   = useState([]);
  const [selectedSkill, setSelectedSkill]                                   = useState([]);
  const [selectedCategory, setSelectedCategory]                             = useState([]);
  const [selectedType, setSelectedType]                                     = useState([]);
  const [selectedLearningFramework, setSelectedLearningFramework]           = useState([]);
  const [mainTabPanelValue, setMainTabPanelValue]                           = useState(0);
  const [libraryTabPanelValue, setLibraryTabPanelValue]                     = useState(0);
  const [sectionNoteTabPanelValue, setSectionNoteTabPanelValue]             = useState(0);
  const [roomPlansPage, setRoomPlansPage]                                   = useState(0);
  const [roomPlansRowsPerPage, setRoomPlansRowsPerPage]                     = useState(10);
  const [lessonPlanTemplatesPage, setLessonPlanTemplatesPage]               = useState(0);
  const [lessonPlanTemplatesRowsPerPage, setLessonPlanTemplatesRowsPerPage] = useState(10);
  const [cards, setCards] = useState([
    { id: 'card-1', title: 'Space Songs', targetGroup: 'Large group', category: 'Song', description: 'Approach to learning the planets in our solar system.' },
    { id: 'card-2', title: 'Counting the Planets', targetGroup: '', category: '', description: 'Communication, Gross Motor' },
    { id: 'card-3', title: 'Earth From Space', targetGroup: '', category: '', description: 'Literacy, Arts' },
    { id: 'card-4', title: 'Make Your Own Planet ', targetGroup: 'Small group', category: 'Art', description: 'Cognition, Including Math' },
    { id: 'card-5', title: 'Outer Space Activities', targetGroup: 'Center', category: 'Block', description: 'Communication, Gross Motor, Social & Emotional' },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside a valid drop area

    const updatedCards = [...cards];
    const [reorderedCard] = updatedCards.splice(result.source.index, 1);
    updatedCards.splice(result.destination.index, 0, reorderedCard);

    setCards(updatedCards);
  };

  const handleChange = (event, newValue) => {
    setMainTabPanelValue(newValue);
  };

  const handleLibraryTabChange = (event, newValue) => {
    setLibraryTabPanelValue(newValue);
  };

  const handleSectionNoteTabChange = (event, newValue) => {
    setSectionNoteTabPanelValue(newValue);
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

  const openSectionName = async () => {
    setSectionNameOpen(true);
  }

  const closeSectionName = async () => {
    setSectionNameOpen(false);
  }

  const openSectionNote = async () => {
    setSectionNoteOpen(true);
  }

  const closeSectionNote = async () => {
    setSectionNoteOpen(false);
  }

  const openSectionItem = async () => {
    setSectionItemOpen(true);
  }

  const closeSectionItem = async () => {
    setSectionItemOpen(false);
  }

  const openRoomPlanView = async () => {
    setRoomPlanViewOpen(true);
  }

  const closeRoomPlanView = async () => {
    setRoomPlanViewOpen(false);
  }

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
                  <Button endIcon={<ChevronRightIcon />} onClick={() => openRoomPlanView()}>
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
        maxWidth          ="xl"
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
            {/* Template Textfield */}
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
            {/* Room Select */}
            <Grid item xs={6} md={6}>
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
            {/* Theme Select */}
            <Grid item xs={6} md={6}>
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
            {/* Divider */}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            {/* Daily Topic Container */}
            <Grid item container xs={12} md={12} spacing={2}>
              <Grid item xs={5.5} md={5.5}>
                <TextField
                  fullWidth
                  label           ="Daily topic"
                  margin          ="dense"
                  type            ="text"
                  variant         ="outlined"
                />
              </Grid>
              <Grid item xs={5.5} md={5.5}>
                <TextField
                  fullWidth
                  label           ="Description"
                  margin          ="dense"
                  type            ="text"
                  variant         ="outlined"
                />
              </Grid>
              <Grid item xs={1} md={1}>
                <Button sx={{ minHeight: "100%", minWidth: "100%" }}><DeleteIcon /></Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }}>+ Add topic</Button>
              </Grid>
            </Grid>
            {/* Divider */}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            {/* Section Grid */}
            <Grid item xs={12} md={12}>
              <Card sx={{ borderRadius: 1.5 }}>
                <Box sx={{ minWidth: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#e3f2fd', p: 2 }}>
                  <Button endIcon={<EditIcon />} onClick={() => openSectionName()}>Add section name (optional)</Button>
                  <Button endIcon={<EditIcon />} onClick={() => openSectionNote()}>Section notes</Button>
                </Box>
                <Grid container item xs={12} md={12} spacing={3} sx={{ p: 5 }}>
                  <Grid container item md={2.4} xs={2.4} spacing={2}>
                    <Grid item md={12} xs={12}>
                      {/* <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="questions-list" direction="vertical">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              // eslint-disable-next-line
                              {...provided.droppableProps}
                            >
                              <Draggable>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    // eslint-disable-next-line
                                    {...provided.draggableProps}
                                    // eslint-disable-next-line
                                    {...provided.dragHandleProps}
                                  > */}
                                    <Card sx={{ border: 1, display: 'flex', flexDirection: 'column', borderRadius: 1.5 }}>
                                      <Box sx={{ backgroundColor: "#D3D3D3", p: 5 }}>
                                        <Typography variant="caption">Large Group · Song</Typography>
                                        <Typography variant="h3">Space Songs</Typography>
                                      </Box>
                                      <Box sx={{ p: 5 }}>
                                        <Typography variant="body1">· Approach to learning the planets in our solar system.</Typography>
                                      </Box>
                                    </Card>
                                  {/* </div>
                                  )}
                                </Draggable>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext> */}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }} onClick={() => openSectionItem()}>+</Button>
                    </Grid>
                  </Grid>
                  <Grid container item md={2.4} xs={2.4} spacing={2}>
                    <Grid item md={12} xs={12}>
                      <Card sx={{ border: 1, display: 'flex', flexDirection: 'column', borderRadius: 1.5 }}>
                        <Box sx={{ backgroundColor: "#D3D3D3", p: 5 }}>
                          <Typography variant="h3">Counting the Planets</Typography>
                        </Box>
                        <Box sx={{ p: 5 }}>
                          <Typography variant="body1">· Communication</Typography>
                          <Typography variant="body1">· Gross Motor</Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }} onClick={() => openSectionItem()}>+</Button>
                    </Grid>
                  </Grid>
                  <Grid container item md={2.4} xs={2.4} spacing={2}>
                    <Grid item md={12} xs={12}>
                      <Card sx={{ border: 1, display: 'flex', flexDirection: 'column', borderRadius: 1.5 }}>
                        <Box sx={{ backgroundColor: "#D3D3D3", p: 5 }}>
                          <Typography variant="h3">Earth From Space</Typography>
                        </Box>
                        <Box sx={{ p: 5 }}>
                          <Typography variant="body1">· Arts</Typography>
                          <Typography variant="body1">· Literacy</Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }} onClick={() => openSectionItem()}>+</Button>
                    </Grid>
                  </Grid>
                  <Grid container item md={2.4} xs={2.4} spacing={2}>
                    <Grid item md={12} xs={12}>
                      <Card sx={{ border: 1, display: 'flex', flexDirection: 'column', borderRadius: 1.5 }}>
                        <Box sx={{ backgroundColor: "#D3D3D3", p: 5 }}>
                          <Typography variant="caption">Small Group · Arts</Typography>
                          <Typography variant="h3">Make Your Own Planet</Typography>
                        </Box>
                        <Box sx={{ p: 5 }}>
                          <Typography variant="body1">· Cognition, Including Math</Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }} onClick={() => openSectionItem()}>+</Button>
                    </Grid>
                  </Grid>
                  <Grid container item md={2.4} xs={2.4} spacing={2}>
                    <Grid item md={12} xs={12}>
                      <Card sx={{ border: 1, display: 'flex', flexDirection: 'column', borderRadius: 1.5 }}>
                        <Box sx={{ backgroundColor: "#D3D3D3", p: 5 }}>
                          <Typography variant="caption">Small Group · Arts</Typography>
                          <Typography variant="h3">Make Your Own Planet</Typography>
                        </Box>
                        <Box sx={{ p: 5 }}>
                          <Typography variant="body1">· Cognition, Including Math</Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }} onClick={() => openSectionItem()}>+</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }}>+ Add Section</Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => closeLessonTemplate()}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Section Name Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={sectionNameOpen}
        onClose           ={closeSectionName}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Add Section Name</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label           ="Name"
                margin          ="dense"
                type            ="text"
                variant         ="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={closeSectionName}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Section Note Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={sectionNoteOpen}
        onClose           ={closeSectionNote}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Section Note</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={sectionNoteTabPanelValue}
              onChange={handleSectionNoteTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Day 1" {...a11yProps(0)} />
              <Tab label="Day 2" {...a11yProps(1)} />
              <Tab label="Day 3" {...a11yProps(2)} />
              <Tab label="Day 4" {...a11yProps(3)} />
              <Tab label="Day 5" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={sectionNoteTabPanelValue} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  multiline
                  rows    ={3}
                  label   ="Notes"
                  margin  ="dense"
                  type    ="text"
                  variant ="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={sectionNoteTabPanelValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  multiline
                  rows    ={3}
                  label   ="Notes"
                  margin  ="dense"
                  type    ="text"
                  variant ="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={sectionNoteTabPanelValue} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  multiline
                  rows    ={3}
                  label   ="Notes"
                  margin  ="dense"
                  type    ="text"
                  variant ="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={sectionNoteTabPanelValue} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  multiline
                  rows    ={3}
                  label   ="Notes"
                  margin  ="dense"
                  type    ="text"
                  variant ="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={sectionNoteTabPanelValue} index={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  multiline
                  rows    ={3}
                  label   ="Notes"
                  margin  ="dense"
                  type    ="text"
                  variant ="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={closeSectionNote}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Section Item Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={sectionItemOpen}
        onClose           ={closeSectionItem}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>Section Activity</h2>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="group-select">Targeted Group</InputLabel>
                <Select
                  labelId="group-select"
                  id="group-select"
                  label="Targeted Group"
                >
                  <MenuItem value="large group">Large Group</MenuItem>
                  <MenuItem value="small group">Small Group</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="Category-select">Category</InputLabel>
                <Select
                  labelId="Category-select"
                  id="Category-select"
                  label="Category"
                >
                  <MenuItem value="song">Song</MenuItem>
                  <MenuItem value="arts">Arts</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label   ="Activity Title"
                margin  ="dense"
                type    ="text"
                variant ="outlined"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                multiline
                rows    ={2}
                label   ="Activity Description"
                margin  ="dense"
                type    ="text"
                variant ="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={closeSectionItem}>Done</Button>
        </DialogActions>
      </Dialog>
      {/* Room Plans View Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="xl"
        open              ={roomPlanViewOpen}
        onClose           ={closeRoomPlanView}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <h2>{cardText}</h2>
          <Typography variant="body2">This is a lesson plan template, you can assign it to rooms in your school.</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Template Textfield */}
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
            {/* Room Select */}
            <Grid item xs={6} md={6}>
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
            {/* Theme Select */}
            <Grid item xs={6} md={6}>
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
            {/* Divider */}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            {/* Daily Topic Container */}
            <Grid item container xs={12} md={12} spacing={2}>
              <Grid item xs={5.5} md={5.5}>
                <TextField
                  fullWidth
                  label           ="Daily topic"
                  margin          ="dense"
                  type            ="text"
                  variant         ="outlined"
                />
              </Grid>
              <Grid item xs={5.5} md={5.5}>
                <TextField
                  fullWidth
                  label           ="Description"
                  margin          ="dense"
                  type            ="text"
                  variant         ="outlined"
                />
              </Grid>
              <Grid item xs={1} md={1}>
                <Button sx={{ minHeight: "100%", minWidth: "100%" }}><DeleteIcon /></Button>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }}>+ Add topic</Button>
              </Grid>
            </Grid>
            {/* Divider */}
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
            {/* Section Grid */}
            <Grid item xs={12} md={12}>
              <Card sx={{ borderRadius: 1.5 }}>
                <Box sx={{ minWidth: '100%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#e3f2fd', p: 2 }}>
                  <Button endIcon={<EditIcon />} onClick={() => openSectionName()}>Add section name (optional)</Button>
                  <Button endIcon={<EditIcon />} onClick={() => openSectionNote()}>Section notes</Button>
                </Box>
                <Grid container item xs={12} md={12} spacing={3} sx={{ p: 5 }}>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    {cards.map((card, index) => (
                      <Grid key={card.id} container item md={2.4} xs={2.4} spacing={2}>
                        <Grid item xs={12} md={12}>
                          <Droppable droppableId={`cards-${card.id}`} direction="horizontal">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Card sx={{ height: "200px", border: 1, display: 'flex', flexDirection: 'column', borderRadius: 1.5 }}>
                                        <Box sx={{ backgroundColor: "#D3D3D3", p: 5 }}>
                                          <Typography variant="h3">{`${card.targetGroup} · ${card.category}`}</Typography>
                                          <Typography variant="h3">{card.title}</Typography>
                                        </Box>
                                        <Box sx={{ p: 5 }}>
                                          <Typography variant="body1">{`·${card.description}`}</Typography>
                                        </Box>
                                      </Card>
                                    </div>
                                  )}
                                </Draggable>
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <IconButton aria-label='delete' onClick={() => openSectionItem()}>
                            <AddIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </DragDropContext>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="outlined" sx={{ minHeight: "100%", minWidth: "100%" }}>+ Add Section</Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => closeRoomPlanView()}>Done</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Page2;
