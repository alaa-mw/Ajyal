import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Button,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import theme from "../../../styles/mainThem";
import { QuizResult } from "../../../interfaces/Course";
import { useState } from "react";
import useFetchDataId from "../../../hooks/useFetchDataId";
import StudentResultsList from "./StudentResultsList";
import { Quiz } from "../../../interfaces/Quiz";

interface QuizCardProps {
  quiz: QuizResult;
  successRate: number;
  status: string;
}

const QuizCard = ({ quiz, successRate, status }: QuizCardProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: studentResult } = useFetchDataId<Quiz>(
    `/quiz/get-quiz-result/${quiz.id}`,
    quiz.id
  );

  const isLocked = status === "مغلق";
  const hasResults = successRate > 0;

  const splitDateTime = (dateTime: string) => {
    const [date, time] = dateTime.split(" ");
    return {
      date: date.split("-").reverse().join("-"), // 23-08-2025
      time: time, // 02:54:43
    };
  };
  return (
    <Box
      display={"flex"}
      gap={4}
      sx={{
        p: 1,
        borderRadius: 2,
        backgroundColor: "white",
        borderRight: `7px solid ${theme.palette.primary.main}`,
        bgcolor: alpha(theme.palette.tertiary.main, 0.1),
        boxShadow: 1,
        "&:hover": {
          boxShadow: 3,
          transition: "all 0.6s ease",
        },
      }}
    >
      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="subtitle1">{quiz.name}</Typography>
        <Typography variant="caption" color="gray">
          اختبار
        </Typography>
      </Stack>

      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="subtitle2">
          {quiz.type === "Timed" ? "محدد بوقت" : "غير محدد بوقت"}
        </Typography>
      </Stack>

      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <Typography
          variant="body2"
          color={isLocked ? "gray" : "green"}
          sx={{ whiteSpace: "pre-line" }}
        >
          {`${splitDateTime(quiz.start_time).date}\n${
            splitDateTime(quiz.start_time).time
          }`}
        </Typography>
      </Stack>

      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        {hasResults ? (
          <CircularProgressWithLabel value={successRate} />
        ) : (
          <Typography variant="caption" color="gray">
            لا توجد نتائج
          </Typography>
        )}
      </Stack>

      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setDrawerOpen(true)}
          disabled={!hasResults} // Disable if no results
          sx={{
            minWidth: 100,
            fontSize: "0.75rem",
            py: 0.5,
            borderRadius: 1,
            "&:disabled": {
              backgroundColor: "grey.300",
              color: "grey.500",
            },
          }}
        >
          فتح النتيجة
        </Button>
      </Stack>
      <StudentResultsList
        totalResult={studentResult?.data?.max_degree}
        students={studentResult?.data.student_quizzes}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Box>
  );
};

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default QuizCard;
