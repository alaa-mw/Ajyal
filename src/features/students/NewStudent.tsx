import React from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import FormField from "../../components/common/FormField";
import theme from "../../styles/mainThem";
import useSendData from "../../hooks/useSendData";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Student } from "../../interfaces/Student";
import { classes } from "../../static/classNames";
import { RTLDatePicker } from "../../components/common/RTLDatePicker";

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
    class_level: "",
    birthdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Form :", formData);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", s: "row" },
              gap: 3,
              mb: 3,
            }}
          >
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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", s: "row" },
              gap: 3,
              mb: 3,
            }}
          >
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

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", s: "row" },
              gap: 3,
              mb: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <FormField
                label="العنوان"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="الروضة"
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormField
                label="الرقم المدني"
                name="number_civial"
                value={formData.number_civial}
                onChange={handleChange}
                placeholder="XXXXXXXXXX"
                required
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", s: "row" },
              gap: 3,
              mb: 3,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth required>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 0.4,
                    color: "primary.main",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  تاريخ الميلاد
                </Typography>
                <RTLDatePicker
                  value={formData.birthdate}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, birthdate: date }))
                  }
                />
              </FormControl>
            </Box>
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth required>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 0.4,
                    color: "primary.main",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  المستوى *
                </Typography>
                <Select
                  name="class_level"
                  value={formData.class_level}
                  onChange={handleSelectChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  {classes.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

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
