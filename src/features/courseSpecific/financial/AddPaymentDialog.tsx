import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Invoice } from "../../../interfaces/Invoice";

interface Props {
  open: boolean;
  onClose: () => void;
  invoices: Invoice[];
  onSubmit: (paidInvoiceId: string) => void;
}

const AddPaymentDialog = ({ open, onClose, invoices, onSubmit }: Props) => {
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = (invoiceId) => {
    setSelectedInvoice(selectedInvoice === invoiceId ? null : invoiceId);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onSubmit(selectedInvoice);
    setIsSubmitting(false);
    setSelectedInvoice("");
    onClose();
  };

  const handleClose = () => {
    setSelectedInvoice("");
    onClose();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (value) => {
    return `${value} $`;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>إضافة دفعة جديدة</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" gutterBottom>
          اختر فاتورة للدفع:
        </Typography>
        <Paper variant="outlined">
          <List dense component="div" role="list">
            {invoices && invoices.length > 0 ? (
              invoices.map((invoice) => {
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
                        checked={selectedInvoice === invoice.id}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`فاتورة #${invoice.id}`}
                      secondary={`تاريخ الاستحقاق: ${formatDate(
                        invoice.due_date
                      )}`}
                    />
                    <Typography variant="body1" fontWeight="bold">
                      {formatCurrency(invoice.value)}
                    </Typography>
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <ListItemText primary="لا توجد فواتير غير مدفوعة." />
              </ListItem>
            )}
          </List>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} color="inherit">
          إلغاء
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          startIcon={
            isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SaveIcon />
            )
          }
          disabled={!selectedInvoice || isSubmitting}
        >
          {isSubmitting ? "جاري المعالجة..." : "تأكيد الدفع"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddPaymentDialog;
