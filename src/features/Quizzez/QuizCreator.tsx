import React, { useState } from "react";
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
import { Question, Quiz } from "../../interfaces/Quiz";
import { drawerWidth } from "../../components/ui/ResponsiveDrawer";

export const QuizCreator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [quiz, setQuiz] = useState<Quiz>({
    curriculum_id: 0,
    type: "timed",
    available: true,
    duration: 30,
    start_time: new Date().toISOString().slice(0, 16),
    end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
    questions: [
      {
        parent_question_id: null,
        mark: 1,
        question_text: "",
        choices: [
          { choice_text: "", is_correct: false },
          { choice_text: "", is_correct: false },
        ],
        children: [],
        expanded: true,
      },
    ],
  });

  // تبديل توسيع/طي السؤال
  const toggleExpand = (qPath: number[]) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      let currentLevel = updatedQuestions;

      for (let i = 0; i < qPath.length - 1; i++) {
        const idx = qPath[i];
        if (currentLevel[idx].children) {
          currentLevel = currentLevel[idx].children!;
        }
      }

      const lastIdx = qPath[qPath.length - 1];
      currentLevel[lastIdx].expanded = !currentLevel[lastIdx].expanded;

      return { ...prev, questions: updatedQuestions };
    });
  };

  // إضافة سؤال جديد
  const addQuestion = (parentPath: number[] | null) => {
    setQuiz((prev) => {
      const newQuestion: Question = {
        parent_question_id: null,
        mark: 1,
        question_text: "",
        choices: [
          { choice_text: "", is_correct: false },
          { choice_text: "", is_correct: false },
        ],
        children: [],
        expanded: true,
      };

      if (!parentPath) {
        return {
          ...prev,
          questions: [...prev.questions, newQuestion],
        };
      }

      const updatedQuestions = [...prev.questions];
      let currentLevel = updatedQuestions;

      for (let i = 0; i < parentPath.length; i++) {
        const idx = parentPath[i];
        if (!currentLevel[idx].children) {
          currentLevel[idx].children = [];
        }
        currentLevel = currentLevel[idx].children!;
      }

      currentLevel.push(newQuestion);
      return { ...prev, questions: updatedQuestions };
    });
  };

  // حذف سؤال
  const removeQuestion = (qPath: number[]) => {
    setQuiz((prev) => {
      if (qPath.length === 1) {
        return {
          ...prev,
          questions: prev.questions.filter((_, i) => i !== qPath[0]),
        };
      }

      const updatedQuestions = [...prev.questions];
      let currentLevel = updatedQuestions;

      for (let i = 0; i < qPath.length - 1; i++) {
        const idx = qPath[i];
        currentLevel = currentLevel[idx].children!;
      }

      const lastIdx = qPath[qPath.length - 1];
      currentLevel.splice(lastIdx, 1);

      return { ...prev, questions: updatedQuestions };
    });
  };

  // معالجة تغييرات السؤال
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuestionChange = (qPath: number[], field: string, value: any) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      let currentLevel = updatedQuestions;

      for (let i = 0; i < qPath.length - 1; i++) {
        const idx = qPath[i];
        currentLevel = currentLevel[idx].children!;
      }

      const lastIdx = qPath[qPath.length - 1];
      currentLevel[lastIdx] = { ...currentLevel[lastIdx], [field]: value };

      return { ...prev, questions: updatedQuestions };
    });
  };

  // معالجة تغييرات الخيارات
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChoiceChange = (
    qPath: number[],
    cIndex: number,
    field: string,
    value: any
  ) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      let currentLevel = updatedQuestions;

      for (let i = 0; i < qPath.length - 1; i++) {
        const idx = qPath[i];
        currentLevel = currentLevel[idx].children!;
      }

      const lastIdx = qPath[qPath.length - 1];
      const updatedChoices = [...currentLevel[lastIdx].choices];
      updatedChoices[cIndex] = { ...updatedChoices[cIndex], [field]: value };
      currentLevel[lastIdx].choices = updatedChoices;

      return { ...prev, questions: updatedQuestions };
    });
  };

  // إضافة خيار للسؤال
  const addChoice = (qPath: number[]) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      let currentLevel = updatedQuestions;

      for (let i = 0; i < qPath.length - 1; i++) {
        const idx = qPath[i];
        currentLevel = currentLevel[idx].children!;
      }

      const lastIdx = qPath[qPath.length - 1];
      currentLevel[lastIdx].choices.push({
        choice_text: "",
        is_correct: false,
      });

      return { ...prev, questions: updatedQuestions };
    });
  };

  // حذف خيار من السؤال
  const removeChoice = (qPath: number[], cIndex: number) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      let currentLevel = updatedQuestions;

      for (let i = 0; i < qPath.length - 1; i++) {
        const idx = qPath[i];
        currentLevel = currentLevel[idx].children!;
      }

      const lastIdx = qPath[qPath.length - 1];
      currentLevel[lastIdx].choices = currentLevel[lastIdx].choices.filter(
        (_, i) => i !== cIndex
      );

      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleQuizChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (!name) return;

    setQuiz((prev) => ({
      ...prev,
      [name]:
        typeof value === "string" && name === "curriculum_id"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const steps = ["معلومات الاختبار", "الأسئلة والإجابات", "مراجعة"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
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
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepIcon-root": {
                    marginLeft: 1,
                    marginRight: 0,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <QuizInfoStep quiz={quiz} onQuizChange={handleQuizChange} />
        )}

        {activeStep === 1 && (
          <QuestionsStep
            quiz={quiz}
            onAddQuestion={addQuestion}
            onRemoveQuestion={removeQuestion}
            onQuestionChange={handleQuestionChange}
            onChoiceChange={handleChoiceChange}
            onAddChoice={addChoice}
            onRemoveChoice={removeChoice}
            onToggleExpand={toggleExpand}
          />
        )}

        {activeStep === 2 && <ReviewStep quiz={quiz} />}
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
          bgcolor: "background.paper",
          p: 2,
          boxShadow: 3,
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
