import { Box, Divider, Typography } from "@mui/material";
import EntityToolbar from "../../components/ui/EntityToolbar";
import QuizTabs from "../Quizzez/QuizTabs";

const courseScientificContentPage = () => {
  return (
     <>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: "bold",
        }}
      >
        المحتوى العلمي
      </Typography>
    <QuizTabs/>
    </>
  )
}

export default courseScientificContentPage