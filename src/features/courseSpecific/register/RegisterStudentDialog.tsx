import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
  Typography,
} from "@mui/material";
import { QrCodeScanner, Search as SearchIcon } from "@mui/icons-material";
import { Student } from "../../../interfaces/Student";
import useSendData from "../../../hooks/useSendData";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { Invoice } from "../../../interfaces/Invoice";
import InvoiceCard from "../financial/InvoiceCard";

interface RegisterStudentDialogProps {
  open: boolean;
  onClose: () => void;
  students: Student[];
}

const steps = ["اختيار الطالب", "تحديد المدفوعات"];

const RegisterStudentDialog: React.FC<RegisterStudentDialogProps> = ({
  open,
  onClose,
  students,
}) => {
  const { selectedCourseId } = useSelectedCourse();
  const { showSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]); // changed!!
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate: registerStudentAtCourse } = useSendData(
    "/course/registerAtCourse"
  );

  const { data: invoices } = useFetchDataId<Invoice[]>(
    `/invoice/allInvoices/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleInvoiceSelect = (invoice: Invoice) => {
    setSelectedInvoices((prev) =>
      prev.some((inv) => inv.id === invoice.id)
        ? prev.filter((i) => i.id !== invoice.id)
        : [...prev, invoice]
    );
  };

  const handleConfirm = () => {
    const formData = new FormData();
    formData.append("course_id", selectedCourseId || "-1");
    formData.append("student_id", selectedStudent?.id || "-1");

    selectedInvoices.forEach((invoice, index) => {
      formData.append(`invoice[${index}]`, invoice.id);
    });

    if (selectedStudent && selectedInvoices.length > 0) {
      registerStudentAtCourse(formData, {
        onSuccess: (response) => {
          console.log(response.data);
          showSnackbar(response.message, "success");
        },
        onError: (error) => {
          showSnackbar(error.message, "error");
        },
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedStudent(null);
    setSelectedInvoices([]);
    setSearchTerm("");
    onClose();
  };

  const filteredStudents = students.filter((student) =>
    `${student.first_name} ${student.father_name} ${student.last_name} ${student.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Calculate total amount
  const totalAmount = selectedInvoices.reduce(
    (sum, invoice) => sum + Number(invoice.value),
    0
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">تسجيل الطالب</Typography>
          <Stepper activeStep={activeStep} sx={{ width: "60%" }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </DialogTitle>

      <DialogContent>
        {activeStep === 0 && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<QrCodeScanner />}
                // onClick={() => setOpenScanner(true)}
              >
                مسح QR Code
              </Button>
            </Box>
            <Autocomplete
              options={filteredStudents}
              getOptionLabel={(option) =>
                `${option.first_name} ${option.father_name} ${option.last_name} (${option.id})`
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ابحث عن الطالب"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <SearchIcon sx={{ ml: 1 }} />,
                  }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
              value={selectedStudent}
              onChange={(_, newValue) => setSelectedStudent(newValue)}
              noOptionsText="لا يوجد طلاب مطابقين"
            />
          </Box>
        )}

        {activeStep === 1 && selectedStudent && (
          <>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              {invoices?.data.map((invoice) => {
                const isSelected = selectedInvoices.some(
                  (inv) => inv.id === invoice.id
                );
                return (
                  <InvoiceCard
                    key={invoice.id}
                    invoice={invoice}
                    isSelected={isSelected}
                    isFuture={false}
                    onClick={() => handleInvoiceSelect(invoice)}
                  />
                );
              })}
            </Box>
            <Typography>
              المبلغ الكلي:
              ${totalAmount}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} variant="outlined">
            رجوع
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={!selectedStudent}
          >
            التالي
          </Button>
        ) : (
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
            disabled={selectedInvoices.length === 0}
          >
            تأكيد
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RegisterStudentDialog;
