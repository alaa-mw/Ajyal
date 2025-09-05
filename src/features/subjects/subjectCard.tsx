import { alpha, Box, IconButton, Paper, Typography } from "@mui/material";
import Group from "@mui/icons-material/Group";
import theme from "../../styles/mainThem";
import { NoteAdd } from "@mui/icons-material";
import useSendData from "../../hooks/useSendData";
import { useRef } from "react";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Curriculum } from "../../interfaces/Curriculum";

const colors = [
  theme.palette.tertiary.main,
  theme.palette.primary.main,
  theme.palette.secondary.main,
];

const SubjectCard = ({
  index = 0,
  curr,
}: {
  index?: number;
  curr: Curriculum;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSnackbar } = useSnackbar();
  const { mutate: storeFile } = useSendData("/course/store-file");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // إنشاء كائن FormData جديد
    const formData = new FormData();
    formData.append("curriculum_id", curr.id); 
    formData.append("title", file.name.split(".").slice(0, -1).join("."));
    formData.append("file", file);

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
          minHeight:180,
          p: 2,
          borderRadius: 2,
          bgcolor: alpha(colors[index % colors.length],0.08) ,//"background.paper",
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
            {curr.subject?.name || "Unknown Subject"}
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

          {curr.teachers?.map((teacher) => (
            <Typography key={teacher.id} component="li" variant="body1">
              {teacher.name}
            </Typography>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default SubjectCard;
