import { Box, Paper,  Typography } from "@mui/material";
import React from "react";
import Group from "@mui/icons-material/Group";
import theme from "../../styles/mainThem";

const colors = [
  theme.palette.tertiary.main,
  theme.palette.primary.main,
  theme.palette.secondary.main,
];

const subjects = [
  {
    name: "Mathematics",
    teachers: ["Ahmed Ali", "Fatima Mohammed", "Omar Hassan"],
  },
  {
    name: "Science",
    teachers: ["Yousef Ibrahim", "Layla Abdullah"],
  },
  {
    name: "Arabic Language",
    teachers: [
      "Khalid Mahmoud",
      "Aisha Omar",
      "Mohammed Nasser",
      "Samira Ahmed",
    ],
  },
  {
    name: "English Language",
    teachers: ["Sarah Johnson", "David Smith"],
  },
  {
    name: "History",
    teachers: ["Noor Khalid", "Abdulrahman Saleh"],
  },
];

const SubjectCard = ({index = 0}) => {
  return (
    <>
      <Paper
        key={index}
        elevation={3}
        sx={{
          minWidth: 250,
          p: 2,
          borderRadius: 2,
          bgcolor: "background.paper",
          borderRight: `7px solid ${colors[index % colors.length]}`, 
          "&:hover": {
            boxShadow: 6,
            transform: "translateY(-2px)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 0.5,
            color: "primary.main",
            fontWeight: "bold",
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 0.5,
          }}
        >
          اللغة العربية
        </Typography>

        <Box>
          <Box display={"flex"}>
            <Group />
            <Typography variant="subtitle1" mx={1}>المدرسين:</Typography>
          </Box>
          {subjects[0].teachers.map((teacher, teacherIndex) => (
            <Typography key={teacherIndex} component="li" variant="body1">
              {teacher}
            </Typography>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default SubjectCard;
