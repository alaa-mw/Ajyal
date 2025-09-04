/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { classes } from "../../../../static/classNames";
import { RTLDatePicker } from "../../../../components/common/RTLDatePicker";

interface StudentFormProps {
  studentData: any;
  onStudentDataChange: (data: any) => void;
  onToggleMode: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  studentData,
  onStudentDataChange,
  onToggleMode,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onStudentDataChange({ [name]: value });
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    onStudentDataChange({ [name]: value });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", s: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          label="الاسم الأول"
          name="first_name"
          value={studentData.first_name}
          onChange={handleChange}
          required
          placeholder="أحمد"
        />
        <TextField
          fullWidth
          label="الاسم الأخير"
          name="last_name"
          value={studentData.last_name}
          onChange={handleChange}
          required
          placeholder="محمد"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", s: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          label="اسم الأب"
          name="father_name"
          value={studentData.father_name}
          onChange={handleChange}
          required
          placeholder="حسام"
        />
        <TextField
          fullWidth
          label="اسم الأم"
          name="mother_name"
          value={studentData.mother_name}
          onChange={handleChange}
          required
          placeholder="فاطمة"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", s: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        <TextField
          label="العنوان"
          name="address"
          value={studentData.address}
          onChange={handleChange}
          placeholder="الروضة"
          required
          fullWidth
        />
        <TextField
          fullWidth
          label="الرقم المدني"
          name="number_civial"
          value={studentData.number_civial}
          onChange={handleChange}
          placeholder="XXXXXXXXXX"
          required
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", s: "row" },
          gap: 3,
          mb: 3,
        }}
      >
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
            value={studentData.birthdate}
            onChange={(date) => onStudentDataChange({ birthdate: date })}
          />
        </FormControl>
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
            value={studentData.class_level}
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
      <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
        طالب مسجل مسبقا في النظام ؟{" "}
        <Button
          style={{ color: "primary.main", textDecoration: "underline" }}
          onClick={onToggleMode}
        >
          البحث عن طالب
        </Button>
      </Typography>
    </Box>
  );
};

export default StudentForm;