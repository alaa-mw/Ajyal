import { Box, IconButton, Paper, Typography } from "@mui/material";
import Group from "@mui/icons-material/Group";
import theme from "../../styles/mainThem";
import { NoteAdd } from "@mui/icons-material";
import useSendData from "../../hooks/useSendData";
import { useRef, useState } from "react";
import { useSnackbar } from "../../contexts/SnackbarContext";

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

const SubjectCard = ({ index = 0, curriculum_id ="1" }) => { // fix curriculum_id
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSnackbar } = useSnackbar();
  const { mutate: storeFile } = useSendData("/course/store-file");

  const handleUpload = (event) => { 
    const file = event.target.files[0];
    if(!file) return;

    // إنشاء كائن FormData جديد
    const formData = new FormData();
    formData.append('curriculum_id', curriculum_id); //fix
    formData.append('title', file.name.split('.').slice(0, -1).join('.'));
    formData.append('file', file);

    // استخدام formData مباشرة في storeFile
    storeFile(formData, {
      onSuccess: (response) => showSnackbar(response.message, "success"),
      onError: (error) => showSnackbar(error.message, "error"),
    });
  };
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpload}
            accept="*/*"
          />

          <IconButton
            sx={{
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <NoteAdd />
          </IconButton>
        </Box>
        <Box>
          <Box display={"flex"}>
            <Group />
            <Typography variant="subtitle1" mx={1}>
              المدرسين:
            </Typography>
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
