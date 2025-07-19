import { Typography, Box } from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const ReviewStep = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  return (
    <Box px={4} >
      <Typography variant="h5" gutterBottom>
        ملخص الاختبار{quiz.id}
      </Typography>
      <Typography variant="body1">
        
      </Typography>
      {/* Implement review content */}
    </Box>
  );
};
