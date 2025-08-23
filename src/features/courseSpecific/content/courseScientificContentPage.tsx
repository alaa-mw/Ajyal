import { Box, Stack, Typography } from "@mui/material";
import QuizTabs from "./QuizTabs";
import CurriculumList from "./CurriculumList";
import SharedFiles from "./SharedFiles";

const courseScientificContentPage = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
      >
        المحتوى العلمي
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
          gap: 4,
        }}
      >
        <Stack
          gap={3}
          sx={{
            width: { xs: "100%", sm: "100%", md: "100%", lg: "70%" },
          }}
        >
          <QuizTabs />
          <SharedFiles />
        </Stack>
        <CurriculumList />
      </Box>
    </>
  );
};

export default courseScientificContentPage;
