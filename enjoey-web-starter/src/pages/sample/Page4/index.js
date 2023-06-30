// React Imports
import React, { useEffect, useState } from "react";

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
  Checkbox,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
} from "@mui/material";


const Page2 = () => {
  const today = new Date().getDate();
  const [dates, setDates]                     = useState([]);
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  useEffect(() => {
    const daysOfWeek  = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const weekDates   = [];
    const currentDate = new Date();
    const firstDayOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    );

    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDayOfWeek);
      date.setDate(date.getDate() + i);
      const day = daysOfWeek[date.getDay()];
      const dayDate = date.getDate();

      if (excludeWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
        continue;
      }

      weekDates.push({ day, dayDate });
    }
    setDates(weekDates);
  }, [excludeWeekends]);

  const handleCheckboxChange = (event) => {
    setExcludeWeekends(event.target.checked);
  };

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
        <h2>Menu Planning</h2>
        <FormControlLabel
          control={<Checkbox checked={excludeWeekends} onChange={handleCheckboxChange} />}
          label="Exclude weekends"
        />
      </div>
      <Grid container spacing={2}>
        {dates.map(({ day, dayDate }) => (
          <Grid
            item
            xs={excludeWeekends ? 2.4 : 1.714285714285714}
            md={excludeWeekends ? 2.4 : 1.714285714285714}
            key={dayDate}
          >
            <Card style={{backgroundColor: dayDate === today ? "primary" : "inherit"}}>
              <div style={{textAlign: "center"}}>
                <p>{day}</p>
                <h2>{dayDate}</h2>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Page2;
