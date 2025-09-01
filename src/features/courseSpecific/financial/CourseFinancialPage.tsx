import { Container, Grid, Typography } from "@mui/material";
import InvoiceTimeline from "./InvoiceTimeline";
import StudentPayments from "./StudentPayments";
import PaymentsNotification from "./PaymentsNotification";
import { useParams } from "react-router-dom";

const CourseFinancialPage = () => {
  const { studentId } = useParams();
  console.log(studentId);
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
        <Grid size={{ s: 12, md: 9 }}>
          {/* <Stack spacing={3}> */}
            <InvoiceTimeline />
          {/* </Stack> */}
          {studentId && <StudentPayments studentId={studentId} />}
        </Grid>
        <Grid size={{ s: 12, md: 3 }}>
          <PaymentsNotification />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseFinancialPage;
