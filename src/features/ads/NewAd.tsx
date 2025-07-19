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
import { Close } from "@mui/icons-material";
import { useLazyFetch } from "../../hooks/useLazyFetch";

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
    images: [] as File[],
  });

  const [previewImages, setPreviewImages] = React.useState<string[]>([]);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file)); //URL.createObjectURL() ينشئ رابط مؤقت يمكن استخدامه لعرض الصورة قبل رفعها

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    addAdd(formData, {
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
        // Clear preview images and revoke URLs
        previewImages.forEach((url) => URL.revokeObjectURL(url));
        setPreviewImages([]);
      },
      onError: (error) => showSnackbar(error.message, "error"),
    });
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: 600 },
        minHeight: 700,
        mx: "auto",
        p: { xs: 0, sm: 3 },
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

            {(loadingTeachers || loadingCourses) && (
              <LinearProgress sx={{ mb: 2 }} />
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
                    <TextField
                      {...params}
                      label="اختر المعلم"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  )}
                  noOptionsText="لا توجد نتائج"
                />
              </FormControl>
            )}

            {formData.advertisable_type === "" && (
              <TextField disabled fullWidth />
            )}
            {formData.advertisable_type === "course" && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  options={courses?.data || []}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => value && handleCourseSelect(value.id)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="اختر الدورة"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
              <label htmlFor="image-upload">
                <Button variant="outlined" component="span">
                  رفع الصور
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  multiple
                />
              </label>

              {previewImages.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    الصور المرفوعة:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {previewImages.map((preview, index) => (
                      <Box key={index} sx={{ position: "relative" }}>
                        <Box
                          component="img"
                          src={preview}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 1,
                          }}
                        />
                        <Button
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            minWidth: 0,
                            p: 0.5,
                            bgcolor: "rgba(0,0,0,0.5)",
                            color: "white",
                            "&:hover": {
                              bgcolor: "rgba(0,0,0,0.7)",
                            },
                          }}
                          onClick={() => removeImage(index)}
                        >
                          <Close fontSize="small" />
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mr: "35%",
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
