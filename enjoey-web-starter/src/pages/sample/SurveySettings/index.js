// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// React Beautiful Dnd
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Material UI Imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Card,
  IconButton,
} from "@mui/material";

// Material UI Icons
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// Global Constants
const childUrl  = "http://127.0.0.1:8000/api/child/";
const surveyUrl = "http://127.0.0.1:8000/api/surveysettings/";

const Page2 = () => {
  const [child, setChild]                   = useState([]);
  const [previousSurvey, setPreviousSurvey] = useState([]);
  const [open, setOpen]                     = useState(false);
  const [recipientType, setRecipientType]   = useState([]);
  const [sendTo, setSendTo]                 = useState([]);
  const [selectClass, setSelectClass]       = useState([]);
  const [schoolName, setSchoolName]         = useState([]);
  const [student, setStudent]               = useState([]);
  const [surveyTitle, setSurveyTitle]       = useState([]);
  const [description, setDescription]       = useState([]);
  const [surveyType, setSurveyType]         = useState([]);
  const [startDate, setStartDate]           = useState([]);
  const [endDate, setEndDate]               = useState([]);
  const [settings, setSettings]             = useState(false);
  const [showResult, setShowResult]         = useState([]);
  const [create, setCreate]                 = useState(false);
  const [selectSurvey, setSelectSurvey]     = useState([]);
  const [questions, setQuestions]           = useState([]);
  const [radioItems, setRadioItems]         = useState([]);
  const [ratings, setRatings]               = useState([]);
  const [startLabel, setStartLabel]         = useState(["Most Unlikely"]);
  const [endLabel, setEndLabel]             = useState(["Most Likely"]);
  const [checkbox, setCheckbox]             = useState([]);
  const [dropdown, setDropdown]             = useState([]);
  const [singleSelect, setSingleSelect]     = useState([]);
  const [multiDropdown, setMultiDropdown]   = useState([]);
  const [multiSelect, setMultiSelect]       = useState([]);
  const [firstBoolean, setFirstBoolean]     = useState(["Yes"]);
  const [secondBoolean, setSecondBoolean]   = useState(["No"]);
  const [formData, setFormData] = useState({
    surveyTitle: '',
    description: '',
    questions: [],
  });

  useEffect(() => {
    try {
      Axios.get(childUrl).then((response) => {
        setChild(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      Axios.get(surveyUrl).then((response) => {
        const parsedSurveys = response.data.map((survey) => ({
          ...survey,
          questions: JSON.parse(survey.questions),
        }));

        setPreviousSurvey(parsedSurveys);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Initialise Survey
  const openDialog = async () => {
    setOpen         (true);
    setRecipientType("");
    setSendTo       ("");
    setSelectClass  ("");
    setSurveyTitle  ("");
    setDescription  ("");
    setSurveyType   ("");
    setStartDate    ("");
    setEndDate      ("");
  };
  const openSettings = async () => {
    setSettings   (true);
    setShowResult ("");
  }
  const closeSettings = async () => {
    setSettings(false);
  }
  const renderGrid = () => {
    if (sendTo === "class") {
      return (
        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <InputLabel id="class-select">Select Class</InputLabel>
            <Select
              labelId="class-select"
              id="class-select"
              value={selectClass}
              label="Select Class"
              onChange={(e) => setSelectClass(e.target.value)}
            >
              <MenuItem value ="hibiscus">Hibiscus Room</MenuItem>
              <MenuItem value ="banana">Banana Room</MenuItem>
              <MenuItem value ="kitty">Kitty Room</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )
    } else if (sendTo === "school") {
      return (
        <Grid item xs={12} md={12}>
          <TextField
            onChange  ={(e) => setSchoolName(e.target.value)}
            margin    ="dense"
            label     ="Typing School Name"
            type      ="string"
            fullWidth
            variant   ="outlined"
            value     ={schoolName}
          />
        </Grid>
      )
    } else if (sendTo === "customise-list") {
      return (
        <>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="class-select">Select Class</InputLabel>
              <Select
                labelId="class-select"
                id="class-select"
                value={selectClass}
                label="Select Class"
                onChange={(e) => setSelectClass(e.target.value)}
              >
                <MenuItem value ="hibiscus">Hibiscus Room</MenuItem>
                <MenuItem value ="banana">Banana Room</MenuItem>
                <MenuItem value ="kitty">Kitty Room</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id="student-select">Student</InputLabel>
              <Select
                multiple
                labelId="student-select"
                id="student-select"
                value={student || []}
                label="Student"
                onChange={(e) => setStudent(e.target.value)}
              >
                {child.map((childData) => {
                  return (
                    <MenuItem
                      key   ={childData.childId}
                      value ={childData.childNameENG}
                    >
                      {childData.childNameENG}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </>
      )
    }
    return null;
  }
  const closeDialog = async () => {
    setOpen(false);
  }

  // Survey Questions
  const openCreate = async () => {
    setOpen(false);
    setCreate(true);
    setQuestions([]);
    setSelectSurvey("");
  }
  const handlePreviousSurveyChange = (value) => {
    setSelectSurvey(value);
    const selectedSurveyTitle = previousSurvey.find((survey) => survey.surveyId === value);

    if (selectedSurveyTitle) {
      setQuestions(selectedSurveyTitle.questions);
      setSurveyTitle(selectedSurveyTitle.surveyTitle);
      setDescription(selectedSurveyTitle.description);
    } else {
      setQuestions([]);
    }
  };
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const reorderedQuestions = Array.from(questions);
    const [reorderedQuestion] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, reorderedQuestion);
  
    setQuestions(reorderedQuestions);
  };
  const addQuestion = (type) => {
    const newQuestion = {
      id: questions.length,
      title: '',
      type: type,
    };
    setQuestions([...questions, newQuestion]);
  };
  const handleQuestionTitleChange = (id, value) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, title: value } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleQuestionTypeChange = (id, value) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, type: value } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    setQuestions(updatedQuestions);
  };
  const handleSave = async () => {
    const updatedFormData = {
      ...formData,
      surveyTitle: surveyTitle,
      description: description,
      questions: [...questions],
    };
    const questionsJson = JSON.stringify(updatedFormData.questions);
  
    try {
      if (selectSurvey) {
        const response = await Axios.put(
          `${surveyUrl}${selectSurvey}/`,
          {
            ...updatedFormData,
            questions: questionsJson,
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        console.log("response", response);
      } else {
        const response = await Axios.post(
          surveyUrl,
          {
            ...updatedFormData,
            questions: questionsJson,
          },
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );
        console.log("response", response);
      }
    } catch (error) {
      console.log("error", error);
    }
    setCreate(false);
  };
  const closeCreate = async () => {
    setCreate(false);
  }
  
  // Radio Button Group
  const addRadioItems = () => {
    const newRadioItems = {
      id: radioItems.length,
      item: '',
    };
    setRadioItems([...radioItems, newRadioItems]);
  };
  const handleRadioItemChange = (id, value) => {
    const updatedRadioItems = radioItems.map(item =>
      item.id === id ? { ...item, item: value } : item
    );
    setRadioItems(updatedRadioItems);
  };
  const handleDeleteRadioItem = (itemId) => {
    const updatedRadioItems = radioItems.filter(item => item.id !== itemId);
    setRadioItems(updatedRadioItems);
  };

  // Rating Scale
  const handleRatingItemChange = (id, value) => {
    const updatedRating = ratings.map(rating =>
      rating.id === id ? { ...rating, rating: value } : rating
    );
    setRatings(updatedRating);
  };
  const addRating = () => {
    const newRating = {
      id: ratings.length,
      rating: '',
    };
    setRatings([...ratings, newRating]);
  };
  const removeRating = () => {
    const updatedRating = [...ratings];
    updatedRating.pop();
    setRatings(updatedRating);
  };

  // Checkboxes
  const addCheckbox = () => {
    const newCheckbox = {
      id: checkbox.length,
      item: '',
    };
    setCheckbox([...checkbox, newCheckbox]);
  };
  const handleCheckboxChange = (id, value) => {
    const updatedCheckbox = checkbox.map(item =>
      item.id === id ? { ...item, item: value } : item
    );
    setCheckbox(updatedCheckbox);
  };
  const handleDeleteCheckbox = (itemId) => {
    const updatedCheckbox = checkbox.filter(item => item.id !== itemId);
    setCheckbox(updatedCheckbox);
  };

  // Dropdown
  const addDropdown = () => {
    const newDropdown = {
      id: dropdown.length,
      item: '',
    };
    setDropdown([...dropdown, newDropdown]);
  };
  const handleDropdownChange = (id, value) => {
    const updatedDropdown = dropdown.map(item =>
      item.id === id ? { ...item, item: value } : item
    );
    setDropdown(updatedDropdown);
  };
  const handleDeleteDropdown = (itemId) => {
    const updatedDropdown = dropown.filter(item => item.id !== itemId);
    setDropdown(updatedDropdown);
  };

  // Multi-Select dropdown
  const addMultiDropdown = () => {
    const newMultiDropdown = {
      id: multiDropdown.length,
      item: '',
    };
    setMultiDropdown([...multiDropdown, newMultiDropdown]);
  };
  const handleMultiDropdownChange = (id, value) => {
    const updatedMultiDropdown = multiDropdown.map(item =>
      item.id === id ? { ...item, item: value } : item
    );
    setMultiDropdown(updatedMultiDropdown);
  };
  const handleDeleteMultiDropdown = (itemId) => {
    const updatedMultiDropdown = multiDropdown.filter(item => item.id !== itemId);
    setMultiDropdown(updatedMultiDropdown);
  };

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
          Survey Settings
        </Typography>
        <Button variant ="contained" onClick ={openDialog}>
          <Typography variant="button" component="div">
            + Compose
          </Typography>
        </Button>
      </Box>
      {/* Initialise Survey */}
      <Dialog
        fullWidth
        open              ={open}
        onClose           ={closeDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8} md={8}>
              <h2>Surveys</h2>
            </Grid>
            <Grid item xs={4} md={4} container justifyContent="flex-end">
              <Button endIcon={<SettingsIcon />} onClick={openSettings}>
                Survey Settings
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="recipient-type-select">Recipient Type</InputLabel>
                <Select
                  labelId="recipient-type-select"
                  id="recipient-type-select"
                  value={recipientType}
                  label="Recipient Type"
                  onChange={(e) => setRecipientType(e.target.value)}
                >
                  <MenuItem value ="student">Student</MenuItem>
                  <MenuItem value ="parent">Parent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="send-select">Send To</InputLabel>
                <Select
                  labelId="send-select"
                  id="send-select"
                  value={sendTo}
                  label="Send To"
                  onChange={(e) => setSendTo(e.target.value)}
                >
                  <MenuItem value ="class">Class</MenuItem>
                  <MenuItem value ="school">School</MenuItem>
                  <MenuItem value ="customise-list">Customise List</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {renderGrid()}
            <Grid item xs={12} md={12}>
              <TextField
                onChange  ={(e) => setSurveyTitle(e.target.value)}
                margin    ="dense"
                label     ="Survey Title"
                type      ="string"
                fullWidth
                variant   ="outlined"
                value     ={surveyTitle}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                onChange  ={(e) => setDescription(e.target.value)}
                margin    ="dense"
                label     ="Description"
                type      ="string"
                fullWidth
                variant   ="outlined"
                value     ={description}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="survey-type-select">Survey Type</InputLabel>
                <Select
                  labelId="survey-type-select"
                  id="survey-type-select"
                  value={surveyType}
                  label="Survey Type"
                  onChange={(e) => setSurveyType(e.target.value)}
                >
                  <MenuItem value ="class">One-Time Survey</MenuItem>
                  <MenuItem value ="school">Campaign</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setStartDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Start Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={startDate}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setEndDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="End Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={endDate}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={openCreate}>Next</Button>
        </DialogActions>
      </Dialog>
      {/* Survey Settings */}
      <Dialog
        fullWidth
        open              ={settings}
        onClose           ={closeSettings}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Survey Settings</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Include withdrawn students"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="This survey will be anonymouse"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="show-result-select">Show survey result to</InputLabel>
                <Select
                  labelId="show-result-select"
                  id="show-result-select"
                  value={showResult}
                  label="Show surevey result to"
                  onChange={(e) => setShowResult(e.target.value)}
                >
                  <MenuItem value ="all">All</MenuItem>
                  <MenuItem value ="hq admins & school admins">HQ Admins & School Admins</MenuItem>
                  <MenuItem value ="hq admins only">HQ Admins Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSettings}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Survey Questions */}
      <Dialog
        fullWidth
        maxWidth          ="xl"
        open              ={create}
        onClose           ={closeCreate}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2" gutterBottom>Create Questions</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Question Types Buttons */}
            <Grid item xs={2} md={2}>
              <Box height="400px" display="flex" flexDirection="column">
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("radio button group")}
                >
                  Radio Button Group
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("rating scale")}
                >
                  Rating Scale
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("checkboxes")}
                >
                  Checkboxes
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("dropdown")}
                >
                  Dropdown
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("multi-select dropdown")}
                >
                  Multi-Select Dropdown
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("yes/no boolean")}
                >
                  Yes/No Boolean
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("date")}
                >
                  Date
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("time")}
                >
                  Time
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("short answers")}
                >
                  Short Answers
                </Button>
                <Button
                  style={{ width:"100%", height:"100%" }}
                  onClick={() => addQuestion("paragraph")}
                >
                  Paragraph
                </Button>
              </Box>
            </Grid>
            <Grid item xs={10} md={10}>
              {/* Select Survey */}
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <InputLabel id={"survey-title-select"}>Previous Save</InputLabel>
                  <Select
                    labelId={'survey-title-select'}
                    id={'survey-title-select'}
                    value={selectSurvey}
                    label="Previous Save"
                    onChange={(e) => handlePreviousSurveyChange(e.target.value)}
                  >
                    {previousSurvey.map((pre) => (
                      <MenuItem key={pre.surveyId} value={pre.surveyId}>{pre.surveyTitle}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* Survey Title */}
              <Grid item xs={12} md={12}>
                <TextField
                  onChange  ={(e) => setSurveyTitle(e.target.value)}
                  margin    ="dense"
                  label     ="Survey Title"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={surveyTitle}
                />
              </Grid>
              {/* Survey Description */}
              <Grid item xs={12} md={12}>
                <TextField
                  onChange  ={(e) => setDescription(e.target.value)}
                  margin    ="dense"
                  label     ="Description"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={description}
                />
              </Grid>
              {/* Survey Question with Drag and Drop */}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions-list" direction="vertical">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      // eslint-disable-next-line
                      {...provided.droppableProps}
                    >
                      {questions.map((question, index) => (
                        <Draggable key={question.id.toString()} draggableId={question.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              // eslint-disable-next-line
                              {...provided.draggableProps}
                              // eslint-disable-next-line
                              {...provided.dragHandleProps}
                            >
                              <Card key={question.id} style={{ margin: '10px', padding: '10px' }}>
                                {/* Delete Question Button */}
                                <IconButton aria-label='delete' onClick={() => handleDeleteQuestion(question.id)}>
                                  <DeleteIcon />
                                </IconButton>
                                <Grid container spacing={2}>
                                  {/* Question Title */}
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      onChange={(e) => handleQuestionTitleChange(question.id, e.target.value)}
                                      margin="dense"
                                      label="Question Title"
                                      type="string"
                                      fullWidth
                                      variant="outlined"
                                      value={question.title}
                                    />
                                  </Grid>
                                  {/* Question Type */}
                                  <Grid item xs={12} md={12}>
                                    <FormControl fullWidth>
                                      <InputLabel id={`question-type-select-${question.id}`}>Type</InputLabel>
                                      <Select
                                        labelId={`question-type-select-${question.id}`}
                                        id={`question-type-select-${question.id}`}
                                        value={question.type}
                                        label="Type"
                                        onChange={(e) => handleQuestionTypeChange(question.id, e.target.value)}
                                      >
                                        <MenuItem value ="radio button group">Radio Button Group</MenuItem>
                                        <MenuItem value ="rating scale">Rating Scale</MenuItem>
                                        <MenuItem value ="checkboxes">Checkboxes</MenuItem>
                                        <MenuItem value ="dropdown">Dropdown</MenuItem>
                                        <MenuItem value ="multi-select dropdown">Multi-Select Dropdown</MenuItem>
                                        <MenuItem value ="yes/no boolean">Yes/No Boolean</MenuItem>
                                        <MenuItem value ="date">Date</MenuItem>
                                        <MenuItem value ="time">Time</MenuItem>
                                        <MenuItem value ="short answers">Short Answers</MenuItem>
                                        <MenuItem value ="paragraph">Paragraph</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  {/* Conditions for each question types */}
                                  {question.type === 'radio button group' && (
                                    <>
                                      {radioItems.map((item, index) => (
                                        <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                          <Grid key={item.id} item xs={11} md={11}>
                                            <TextField
                                              onChange={(e) => handleRadioItemChange(item.id, e.target.value)}
                                              margin="dense"
                                              label={`Item ${index + 1}`}
                                              type="string"
                                              fullWidth
                                              variant="outlined"
                                              value={item.item}
                                            />
                                          </Grid>
                                          <Grid item xs={1} md={1}>
                                            <Button
                                              aria-label='delete'
                                              onClick={() => handleDeleteRadioItem(item.id)}
                                              style={{ width: "100%", height: "100%" }}
                                            >
                                              <DeleteIcon />
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      ))}
                                      <Grid item xs={3} md={3}>
                                        <Button variant="contained" onClick={addRadioItems}>Add Items</Button>
                                      </Grid>
                                    </>
                                  )}
                                  {question.type === 'rating scale' && (
                                    <>
                                      <Grid container item spacing={2}>
                                        <Grid item xs={1.5} md={1.5}>
                                          <TextField
                                            onChange={(e) => setStartLabel(e.target.value)}
                                            margin="dense"
                                            type="string"
                                            label="Label"
                                            fullWidth
                                            variant="outlined"
                                            value={startLabel}
                                          />
                                        </Grid>
                                        {ratings.map((rating, index) => (
                                          <Grid key={rating.id} item xs={0.5} md={0.5}>
                                            <TextField
                                              onChange={(e) => handleRatingItemChange(rating.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              fullWidth
                                              variant="outlined"
                                              value={index+1}
                                            />
                                          </Grid>
                                        ))}
                                        <Grid item xs={1.5} md={1.5}>
                                          <TextField
                                            onChange={(e) => setEndLabel(e.target.value)}
                                            margin="dense"
                                            type="string"
                                            label="Label"
                                            fullWidth
                                            variant="outlined"
                                            value={endLabel}
                                          />
                                        </Grid>
                                      </Grid>
                                      <Grid item xs={1} md={1}>
                                        <Button variant="contained" onClick={removeRating}><RemoveCircleIcon/></Button>
                                      </Grid>
                                      <Grid item xs={1} md={1}>
                                        <Button variant="contained" onClick={addRating}><AddCircleIcon/></Button>
                                      </Grid>
                                    </>
                                  )}
                                  {question.type === 'checkboxes' && (
                                    <>
                                     {checkbox.map((item, index) => (
                                       <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                         <Grid key={item.id} item xs={11} md={11}>
                                           <TextField
                                             onChange={(e) => handleCheckboxChange(item.id, e.target.value)}
                                             margin="dense"
                                             label={`Item ${index + 1}`}
                                             type="string"
                                             fullWidth
                                             variant="outlined"
                                             value={item.item}
                                           />
                                         </Grid>
                                         <Grid item xs={1} md={1}>
                                           <Button
                                             aria-label='delete'
                                             onClick={() => handleDeleteCheckbox(item.id)}
                                             style={{ width: "100%", height: "100%" }}
                                           >
                                             <DeleteIcon />
                                           </Button>
                                         </Grid>
                                       </Grid>
                                     ))}
                                     <Grid item xs={3} md={3}>
                                       <Button variant="contained" onClick={addCheckbox}>Add Items</Button>
                                     </Grid>
                                    </>
                                  )}
                                  {question.type === 'dropdown' && (
                                    <>
                                      <Grid item xs={12} md={12}>
                                        <FormControl fullWidth>
                                          <InputLabel id="dropdown">Select...</InputLabel>
                                          <Select
                                            labelId="dropdown"
                                            id="dropdown"
                                            value={singleSelect}
                                            label="Select..."
                                            onChange={(e) => setSingleSelect(e.target.value)}
                                          >
                                            {dropdown.map(item => (
                                              <MenuItem key={item.id} value={item.item}>{item.item}</MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      {dropdown.map((item, index) => (
                                       <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                         <Grid key={item.id} item xs={11} md={11}>
                                           <TextField
                                             onChange={(e) => handleDropdownChange(item.id, e.target.value)}
                                             margin="dense"
                                             label={`Item ${index + 1}`}
                                             type="string"
                                             fullWidth
                                             variant="outlined"
                                             value={item.item}
                                           />
                                         </Grid>
                                         <Grid item xs={1} md={1}>
                                           <Button
                                             aria-label='delete'
                                             onClick={() => handleDeleteDropdown(item.id)}
                                             style={{ width: "100%", height: "100%" }}
                                           >
                                             <DeleteIcon />
                                           </Button>
                                         </Grid>
                                       </Grid>
                                     ))}
                                     <Grid item xs={3} md={3}>
                                       <Button variant="contained" onClick={addDropdown}>Add Items</Button>
                                     </Grid>
                                    </>
                                  )}
                                  {question.type === 'multi-select dropdown' && (
                                    <>
                                      <Grid item xs={12} md={12}>
                                        <FormControl fullWidth>
                                          <InputLabel id="dropdown">Select...</InputLabel>
                                          <Select
                                            multiple
                                            labelId="dropdown"
                                            id="dropdown"
                                            value={multiSelect}
                                            label="Select..."
                                            onChange={(e) => setMultiSelect(e.target.value)}
                                          >
                                            {multiDropdown.map(item => (
                                              <MenuItem key={item.id} value={item.item}>{item.item}</MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      {multiDropdown.map((item, index) => (
                                       <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                         <Grid key={item.id} item xs={11} md={11}>
                                           <TextField
                                             onChange={(e) => handleMultiDropdownChange(item.id, e.target.value)}
                                             margin="dense"
                                             label={`Item ${index + 1}`}
                                             type="string"
                                             fullWidth
                                             variant="outlined"
                                             value={item.item}
                                           />
                                         </Grid>
                                         <Grid item xs={1} md={1}>
                                           <Button
                                             aria-label='delete'
                                             onClick={() => handleDeleteMultiDropdown(item.id)}
                                             style={{ width: "100%", height: "100%" }}
                                           >
                                             <DeleteIcon />
                                           </Button>
                                         </Grid>
                                       </Grid>
                                     ))}
                                     <Grid item xs={3} md={3}>
                                       <Button variant="contained" onClick={addMultiDropdown}>Add Items</Button>
                                     </Grid>
                                    </>
                                  )}
                                  {question.type === 'yes/no boolean' && (
                                    <Grid container item xs={12} md={12} spacing={2}>
                                      <Grid item xs={3} md={3}>
                                        <TextField
                                          onChange={(e) => setFirstBoolean(e.target.value)}
                                          margin="dense"
                                          type="string"
                                          fullWidth
                                          variant="outlined"
                                          value={firstBoolean}
                                        />
                                      </Grid>
                                      <Grid item xs={3} md={3}>
                                        <TextField
                                          onChange={(e) => setSecondBoolean(e.target.value)}
                                          margin="dense"
                                          type="string"
                                          fullWidth
                                          variant="outlined"
                                          value={secondBoolean}
                                        />
                                      </Grid>
                                    </Grid>
                                  )}
                                </Grid>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {/* Add Question Button */}
              <Grid item xs={12} md={12}>
                <Button variant="contained" style={{ width:"100%", height:"100%" }} onClick={() => addQuestion("short answers")}>
                  Add Question
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Page2;
