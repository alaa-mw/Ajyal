import { useEffect, useState } from "react";
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
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../../styles/mainThem";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import useSendData from "../../../hooks/useSendData";
import { setQuizData, updateQuizField } from "../Redux/quizSlice";
import { Quiz } from "../../../interfaces/Quiz";
import { useQuizStateManager } from "./QuizStateManager";

interface QuizCreatorProps {
  mode: "create" | "edit"; // Explicit mode prop
}

export const QuizCreator = ({ mode = "create" }: QuizCreatorProps) => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz);
  const { error, isLoading } = useQuizStateManager();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["معلومات الاختبار", "الأسئلة والإجابات", "مراجعة"];

  const { mutate: createQuiz } = useSendData<Quiz>("/quiz/create");
  const { mutate: updateQuiz } = useSendData<Quiz>("/quiz/update");

  useEffect(() => {
    dispatch(
      updateQuizField({
        field: "mode",
        value: mode,
      })
    );
  }, [mode]);

  const prepareQuizData = () => ({
    quiz_id: quiz.id,
    curriculum_id: quiz.curriculum_id,
    topic_id: quiz.topic_id,
    name: quiz.name,
    type: quiz.type,
    available: quiz.available,
    duration: quiz.duration,
    start_time: quiz.start_time,
  });

  const handleStepChange = () => {
    if (activeStep === 1) {
      if (quiz.isChange && quiz.mode == "create") {
        createQuiz(prepareQuizData(), {
          onSuccess: (response) => {
            console.log(response.data)
            showSnackbar(response.message, "success");
            dispatch(
              setQuizData({
                ...response.data,
                isChange: false,
              })
            );
          },
          onError: (error) => {
            showSnackbar(error.message, "error");
          },
        });
      } else if (quiz.isChange && quiz.mode == "edit") {
        updateQuiz(prepareQuizData(), {
          onSuccess: (response) => {
            showSnackbar(response.message, "success");
            dispatch(
              setQuizData({
                ...response.data,
                isChange: false,
              })
            );
          },
          onError: (error) => {
            showSnackbar(error.message, "error");
          },
        });
      }
    }
  };

  useEffect(() => {
    handleStepChange();
  }, [activeStep]);

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

        {activeStep === 0 && <QuizInfoStep />}
        {activeStep === 1 && <QuestionsStep />}
        {activeStep === 2 && <ReviewStep />}
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
              onClick={() => setActiveStep((prev) => prev - 1)}
            >
              السابق
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  console.log("Submitting quiz:", quiz);
                } else {
                  setActiveStep((prev) => prev + 1);
                }
              }}
            >
              {activeStep === steps.length - 1 ? "إنشاء الاختبار" : "التالي"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default QuizCreator;
