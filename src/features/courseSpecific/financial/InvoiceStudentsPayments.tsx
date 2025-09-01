import React from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { InvoiceStudentPayments } from "../../../interfaces/Invoice";

interface Props {
  invoiceId: string;
}
const InvoiceStudentsPayments = ({ invoiceId }: Props) => {
  console.log("invoice", invoiceId);
  const { data: studentPayments } = useFetchData<InvoiceStudentPayments>(
    `/payment/invoices/${invoiceId}/students/payments`
  );
  return (
    <Grid container spacing={2} sx={{m:1}}>
      <Grid size={{ xs: 12, md: 6 }}>
        <StudentList
          title="الطلاب الدافعة"
          students={studentPayments?.data.paid_students}
          bgColor="#e8f5e9"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <StudentList
          title="الطلاب الغير دافعة"
          students={studentPayments?.data.unpaid_students}
          bgColor="#ffebee"
        />
      </Grid>
    </Grid>
  ); // make here a list of students names behind other
};

export default InvoiceStudentsPayments;

const StudentList = ({ title, students, bgColor }) => {
  return (
    <>
      <Typography variant="h6">{title}</Typography>
      <List sx={{ gap: 2 }}>
        {students?.length === 0 && <Typography>لا يوجد طلاب </Typography>}
        {students?.map((student) => (
          <ListItem
            key={student.id}
            sx={{
              bgcolor: bgColor,
              borderRadius: 2,
              mb:1
            }}
          >
            <ListItemText
              primary={`${student.first_name} ${student.last_name}`}
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
