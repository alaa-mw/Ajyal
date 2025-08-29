import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../styles/mainThem";
import SubjectCard from "../../subjects/subjectCard";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import { Course } from "../../../interfaces/Course";

const CurriculumList = () => {
  const { selectedCourseId } = useSelectedCourse();

  const { data: course } = useFetchDataId<Course>(
    `/course/curricula-course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: 2, width: 350 }}>
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.primary.main,
          borderRadius: "inherit",
          px: 3,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="white" fontWeight="bold">
          المنهاج المدرس
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          p: 2,
        }}
      >
        {course?.data?.curriculums?.map((curr, index) => (
          <SubjectCard key={curr.id} curr={curr} index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default CurriculumList;
