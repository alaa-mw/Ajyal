import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Box,
  Typography,
  Divider,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNote from "@mui/icons-material/EditNote"; // Corrected import
import { Quiz } from "../../../interfaces/Quiz";
import { formattedDate } from "../../../utils/formatedDate";
import theme from "../../../styles/mainThem";
import StudentResultsList from "../../courseSpecific/content/StudentResultsList";
import useFetchDataId from "../../../hooks/useFetchDataId";

interface QuizCardProps {
  quiz: Quiz;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick, onDelete }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: studentResult } = useFetchDataId<Quiz>(
    `/quiz/get-quiz-result/${quiz.id}`,
    quiz.id
  );
  return (
    <>
      <Card
        elevation={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          direction: "rtl",
          borderRadius: 4, // Softer corners
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: `0 8px 20px -5px ${alpha(
              theme.palette.primary.dark,
              0.2
            )}`,
          },
          // A subtle gradient background for a modern look
          background: `linear-gradient(145deg, ${alpha(
            theme.palette.primary.light,
            0.1
          )}, #ffffff 60%)`,
        }}
      >
        <CardActionArea
          onClick={() => onClick(quiz.id)}
          sx={{ flexGrow: 1, p: 2 }} // Added more padding
        >
          <CardContent sx={{ p: 1 }}>
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" component="h3" fontWeight="bold">
                {quiz.name}
              </Typography>
              <Chip
                label={quiz.type === "Timed" ? "محدد بوقت" : "ورقة عمل"}
                size="small"
                color="primary"
              />
            </Box>

            {/* Meta Info */}
            <Box
              sx={{ display: "flex", gap: 3, mt: 2, color: "text.secondary" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon fontSize="small" sx={{ ml: 1 }} />
                <Typography variant="body2">{quiz.duration} دقيقة</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EventIcon fontSize="small" sx={{ ml: 1 }} />
                <Typography variant="body2">
                  {formattedDate(quiz.start_time)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>

        <Divider sx={{ mx: 2 }} />

        {/* Actions Footer */}
        <CardActions sx={{ justifyContent: "space-between", p: 1.5 }}>
          <Chip
            sx={{ px: 1, fontWeight: 500 }}
            icon={quiz.available ? <CheckCircleIcon /> : <EditNote />}
            label={quiz.available ? "متاح" : "مسودة"}
            color={quiz.available ? "success" : "default"}
            size="small"
            variant={quiz.available ? "filled" : "outlined"}
          />

          {/* Delete button only shows for drafts */}
          {!quiz.available && (
            <IconButton
              aria-label="delete"
              onClick={() => onDelete(quiz.id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          )}
          {quiz.available_to_watch && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setDrawerOpen(true)}
              sx={{
                minWidth: 100,
                fontSize: "0.75rem",
                py: 0.5,
                borderRadius: 2,
                "&:disabled": {
                  backgroundColor: "grey.300",
                  color: "grey.500",
                },
              }}
            >
              فتح النتيجة
            </Button>
          )}
        </CardActions>
      </Card>
      <StudentResultsList
        totalResult={studentResult?.data?.max_degree}
        students={studentResult?.data.student_quizzes}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

export default QuizCard;
