import {
  Typography,
  Button,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Chip,
  Divider,
  Checkbox,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import FormField from "../../components/form/FormField";
// import arLocale from "date-fns/locale/ar-SA";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import theme from "../../styles/mainThem";

// Mock data for subjects and teachers
interface Subject {
  id: number;
  name: string;
}
const SUBJECTS = [
  { id: 1, name: "الرياضيات" },
  { id: 2, name: "الفيزياء" },
  { id: 3, name: "الكيمياء" },
  { id: 4, name: "الأحياء" },
  { id: 5, name: "اللغة العربية" },
];

const TEACHERS = [
  { id: 1, name: "أحمد محمد", subjectIds: [1, 2] },
  { id: 2, name: "سارة خالد", subjectIds: [3, 4] },
  { id: 3, name: "علي حسن", subjectIds: [1, 5] },
  { id: 4, name: "فاطمة عبدالله", subjectIds: [2, 3] },
];

const LEVELS = ["9", "12-a", "12-b"];

const NewCourse = () => {
  // Basic course info
  const [courseData, setCourseData] = useState({
    name: "",
    cost: "",
    capacity: "",
    level: "",
    start_date: null,
    end_date: null,
  });
  // Subjects and teachers
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [subjectTeachers, setSubjectTeachers] = useState<
    Record<number, number[]>
  >({});
  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setCourseData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubjectSelect = (subject) => {
    if (!selectedSubjects.some((s) => s.id === subject.id)) {
      setSelectedSubjects([...selectedSubjects, subject]);
      setSubjectTeachers({ ...subjectTeachers, [subject.id]: [] });
    }
    console.log("selectedSubjects", selectedSubjects);

    console.log("subjectTeachers", subjectTeachers);
  };

  const handleRemoveSubject = (subjectId) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s.id !== subjectId));
    const newSubjectTeachers = { ...subjectTeachers };
    delete newSubjectTeachers[subjectId];
    setSubjectTeachers(newSubjectTeachers);
  };

  const handleTeacherSelect = (subjectId: number, teacherIds: number[]) => {
    setSubjectTeachers((prev) => ({
      ...prev,
      [subjectId]: teacherIds,
    }));

    console.log("subjectId", subjectId);
    console.log("teacherId", teacherIds);
    console.log("subjectTeachers", subjectTeachers);
  };

  const handleRemoveTeacher = (subjectId, teacherId) => {
    setSubjectTeachers((prev) => ({
      ...prev,
      [subjectId]: prev[subjectId].filter((id) => id !== teacherId),
    }));
  };

  // Form submission
  const handleSave = (publish = false) => {
    const course = {
      ...courseData,
      subjects: selectedSubjects.map((subject) => ({
        subjectId: subject.id,
        teachers: subjectTeachers[subject.id] || [],
      })),
      isPublished: publish,
    };
    console.log("Course data to save:", course);
    // Add your API call here
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
        >
          إنشاء كورس جديد
        </Typography>

        {/* Basic Course Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
            المعلومات الأساسية
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField
                label="اسم الكورس"
                name="name"
                value={courseData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
                  name="level"
                  value={courseData.level}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#e0e0e0",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  {LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField
                label="التكلفة (ريال)"
                name="cost"
                value={courseData.cost}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField
                label="السعة (عدد الطلاب)"
                name="capacity"
                value={courseData.capacity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 0.4,
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                تاريخ البدء *
              </Typography>
              <DatePicker
                value={courseData.start_date}
                onChange={(date) => handleDateChange("start_date", date)}
                localeText={{
                  okButtonLabel: "موافق", // OK
                  cancelButtonLabel: "إلغاء", // Cancel
                  toolbarTitle: "اختر التاريخ", // Select Date
                  todayButtonLabel: "اليوم", // Today
                  clearButtonLabel: "مسح", // Clear
                }}
                // renderInput={(params) => (
                //   <TextField
                //     {...params}
                //     fullWidth
                //     sx={{
                //       "& .MuiOutlinedInput-root": {
                //         "& fieldset": {
                //           borderColor: "#e0e0e0",
                //           borderRadius: "8px",
                //         },
                //       },
                //     }}
                //   />
                // )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 0.4,
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                تاريخ الانتهاء *
              </Typography>
              <DatePicker
                value={courseData.end_date}
                onChange={(date) => handleDateChange("end_date", date)}
                // renderInput={(params) => (
                //   <TextField
                //     {...params}
                //     fullWidth
                //     sx={{
                //       "& .MuiOutlinedInput-root": {
                //         "& fieldset": {
                //           borderColor: "#e0e0e0",
                //           borderRadius: "8px",
                //         },
                //       },
                //     }}
                //   />
                // )}
                minDate={dayjs(courseData.start_date)}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Subjects Selection */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
            المواد الدراسية
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 0.4,
                color: "primary.main",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              اختر المادة
            </Typography>
            <Select
              value=""
              onChange={(e) => {
                const selectedValue = e.target.value as
                  | ""
                  | "select-all"
                  | number;
                console.log(typeof selectedValue);

                if (selectedValue === "select-all") {
                  const newSubjects = SUBJECTS.filter(
                    (subject) =>
                      !selectedSubjects.some((s) => s.id === subject.id)
                  );
                  setSelectedSubjects([...selectedSubjects, ...newSubjects]);
                  const newTeachers = { ...subjectTeachers };
                  newSubjects.forEach((subject) => {
                    newTeachers[subject.id] = [];
                  });
                  setSubjectTeachers(newTeachers);
                } else {
                  const subject = SUBJECTS.find(
                    (s) => s.id == Number(e.target.value)
                  );
                  if (subject) handleSubjectSelect(subject);
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                    borderRadius: "8px",
                  },
                },
              }}
            >
              {selectedSubjects.length < SUBJECTS.length && (
                <MenuItem key="select-all" value="select-all">
                  تحديد الكل
                </MenuItem>
              )}
              {SUBJECTS.map((subject) => (
                <MenuItem
                  key={subject.id}
                  value={subject.id}
                  disabled={selectedSubjects.some((s) => s.id === subject.id)}
                >
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Selected Subjects */}
          {selectedSubjects.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {selectedSubjects.map((subject) => (
                <Box
                  key={subject.id}
                  sx={{
                    mb: 3,
                    p: 2,
                    border: `2px solid ${theme.palette.tertiary.main}`,
                    borderRight: `12px solid ${theme.palette.tertiary.main}`,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        backgroundColor: theme.palette.tertiary.main,
                        borderRadius: 2,
                        px: 2,
                      }}
                    >
                      {subject.name}
                    </Typography>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleRemoveSubject(subject.id)}
                    >
                      إزالة
                    </Button>
                  </Box>

                  <FormControl fullWidth>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 0.4,
                        color: "primary.main",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                      }}
                    >
                      اختر المعلم/المعلمين
                    </Typography>
                    <Select
                      sx={{
                        backgroundColor: "white", // White background for select
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#e0e0e0", // Default border color
                            borderRadius: "8px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#491B6D", // Purple border on hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#491B6D", // Purple border when focused
                            borderWidth: "1px",
                          },
                        },
                        "& .MuiSelect-select": {
                          backgroundColor: "white", // Ensure select area is white
                        },
                      }}
                      multiple
                      value={subjectTeachers[subject.id] || []}
                      onChange={(e) => {
                        // Cast the value to number[] since we know it's a multiple select
                        const selectedTeacherIds = e.target.value as number[];
                        handleTeacherSelect(subject.id, selectedTeacherIds);
                      }}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                        >
                          {selected.map((teacherId) => {
                            const teacher = TEACHERS.find(
                              (t) => t.id === teacherId
                            );
                            return teacher ? (
                              <Chip
                                key={teacherId}
                                label={teacher.name}
                                onDelete={() =>
                                  handleRemoveTeacher(subject.id, teacherId)
                                }
                              />
                            ) : null;
                          })}
                        </Box>
                      )}
                    >
                      {TEACHERS.filter((teacher) =>
                        teacher.subjectIds.includes(subject.id)
                      ).map((teacher) => (
                        <MenuItem key={teacher.id} value={teacher.id}>
                          <Checkbox
                            checked={(
                              subjectTeachers[subject.id] || []
                            ).includes(teacher.id)}
                          />
                          {teacher.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => handleSave(false)}
            disabled={
              !courseData.name ||
              !courseData.level ||
              selectedSubjects.length === 0
            }
            sx={{
              borderRadius: "8px",
              py: 1.5,
              px: 4,
            }}
          >
            حفظ في النظام
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => handleSave(true)}
            disabled={
              !courseData.name ||
              !courseData.level ||
              selectedSubjects.length === 0
            }
            sx={{
              borderRadius: "8px",
              py: 1.5,
              px: 4,
              ml: 2,
            }}
          >
            حفظ ونشر الإعلان
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default NewCourse;
