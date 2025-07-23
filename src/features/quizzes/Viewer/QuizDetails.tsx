import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Container,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Slide,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { Quiz } from "../../../interfaces/Quiz";
import QuestionCard from "./QuestionCard";
import { drawerWidth } from "../../../components/layout/ResponsiveDrawer";
import theme from "../../../styles/mainThem";

const QuizDetailsViewer = () => {
  const { quizId } = useParams();
  const [viewMode, setViewMode] = useState<"slider" | "scroll">("slider");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const { data: response } = useFetchDataId<Quiz>(
    `/quiz/all_questions/${quizId}`,
    quizId
  );

  const quiz = response?.data;

  const handleNextQuestion = () => {
    if (
      quiz &&
      currentQuestionIndex < quiz.questions.length - 1 &&
      !isAnimating
    ) {
      setSlideDirection("right");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsAnimating(false);
      }, 300); // Match this with transition duration
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0 && !isAnimating) {
      setSlideDirection("left");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsAnimating(false);
      }, 300); // Match this with transition duration
    }
  };

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newViewMode: "slider" | "scroll"
  ) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  if (!quiz) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>جاري تحميل تفاصيل الاختبار...</Typography>
      </Container>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" component="h5" gutterBottom>
              {quiz.name}
            </Typography>

            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewModeChange}
              aria-label="view mode"
              size="small"
              sx={{
                mb: 0.5,
                "&.MuiToggleButtonGroup-root": {
                  flexDirection: "row-reverse", // Reverse button order for RTL
                },
              }}
            >
              <ToggleButton value="slider" aria-label="slider view">
                <ViewCarouselIcon />
              </ToggleButton>
              <ToggleButton value="scroll" aria-label="scroll view">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body1" color="text.secondary">
              <strong>المدة:</strong> {quiz.duration} دقائق
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>النوع:</strong>{" "}
              {quiz.type === "Timed" ? "محدد بوقت" : "عادي"}
            </Typography>
          </Box>

          {viewMode === "slider" && (
            <LinearProgress
              variant="determinate"
              value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption">
              {viewMode === "slider"
                ? `سؤال ${currentQuestionIndex + 1} من ${quiz.questions.length}`
                : `عدد الأسئلة: ${quiz.questions.length}`}
            </Typography>
            {viewMode === "slider" && (
              <Typography variant="caption">
                {currentQuestion.mark} نقاط
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {viewMode === "slider" ? (
        <>
          <Box sx={{ position: "relative", minHeight: 300 }}>
            <Slide
              key={currentQuestionIndex}
              direction={slideDirection}
              in={!isAnimating}
              mountOnEnter
              unmountOnExit
              timeout={300}
            >
              <div>
                <QuestionCard
                  question={currentQuestion}
                  index={currentQuestionIndex}
                />
              </div>
            </Slide>
          </Box>
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
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0 || isAnimating}
                  startIcon={<ArrowForwardIcon sx={{ ml: 1 }} />}
                  variant="outlined"
                  sx={{ minWidth: 120 }}
                >
                  السابق
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={
                    currentQuestionIndex >= quiz.questions.length - 1 ||
                    isAnimating
                  }
                  endIcon={<ArrowBackIcon sx={{ mr: 1 }} />}
                  variant="contained"
                  sx={{ minWidth: 120 }}
                >
                  التالي
                </Button>
              </Box>
            </Container>
          </Box>
        </>
      ) : (
        <>
          {quiz.questions.map((question, index) => (
            <React.Fragment key={question.id}>
              <QuestionCard question={question} index={index} />
              {index < quiz.questions.length - 1 && <Divider sx={{ my: 3 }} />}
            </React.Fragment>
          ))}
        </>
      )}
    </Container>
  );
};

export default QuizDetailsViewer;
