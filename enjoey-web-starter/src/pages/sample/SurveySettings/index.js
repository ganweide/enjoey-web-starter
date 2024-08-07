// React Imports
import React, { useEffect, useState } from "react";

// Axios Import
import Axios from "axios";

// React Beautiful Dnd
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { styled } from '@mui/material/styles';
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
  RadioGroup,
  Radio,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  ListSubheader,
  Stack,
  Paper,
} from "@mui/material";

// Material UI Icons
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// Global Constants
const childUrl    = "http://127.0.0.1:8000/api/child/";
const surveyUrl   = "http://127.0.0.1:8000/api/surveysettings/";
const publishUrl  = "http://127.0.0.1:8000/api/publish-survey/";
const answerUrl   = "http://127.0.0.1:8000/api/user-answer/";

import Styles from "./style";
import CustomActiveShapePieChart from "./totalStatisticChart";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles(Styles);

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = ["Id", "Name", "Survey", ""];
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
  const [multiDropdown, setMultiDropdown]     = useState([]);
  const [firstBoolean, setFirstBoolean]       = useState("Yes");
  const [secondBoolean, setSecondBoolean]     = useState("No");
  const [conditionSelect, setConditionSelect] = useState([]);
  const [formData, setFormData] = useState({
    surveyTitle: '',
    description: '',
    questions: [],
  });
  const [preview, setPreview]                                         = useState(false);
  const [previewSingleSelect, setPreviewSingleSelect]                 = useState([]);
  const [previewMultiSelect, setPreviewMultiSelect]                   = useState([]);
  const [previewShortAnswers, setPreviewShortAnswers]                 = useState([]);
  const [previewParagraph, setPreviewParagraph]                       = useState([]);
  const [previewBoolean, setPreviewBoolean]                           = useState([]);
  const [previewRadio, setPreviewRadio]                               = useState([]);
  const [previewCheckbox, setPreviewCheckbox]                         = useState([]);
  const [previewDate, setPreviewDate]                                 = useState([]);
  const [previewTime, setPreviewTime]                                 = useState([]);
  const [previewRating, setPreviewRating]                             = useState([]);
  const [publishSurveyData, setPublishSurveyData]                     = useState([]);
  const [publishStartDate, setPublishStartDate]                       = useState([]);
  const [publishEndDate, setPublishEndDate]                           = useState([]);
  const [publishSurvey, setPublishSurvey]                             = useState([]);
  const [userName, setUserName]                                       = useState([]);
  const [userSelectSurvey, setUserSelectSurvey]                       = useState([]);
  const [submitting, setSubmitting]                                   = useState(false);
  const [surveyAnswerData, setSurveyAnswerData]                       = useState([]);
  const [answers, setAnswers]                                         = useState([]);
  const [openAnswerDialog, setOpenAnswerDialog]                       = useState(false);
  const [statisticSurvey, setStatisticSurvey]                         = useState([]);
  const [statisticQuestion, setStatisticQuestion]                     = useState([]);
  const [totalSurveySubmission, setTotalSurveySubmission]             = useState([]);
  const [questionText, setQuestionText]                               = useState([]);
  const [item, setItem]                                               = useState([]);
  const [answerCount, setAnswerCount]                                 = useState([]);             
  // const [openQuestionStatisticDialog, setOpenQuestionStatisticDialog] = useState(false);
  const [openStatisticDialog, setOpenStatisticDialog]                 = useState(false);

  const shortAnswerUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <TextField
          margin    ="dense"
          type      ="string"
          fullWidth
          variant   ="outlined"
          onChange  ={(e) => handlePreviewShortAnswersChange(question.id, question.text, e.target.value)}
          value     ={answer || previewShortAnswers.find(answer => answer.text === question.text)?.answer || ''}
        />
      </Grid>
    );
  };
  const paragraphUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          margin    ="dense"
          type      ="text"
          variant   ="outlined"
          onChange  ={(e) => handlePreviewParagraphChange(question.id, question.text, e.target.value)}
          value     ={answer || previewParagraph.find(answer => answer.text === question.text)?.answer || ''}
        />
      </Grid>
    );
  };
  const radioButtonGroupUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={answer || ""}>
            {question.more.map((more) => (
              <Grid key={more.id} item xs={12} md={12}>
                <FormControlLabel
                  value={more.item}
                  control={<Radio />}
                  label={more.item}
                  onChange={(e) => handlePreviewRadioChange(question.id, question.text, e.target.value)}
                />
              </Grid>
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    );
  };
  const checkboxUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <FormGroup>
          {question.more.map((more) => (
            <FormControlLabel
              key     ={answer || more.id}
              control ={<Checkbox />}
              label   ={more.item}
              onChange={(e) => {
                const selectedItem = more.item;
                const isChecked = e.target.checked;
                const currentSelectedValues = previewCheckbox.find((answer) => answer.text === question.text)?.answer || [];
                const selectedValues = isChecked
                ? [...currentSelectedValues, selectedItem]
                : currentSelectedValues.filter((item) => item !== selectedItem);
                handlePreviewCheckboxChange(question.id, question.text, selectedValues)
              }}
            />
          ))}
        </FormGroup>
      </Grid>
    );
  };
  const booleanUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <ToggleButtonGroup
          exclusive
          onChange={(e) => handlePreviewBooleanChange(question.id, question.text, e.target.value)}
        >
          <ToggleButton
            value={question.label[0]}
            selected={previewBoolean.find((answer) => answer.text === question.text)?.answer === question.label[0]}
          >
              {question.label[0]}
          </ToggleButton>
          <ToggleButton
            value={question.label[1]}
            selected={previewBoolean.find((answer) => answer.text === question.text)?.answer === question.label[1]}
          >
            {question.label[1]}
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    );
  };
  const dateUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <TextField
          fullWidth
          margin    ="dense"
          type      ="date"
          variant   ="outlined"
          onChange  ={(e) => handlePreviewDateChange(question.id, question.text, e.target.value)}
          value     ={answer || previewDate.find(answer => answer.text === question.text)?.answer || ''}
        />
      </Grid>
    );
  };
  const timeUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <TextField
          fullWidth
          margin    ="dense"
          type      ="time"
          variant   ="outlined"
          onChange  ={(e) => handlePreviewTimeChange(question.id, question.text, e.target.value)}
          value     ={answer || previewTime.find(answer => answer.text === question.text)?.answer || ''}
        />
      </Grid>
    );
  };
  const singleSelectUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.text}</Typography>
        <FormControl fullWidth>
          <Select
            id="dropdown"
            value={answer || previewSingleSelect.find(answer => answer.text === question.text)?.answer || ''}
            onChange={(e) => handlePreviewSingleSelectChange(question.id, question.text, e.target.value)}
          >
            {question.more.map((more) => (
              <MenuItem key={more.id} value={more.item}>{more.item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };
  const multiSelectUI = (question, answer) => {
    return (
      <Grid item xs={12} md={12}>
        <Typography variant="h3" gutterBottom>{question.title}</Typography>
        <FormControl fullWidth>
          <Select
            multiple
            id="multi-select-dropdown"
            value={answer || previewMultiSelect.find(answer => answer.text === question.text)?.answer || []}
            onChange={(e) => handlePreviewMultiSelectChange(question.id, question.text, e.target.value)}
          >
            {question.more.map((more) => (
              <MenuItem key={more.id} value={more.item}>{more.item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  };
  const ratingUI = (question, answer) => {
    return (
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
    );
  };
  const generateQuestionUI = (question, answer) => {
    switch(question.type) {
      case "short answers":
        return shortAnswerUI(question, answer);
      case "paragraph":
        return paragraphUI(question, answer);
      case "radio button group":
        return radioButtonGroupUI(question, answer);
      case "checkboxes":
        return checkboxUI(question, answer);
      case "rating scale":
        return ratingUI(question, answer);
      case "date":
        return dateUI(question, answer);
      case "time":
        return timeUI(question, answer);
      case "dropdown":
        return singleSelectUI(question, answer);
      case "multi-select dropdown":
        return multiSelectUI(question, answer);
      case "yes/no boolean":
        return booleanUI(question, answer);
      default:
        return null;
    }
  };
  const checkQuestionCondition =(question) => {
    const check = questions.filter((check) => check.text === question.condition)
    const typeToPreview = {
      "short answers": previewShortAnswers,
      "paragraph": previewParagraph,
      "yes/no boolean": previewBoolean,
      "checkboxes": previewCheckbox,
      "radio button group": previewRadio,
      "rating scale": previewRating,
      "date": previewDate,
      "time": previewTime,
      "dropdown": previewSingleSelect,
      "multi-select dropdown": previewMultiSelect,
    }
    console.log(check);
    if(check.length) {
      switch(question.type) {
        case "short answers":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return shortAnswerUI(question);
            }
          });
        case "paragraph":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return paragraphUI(question);
            }
          });
        case "radio button group":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return radioButtonGroupUI(question);
            }
          });
        case "checkboxes":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return checkboxUI(question);
            }
          });
        case "rating scale":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return ratingUI(question);
            }
          });
        case "date":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return dateUI(question);
            }
          });
        case "time":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return timeUI(question);
            }
          });
        case "dropdown":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return singleSelectUI(question);
            }
          });
        case "multi-select dropdown":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return multiSelectUI(question);
            }
          });
        case "yes/no boolean":
          return typeToPreview[check[0].type].map((text) => {
            if(text.text === question.condition && text.answer !== "") {
              return booleanUI(question);
            }
          });
        default:
          return null;
      }
    } else {
      const checkMore = questions.find((checkMore) => checkMore.more.some((more) => more.item === question.condition))
      switch(question.type) {
        case "short answers":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return shortAnswerUI(question);
            }
          });
        case "paragraph":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return paragraphUI(question);
            }
          });
        case "radio button group":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return radioButtonGroupUI(question);
            }
          });
        case "checkboxes":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return checkboxUI(question);
            }
          });
        case "rating scale":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(text.answer === question.condition && text.answer !== "") {
              return ratingUI(question);
            }
          });
        case "date":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return dateUI(question);
            }
          });
        case "time":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return timeUI(question);
            }
          });
        case "dropdown":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return singleSelectUI(question);
            }
          });
        case "multi-select dropdown":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return multiSelectUI(question);
            }
          });
        case "yes/no boolean":
          return typeToPreview[checkMore.type].map((text) => {
            const isMatch = Array.isArray(text.answer)
              ? text.answer.includes(question.condition)
              : text.answer === question.condition;
            if(isMatch && text.answer !== "") {
              return booleanUI(question);
            }
          });
        default:
          return null;
      }
    }
  }

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
        console.log("previousSurvey", parsedSurveys);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      Axios.get(publishUrl).then((response) => {
        setPublishSurveyData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      Axios.get(answerUrl).then((response) => {
        const parsedAnswers = response.data.map((ans) => ({
          ...ans,
          answer: JSON.parse(ans.answer),
        }));
        setSurveyAnswerData(parsedAnswers);
        console.log("answer", parsedAnswers);
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
    const questionToDelete = questions.find((question) => question.id === questionId);
    const updatedQuestions = questions.map((question) => {
      if (question.condition === questionToDelete.text) {
        return { ...question, condition: "none" };
      } else if (questionToDelete.more) {
        const hasMatch = questionToDelete.more.some((more) => question.condition === more.item);
        return hasMatch ? { ...question, condition: "none" } : question;
      } else {
        return question;
      }
    });
    const filteredQuestions = updatedQuestions.filter(question => question.id !== questionId);
    setQuestions(filteredQuestions);
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
        console.log("updatedFormData", updatedFormData);
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
        console.log("updatedFormData", updatedFormData);
        console.log("response", response);
      }
    } catch (error) {
      console.log("error", error);
    }
    setCreate(false);
  };
  const handlePreview = async () => {
    setPreview(true);
    setPreviewSingleSelect([]);
    setPreviewMultiSelect([]);
    setPreviewShortAnswers([]);
    setPreviewParagraph([]);
    setPreviewBoolean([]);
    setPreviewRadio([]);
    setPreviewCheckbox([]);
    setPreviewDate([]);
    setPreviewTime([]);
    setPreviewRating([]);
  };
  const closeCreate = async () => {
    setCreate(false);
  }
  const handlePreviewShortAnswersChange = (id, question, value) => {
    const existingAnswer = previewShortAnswers.find(answer => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewShortAnswers.map(answer =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewShortAnswers(updatedAnswers);
    } else {
      const newShortAnswers = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewShortAnswers([...previewShortAnswers, newShortAnswers]);
    }
  }
  const handlePreviewParagraphChange = (id, question, value) => {
    const existingAnswer = previewParagraph.find(answer => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewParagraph.map(answer =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewParagraph(updatedAnswers);
    } else {
      const newParagraph = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewParagraph([...previewParagraph, newParagraph]);
    }
  }
  const handlePreviewDateChange = (id, question, value) => {
    const existingAnswer = previewDate.find(answer => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewDate.map(answer =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewDate(updatedAnswers);
    } else {
      const newDate = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewDate([...previewDate, newDate]);
    }
  }
  const handlePreviewTimeChange = (id, question, value) => {
    const existingAnswer = previewTime.find(answer => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewTime.map(answer =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewTime(updatedAnswers);
    } else {
      const newTime = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewTime([...previewTime, newTime]);
    }
  }
  const handlePreviewSingleSelectChange = (id, question, value) => {
    const existingAnswer = previewSingleSelect.find((answer) => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewSingleSelect.map((answer) =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewSingleSelect(updatedAnswers);
    } else {
      const newSingleSelect = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewSingleSelect([...previewSingleSelect, newSingleSelect]);
    }
  };
  const handlePreviewMultiSelectChange = (id, question, value) => {
    const existingAnswer = previewMultiSelect.find((answer) => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewMultiSelect.map((answer) =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewMultiSelect(updatedAnswers);
    } else {
      const newMultiSelect = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewMultiSelect([...previewMultiSelect, newMultiSelect]);
    }
  };
  const handlePreviewCheckboxChange = (id, question, value) => {
    const existingAnswer = previewCheckbox.find((answer) => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewCheckbox.map((answer) =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewCheckbox(updatedAnswers);
    } else {
      const newCheckbox = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewCheckbox([...previewCheckbox, newCheckbox]);
    }
  };
  const handlePreviewRadioChange = (id, question, value) => {
    const existingAnswer = previewRadio.find((answer) => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewRadio.map((answer) =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewRadio(updatedAnswers);
    } else {
      const newRadio = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewRadio([...previewRadio, newRadio]);
    }
  };
  const handlePreviewBooleanChange = (id, question, value) => {
    const existingAnswer = previewBoolean.find((answer) => answer.text === question);
    if (existingAnswer) {
      const updatedAnswers = previewBoolean.map((answer) =>
        answer.text === question ? { ...answer, answer: value } : answer
      );
      setPreviewBoolean(updatedAnswers);
    } else {
      const newBoolean = {
        id: id,
        text: question,
        answer: value,
      };
      setPreviewBoolean([...previewBoolean, newBoolean]);
    }
  };
  const closePreview = async () => {
    setPreview(false);
  }

  // Publish Survey
  const handlePublishSurveyChange = (value) => {
    console.log("value", value);
    setPublishSurvey(value);
  };
  const handlePublish = async () => {
    const currentDate = new Date();
    const startDate = new Date(publishStartDate);
    const endDate = new Date(publishEndDate);
    let status = '';

    if (currentDate < startDate) {
      status = 'Coming Soon';
    } else if (currentDate > endDate) {
      status = 'Expired';
    } else {
      status = 'Ongoing';
    }

    try {
      const response = await Axios.post(
        publishUrl,
        {
          surveyId: publishSurvey, // Assuming surveyId and surveyTitle are the same
          startDate: publishStartDate,
          endDate: publishEndDate,
          status: status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      setPublishEndDate([]);
      setPublishStartDate([]);
      setPublishSurvey([]);
      // Add any additional logic here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Answer Survey
  const handleUserSelectSurveyChange = (value) => {
    setUserSelectSurvey(value);
    setPreview(true);
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
  const handleSubmitSurvey = async () => {
    try {
      setSubmitting(true); // Set submitting state to true to provide feedback to the user
      // Prepare data to be sent to the server
      const submitData = {
        name: userName, // Assuming userName is the name entered by the user
        publishSurveyId: userSelectSurvey, // Assuming userSelectSurvey is the selected surveyId
        answer: questions.map(question => ({
          questionId: question.id,
          answer: getAnswerForQuestion(question),
        })), // Fill this with the actual answers
      };
      const answersJson = JSON.stringify(submitData.answer);

      // Make the HTTP POST request to submit the survey answers
      await Axios.post(
        answerUrl,
        {
          ...submitData,
          answer: answersJson,
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        });
  
      // Optionally, perform any additional actions after successful submission
      console.log('Survey submitted successfully!');
    } catch (error) {
      // Handle errors here
      console.error('Error submitting survey:', error);
    } finally {
      setSubmitting(false); // Reset submitting state
      setPreview(false); // Close the preview dialog
      setUserName([]);
      setUserSelectSurvey([]);
    }
  };
  const getAnswerForQuestion = (question) => {
    switch (question.type) {
      case 'short answers':
        return previewShortAnswers.find(answer => answer.text === question.text)?.answer || '';
      case 'paragraph':
        return previewParagraph.find(answer => answer.text === question.text)?.answer || '';
      case 'radio button group':
        return previewRadio.find(answer => answer.text === question.text)?.answer || '';
      case 'checkboxes':
        return previewCheckbox.find(answer => answer.text === question.text)?.answer || [];
      case 'rating scale':
        return previewRating.find(answer => answer.text === question.text)?.answer || '';
      case 'date':
        return previewDate.find(answer => answer.text === question.text)?.answer || '';
      case 'time':
        return previewTime.find(answer => answer.text === question.text)?.answer || '';
      case 'dropdown':
        return previewSingleSelect.find(answer => answer.text === question.text)?.answer || '';
      case 'multi-select dropdown':
        return previewMultiSelect.find(answer => answer.text === question.text)?.answer || [];
      case 'yes/no boolean':
        return previewBoolean.find(answer => answer.text === question.text)?.answer || '';
      default:
        return '';
    }
  };

  // View User Answers
  const handleOpenAnswerDialog = (id) => {
    setOpenAnswerDialog(true);
    const answer = surveyAnswerData.find((answer) => answer.id === id);
    const selectedSurveyTitle = previousSurvey.find((survey) => survey.surveyId === answer.publishSurveyId);
    setQuestions(selectedSurveyTitle.questions);
    setSurveyTitle(selectedSurveyTitle.surveyTitle);
    setDescription(selectedSurveyTitle.description);
    setAnswers(answer.answer);
  }
  const handleCloseAnswerDialog = async () => {
    setOpenAnswerDialog(false);
  }

  const handleSurveyStatisticChange = (e) => {
    setStatisticSurvey(e.target.value);
  }

  const handleQuestStatisticChange = (e) => {
    setStatisticQuestion(e.target.value);
  }

  const handleOpenStatisticDialog = (e) => {
    setOpenStatisticDialog(true);
    const [surveyId, questionId, questionText] = statisticQuestion.split('.');
    const surveyFilter = surveyAnswerData.filter((ans) => ans.publishSurveyId === surveyId)
    const survey = previousSurvey.find((survey) => survey.surveyId === surveyId);
    const question = survey.questions.find((question) => question.id === parseInt(questionId));
    const moreItems = question.more.map((item) => item.item);
    const count = [];
    if (moreItems.length === 0) {
      surveyFilter.forEach((survey) => {
        survey.answer.forEach((answer) => {
          if (answer.questionId === parseInt(questionId)) {
            count[questionText] = (count[questionText] || 0) + 1;
          }
        });
      });
    } else {
      moreItems.forEach((item) => {
        count[item] = 0;
        surveyFilter.forEach((survey) => {
          survey.answer.forEach((answer) => {
            if (answer.questionId === parseInt(questionId) && answer.answer === item) {
              count[item]++;
            }
          });
        });
      });
    }
    console.log("count", count);
    setTotalSurveySubmission(surveyFilter.length);
    setQuestionText(questionText);
    setItem(moreItems);
    setAnswerCount(count);
  }

  const handleCloseStatisticDialog = (e) => {
    setOpenStatisticDialog(false);
  }

  // View Question Statistics
  // const handleQuestionStatisticChange = (e) => {
  //   setStatisticQuestion(e.target.value);
  //   console.log("e.target.value", e.target.value);
  //   const [surveyId, questionId, questionText] = e.target.value.split('.');
  //   const surveyFilter = surveyAnswerData.filter((ans) => ans.publishSurveyId === surveyId)
  //   const survey = previousSurvey.find((survey) => survey.surveyId === surveyId);
  //   console.log("survey", survey);
  //   const question = survey.questions.find((question) => question.id === parseInt(questionId));
  //   console.log("question", question);
  //   const moreItems = question.more.map((item) => item.item);
  //   console.log("item", moreItems);
  //   const count = [];
  //   console.log("surveyFilter", surveyFilter);
  //   moreItems.forEach((item) => {
  //     count[item] = 0;
  //     surveyFilter.forEach((survey) => {
  //       survey.answer.forEach((answer) => {
  //         if (answer.questionId === parseInt(questionId) && answer.answer === item) {
  //           count[item]++;
  //         }
  //       });
  //     });
  //   });
  //   setTotalSurveySubmission(surveyFilter.length);
  //   setQuestionText(questionText);
  //   setItem(moreItems);
  //   setAnswerCount(count);
  //   console.log("count", count);
  //   setOpenQuestionStatisticDialog(true);
  // }

  // const handleCloseQuestionStatisticDialog = async () => {
  //   setOpenQuestionStatisticDialog(false);
  //   setStatisticQuestion([]);
  // }

  return (
    <Box>
      {/* Survey Creation */}
      <Card 
        sx={{
          p: 5,
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
      </Card>
      {/* Publish Survery */}
      <Card 
        sx={{
          p: 5,
          mt: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Publish a Survey
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setPublishStartDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="Start Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={publishStartDate}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                onChange        ={(e) => setPublishEndDate(e.target.value)}
                InputLabelProps ={{ shrink: true }}
                margin          ="dense"
                label           ="End Date"
                type            ="date"
                fullWidth
                variant         ="outlined"
                value           ={publishEndDate}
              />
            </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id={"survey-title-select"}>Select a Survey</InputLabel>
              <Select
                labelId={'survey-title-select'}
                id={'survey-title-select'}
                value={publishSurvey}
                label="Select a Survey"
                onChange={(e) => handlePublishSurveyChange(e.target.value)}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {previousSurvey.map((pre) => (
                  <MenuItem key={pre.surveyId} value={pre.surveyId}>{pre.surveyTitle}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant ="contained"
          onClick ={handlePublish}
          sx={{ mt: 2 }}
        >
          <Typography variant="button" component="div">
            Publish
          </Typography>
        </Button>
      </Card>
      {/* User Select Survey */}
      <Card 
        sx={{
          p: 5,
          mt: 2,
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          Do a Survey
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField
              onChange  ={(e) => setUserName(e.target.value)}
              margin    ="dense"
              label     ="Name"
              type      ="string"
              fullWidth
              variant   ="outlined"
              value     ={userName}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl fullWidth>
              <InputLabel id={"survey-title-select"}>Select a Survey</InputLabel>
              <Select
                labelId={'survey-title-select'}
                id={'survey-title-select'}
                value={userSelectSurvey}
                label="Select a Survey"
                onChange={(e) => handleUserSelectSurveyChange(e.target.value)}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {publishSurveyData.map((data) => data.status === "Ongoing" && (
                  <MenuItem key={data.surveyId} value={data.surveyId}>{previousSurvey.find(pre => data.surveyId === pre.surveyId)?.surveyTitle}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      {/* User Answer Table */}
      <Card
         sx={{
          p: 5,
          mt: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5.25} md={5.25}>
            <FormControl fullWidth>
              <InputLabel id="survey-select">Select Survey</InputLabel>
              <Select
                labelId="survey-select"
                id="survey-select"
                value={statisticSurvey}
                label="Select Survey"
                onChange={(e) => handleSurveyStatisticChange(e)}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {previousSurvey.map((prop) => {
                  const survey = surveyAnswerData.find((answer) => answer.publishSurveyId === prop.surveyId);
                  if (survey) {
                    return (
                      <MenuItem key={prop.surveyId} value={prop.surveyId}>{prop.surveyTitle}</MenuItem>
                    )
                  };
                  return;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5.25} md={5.25}>
            <FormControl fullWidth>
              <InputLabel id="question-select">Select Question</InputLabel>
              <Select
                labelId="question-select"
                id="question-select"
                value={statisticQuestion}
                label="Select Question"
                onChange={(e) => handleQuestStatisticChange(e)}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {previousSurvey
                  .filter((survey) => survey.surveyId === statisticSurvey)
                  .map((survey) => (
                    survey.questions.map((question) => (
                      <MenuItem value={`${survey.surveyId}.${question.id}.${question.text}`} key={`${survey.surveyId}.${question.id}`}>
                        {question.text}
                      </MenuItem >
                    ))
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1.5} md={1.5}>
            <Button variant="outlined" fullWidth style={{ height: "100%" }} onClick={handleOpenStatisticDialog}>
              <Typography variant="button">
                Statistics
              </Typography>
            </Button>
          </Grid>
          {/* <Grid item xs={5.25} md={5.25}>
            <FormControl fullWidth>
              <InputLabel id="question-select">Show question statistics</InputLabel>
              <Select
                labelId="question-select"
                id="question-select"
                value={statisticQuestion}
                label="Show question statistics"
                onChange={(e) => handleQuestionStatisticChange(e)}
              >
                <MenuItem value=''><em>None</em></MenuItem>
                {previousSurvey.map((prop) => {
                  const survey = surveyAnswerData.find((answer) => answer.publishSurveyId === prop.surveyId);
                  if (survey) {
                    return [
                      <ListSubheader key={prop.surveyId}>{prop.surveyTitle}</ListSubheader>,
                      prop.questions.map((question) => (
                        <MenuItem value={`${prop.surveyId}.${question.id}.${question.text}`} key={`${prop.surveyId}.${question.id}`}>
                          {question.text}
                        </MenuItem >
                      ))
                    ]
                  };
                  return;
                })}
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop) => (
                  <TableCell
                    className={classes.tableCell + classes.tableHeadCell}
                    key={prop}
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    {prop}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {surveyAnswerData.map((prop) => (
              <TableRow key={prop.id}>
                <TableCell style={{textAlign: "center"}}>{prop.id}</TableCell>
                <TableCell style={{textAlign: "center"}}>{prop.name}</TableCell>
                <TableCell style={{textAlign: "center"}}>{previousSurvey.find(pre => prop.publishSurveyId === pre.surveyId)?.surveyTitle}</TableCell>
                <TableCell style={{textAlign: "center"}}><Button onClick={() => handleOpenAnswerDialog(prop.id)}>View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {/* Initialise Survey Dialog */}
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
      {/* Survey Settings Dialog */}
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
      {/* Survey Questions Dialog */}
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
                                      {questions
                                        .filter((check) => check.id !== question.id)
                                        .map((condition) => (
                                          condition.type === "dropdown" || condition.type === "checkboxes" || condition.type === "radio button group" || condition.type === "multi-select dropdown" ? (
                                            condition.more.map((moreItem) => (
                                              <MenuItem key={moreItem.id} value={moreItem.item}>
                                                {moreItem.item}
                                              </MenuItem>
                                            ))
                                          ) : (
                                            <MenuItem key={condition.id} value={condition.text}>
                                              {condition.text}
                                            </MenuItem>
                                          )
                                        ))
                                      }
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
      {/* Survey Preview Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={preview}
        onClose           ={closePreview}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2" gutterBottom>{userSelectSurvey ? surveyTitle : `${surveyTitle}'s Preview`}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {questions.map((question) => {
              if(question.condition === "none") {
                return generateQuestionUI(question);
              } else {
                return checkQuestionCondition(question);
              }
            })}
          </Grid>
        </DialogContent>
        {userSelectSurvey && (
          <DialogActions>
            <Button onClick={handleSubmitSurvey} color="primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
      {/* Answer Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={openAnswerDialog}
        onClose           ={handleCloseAnswerDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2" gutterBottom>{userSelectSurvey ? surveyTitle : `${surveyTitle}'s Preview`}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {questions.map((question) => {
              return generateQuestionUI(question, answers[question.id]?.answer || null);
            })}
          </Grid>
        </DialogContent>
      </Dialog>
      {/* Statistic Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="md"
        open              ={openStatisticDialog}
        onClose           ={handleCloseStatisticDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2" gutterBottom>{questionText}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <Typography variant="h3">Total Submissions</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <Typography variant="h3">Answers Statistics</Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <CustomActiveShapePieChart questionText={questionText} statisticQuestion={statisticQuestion} totalSurveySubmissions={totalSurveySubmission} questionItem={item} answerCount={answerCount} />
            </Grid>
            <Grid item xs={6} md={6}>
              <CustomActiveShapePieChart questionText={questionText} statisticQuestion={statisticQuestion} questionItem={item} answerCount={answerCount} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Page2;
