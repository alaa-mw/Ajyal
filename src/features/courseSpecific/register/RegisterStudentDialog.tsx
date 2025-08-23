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
  Divider,
} from "@mui/material";
import { QrCodeScanner, Search as SearchIcon } from "@mui/icons-material";
import { Student } from "../../../interfaces/Student";
import useSendData from "../../../hooks/useSendData";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface RegisterStudentDialogProps {
  open: boolean;
  onClose: () => void;
  students: Student[];
}

const steps = ["اختيار الطالب", "إدخال المبلغ", "التأكيد"];

const RegisterStudentDialog: React.FC<RegisterStudentDialogProps> = ({
  open,
  onClose,
  students,
}) => {
  const { selectedCourseId } = useSelectedCourse();
  const { showSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate: registerStudentAtCourse } = useSendData(
    "/course/registerAtCourse"
  );

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleConfirm = () => {
    if (selectedStudent && paymentAmount) {
      registerStudentAtCourse(
        {
          course_id: selectedCourseId,
          student_id: selectedStudent.id,
          payment: paymentAmount,
        },
        {
          onSuccess: (response) => {
            console.log(response.data);
            showSnackbar(response.message, "success");
          },
          onError: (error) => {
            showSnackbar(error.message, "error");
          },
        }
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setSelectedStudent(null);
    setPaymentAmount("");
    setSearchTerm("");
    onClose();
  };

  const filteredStudents = students.filter((student) =>
    `${student.first_name} ${student.father_name} ${student.last_name} ${student.id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
          <Typography variant="h6">تسجيل دفعة للطالب</Typography>
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              الطالب المحدد: {selectedStudent.first_name}{" "}
              {selectedStudent.father_name} {selectedStudent.last_name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TextField
              label="مبلغ الدفعة"
              variant="outlined"
              fullWidth
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              InputProps={{
                endAdornment: <Typography sx={{ ml: 1 }}>ل.س</Typography>,
              }}
            />
          </Box>
        )}

        {activeStep === 2 && selectedStudent && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              تأكيد تسجيل الدفعة
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>
              <strong>الطالب:</strong> {selectedStudent.first_name}{" "}
              {selectedStudent.father_name} {selectedStudent.last_name}
            </Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>المبلغ:</strong> {paymentAmount} ل.س
            </Typography>
          </Box>
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
            disabled={!paymentAmount}
          >
            تأكيد
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RegisterStudentDialog;
