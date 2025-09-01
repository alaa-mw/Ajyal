import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";

// --- MUI Icons ---
import AddCardIcon from "@mui/icons-material/AddCard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import { getStudentName } from "../../../utils/getStudentName";
import useSendData from "../../../hooks/useSendData";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import AddPaymentDialog from "./AddPaymentDialog";
import { StudentInvoicesPaid } from "../../../interfaces/Invoice";
import { formattedDate } from "../../../utils/formatedDate";

const StudentPayments = ({ studentId }) => {
  const { showSnackbar } = useSnackbar();
  const { selectedCourseId } = useSelectedCourse();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: studentPayments } = useFetchDataId<StudentInvoicesPaid>(
    `/payment/students/${studentId}/courses/${selectedCourseId}/payments`,
    studentId
  );

  const { mutate: payInvoice } = useSendData("/invoice/pay");

  const handleSubmitPayment = (paidInvoiceId: string) => {
    payInvoice(
      {
        invoice_id: paidInvoiceId,
        studentId: studentId,
      },
      {
        onSuccess: (response) => showSnackbar(response.message, "success"),
        onError: (error) => showSnackbar(error.message, "error"),
      }
    );
  };

  return (
    <Container sx={{ paddingX: "0px !important", py: 1 }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
              <PersonIcon />
            </Avatar>
            <div>
              <Typography variant="h5" component="h1" fontWeight="bold">
                {getStudentName(studentPayments?.data.student || null)}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                رقم الطالب: {studentPayments?.data.student.id}
              </Typography>
            </div>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddCardIcon />}
            onClick={() => setDialogOpen(true)}
          >
            إضافة دفعة
          </Button>
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <ReceiptLongIcon color="action" /> سجل المدفوعات
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table aria-label="student payments table">
              <TableHead sx={{ bgcolor: "grey.100" }}>
                <TableRow>
                  <TableCell>رقم الفاتورة</TableCell>
                  <TableCell>تاريخ الدفع</TableCell>
                  <TableCell align="right">المبلغ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentPayments?.data &&
                studentPayments?.data.paid_invoices.length > 0 ? (
                  studentPayments?.data.paid_invoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Chip
                          icon={<EventIcon />}
                          label={invoice.payments.id}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {formattedDate(invoice.payments.payment_date)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: "medium" }}>
                        {invoice.value}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        لم يتم تسجيل أي مدفوعات حتى الآن.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
      <AddPaymentDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        invoices={studentPayments?.data.unpaid_invoices || []}
        onSubmit={handleSubmitPayment}
      />
    </Container>
  );
};

export default StudentPayments;


