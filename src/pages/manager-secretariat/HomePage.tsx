import React from "react";
import Subjects from "../../features/subjects/Subjects";
import { Grid } from "@mui/material";
import About from "../../features/about/about";

const HomePage = () => {
  return (
    <>
      <Grid container>
        <Grid size={{ s: 12, md: 8 }}>
          <Subjects />
        </Grid>
        <Grid size={{ s: 12, md: 4 }}>
            <About/>
            {/* <PaymentsNotification/> */}</Grid>
      </Grid>
    </>
  );
};

export default HomePage;
