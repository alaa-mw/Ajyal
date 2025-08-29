import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  IconButton,
  LinearProgress,
  Grid,
} from "@mui/material";
import { CloudUpload, Save, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useSendData from "../../../hooks/useSendData";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import { Course } from "../../../interfaces/Course";
import { RTLDatePicker } from "../../../components/common/RTLDatePicker";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface PaperDialogProps {
  open: boolean;
  onClose: () => void;
}

const PaperExamDialog = ({ open, onClose }: PaperDialogProps) => {
  const [formData, setFormData] = useState({
    curriculum_id: "",
    title: "",
    description: "",
    exam_date: "",
    max_degree: "",
    file: null,
  });
  const { showSnackbar } = useSnackbar();
  const { selectedCourseId } = useSelectedCourse();
  const { mutate: storeExamResult } = useSendData(`/course/store-paperExam`);

  const { data: course, isLoading } = useFetchDataId<Course>(
    `/course/curricula-course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    storeExamResult(formData, {
      onSuccess: (response) => {
        showSnackbar(response.message, "success");
        onClose();
      },
      onError: (error) => {
        showSnackbar(error.message, "error");
      },
    });
    // const submitData = new FormData();
    // submitData.append('curriculum_id', formData.curriculum_id);
    // submitData.append('title', formData.title);
    // submitData.append('description', formData.description);
    // submitData.append('exam_date', formData.exam_date);
    // submitData.append('max_degree', formData.max_degree);

    // if (formData.file) {
    //   submitData.append('file', formData.file);
    // }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="h5" component="span">
          رفع علامة امتحان ورقي
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "white",
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2, // Reduced gap
            mt: 1,
          }}
        >
          {/* Curriculum */}
          <FormControl fullWidth>
            <InputLabel id="curriculum-label">المادة الدراسية</InputLabel>
            <Select
              labelId="curriculum-label"
              name="curriculum_id"
              value={formData.curriculum_id}
              onChange={handleInputChange}
              label="المادة الدراسية"
              required
            >
              {isLoading ? (
                <MenuItem disabled>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                  </Box>
                </MenuItem>
              ) : (
                course?.data.curriculums?.map((curr) => (
                  <MenuItem key={curr.subject.id} value={curr.subject.id}>
                    {curr.subject.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Title and Description */}
          <Grid container spacing={2}>
            <Grid sx={{ width: "48%" }}>
              <TextField
                name="title"
                label="عنوان الامتحان"
                value={formData.title}
                onChange={handleInputChange}
                required
                fullWidth
              />
            </Grid>
            <Grid sx={{ width: "48%" }}>
              <TextField
                name="description"
                label="وصف الامتحان"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                fullWidth
                minRows={1}
              />
            </Grid>
          </Grid>

          {/* Exam Date and Max Degree */}
          <Grid container spacing={2}>
            <Grid sx={{ width: "48%" }}>
              <RTLDatePicker
                value={formData.exam_date}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, exam_date: date }))
                }
                label="تاريخ الامتحان"
              />
            </Grid>
            <Grid sx={{ width: "48%" }}>
              <TextField
                name="max_degree"
                label="الدرجة الكاملة"
                type="number"
                value={formData.max_degree}
                onChange={handleInputChange}
                inputProps={{ min: 0 }}
                required
                fullWidth
              />
            </Grid>
          </Grid>

          {/* File Upload */}
          <Box>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload sx={{ ml: 2 }} />}
              sx={{ py: 1.5 }}
              fullWidth
            >
              رفع ملف الامتحان
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.pdf"
                required
              />
            </Button>

            {formData.file && (
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 1 }}
              >
                تم الرفع
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: "text.secondary" }}>
          إلغاء
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          startIcon={<Save sx={{ ml: 2 }} />}
          sx={{ px: 3 }}
        >
          {"حفظ"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaperExamDialog;
