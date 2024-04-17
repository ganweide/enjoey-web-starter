// React Imports
import React, { useState, useEffect } from "react";

import { SketchPicker } from 'react-color';

import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  Divider,
  TextField,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Styles from "./style";

const useStyles       = makeStyles(Styles);
const tenantPlanUrl   = "http://localhost:8000/api/tenant-plan/";
const planFeaturesUrl = "http://localhost:8000/api/plan-features/";

const Page2 = () => {
  const classes   = useStyles();
  const tableHead = [" ", "Plan", "Price", "Features"];
  const [openAddNewPlanDialog, setOpenAddNewPlanDialog] = useState(false);
  const [tenantPlans, setTenantPlans]   = useState([]);
  const [planFeatures, setPlanFeatures] = useState([]);
  const [duration, setDuration] = useState("");
  const [name, setName]         = useState("");
  const [price, setPrice]       = useState("");
  const [tag, setTag]           = useState("");
  const [tagColor, setTagColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [type, setType]         = useState("");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    Axios.get(tenantPlanUrl)
      .then(response => {
        setTenantPlans(response.data);
      })
      .catch(error => {
        console.error('Error fetching tenant plans:', error);
      });

    // Fetch plan features
    Axios.get(planFeaturesUrl)
      .then(response => {
        setPlanFeatures(response.data);
      })
      .catch(error => {
        console.error('Error fetching plan features:', error);
      });
  }, []);

  const handleOpenAddNewPlanDialog = () => {
    setOpenAddNewPlanDialog(true);
    setDuration("");
    setName("");
    setPrice("");
    setTag("");
    setTagColor("");
    setType("");
    setFeatures([]);
  }

  const handleCloseAddNewPlanDialog = () => {
    setOpenAddNewPlanDialog(false);
  }

  const handleSave = async () => {
    const planData = new FormData();
    planData.append("termsInMonth", duration);
    planData.append("title", name);
    planData.append("price", price);
    planData.append("tag", tag);
    planData.append("tagColor", tagColor);

    try {
      const planResponse = await Axios.post(tenantPlanUrl, planData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("planResponse", planResponse);

      // Extract plan ID from response
      const planId = planResponse.data.id;
  
      const featuresData = features.map((feature) => ({
        type: type,  // Assuming type is the same for all features
        title: feature,
        plan: planId,
      }));
  
      // Then, save each feature individually
      const featuresPromises = featuresData.map((featureData) =>
        Axios.post(planFeaturesUrl, featureData)
      );
  
      // Wait for all feature requests to complete
      const featuresResponses = await Promise.all(featuresPromises);
      
      console.log("featuresResponses", featuresResponses);
  
      // Handle success
      console.log('Plan and features saved successfully');
    } catch (error) {
      // Handle error
      console.error('Error saving plan and features:', error);
    }
    setOpenAddNewPlanDialog(false);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleDeleteFeature = (index) => {
    if (features.length === 1) {
      return;
    }
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  return (
    <Box>
      <Card sx={{ mt: 2, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box 
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="h1">Create Plans</Typography>
              <Button variant="outlined" onClick={handleOpenAddNewPlanDialog}>Add New Plan</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
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
                {tenantPlans.map((plan, index) => (
                  <TableRow key={plan.id}>
                    <TableCell style={{textAlign: "center", width: "5%"}}>{index + 1}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{plan.title}</TableCell>
                    <TableCell style={{textAlign: "center"}}>{plan.price}</TableCell>
                    <TableCell style={{textAlign: "center"}}>
                      {planFeatures
                        .filter(feature => feature.plan === plan.id)
                        .map(filteredFeature => (
                          <div key={filteredFeature.id}>{filteredFeature.title}</div>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Card>
      {/* Add New Plan Dialog */}
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={openAddNewPlanDialog}
        onClose           ={handleCloseAddNewPlanDialog}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Subscription Plan</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                onChange        ={(e) => setName(e.target.value)}
                margin          ="dense"
                label           ="Plan's Name"
                type            ="text"
                variant         ="outlined"
                value           ={name}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                onChange        ={(e) => setDuration(e.target.value)}
                margin          ="dense"
                label           ="Subscription's Duration (Months)"
                type            ="number"
                variant         ="outlined"
                value           ={duration}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                onChange        ={(e) => setPrice(e.target.value)}
                margin          ="dense"
                label           ="Price"
                type            ="number"
                variant         ="outlined"
                value           ={price}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth margin ="dense">
                <InputLabel id="tag-select-label">Tag</InputLabel>
                <Select
                  labelId ="tag-select-label"
                  id      ="tag-select"
                  value   ={tag}
                  label   ="Tag"
                  onChange={(event) => setTag(event.target.value)}
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Plus">Plus</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                margin="dense"
                label="Tag Color"
                variant="outlined"
                value={tagColor}
                onClick={() => setShowColorPicker(true)} // Show color picker when clicked
                InputProps={{
                  readOnly: true, // Make the input read-only
                }}
              />
              {showColorPicker && (
                <div style={{ position: 'absolute', zIndex: 999 }}>
                  <SketchPicker
                    color={tagColor}
                    onChangeComplete={(color) => {
                      setTagColor(color.hex);
                      setShowColorPicker(false); // Hide color picker after selection
                    }}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h3" gutterBottom>Plan&apos;s Details</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin ="dense">
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId ="type-select-label"
                  id      ="type-select"
                  value   ={type}
                  label   ="Type"
                  onChange={(event) => setType(event.target.value)}
                >
                  <MenuItem value="Plan A">Plan A</MenuItem>
                  <MenuItem value="Plan B">Plan B</MenuItem>
                  <MenuItem value="Plan C">Plan C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h4" gutterBottom>Features</Typography>
            </Grid>
            {features.map((feature, index) => (
              <Grid container item xs={12} md={12} key={index}>
                <Grid item xs={features.length === 1 ? 12 : 10} md={features.length === 1 ? 12 : 10}>
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      const updatedFeatures = [...features];
                      updatedFeatures[index] = e.target.value;
                      setFeatures(updatedFeatures);
                    }}
                    margin="dense"
                    label={`Feature ${index + 1}`}
                    type="text"
                    variant="outlined"
                    value={feature}
                  />
                </Grid>
                <Grid item xs={2} md={2}>
                  {features.length > 1 && ( // Display delete button if there's more than one feature
                    <Button
                      aria-label='delete'
                      onClick={() => handleDeleteFeature(index)}
                      style={{ width: "100%", height: "100%" }}
                      color="error"
                    >
                      <DeleteIcon />
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} md={12}>
              <Button
                aria-label='add'
                onClick={handleAddFeature}
                style={{ width: "100%", height: "100%" }}
              >
                <AddCircleIcon />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSave}>Save</Button>
          <Button variant="outlined" color="error" onClick={handleCloseAddNewPlanDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Page2;
