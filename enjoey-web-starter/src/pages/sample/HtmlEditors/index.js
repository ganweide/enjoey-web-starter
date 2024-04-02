// React Imports
import React from "react";

import {
  Card,
  Grid,
  Typography,
} from "@mui/material";

import CKEditor from "./CKEditor";
import DevExtremeEditor from "./DevExtremeEditor";
import TipTapEditor from "./TipTapEditor";

const Page2 = () => {
  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h2" gutterBottom>Announcement Editor (Tip Tap)</Typography>
            <TipTapEditor />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h2" gutterBottom>Announcement Editor (CKEditor)</Typography>
            <CKEditor />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 5 }}>
            <Typography variant="h2" gutterBottom>Announcement Editor (DevExtreme React)</Typography>
            <DevExtremeEditor />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Page2;
