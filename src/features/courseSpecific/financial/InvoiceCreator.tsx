import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import { Add, RemoveCircle } from "@mui/icons-material";
import { RTLDatePicker } from "../../../components/common/RTLDatePicker";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { Course } from "../../../interfaces/Course";
import useSendData from "../../../hooks/useSendData";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface Invoice {
  id: string;
  value: number;
  due_date: string;
}

const InvoiceCreator = () => {
  const { selectedCourseId } = useSelectedCourse();
  const { showSnackbar } = useSnackbar();
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "invoice-1", value: 0, due_date: "" },
  ]);
  const { mutate: addInvoices } = useSendData("/invoice/addInvoice");
  const { data: courseData } = useFetchDataId<Course>(
    `/course/show/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );
  const totalValue = Number(courseData?.data.cost) || 0;

  const addInvoice = () => {
    const newId = `invoice-${invoices.length + 1}`;
    setInvoices([...invoices, { id: newId, value: 0, due_date: "" }]);
  };

  const removeInvoice = (index: number) => {
    if (invoices.length > 1) {
      setInvoices(invoices.filter((_, i) => i !== index));
    }
  };

  const updateInvoice = (
    index: number,
    field: keyof Invoice,
    value: string | number
  ) => {
    const updatedInvoices = [...invoices];

    if (field === "value") {
      const numericValue = Number(value);
      const currentTotal = invoices.reduce(
        (sum, inv, i) => (i === index ? sum + numericValue : sum + inv.value),
        0
      );

      if (currentTotal <= totalValue) {
        updatedInvoices[index][field] = numericValue;
      }
    } else {
      updatedInvoices[index][field] = value as string;
    }

    setInvoices(updatedInvoices);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("course_id", selectedCourseId || "-1");

    invoices.forEach((invoice, index) => {
      formData.append(`invoices[${index}][value]`, invoice.value.toString());
      formData.append(`invoices[${index}][due_date]`, invoice.due_date);
    });

    addInvoices(formData, {
      onSuccess: (response) => {
        showSnackbar(response.message, "success");
      },
      onError: (error) => {
        showSnackbar(error.message, "error");
      },
    });
  };

  const currentTotal = invoices.reduce(
    (sum, invoice) => sum + invoice.value,
    0
  );
  const remainingAmount = totalValue - currentTotal;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        إنشاء الفواتير
      </Typography>

      {/* Total Value Section */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 3,
          mb: 3,
          bgcolor: "primary.light",
          color: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left side - Financial info */}
          <Box>
            <Typography variant="h6" gutterBottom>
              القيمة الإجمالية: ${totalValue.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              المتبقي: ${remainingAmount.toFixed(2)}
            </Typography>
          </Box>

          {/* Right side - Course dates */}
          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body1" gutterBottom>
              بداية الكورس: {courseData?.data.start_date}
            </Typography>
            <Typography variant="body1">
              نهاية الكورس: {courseData?.data.end_date}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Invoices List */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">الفواتير</Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={addInvoice}
            disabled={remainingAmount <= 0}
          >
            إضافة فاتورة
          </Button>
        </Box>

        <Grid container spacing={2}>
          {invoices.map((invoice, index) => (
            <Grid sx={{ xs: 12, md: 6 }} key={invoice.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  width: 280,
                  cursor: "pointer",
                  border: "2px solid transparent",
                }}
              >
                <IconButton onClick={() => removeInvoice(index)} color="error">
                  <RemoveCircle fontSize="small" />
                </IconButton>
                <TextField
                  label="القيمة"
                  type="number"
                  value={invoice.value}
                  onChange={(e) =>
                    updateInvoice(index, "value", e.target.value)
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                  inputProps={{
                    step: "0.01",
                    min: "0",
                    max: remainingAmount + invoice.value,
                  }}
                />

                <RTLDatePicker
                  label="تاريخ الاستحقاق"
                  value={invoice.due_date}
                  onChange={(date) => updateInvoice(index, "due_date", date)}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={currentTotal !== totalValue}
        sx={{ mt: 2 }}
      >
        حفظ الفواتير
      </Button>

      {currentTotal !== totalValue && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          يجب أن يكون مجموع الفواتير مساويًا للقيمة الإجمالية
        </Typography>
      )}
    </Box>
  );
};

export default InvoiceCreator;
