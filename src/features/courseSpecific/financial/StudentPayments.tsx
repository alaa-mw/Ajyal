import React, { useState, useMemo } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Divider,
  Chip,
  Avatar,
  CircularProgress
} from '@mui/material';

// --- MUI Icons ---
import AddCardIcon from '@mui/icons-material/AddCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import EventIcon from '@mui/icons-material/Event';

// --- Mock Data for Demonstration ---
const mockStudentData = {
  id: 'reg-001',
  course_id: 'course-101',
  student_id: 'stud-123',
  registered_at: '2025-08-01T10:00:00Z',
  created_at: '2025-08-01T10:00:00Z',
  updated_at: '2025-08-01T10:00:00Z',
  student: {
    id: 'stud-123',
    name: 'أحمد خالد', // Translated name
  },
  payments: [
    {
      id: 'pay-001',
      payment_date: '2025-08-05',
      invoice: {
        id: 'inv-1001',
        value: 500,
        due_date: '2025-08-15',
        created_at: '2025-08-01T11:00:00Z',
        updated_at: '2025-08-01T11:00:00Z',
      },
    },
    {
      id: 'pay-002',
      payment_date: '2025-08-20',
      invoice: {
        id: 'inv-1002',
        value: 500,
        due_date: '2025-09-15',
        created_at: '2025-08-16T09:00:00Z',
        updated_at: '2025-08-16T09:00:00Z',
      },
    },
  ],
};

const mockUnpaidInvoices = [
  {
    id: 'inv-1003',
    value: 500,
    due_date: '2025-10-15',
    created_at: '2025-09-16T09:00:00Z',
    updated_at: '2025-09-16T09:00:00Z',
  },
  {
    id: 'inv-1004',
    value: 250,
    due_date: '2025-11-15',
    created_at: '2025-10-16T09:00:00Z',
    updated_at: '2025-10-16T09:00:00Z',
  },
  {
    id: 'inv-1005',
    value: 75,
    due_date: '2025-12-01',
    created_at: '2025-11-05T14:00:00Z',
    updated_at: '2025-11-05T14:00:00Z',
  },
];


// --- Helper Functions ---
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('ar-SA'); // Arabic locale
const formatCurrency = (amount) => `${amount.toFixed(2)} ر.س`; // Arabic currency format

// --- Add Payment Dialog Component ---
const AddPaymentDialog = ({ open, onClose, invoices, onSubmit }) => {
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (invoiceId) => {
    const currentIndex = selectedInvoices.indexOf(invoiceId);
    const newChecked = [...selectedInvoices];

    if (currentIndex === -1) {
      newChecked.push(invoiceId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedInvoices(newChecked);
  };

  const totalAmount = useMemo(() => {
    return invoices
      .filter((invoice) => selectedInvoices.includes(invoice.id))
      .reduce((sum, invoice) => sum + invoice.value, 0);
  }, [selectedInvoices, invoices]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(selectedInvoices);
    setIsSubmitting(false);
    setSelectedInvoices([]);
    onClose();
  };
  
  const handleClose = () => {
      setSelectedInvoices([]);
      onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>إضافة دفعة جديدة</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" gutterBottom>
          اختر الفواتير للدفع:
        </Typography>
        <Paper variant="outlined">
          <List dense component="div" role="list">
            {invoices.length > 0 ? invoices.map((invoice) => {
              const labelId = `checkbox-list-label-${invoice.id}`;
              return (
                <ListItem
                  key={invoice.id}
                  role="listitem"
                  button
                  onClick={() => handleToggle(invoice.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedInvoices.indexOf(invoice.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`فاتورة #${invoice.id}`}
                    secondary={`تاريخ الاستحقاق: ${formatDate(invoice.due_date)}`}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    {formatCurrency(invoice.value)}
                  </Typography>
                </ListItem>
              );
            }) : (
                <ListItem>
                    <ListItemText primary="لا توجد فواتير غير مدفوعة." />
                </ListItem>
            )}
          </List>
        </Paper>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">الإجمالي:</Typography>
            <Chip label={formatCurrency(totalAmount)} color="primary" sx={{ fontSize: '1rem', fontWeight: 'bold' }}/>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">إلغاء</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          disabled={selectedInvoices.length === 0 || isSubmitting}
        >
          {isSubmitting ? 'جاري المعالجة...' : 'تأكيد الدفع'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// --- Main Student Payments View Component ---
const StudentPayments = () => {
  const [studentData, setStudentData] = useState(mockStudentData);
  const [unpaidInvoices, setUnpaidInvoices] = useState(mockUnpaidInvoices);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddPayment = (paidInvoiceIds) => {
    const newPayments = unpaidInvoices
      .filter(invoice => paidInvoiceIds.includes(invoice.id))
      .map(invoice => ({
        id: `pay-${Math.random().toString(36).substr(2, 9)}`,
        payment_date: new Date().toISOString().split('T')[0],
        invoice: invoice,
      }));

    setStudentData(prevData => ({
      ...prevData,
      payments: [...prevData.payments, ...newPayments],
    }));

    setUnpaidInvoices(prevInvoices => 
      prevInvoices.filter(invoice => !paidInvoiceIds.includes(invoice.id))
    );
  };


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              <PersonIcon />
            </Avatar>
            <div>
              <Typography variant="h5" component="h1" fontWeight="bold">
                {studentData.student.name}
              </Typography>
               <Typography variant="subtitle1" color="text.secondary">
                رقم الطالب: {studentData.student_id}
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
           <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
              <ReceiptLongIcon color="action" /> سجل المدفوعات
            </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table aria-label="student payments table">
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  <TableCell>رقم الفاتورة</TableCell>
                  <TableCell>تاريخ الدفع</TableCell>
                  <TableCell align="right">المبلغ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData.payments.length > 0 ? studentData.payments.map((payment) => (
                  <TableRow key={payment.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Chip icon={<EventIcon />} label={payment.invoice.id} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{formatDate(payment.payment_date)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'medium' }}>{formatCurrency(payment.invoice.value)}</TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">لم يتم تسجيل أي مدفوعات حتى الآن.</Typography>
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
        invoices={unpaidInvoices}
        onSubmit={handleAddPayment}
      />
    </Container>
  );
};

export default StudentPayments;
// // --- App Entry Point ---
// export default function App() {
// //   const theme = createTheme({
// //     direction: 'rtl', // Set direction to Right-to-Left
// //     palette: {
// //       primary: {
// //         main: '#1976d2',
// //       },
// //     },
// //     typography: {
// //       fontFamily: '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif', // Added Cairo font
// //     },
// //     shape: {
// //         borderRadius: 8,
// //     }
// //   });

//   return (
//     <ThemeProvider theme={theme}>
//        <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700&display=swap');
//           body { 
//             background-color: #f4f6f8; 
//             direction: rtl;
//           }
//         `}
//       </style>
//       <div dir="rtl">
//         <StudentPayments />
//       </div>
//     </ThemeProvider>
//   );
// }

