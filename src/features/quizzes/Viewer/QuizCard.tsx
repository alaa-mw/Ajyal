import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Quiz } from "../../../interfaces/Quiz";
import { EditNote } from "@mui/icons-material";

interface QuizCardProps {
  quiz: Quiz;
  onClick: (id: string) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onClick }) => {
  return (
    <Card
      elevation={3}
      sx={{
        opacity: quiz.available ? 1 : 0.7,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        direction: "rtl", // RTL layout for Arabic
      }}
    >
      <CardActionArea
        onClick={() => onClick(quiz.id)}
        sx={{ flexGrow: 1 }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h6" component="h3">
              {quiz.name}
            </Typography>
            <Chip
              label={quiz.type === "Timed" ? "محدد بوقت" : "ورقة عمل"}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <AccessTimeIcon fontSize="small" sx={{ ml: 1 }} />
            <Typography variant="body2">{quiz.duration} دقيقة</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EventIcon fontSize="small" sx={{ ml: 1 }} />
            <Typography variant="body2">
              {new Date(quiz.start_time).toLocaleDateString("ar-EG")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Chip
              sx={{ px: 1 }}
              icon={quiz.available ? <CheckCircleIcon /> : <EditNote />}
              label={quiz.available ? "متاح" : "مسودة"}
              color={quiz.available ? "success" : "default"}
              size="small"
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuizCard;
