const PaymentHistory = ({ studentId }: { studentId: string }) => {
  // Fetch payment history for this student
  const [payments, setPayments] = useState([]);

  return (
    <Dialog open={true} fullWidth maxWidth="md">
      <DialogTitle>سجل الدفعات</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>تاريخ الدفعة</TableCell>
                <TableCell>المبلغ</TableCell>
                <TableCell>الملاحظات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount} ر.س</TableCell>
                  <TableCell>{payment.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button>إغلاق</Button>
      </DialogActions>
    </Dialog>
  );
};