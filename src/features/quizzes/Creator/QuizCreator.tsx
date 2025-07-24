import { useEffect, useRef, useState } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { QuizInfoStep } from "./QuizInfoStep";
import { QuestionsStep } from "./QuestionsStep";
import { ReviewStep } from "./ReviewStep";
import { drawerWidth } from "../../../components/layout/ResponsiveDrawer";
import { useDispatch } from "react-redux";
import theme from "../../../styles/mainThem";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { updateQuizMode } from "../Redux/quizSlice";
import { useQuizStateManager } from "./QuizStateManager";
import { useNavigate } from "react-router-dom";

interface QuizCreatorProps {
  mode: "create" | "edit"; // Explicit mode prop
}

export const QuizCreator = ({ mode = "create" }: QuizCreatorProps) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading } = useQuizStateManager();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["معلومات الاختبار", "الأسئلة والإجابات", "مراجعة"];

  // إنشاء ref للوصول إلى المكون الابن
  const quizStepRef = useRef<{
    saveQuiz: () => Promise<void>;
  }>();

  const questionsStepRef = useRef<{
    saveLastQuestion: () => Promise<void>;
  }>();

  const reviewStepRef = useRef<{
    done: () => Promise<void>;
  }>();

  useEffect(() => {
    dispatch(updateQuizMode({ value: mode }));
  }, [mode]);

  const handleStepCount = async (direction: "next" | "prev") => {
    if (activeStep === 0 && quizStepRef.current) {
      console.log("quizRef");
      await quizStepRef.current?.saveQuiz();
    } else if (activeStep === 1 && questionsStepRef.current) {
      await questionsStepRef.current?.saveLastQuestion();
    } else if (activeStep === 2 && reviewStepRef.current) {
      await reviewStepRef.current.done();
    }

    setActiveStep((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };
  const handleDraftSave = () => {
    showSnackbar("تم حفظ الاختبار كمسودة", "success");
    navigate("/teacher/quizzes")
  };
  if (error) {
    showSnackbar("حدث خطأ أثناء جلب بيانات الاختبار", "error");
    return <div>حدث خطأ أثناء جلب بيانات الاختبار</div>;
  }

  if (isLoading) {
    return <div>جاري تحميل بيانات الاختبار...</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
      <Paper
        elevation={3}
        sx={{ p: { xs: 0.5, md: 3 }, flex: 1, mb: 8, overflow: "auto" }}
      >
        <Typography variant="h5" gutterBottom>
          إنشاء اختبار
        </Typography>

        <Stepper
          activeStep={activeStep}
          sx={{ mb: 3, width: "70%", mx: "auto" }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root": { marginLeft: 1, marginRight: 0 },
                  "@media (max-width: 600px)": {
                    display: index === activeStep ? "block" : "none",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && <QuizInfoStep ref={quizStepRef} />}
        {activeStep === 1 && <QuestionsStep ref={questionsStepRef} />}
        {activeStep === 2 && <ReviewStep ref={reviewStepRef} />}
      </Paper>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: { xs: 0, s: 0, sm: drawerWidth },
          borderTop: `1px solid ${theme.palette.primary.main}`,
          bgcolor: theme.palette.background.default,
          p: 1,
          boxShadow: 5,
          zIndex: 1200,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={() => handleStepCount("prev")}
            >
              السابق
            </Button>
            <Box display={"flex"} gap={2}>
              <Button
                variant="contained"
                onClick={() => handleStepCount("next")}
              >
                {activeStep === steps.length - 1 ? "إنشاء الاختبار" : "التالي"}
              </Button>
              {activeStep === 2 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleDraftSave}
                >
                  حفظ كمسودة
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default QuizCreator;
