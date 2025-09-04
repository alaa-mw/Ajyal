/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useReducer } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { Student } from "../../../../interfaces/Student";
import useSendData from "../../../../hooks/useSendData";
import { useSelectedCourse } from "../../../../contexts/SelectedCourseContext";
import { useSnackbar } from "../../../../contexts/SnackbarContext";
import useFetchDataId from "../../../../hooks/useFetchDataId";
import { Invoice } from "../../../../interfaces/Invoice";
import InvoiceCard from "../../financial/InvoiceCard";
import StudentForm from "./StudentForm";
import StudentSearch from "./StudentSearch";
import { initialState, registerStudentReducer } from "./registerStudentReducer";

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
  const [state, dispatch] = useReducer(registerStudentReducer, initialState);
  const { activeStep, mode, selectedStudent, selectedInvoices, studentData } = state;

  const { mutate: registerStudentAtCourse } = useSendData(
    "/course/registerAtCourse"
  );
  const { mutate: newStudent } = useSendData<Student>("/student/add");
  const { data: invoicesData } = useFetchDataId<Invoice[]>(
    `/invoice/allInvoices/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  const handleClose = useCallback(() => {
    dispatch({ type: "RESET" });
    onClose();
  }, [onClose]);

  const handleNext = useCallback(() => {
    if (activeStep === 0) {
      if (mode === "select" && !selectedStudent) {
        showSnackbar("الرجاء اختيار طالب أولاً.", "warning");
        return;
      }
      if (mode === "add" && Object.values(studentData).some((val) => !val)) {
        showSnackbar("الرجاء إدخال جميع بيانات الطالب.", "warning");
        return;
      }
    }
    dispatch({ type: "SET_STEP", payload: activeStep + 1 });
  }, [activeStep, mode, selectedStudent, studentData, showSnackbar, dispatch]);

  const handleBack = useCallback(() => {
    dispatch({ type: "SET_STEP", payload: activeStep - 1 });
  }, [activeStep, dispatch]);

  const handleStudentSelect = useCallback((student: Student) => {
    dispatch({ type: "SET_STUDENT", payload: student });
  }, [dispatch]);

  const handleToggleMode = useCallback(() => {
    dispatch({ type: "SET_MODE", payload: mode === "select" ? "add" : "select" });
  }, [mode, dispatch]);

  const handleStudentDataChange = useCallback((data: any) => {
    dispatch({ type: "UPDATE_STUDENT_DATA", payload: data });
  }, [dispatch]);

  const handleInvoiceToggle = useCallback((invoice: Invoice) => {
    dispatch({ type: "TOGGLE_INVOICE", payload: invoice });
  }, [dispatch]);

  const addStudent = async () => {
    return new Promise<Student>((resolve, reject) => {
      newStudent(studentData, {
        onSuccess: (res) => {
          showSnackbar("تم تسجيل بيانات الطالب بنجاح", "success");
          resolve(res.data);
        },
        onError: (error) => {
          showSnackbar("خطأ ما! تأكد من صحة البيانات المدخلة", "error");
          reject(error);
        },
      });
    });
  };

  const handleConfirm = async () => {
    try {
      let studentToRegister: Student | null = null;
      if (mode === "add") {
        studentToRegister = await addStudent();
      } else {
        studentToRegister = selectedStudent;
      }

      if (!studentToRegister || selectedInvoices.length === 0) {
        showSnackbar("الرجاء اختيار طالب وفواتير.", "warning");
        return;
      }

      const formData = new FormData();
      formData.append("course_id", selectedCourseId || "");
      formData.append("student_id", studentToRegister.id || "");
      selectedInvoices.forEach((invoice, index) => {
        formData.append(`invoice[${index}]`, invoice.id);
      });

      registerStudentAtCourse(formData, {
        onSuccess: (response) => {
          showSnackbar(response.message, "success");
          handleClose();
        },
        onError: (error) => {
          showSnackbar(error.message, "error");
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const totalAmount = useMemo(
    () => selectedInvoices.reduce((sum, invoice) => sum + Number(invoice.value), 0),
    [selectedInvoices]
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">تسجيل الطالب</Typography>
          <Stepper activeStep={activeStep} sx={{ width: "60%", mt: 2 }}>
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
          <Box>
            {mode === "select" ? (
              <StudentSearch
                students={students}
                onStudentSelect={handleStudentSelect}
                selectedStudent={selectedStudent}
                onToggleMode={handleToggleMode}
              />
            ) : (
              <StudentForm
                studentData={studentData}
                onStudentDataChange={handleStudentDataChange}
                onToggleMode={handleToggleMode}
              />
            )}
          </Box>
        )}

        {activeStep === 1 && (
          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {invoicesData && invoicesData?.data?.length > 0 ? (
              invoicesData.data.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  isSelected={selectedInvoices.some((inv) => inv.id === invoice.id)}
                  isFuture={false}
                  onClick={() => handleInvoiceToggle(invoice)}
                />
              ))
            ) : (
              <Typography>لا توجد فواتير متاحة لهذا الكورس.</Typography>
            )}
            <Typography sx={{ width: "100%", mt: 2 }}>
              المبلغ الكلي: ${totalAmount}
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        {activeStep > 0 && (
          <Button onClick={handleBack} variant="outlined">
            رجوع
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={
              (mode === "select" && !selectedStudent) ||
              (mode === "add" && Object.values(studentData).some((val) => !val))
            }
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