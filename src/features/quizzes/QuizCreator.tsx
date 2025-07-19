/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { QuestionsStep } from "../quizzes/QuestionsStep";
import { ReviewStep } from "./ReviewStep";
import { drawerWidth } from "../../components/layout/ResponsiveDrawer";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import theme from "../../styles/mainThem";

export const QuizCreator = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["معلومات الاختبار", "الأسئلة والإجابات", "مراجعة"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 0.5, md: 3 },
          flex: 1,
          mb: 8, // Make space for the fixed buttons
          overflow: "auto", // Allow scrolling
        }}
      >
        <Typography variant="h5" gutterBottom>
          إنشاء اختبار{" "}
        </Typography>

        <Stepper
          activeStep={activeStep}
          sx={{ mb: 3, width: "70%", mx: "auto" }} // Center the stepper
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root": {
                    marginLeft: 1,
                    marginRight: 0,
                  },
                  // Only show active step label on mobile
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

      {/* Fixed button container */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: {
            xs: 0,
            s: 0,
            sm: drawerWidth,
          },
          borderTop:`1px solid ${theme.palette.primary.main}`,
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
