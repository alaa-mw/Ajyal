import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import FormField from "../../components/form/FormField";
import theme from "../../styles/mainThem";
import useSendData from "../../hooks/useSendData";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Student } from "../../interfaces/Student";

const NewStudent = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate: newStudent } = useSendData<Student>("/student/add");
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    father_name: "",
    mother_name: "",
    address: "",
    number_civial: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Form :", formData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newStudent(formData, {
      onSuccess: () => showSnackbar("تم تسجيل بيانات الطالب بنجاح", "success"),
      onError: () =>
        showSnackbar("خطأ ما ! تأكد من صحة البيانات المدخلة", "error"),
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
      >
        تسجيل طالب جديد
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          {/* الصف الأول - حقلين */}
          <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="الاسم الأول"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                placeholder="أحمد"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="الاسم الأخير"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                placeholder="محمد"
              />
            </Box>
          </Box>

          {/* الصف الثاني - حقلين */}
          <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="اسم الأب"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                required
                placeholder="حسام"
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="اسم الأم"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                required
                placeholder="فاطمة"
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="العنوان"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="الروضة"
                required
                // textFieldProps={{
                //   multiline: true,
                //   rows: 4,
                // }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="الرقم المدني"
                name="number_civial"
                value={formData.number_civial}
                onChange={handleChange}
                placeholder="XXXXXXXXXX"
              />
            </Box>
          </Box>
          {/* حقل العنوان (عرض كامل) */}
          <Box sx={{ mb: 3 }}></Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: 2,
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

export default NewStudent;
