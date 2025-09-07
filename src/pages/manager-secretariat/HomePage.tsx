import React from "react";
import Subjects from "../../features/subjects/Subjects";
import { Divider, Grid } from "@mui/material";
import About from "../../features/about/about";
import ComplaintsList from "../../features/complaints/ComplaintsList";
import NotificationsList from "../../features/notification/NotificationsList";

const HomePage = () => {
  return (
    <>
      <Grid container>
        <Grid size={{ s: 12, md: 12 }}>
          <About />
          <Divider/>
        </Grid>
        <Grid size={{ s: 12, md: 8 }}>
          <Subjects />
        </Grid>
        <Grid size={{ s: 12, md: 4 }}>
          <NotificationsList />
          {/* <PaymentsNotification/> */}
        </Grid>
        <ComplaintsList />
      </Grid>
    </>
  );
};

export default HomePage;
