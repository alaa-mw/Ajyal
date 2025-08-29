import {  Container, Grid, Stack, Typography } from "@mui/material";
import InvoiceTimeline from "./InvoiceTimeline";
import StudentPayments from "./StudentPayments";
import PaymentsNotification from "./PaymentsNotification";

const CourseFinancialPage = () => {
  
  return (
    <Container maxWidth="xl">
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 1, fontWeight: "bold" }}
      >
        المالية
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ s: 12, md: 12 }}>
          <Stack spacing={3}>
           
              <InvoiceTimeline />
            
          </Stack>
        </Grid>

        <Grid size={{ s: 12, md: 9 }}>
          <StudentPayments/>
          </Grid>
        <Grid size={{ s: 12, md: 3 }}><PaymentsNotification/></Grid>
      </Grid>
    </Container>
  );
};

export default CourseFinancialPage;
