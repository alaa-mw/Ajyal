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
import FormField from "../../components/common/FormField";
import theme from "../../styles/mainThem";
import { SelectChangeEvent } from "@mui/material/Select";
import useSendData from "../../hooks/useSendData";
import { Teacher } from "../../interfaces/Teacher";
import { Course } from "../../interfaces/Course";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useLazyFetch } from "../../hooks/useLazyFetch";
import { ImageUploader } from "../../components/common/ImageUploader";
import { Image } from "../../interfaces/Image";

const NewAd = () => {
  const { mutate: addAdd } = useSendData("/admin/addAdvertisement");

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

  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = React.useState({
    title: "",
    body: "",
    advertisable_id: "",
    advertisable_type: "",
    images: [] as Image[],
  });

  const [, setSearchTerm] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    if (value == "teacher") fetchTeachers();
    else fetchCourses();

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      advertisable_id: "", // Reset ID when type changes
    }));
  };

  const handleTeacherSelect = (teacherId: string) => {
    const selectedTeacher = teachers?.data.find((t) => t.id === teacherId);
    setFormData((prev) => ({
      ...prev,
      advertisable_id: teacherId.toString(),
      body: selectedTeacher?.bio || "",
    }));
  };

  const handleCourseSelect = (courseId: string) => {
    setFormData((prev) => ({
      ...prev,
      advertisable_id: courseId.toString(),
    }));
  };

  const handleImageChange = (images: Image[]) => {
    setFormData((prev) => ({
      ...prev,
      images: images,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    addAdd(
      { ...formData, images: formData.images.map((i) => i.file) },
      {
        onSuccess: (response) => {
          showSnackbar(response.message, "success");
          // Clear form data
          setFormData({
            title: "",
            body: "",
            advertisable_id: "",
            advertisable_type: "",
            images: [],
          });
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
        نشر إعلان
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
                onChange={handleSelectChange}
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

export default NewAd;
