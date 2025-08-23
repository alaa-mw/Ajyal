import React from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  LinearProgress,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import FormField from "../../components/common/FormField";
import theme from "../../styles/mainThem";
import useSendData from "../../hooks/useSendData";
import { Teacher } from "../../interfaces/Teacher";
import { Course } from "../../interfaces/Course";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useLazyFetch } from "../../hooks/useLazyFetch";
import { ImageUploader } from "../../components/common/ImageUploader";
import { Image } from "../../interfaces/Image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { resetAd, updateAdField } from "./Redux/adSlice";
import { Advertisement } from "../../interfaces/Advertisement ";

const AdForm = () => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const [, setSearchTerm] = React.useState("");

  const { mode, data: formData } = useSelector((state: RootState) => state.ad);

  const { mutate: saveAd } = useSendData(
    mode === "create"
      ? "/admin/addAdvertisement"
      : `/admin/updateAdvertisement/${formData.id}`
  );

  const {
    data: teachers,
    refetch: fetchTeachers,
    isLoading: loadingTeachers,
  } = useLazyFetch<Teacher[]>("/admin/allTeachers");

  const {
    data: courses,
    refetch: fetchCourses,
    isLoading: loadingCourses,
  } = useLazyFetch<Course[]>("/course/all-courses");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateAdField({ field: name as keyof Advertisement, value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    if (value === "teacher") fetchTeachers();
    else if (value === "course") fetchCourses();

    dispatch(updateAdField({ field: name as keyof Advertisement, value }));
    dispatch(updateAdField({ field: "advertisable_id", value: "" }));
  };

  const handleTeacherSelect = (teacherId: string) => {
    const selectedTeacher = teachers?.data.find((t) => t.id === teacherId);
    dispatch(updateAdField({ field: "advertisable_id", value: teacherId }));
    if (selectedTeacher?.bio) {
      dispatch(updateAdField({ field: "body", value: selectedTeacher.bio }));
    }
  };

  const handleCourseSelect = (courseId: string) => {
    dispatch(updateAdField({ field: "advertisable_id", value: courseId }));
  };

  const handleImageChange = (images: Image[]) => {
    dispatch(updateAdField({ field: "images", value: images }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveAd(
      { ...formData, images: formData.images.map((i) => i.file) },
      {
        onSuccess: (response) => {
          showSnackbar(response.message, "success");
          dispatch(resetAd());
        },
        onError: (error) => showSnackbar(error.message, "error"),
      }
    );
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: 600 },
        minHeight: 600,
        mx: "auto",
        px: { xs: 0, sm: 3 },
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "right" }}
      >
        {mode === "create" ? "نشر إعلان" : "تعديل الإعلان"}
      </Typography>

      <Paper
        elevation={3}
        sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, height: "90%" }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>نوع الإعلان</InputLabel>
              <Select
                name="advertisable_type"
                value={formData.advertisable_type}
                onChange={() => handleSelectChange}
                label="نوع الإعلان"
              >
                <MenuItem value="">عام</MenuItem>
                <MenuItem value="course">دورة</MenuItem>
                <MenuItem value="teacher">معلم</MenuItem>
              </Select>
            </FormControl>

            {formData.advertisable_type === "" && (
              <TextField disabled fullWidth />
            )}

            {formData.advertisable_type === "teacher" && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  options={teachers?.data || []}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) =>
                    value && handleTeacherSelect(value.id)
                  }
                  renderInput={(params) => (
                    <Box position="relative">
                      <TextField
                        {...params}
                        label="اختر المعلم"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            paddingBottom: loadingTeachers ? "8px" : 0,
                          },
                        }}
                      />
                      {loadingTeachers && (
                        <LinearProgress
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "2px",
                            borderBottomLeftRadius: "4px",
                            borderBottomRightRadius: "4px",
                          }}
                        />
                      )}
                    </Box>
                  )}
                  noOptionsText="لا توجد نتائج"
                />
              </FormControl>
            )}

            {formData.advertisable_type === "course" && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  options={courses?.data || []}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => value && handleCourseSelect(value.id)}
                  renderInput={(params) => (
                    <Box position="relative">
                      <TextField
                        {...params}
                        label="اختر الدورة"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            paddingBottom: loadingCourses ? "8px" : 0,
                          },
                        }}
                      />
                      {loadingCourses && (
                        <LinearProgress
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "2px",
                            borderBottomLeftRadius: "4px",
                            borderBottomRightRadius: "4px",
                          }}
                        />
                      )}
                    </Box>
                  )}
                  noOptionsText="لا توجد نتائج"
                />
              </FormControl>
            )}

            <FormField
              label="العنوان"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <FormField
              label="الوصف"
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder={
                formData.advertisable_type === "teacher"
                  ? "سيتم تعبئة المعلومات تلقائياً عند اختيار المعلم"
                  : "أدخل وصف الإعلان هنا..."
              }
              multiline
              required
            />

            <Box sx={{ mt: 2 }}>
              <ImageUploader
                maxImages={8}
                selectedImages={formData.images}
                setSelectedImages={handleImageChange}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              px: 5,
              py: 1.5,
              background: theme.palette.gradient.primary,
              fontSize: "1.1rem",
            }}
          >
            تأكيد
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdForm;
