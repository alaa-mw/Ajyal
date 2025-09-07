import React from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Grid, IconButton, List, ListItem, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { InvoiceStudentPayments } from "../../../interfaces/Invoice";
import PaidIcon from '@mui/icons-material/Paid';

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
          title="المدفوعات من قبل: "
          students={studentPayments?.data.paid_students}
          bgColor="#e8f5e9"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <StudentList
          title="المدفوعات المتبقية من قبل:"
          students={studentPayments?.data.unpaid_students}
          bgColor="#ffebee"
      
        />
      </Grid>
    </Grid>
  ); 
};

export default InvoiceStudentsPayments;

const StudentList = ({ title, students, bgColor }) => {
  const handleSendFinancialAlert =()=>{

  }
  return (
    <>
    <Stack direction={"row"}> <Typography variant="body1" fontWeight={"bold"}>{title}</Typography>
      <Tooltip title="ارسال تنبيه مالي">
      <IconButton onClick={handleSendFinancialAlert}>
        <PaidIcon />
      </IconButton>
    </Tooltip></Stack>
     
      <List>
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
