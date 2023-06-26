// React Imports
import React, { useEffect, useState } from "react";

import { differenceInMonths, parseISO } from 'date-fns';

import PropTypes from "prop-types";

// Axios Import
import Axios from "axios";

// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Switch,
  Grid,
} from "@mui/material";

// Recharts Imports
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Local Imports
import Styles from "./style";
import Data from "./data";

// Global Constants
const useStyles = makeStyles(Styles);
const childUrl  = "http://127.0.0.1:8000/api/child/";
const familyUrl = "http://127.0.0.1:8000/api/family/";
const programUrl = "http://127.0.0.1:8000/api/program/";
const admissionUrl = "http://127.0.0.1:8000/api/admission/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Title", "Child's Name", "Registration Date", "Program Enrollment", "Status", "Growth Graph"];
  const [admissionDatas, setAdmissionDatas]       = useState([]);
  const [childDatas, setChildDatas]               = useState([]);
  const [programDatas, setProgramDatas]           = useState([]);
  const [refreshData, setRefreshData]             = useState([]);
  const [open, setOpen]                           = useState(false);
  const [show, setShow]                           = useState(false);
  const [switchChart, setSwitchChart]             = useState(true);
  const [childName, setChildName]                 = useState("");
  const [childNRIC, setChildNRIC]                 = useState("");
  const [languageSpoken, setLanguageSpoken]       = useState("");
  const [childSex, setChildSex]                   = useState("");
  const [childDOB, setChildDOB]                   = useState("");
  const [childHeight, setChildHeight]             = useState("");
  const [childWeight, setChildWeight]             = useState("");
  const [programEnrollment, setProgramEnrollment] = useState("");
  const [fatherNRIC, setFatherNRIC]               = useState("");
  const [fatherName, setFatherName]               = useState("");
  const [fatherEmail, setFatherEmail]             = useState("");
  const [fatherPhone, setFatherPhone]             = useState("");
  const [fatherOccupation, setFatherOccupation]   = useState("");
  const [motherName, setMotherName]               = useState("");
  const [motherNRIC, setMotherNRIC]               = useState("");
  const [motherEmail, setMotherEmail]             = useState("");
  const [motherPhone, setMotherPhone]             = useState("");
  const [motherOccupation, setMotherOccupation]   = useState("");
  const [homeAddress, setHomeAddress]             = useState("");

  useEffect(() => {
    try {
      Axios.get(admissionUrl).then((response) => {
        setAdmissionDatas(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      Axios.get(childUrl).then((response) => {
        setChildDatas(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      Axios.get(programUrl).then((response) => {
        setProgramDatas(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [refreshData]);

  const openDialog = async () => {
    setOpen             (true);
    setChildName        ("");
    setChildNRIC        ("");
    setLanguageSpoken   ("");
    setChildDOB         ("");
    setChildSex         ("");
    setChildHeight      ("");
    setChildWeight      ("");
    setProgramEnrollment("");
    setFatherName       ("");
    setFatherNRIC       ("");
    setFatherEmail      ("");
    setFatherPhone      ("");
    setFatherOccupation ("");
    setMotherName       ("");
    setMotherNRIC       ("");
    setMotherEmail      ("");
    setMotherPhone      ("");
    setMotherOccupation ("");
    setHomeAddress      ("");
  };

  const closeDialog = async () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setProgramEnrollment(event.target.value);
  };

  const newAdmission = async () => {
    const childData = new FormData();
    childData.append("childNameENG", childName);
    childData.append("childDOB", childDOB);
    childData.append("childNRIC", childNRIC);
    childData.append("childSex", childSex);
    childData.append("childHeight", childHeight);
    childData.append("childWeight", childWeight);
    childData.append("languageSpoken", languageSpoken);
  
    try {
      const response = await Axios({
        method  : "POST",
        url     : childUrl,
        data    : childData,
        headers : {"Content-Type": "multipart/form-data"},
      });

      const childId = response.data.childId;
      const registrationDate = response.data.created_at;

      const fatherData = {
        childId       :  childId,
        name          : fatherName,
        nRIC          : fatherNRIC,
        email         : fatherEmail,
        occupation    : fatherOccupation,
        address       : homeAddress,
        relationship  : "father"
      };
  
      const motherData = {
        childId       : childId,
        name          : motherName,
        nRIC          : motherNRIC,
        email         : motherEmail,
        occupation    : motherOccupation,
        address       : homeAddress,
        relationship  : "mother"
      };

      const admissionData = {
        childId           : childId,
        title             : "Admission",
        registrationDate  : registrationDate,
        status            : false,
        programId         : programEnrollment,
        commencementDate  : registrationDate,
      }

      await Promise.all([
        Axios.post(familyUrl, fatherData),
        Axios.post(familyUrl, motherData),
        Axios.post(admissionUrl, admissionData)
      ]);

      setRefreshData(response.data)
    } catch (error) {
      console.log("error", error);
    }
  
    setOpen(false);
  };

  const showGraph = async (prop) => {
    setShow(true);
    setSwitchChart(true);
    try {
      const { data } = await Axios.get(`${childUrl}${prop.childId}`);
      setChildSex(data.childSex);
      setChildDOB(data.childDOB);
      setChildHeight(data.childHeight);
      setChildWeight(data.childWeight);
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleSwitch = () => {
    setSwitchChart(!switchChart);
  }

  const hideGraph = async () => {
    setShow (false);
  }

  return (
    <div>
      <div 
        style={{
          display       : "flex",
          flexDirection : "row",
          justifyContent: "space-between",
          alignItems    : "center",
        }}
      >
        <h2>Admission Table</h2>
        <Button
          variant ="contained"
          onClick ={openDialog}
          style   ={{
            height: "40px",
          }}
        >
          New Admission
        </Button>
        <Dialog
          open              ={open}
          onClose           ={closeDialog}
          aria-labelledby   ="alert-dialog-title"
          aria-describedby  ="alert-dialog-description"
        >
          <DialogTitle>
            <h2>Admission Form</h2>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={6} md={12}>
                <h3>Child&apos;s Info</h3>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setChildName(e.target.value)}
                  autoFocus
                  margin    ="dense"
                  label     ="Child's Name"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={childName}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setChildNRIC(e.target.value)}
                  margin    ="dense"
                  label     ="Child's NRIC"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={childNRIC}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setLanguageSpoken(e.target.value)}
                  margin    ="dense"
                  label     ="Language Spoken At Home"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={languageSpoken}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange        ={(e) => setChildDOB(e.target.value)}
                  InputLabelProps ={{ shrink: true }}
                  margin          ="dense"
                  label           ="Child's Date Of Birth"
                  type            ="date"
                  fullWidth
                  variant         ="outlined"
                  value           ={childDOB}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl component="fieldset">
                  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby ="demo-radio-buttons-group-label"
                    value           ={childSex}
                    onChange        ={(e) => setChildSex(e.target.value)}
                    name            ="radio-buttons-group"
                    style           ={{ flexDirection: "row" }}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  onChange  ={(e) => setChildHeight(e.target.value)}
                  margin    ="dense"
                  label     ="Height (CM)"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={childHeight}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  onChange  ={(e) => setChildWeight(e.target.value)}
                  margin    ="dense"
                  label     ="Weight (KG)"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={childWeight}
                />
              </Grid>
              <Grid item xs={6} md={12}>
                <FormControl fullWidth>
                  <InputLabel id="program-select-label">Program Enrollment</InputLabel>
                  <Select
                    labelId ="program-select-label"
                    id      ="program-select"
                    value   ={programEnrollment}
                    label   ="Program Enrollment"
                    onChange={handleChange}
                  >
                    {programDatas.map((programData) => {
                      return (
                        <MenuItem
                          key   ={programData.programId}
                          value ={programData.programId}
                        >
                          {programData.programName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={12}>
                <h3>Father&apos;s Info</h3>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setFatherName(e.target.value)}
                  margin    ="dense"
                  label     ="Father's Name"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={fatherName}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setFatherNRIC(e.target.value)}
                  margin    ="dense"
                  label     ="Father's NRIC"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={fatherNRIC}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setFatherEmail(e.target.value)}
                  margin    ="dense"
                  label     ="Father's Email"
                  type      ="email"
                  fullWidth
                  variant   ="outlined"
                  value     ={fatherEmail}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setFatherPhone(e.target.value)}
                  margin    ="dense"
                  label     ="Father's Phone"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={fatherPhone}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setFatherOccupation(e.target.value)}
                  margin    ="dense"
                  label     ="Father's Occupation"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={fatherOccupation}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setHomeAddress(e.target.value)}
                  margin    ="dense"
                  label     ="Home Address"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={homeAddress}
                />
              </Grid>
              <Grid item xs={6} md={12}>
                <h3>Mother&apos;s Info</h3>
                <Divider variant="middle" />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setMotherName(e.target.value)}
                  margin    ="dense"
                  label     ="Mother's Name"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={motherName}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setMotherNRIC(e.target.value)}
                  margin    ="dense"
                  label     ="Mother's NRIC"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={motherNRIC}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setMotherEmail(e.target.value)}
                  margin    ="dense"
                  label     ="Mother's Email"
                  type      ="email"
                  fullWidth
                  variant   ="outlined"
                  value      ={motherEmail}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setMotherPhone(e.target.value)}
                  margin    ="dense"
                  label     ="Mother's Phone"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={motherPhone}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setMotherOccupation(e.target.value)}
                  margin    ="dense"
                  label     ="Mother's Occupation"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={motherOccupation}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  onChange  ={(e) => setHomeAddress(e.target.value)}
                  margin    ="dense"
                  label     ="Home Address"
                  type      ="string"
                  fullWidth
                  variant   ="outlined"
                  value     ={homeAddress}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={newAdmission}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
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
            {admissionDatas.map((admissionData, index) => {
              const child             = childDatas.find((childData) => admissionData.childId === childData.childId);
              const program           = programDatas.find((programData) => admissionData.programId === programData.programId);
              const childName         = child ? child.childNameENG : "";
              const currentDate       = new Date();
              const programName       = program ? program.programName : "";
              const registrationDate  = new Date(admissionData.registrationDate).toLocaleDateString();

              const heightDataBoys    = Data.boysHeight.map(dataAdded => {
                if (dataAdded.Month === (differenceInMonths(currentDate, parseISO(childDOB)) + " month")) {
                  return { ...dataAdded, Height: childHeight };
                }
                return dataAdded;
              });
              const heightDataGirls   = Data.girlsHeight.map(dataAdded => {
                if (dataAdded.Month === (differenceInMonths(currentDate, parseISO(childDOB)) + " month")) {
                  return { ...dataAdded, Height: childHeight };
                }
                return dataAdded;
              });
              const weightDataBoys    = Data.boysWeight.map(dataAdded => {
                if (dataAdded.Month === (differenceInMonths(currentDate, parseISO(childDOB)) + " month")) {
                  return { ...dataAdded, Weight: childWeight };
                }
                return dataAdded;
              });
              const weightDataGirls   = Data.girlsWeight.map(dataAdded => {
                if (dataAdded.Month === (differenceInMonths(currentDate, parseISO(childDOB)) + " month")) {
                  return { ...dataAdded, Weight: childWeight };
                }
                return dataAdded;
              });

              const handleStatusChange = async (event) => {
                const newStatus = event.target.checked;
                try {
                  await Axios.put(`${admissionUrl}${admissionData.admissionId}/`, {
                    status: newStatus,
                  });
                  const updateStatus = admissionDatas.map((admissionStatus) => {
                    if (admissionStatus.admissionId === admissionData.admissionId) {
                      return { ...admissionStatus, status: newStatus };
                    }
                    return admissionStatus;
                  });
                  setAdmissionDatas(updateStatus);
                } catch (error) {
                  console.log(error);
                }
              };

              // tickCount={11} domain={[45, 95]}

              const ReChartComponent = ({ data, unit }) => (
                <ResponsiveContainer width="100%" height={450}>
                  <LineChart data={data}>
                    <XAxis dataKey="Month" />
                    <YAxis unit={unit} domain={switchChart ? [45, 100] : [1, 15]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="number" name="97th" dataKey="P97" stroke="#F04F47" unit={unit} />
                    <Line type="number" name="85th" dataKey="P85" stroke="#FFA500" unit={unit} />
                    <Line type="number" name="50th" dataKey="P50" stroke="#32CD32" unit={unit} />
                    <Line type="number" name="15th" dataKey="P15" stroke="#FFA500" unit={unit} />
                    <Line type="number" name="3rd" dataKey="P3" stroke="#F04F47" unit={unit} />
                    <Line
                      type="monotone"
                      name={switchChart ? 'Child Height' : 'Child Weight'}
                      unit={unit}
                      dataKey={switchChart ? 'Height' : 'Weight'}
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              );

              ReChartComponent.propTypes = {
                data: PropTypes.array.isRequired,
                unit: PropTypes.string.isRequired,
              };

              return (
                <TableRow key={admissionData.admissionId}>
                  <TableCell style={{textAlign: "center"}}>{index + 1}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{admissionData.title}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{childName}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{registrationDate}</TableCell>
                  <TableCell style={{textAlign: "center"}}>{programName}</TableCell>
                  <TableCell style={{textAlign: "center"}}>
                    <Switch
                      checked ={admissionData.status}
                      onChange={handleStatusChange}
                      color   ="primary"
                    />
                    {admissionData.status ? 'Enrolled' : 'Pending'}
                  </TableCell>
                  <TableCell style={{textAlign: "center"}}>
                    <Button variant ="contained" onClick ={() => showGraph(admissionData)}>
                      Show Graph
                    </Button>
                  </TableCell>
                  <Dialog
                    fullWidth
                    maxWidth="xl"
                    open={show}
                    onClose={hideGraph}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <div
                      style={{
                        display       : "flex",
                        justifyContent: "space-between",
                        margin        : "15px",
                      }}
                    >
                      <div>
                        {switchChart ? "Length-for-age" : "Weight-for-age"} {childSex === "female" ? "GIRLS" : "BOYS"}
                      </div>
                      <Button variant="contained" onClick={handleSwitch}>
                        {switchChart ? 'Weight' : 'Height'}
                      </Button>
                    </div>
                    <DialogContent>
                      {childSex === 'female' ? (
                        switchChart ? (
                          <ReChartComponent data={heightDataGirls} unit="cm" />
                        ) : (
                          <ReChartComponent data={weightDataGirls} unit="kg" />
                        )
                      ) : (
                        switchChart ? (
                          <ReChartComponent data={heightDataBoys} unit="cm" />
                        ) : (
                          <ReChartComponent data={weightDataBoys} unit="kg" />
                        )
                      )}
                    </DialogContent>
                  </Dialog>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Page2;
