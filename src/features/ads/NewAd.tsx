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
  Avatar,
  TextField,
  Autocomplete,
} from "@mui/material";
import FormField from "../../components/form/FormField";
import theme from "../../styles/mainThem";

// Mock data
const COURSES = [
  { id: 1, name: "الرياضيات للصف التاسع" },
  { id: 2, name: "الفيزياء للصف العاشر" },
  { id: 3, name: "الكيمياء للصف الحادي عشر" },
];

const TEACHERS = [
  {
    id: 1,
    name: "أحمد محمد",
    info: "خريج جامعة دمشق - كلية الآداب - قسم اللغة العربية",
  },
  {
    id: 2,
    name: "سارة علي",
    info: "خريجة جامعة حلب - كلية العلوم - قسم الرياضيات",
  },
  {
    id: 3,
    name: "محمد خالد",
    info: "خريج جامعة تشرين - كلية الهندسة - قسم المعلوماتية",
  },
];

const NewAd = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    body: "",
    postable_id: "",
    postable_type: "general",
    image: null as File | null,
  });

  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as string;
    const value = e.target.value as string;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      postable_id: "", // Reset ID when type changes
      body: value === "teacher" ? "" : prev.body,
    }));
  };

  const handleTeacherSelect = (teacherId: number) => {
    const selectedTeacher = TEACHERS.find((t) => t.id === teacherId);
    setFormData((prev) => ({
      ...prev,
      postable_id: teacherId.toString(),
      body: selectedTeacher?.info || "",
    }));
  };

  const handleCourseSelect = (courseId: number) => {
    setFormData((prev) => ({
      ...prev,
      postable_id: courseId.toString(),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const filteredTeachers = TEACHERS.filter(
    (teacher) =>
      teacher.name.includes(searchTerm) || teacher.info.includes(searchTerm)
  );

  const filteredCourses = COURSES.filter((course) =>
    course.name.includes(searchTerm)
  );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 0, sm: 3 } }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "right" }}
      >
        نشر إعلان
      </Typography>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>نوع الإعلان</InputLabel>
              <Select
                name="postable_type"
                value={formData.postable_type}
                onChange={handleSelectChange}
                label="نوع الإعلان"
              >
                <MenuItem value="general">عام</MenuItem>
                <MenuItem value="course">دورة</MenuItem>
                <MenuItem value="teacher">معلم</MenuItem>
              </Select>
            </FormControl>

            {formData.postable_type === "teacher" && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  options={filteredTeachers}
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

            {formData.postable_type === "course" && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  options={filteredCourses}
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
                formData.postable_type === "teacher"
                  ? "سيتم تعبئة المعلومات تلقائياً عند اختيار المعلم"
                  : "أدخل وصف الإعلان هنا..."
              }
              multiline
              required
            />

            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="image-upload">
                <Button variant="outlined" component="span" sx={{ mb: 1 }}>
                  رفع صورة
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
              {previewImage && (
                <Avatar
                  src={previewImage}
                  sx={{ width: 150, height: 150, mt: 2 }}
                  variant="rounded"
                />
              )}
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              background: theme.palette.gradient.primary,
              fontSize: "1.1rem",
            }}
          >
            حفظ البيانات
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default NewAd;
