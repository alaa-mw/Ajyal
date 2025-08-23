import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../styles/mainThem";
import SubjectCard from "../../subjects/subjectCard";

const CurriculumList = () => {


  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: 2 ,width:350}}>
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
          p:2
        }}
      >
        {[...Array(8)].map((_, index) => (
          <SubjectCard index={index} />
        ))}
      </Box>
    </Box>
  );
};

export default CurriculumList;
