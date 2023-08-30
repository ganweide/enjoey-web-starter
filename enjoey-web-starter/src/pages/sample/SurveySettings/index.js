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
  FormLabel,
  RadioGroup,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
  ListSubheader,
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
  const [child, setChild]                     = useState([]);
  const [previousSurvey, setPreviousSurvey]   = useState([]);
  const [open, setOpen]                       = useState(false);
  const [recipientType, setRecipientType]     = useState([]);
  const [sendTo, setSendTo]                   = useState([]);
  const [selectClass, setSelectClass]         = useState([]);
  const [schoolName, setSchoolName]           = useState([]);
  const [student, setStudent]                 = useState([]);
  const [surveyTitle, setSurveyTitle]         = useState([]);
  const [description, setDescription]         = useState([]);
  const [surveyType, setSurveyType]           = useState([]);
  const [startDate, setStartDate]             = useState([]);
  const [endDate, setEndDate]                 = useState([]);
  const [settings, setSettings]               = useState(false);
  const [showResult, setShowResult]           = useState([]);
  const [create, setCreate]                   = useState(false);
  const [selectSurvey, setSelectSurvey]       = useState([]);
  const [questions, setQuestions]             = useState([]);
  const [radioItems, setRadioItems]           = useState([]);
  const [ratings, setRatings]                 = useState([]);
  const [startLabel, setStartLabel]           = useState("Most Unlikely");
  const [endLabel, setEndLabel]               = useState("Most Likely");
  const [checkbox, setCheckbox]               = useState([]);
  const [dropdown, setDropdown]               = useState([]);
  const [singleSelect, setSingleSelect]       = useState("");
  const [multiDropdown, setMultiDropdown]     = useState([]);
  const [multiSelect, setMultiSelect]         = useState([]);
  const [firstBoolean, setFirstBoolean]       = useState("Yes");
  const [secondBoolean, setSecondBoolean]     = useState("No");
  const [conditionSelect, setConditionSelect] = useState([]);
  const [formData, setFormData] = useState({
    surveyTitle: '',
    description: '',
    questions: [],
  });
  const [preview, setPreview]                 = useState(false);

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
        console.log(response);
        const parsedSurveys = response.data.map((survey) => ({
          ...survey,
          questions: JSON.parse(survey.questions),
        }));
        setPreviousSurvey(parsedSurveys);
      });
    } catch (error) {
      console.log(error);
    }
  }, [open]);

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
      setSurveyTitle("");
      setDescription("");
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
    if(type === "rating scale") {
      const newQuestion = {
        id: questions.length,
        title: '',
        text: '',
        type: type,
        format: [{
          type: type,
          more: [],
        }],
        more: [],
        label: [startLabel, endLabel],
        condition: 'none',
      }
      setQuestions([...questions, newQuestion])
    } else if(type === "yes/no boolean") {
      const newQuestion = {
        id: questions.length,
        title: '',
        text: '',
        type: type,
        format: [{
          type: type,
          more: [],
        }],
        more: [],
        label: [firstBoolean, secondBoolean],
        condition: 'none',
      }
      setQuestions([...questions, newQuestion])
    } else {
      const newQuestion = {
        id: questions.length,
        title: '',
        text: '',
        type: type,
        format: [{
          type: type,
          more: [],
        }],
        more: [],
        label: [],
        condition: 'none',
      };
      setQuestions([...questions, newQuestion]);
    }
  };
  const handleQuestionTitleChange = (id, value) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, title: value } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleQuestionTextChange = (id, value) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, text: value } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleQuestionTypeChange = (id, value) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, type: value } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleConditionSelect = (id, value) => {
    setConditionSelect(value);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, condition: value } : question
    );
    setQuestions(updatedQuestions);
  }
  // Radio Button Group
  const addRadioItems = (id) => {
    const newRadioItems = {
      id: radioItems.length,
      item: '',
    };
    setRadioItems([...radioItems, newRadioItems]);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, more: [...question.more, newRadioItems] } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleRadioItemChange = (questionId, radioId, value) => {
    const updatedRadioItems = radioItems.map(item =>
      item.id === radioId ? { ...item, item: value } : item
    );
    setRadioItems(updatedRadioItems);
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedMore = question.more.map(more =>
          more.id === radioId ? { ...more, item: value } : more
        );

        const updatedFormats = question.format.map(format => {
          if (format.type === question.type) {
            return { ...format, more: updatedMore };
          }
          return format;
        });
        return { ...question, format: updatedFormats, more: updatedMore };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  const handleDeleteRadioItem = (questionId, itemId) => {
    const updatedRadioItems = radioItems.filter(item => item.id !== itemId);
    setRadioItems(updatedRadioItems);
    const updatedQuestions = questions.map(question =>
      question.id === questionId ? { ...question, more: question.more.filter(item => item.id !== itemId) } : question
    );
    setQuestions(updatedQuestions);
  };
  // Rating Scale
  const addRating = (id) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, more: [...question.more, {id: question.more.length, rating: question.more.length + 1}]} : question
    );
    setQuestions(updatedQuestions);
  };
  const handleRatingItemChange = (questionId, ratingId, value) => {
    const updatedRating = ratings.map(rating =>
      rating.id === ratingId ? { ...rating, rating: value } : rating
    );
    setRatings(updatedRating);
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedMore = question.more.map(more =>
          more.id === ratingId ? { ...more, rating: value } : more
        );
        return { ...question, more: updatedMore };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  const handleRatingStartLabelChange = (id, value) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, label: [value, question.label[1]] } : question
    );
    setQuestions(updatedQuestions);
  }
  const handleRatingEndLabelChange = (id, value) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, label: [question.label[0], value] } : question
    );
    setQuestions(updatedQuestions);
  }
  const removeRating = (id) => {
    const updatedRating = [...ratings];
    updatedRating.pop();
    setRatings(updatedRating);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, more: question.more.slice(0, -1) } : question
    );
    setQuestions(updatedQuestions);
  };
  // Checkboxes
  const addCheckbox = (id) => {
    const newCheckbox = {
      id: checkbox.length,
      item: '',
    };
    setCheckbox([...checkbox, newCheckbox]);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, more: [...question.more, newCheckbox] } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleCheckboxChange = (questionId, checkboxId, value) => {
    const updatedCheckbox = checkbox.map(item =>
      item.id === checkboxId ? { ...item, item: value } : item
    );
    setCheckbox(updatedCheckbox);
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedMore = question.more.map(more =>
          more.id === checkboxId ? { ...more, item: value } : more
        );
        return { ...question, more: updatedMore };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  const handleDeleteCheckbox = (questionId, itemId) => {
    const updatedCheckbox = checkbox.filter(item => item.id !== itemId);
    setCheckbox(updatedCheckbox);
    const updatedQuestions = questions.map(question =>
      question.id === questionId ? { ...question, more: question.more.filter(item => item.id !== itemId) } : question
    );
    setQuestions(updatedQuestions);
  };
  // Dropdown
  const addDropdown = (id) => {
    const newDropdown = {
      id: dropdown.length,
      item: '',
    };
    setDropdown([...dropdown, newDropdown]);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, more: [...question.more, newDropdown] } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleDropdownChange = (questionId, dropdownId, value) => {
    const updatedDropdown = dropdown.map(item =>
      item.id === dropdownId ? { ...item, item: value } : item
    );
    setDropdown(updatedDropdown);
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedMore = question.more.map(more =>
          more.id === dropdownId ? { ...more, item: value } : more
        );
        return { ...question, more: updatedMore };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  const handleDeleteDropdown = (questionId, itemId) => {
    const updatedDropdown = dropdown.filter(item => item.id !== itemId);
    setDropdown(updatedDropdown);
    const updatedQuestions = questions.map(question =>
      question.id === questionId ? { ...question, more: question.more.filter(item => item.id !== itemId) } : question
    );
    setQuestions(updatedQuestions);
  };
  // Multi-Select dropdown
  const addMultiDropdown = (id) => {
    const newMultiDropdown = {
      id: multiDropdown.length,
      item: '',
    };
    setMultiDropdown([...multiDropdown, newMultiDropdown]);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, more: [...question.more, newMultiDropdown] } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleMultiDropdownChange = (questionId, multiDropdownId, value) => {
    const updatedMultiDropdown = multiDropdown.map(item =>
      item.id === multiDropdownId ? { ...item, item: value } : item
    );
    setMultiDropdown(updatedMultiDropdown);
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedMore = question.more.map(more =>
          more.id === multiDropdownId ? { ...more, item: value } : more
        );
        return { ...question, more: updatedMore };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  const handleDeleteMultiDropdown = (questionId, itemId) => {
    const updatedMultiDropdown = multiDropdown.filter(item => item.id !== itemId);
    setMultiDropdown(updatedMultiDropdown);
    const updatedQuestions = questions.map(question =>
      question.id === questionId ? { ...question, more: question.more.filter(item => item.id !== itemId) } : question
    );
    setQuestions(updatedQuestions);
  };
  // Yes/No boolean
  const handleFirstBooleanChange = (id, value) => {
    setFirstBoolean(value);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, label: [value, question.label[1]] } : question
    );
    setQuestions(updatedQuestions);
  };
  const handleSecondBooleanChange = (id, value) => {
    setSecondBoolean(value);
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, label: [question.label[0], value] } : question
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
  const handlePreview = async () => {
    setPreview(true);
  };
  const closeCreate = async () => {
    setCreate(false);
  }
  const evaluateCondition = (condition) => {
    if (condition === 'none') {
      return false;
    }
    if (condition) {
      try {
        return eval(condition); // Evaluates to true or false
      } catch (error) {
        console.error('Error evaluating condition:', error);
        return false;
      }
    }
    return true;
  };
  const closePreview = async () => {
    setPreview(false);
  }

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
            {/* Question Types Buttons (Left column) */}
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
                    <MenuItem value=''><em>None</em></MenuItem>
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
                                    <TextField
                                      onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                                      margin="dense"
                                      label="Question Text"
                                      type="string"
                                      fullWidth
                                      variant="outlined"
                                      value={question.text}
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
                                      {question.more ? (question.more.map((item, index) => (
                                        <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                          <Grid key={item.id} item xs={11} md={11}>
                                            <TextField
                                              onChange={(e) => handleRadioItemChange(question.id, item.id, e.target.value)}
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
                                              onClick={() => handleDeleteRadioItem(question.id, item.id)}
                                              style={{ width: "100%", height: "100%" }}
                                            >
                                              <DeleteIcon />
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      ))) : (
                                        radioItems.map((item, index) => (
                                          <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                            <Grid key={item.id} item xs={11} md={11}>
                                              <TextField
                                                onChange={(e) => handleRadioItemChange(question.id, item.id, e.target.value)}
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
                                                onClick={() => handleDeleteRadioItem(question.id, item.id)}
                                                style={{ width: "100%", height: "100%" }}
                                              >
                                                <DeleteIcon />
                                              </Button>
                                            </Grid>
                                          </Grid>
                                        ))
                                      )}
                                      <Grid item xs={3} md={3}>
                                        <Button variant="contained" onClick={() => addRadioItems(question.id)}>Add Items</Button>
                                      </Grid>
                                    </>
                                  )}
                                  {question.type === 'rating scale' && (
                                    <>
                                      {question.more.length > 0 && question.label.length > 0 ? (
                                        <Grid container item spacing={2}>
                                          <Grid item xs={1.5} md={1.5}>
                                            <TextField
                                              onChange={(e) => handleRatingStartLabelChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              label="Label"
                                              fullWidth
                                              variant="outlined"
                                              value={question.label[0] ? question.label[0] : startLabel}
                                            />
                                          </Grid>
                                          {question.more.map((rating) => (
                                            <Grid key={rating.id} item xs={0.5} md={0.5}>
                                              <TextField
                                                onChange={(e) => handleRatingItemChange(question.id, rating.id, e.target.value)}
                                                margin="dense"
                                                type="string"
                                                fullWidth
                                                variant="outlined"
                                                value={rating.rating}
                                              />
                                            </Grid>
                                          ))}
                                          <Grid item xs={1.5} md={1.5}>
                                            <TextField
                                              onChange={(e) => handleRatingEndLabelChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              label="Label"
                                              fullWidth
                                              variant="outlined"
                                              value={question.label[1] ? question.label[1] : endLabel}
                                            />
                                          </Grid>
                                        </Grid>
                                      ) : (
                                        <Grid container item spacing={2}>
                                          <Grid item xs={1.5} md={1.5}>
                                            <TextField
                                              onChange={(e) => handleRatingStartLabelChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              label="Label"
                                              fullWidth
                                              variant="outlined"
                                              value={question.label[0] ? question.label[0] : startLabel}
                                            />
                                          </Grid>
                                          {question.more.map((rating) => (
                                            <Grid key={rating.id} item xs={0.5} md={0.5}>
                                              <TextField
                                                onChange={(e) => handleRatingItemChange(question.id, rating.id, e.target.value)}
                                                margin="dense"
                                                type="string"
                                                fullWidth
                                                variant="outlined"
                                                value={rating.rating}
                                              />
                                            </Grid>
                                          ))}
                                          <Grid item xs={1.5} md={1.5}>
                                            <TextField
                                              onChange={(e) => handleRatingEndLabelChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              label="Label"
                                              fullWidth
                                              variant="outlined"
                                              value={question.label[1] ? question.label[1] : endLabel}
                                            />
                                          </Grid>
                                        </Grid>
                                      )}
                                      <Grid item xs={1} md={1}>
                                        <Button variant="contained" onClick={removeRating}><RemoveCircleIcon/></Button>
                                      </Grid>
                                      <Grid item xs={1} md={1}>
                                        <Button variant="contained" onClick={() => addRating(question.id)}><AddCircleIcon/></Button>
                                      </Grid>
                                    </>
                                  )}
                                  {question.type === 'checkboxes' && (
                                    <>
                                     {question.more ? (question.more.map((item, index) => (
                                       <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                         <Grid key={item.id} item xs={11} md={11}>
                                           <TextField
                                             onChange={(e) => handleCheckboxChange(question.id, item.id, e.target.value)}
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
                                             onClick={() => handleDeleteCheckbox(question.id, item.id)}
                                             style={{ width: "100%", height: "100%" }}
                                           >
                                             <DeleteIcon />
                                           </Button>
                                         </Grid>
                                       </Grid>
                                     ))) : (
                                      checkbox.map((item, index) => (
                                        <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                          <Grid key={item.id} item xs={11} md={11}>
                                            <TextField
                                              onChange={(e) => handleCheckboxChange(question.id, item.id, e.target.value)}
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
                                              onClick={() => handleDeleteCheckbox(question.id, item.id)}
                                              style={{ width: "100%", height: "100%" }}
                                            >
                                              <DeleteIcon />
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      ))
                                     )
                                    }
                                     <Grid item xs={3} md={3}>
                                       <Button variant="contained" onClick={() => addCheckbox(question.id)}>Add Items</Button>
                                     </Grid>
                                    </>
                                  )}
                                  {question.type === 'dropdown' && (
                                    <>
                                      {question.more ? (question.more.map((item, index) => (
                                       <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                         <Grid key={item.id} item xs={11} md={11}>
                                           <TextField
                                             onChange={(e) => handleDropdownChange(question.id, item.id, e.target.value)}
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
                                             onClick={() => handleDeleteDropdown(question.id, item.id)}
                                             style={{ width: "100%", height: "100%" }}
                                           >
                                             <DeleteIcon />
                                           </Button>
                                         </Grid>
                                       </Grid>
                                     ))) : (dropdown.map((item, index) => (
                                        <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                          <Grid key={item.id} item xs={11} md={11}>
                                            <TextField
                                              onChange={(e) => handleDropdownChange(question.id, item.id, e.target.value)}
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
                                              onClick={() => handleDeleteDropdown(question.id, item.id)}
                                              style={{ width: "100%", height: "100%" }}
                                            >
                                              <DeleteIcon />
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      ))
                                     )}
                                      <Grid item xs={3} md={3}>
                                        <Button variant="contained" onClick={() => addDropdown(question.id)}>Add Items</Button>
                                      </Grid>
                                    </>
                                  )}
                                  {question.type === 'multi-select dropdown' && (
                                    <>
                                      {question.more ? (question.more.map((item, index) => (
                                       <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                         <Grid key={item.id} item xs={11} md={11}>
                                           <TextField
                                             onChange={(e) => handleMultiDropdownChange(question.id, item.id, e.target.value)}
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
                                             onClick={() => handleDeleteMultiDropdown(question.id, item.id)}
                                             style={{ width: "100%", height: "100%" }}
                                           >
                                             <DeleteIcon />
                                           </Button>
                                         </Grid>
                                       </Grid>
                                     ))) : (multiDropdown.map((item, index) => (
                                        <Grid container item key={item.id} xs={12} md={12} spacing={2}>
                                          <Grid key={item.id} item xs={11} md={11}>
                                            <TextField
                                              onChange={(e) => handleMultiDropdownChange(question.id, item.id, e.target.value)}
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
                                              onClick={() => handleDeleteMultiDropdown(question.id, item.id)}
                                              style={{ width: "100%", height: "100%" }}
                                            >
                                              <DeleteIcon />
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      ))
                                     )}
                                      <Grid item xs={3} md={3}>
                                        <Button variant="contained" onClick={() => addMultiDropdown(question.id)}>Add Items</Button>
                                      </Grid>
                                    </>
                                  )}
                                  {question.type === 'yes/no boolean' && (
                                    question.label.length > 0 ? (
                                      <>
                                        <Grid container item xs={12} md={12} spacing={2}>
                                          <Grid item xs={3} md={3}>
                                            <TextField
                                              onChange={(e) => handleFirstBooleanChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              fullWidth
                                              variant="outlined"
                                              value={question.label[0]}
                                            />
                                          </Grid>
                                          <Grid item xs={3} md={3}>
                                            <TextField
                                              onChange={(e) => handleSecondBooleanChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              fullWidth
                                              variant="outlined"
                                              value={question.label[1]}
                                            />
                                          </Grid>
                                        </Grid>
                                      </>
                                    ) : (
                                      <>
                                        <Grid container item xs={12} md={12} spacing={2}>
                                          <Grid item xs={3} md={3}>
                                            <TextField
                                              onChange={(e) => handleFirstBooleanChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              fullWidth
                                              variant="outlined"
                                              value={firstBoolean}
                                            />
                                          </Grid>
                                          <Grid item xs={3} md={3}>
                                            <TextField
                                              onChange={(e) => handleSecondBooleanChange(question.id, e.target.value)}
                                              margin="dense"
                                              type="string"
                                              fullWidth
                                              variant="outlined"
                                              value={secondBoolean}
                                            />
                                          </Grid>
                                        </Grid>
                                      </>
                                    )
                                  )}
                                </Grid>
                                <Box style={{ paddingTop: "10px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                  <FormControl fullWidth>
                                    <InputLabel id={"condition-select"}>Conditions</InputLabel>
                                    <Select
                                      labelId={'condition-select'}
                                      id={'condition-select'}
                                      value={question.condition}
                                      label="Conditions"
                                      onChange={(e) => handleConditionSelect(question.id, e.target.value)}
                                    >
                                      <MenuItem value='none'><em>None</em></MenuItem>
                                      {questions.filter((check) => check.id !== question.id).map((condition) => (
                                        <MenuItem key={condition.id} value={condition.text}>{condition.text}</MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Box>
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
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button onClick={handlePreview}>Preview</Button>
            </Grid>
            <Grid item>
              <Button onClick={handleSave}>Save</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Survey Preview */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={preview}
        onClose           ={closePreview}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2" gutterBottom>{`${surveyTitle}'s Preview`}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {questions.map((question) => {
              if (evaluateCondition(question.condition)) {
                return (
                  <Grid item key={question.id} xs={12} md={12}>
                    {question.type === "radio button group" ? (
                      <Grid item xs={12} md={12}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <FormControl component="fieldset" fullWidth>
                          <RadioGroup>
                            {question.more.map((more) => (
                              <Grid key={more.id} item xs={12} md={12}>
                                <FormControlLabel
                                  value={more.item}
                                  control={<Radio />}
                                  label={more.item} />
                              </Grid>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    ) : question.type === "checkboxes" ? (
                      <Grid item xs={12} md={12}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <FormGroup>
                          {question.more.map((more) => (
                            <FormControlLabel
                              key     ={more.id}
                              control ={<Checkbox />}
                              label   ={more.item}
                            />
                          ))}
                        </FormGroup>
                      </Grid>
                    ) : question.type === "dropdown" ? (
                      <Grid item xs={3} md={3}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <FormControl fullWidth>
                          <Select
                            id="dropdown"
                            value={singleSelect}
                            onChange={(e) => setSingleSelect(e.target.value)}
                          >
                            {question.more.map((more) => (
                              <MenuItem key={more.id} value={more.item}>{more.item}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    ) : question.type === "multi-select dropdown" ? (
                      <Grid item xs={6} md={6}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <FormControl fullWidth>
                          <Select
                            multiple
                            id="multi-select-dropdown"
                            value={multiSelect}
                            onChange={(e) => setMultiSelect(e.target.value)}
                          >
                            {question.more.map((more) => (
                              <MenuItem key={more.id} value={more.item}>{more.item}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    ) : question.type === "short answers" ? (
                      <Grid item xs={3} md={3}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <TextField
                          margin    ="dense"
                          type      ="string"
                          fullWidth
                          variant   ="outlined"
                        />
                      </Grid>
                    ) : question.type === "paragraph" ? (
                      <Grid item xs={6} md={6}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          margin    ="dense"
                          type      ="text"
                          variant   ="outlined"
                        />
                      </Grid>
                    ) : question.type === "date" ? (
                      <Grid item xs={3} md={3}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <TextField
                          fullWidth
                          margin    ="dense"
                          type      ="date"
                          variant   ="outlined"
                        />
                      </Grid>
                    ) : question.type === "time" ? (
                      <Grid item xs={3} md={3}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <TextField
                          fullWidth
                          margin    ="dense"
                          type      ="time"
                          variant   ="outlined"
                        />
                      </Grid>
                    ) : question.type === "yes/no boolean" ? (
                      <Grid item xs={3} md={3}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <ToggleButtonGroup>
                          <ToggleButton value={firstBoolean}>{question.label[0]}</ToggleButton>
                          <ToggleButton value={secondBoolean}>{question.label[1]}</ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                    ) : question.type === "rating scale" ? (
                      <Grid item xs={12} md={12}>
                        <Typography variant="h3" gutterBottom>{question.title}</Typography>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography varian="subtitle">{question.label[0]}</Typography>
                          <ToggleButtonGroup>
                            {question.more.map((rating) => (
                              <ToggleButton key={rating.id} value={rating.rating}>{rating.rating}</ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                          <Typography varian="subtitle">{question.label[1]}</Typography>
                        </div>
                      </Grid>
                    ) : null}
                  </Grid>
                );
              }
              return null;
            })}
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
