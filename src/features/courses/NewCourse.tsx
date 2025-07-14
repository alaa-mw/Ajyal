import {
  Typography,
  Button,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Divider,
  Checkbox,
  Grid,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect } from "react";
import FormField from "../../components/form/FormField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { classes } from "../../data/classNames";
import useSendData from "../../hooks/useSendData";
import { Course } from "../../interfaces/Course";
import { Subject } from "../../interfaces/Subject";
import { useSnackbar } from "../../contexts/SnackbarContext";
import SubjectItem from "./SubjectItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addSubject,
  printCourseState,
  resetCourse,
  toggleClassroom,
  updateField,
} from "./Redux/courseSlice";

export const classRooms = ["1", "2", "3", "4", "5"];

const NewCourse = () => {
  const { showSnackbar } = useSnackbar();

  const { mutate: addCourse } = useSendData<Course>("/course/create");
  const { data: subjects, mutate: fetchSubjectType } =
    useSendData<Subject[]>("/subjects");

  const dispatch = useDispatch();
  const courseData = useSelector((state: RootState) => state.course);

  // Simplified handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleTypeChange = (value: string) => {
    dispatch(updateField({ field: "type", value }));
    // Clear subjects when type changes
    dispatch(updateField({ field: "subjects", value: [] }));
  };

  const handleDateChange = (name: string, date: Dayjs | null) => {
    dispatch(
      updateField({
        field: name,
        value: date ? date.format("YYYY-MM-DD") : null, //fix
      })
    );
  };

  const toggleClassRoomSelection = (roomId: string, isChecked: boolean) => {
    dispatch(toggleClassroom({ roomId, isChecked }));
  };

  const handleSubjectSelect = (subject: Subject) => {
    const { id, name } = subject;
    dispatch(
      addSubject({
        subject_id: id,
        subject_name: name,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", courseData);
    addCourse(courseData, {
      onSuccess: (response) => {
        showSnackbar(response.message, "success");
        // Clear form data
        dispatch(resetCourse());
      },
      onError: (error) => showSnackbar(error.message, "error"),
    });
  };

  useEffect(() => {
    if (courseData.type) {
      fetchSubjectType({ subjects_type: courseData.type });
    }
  }, [courseData.type, fetchSubjectType]);
  useEffect(() => {
    dispatch(printCourseState());
  }, [courseData, dispatch]);

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
                  name="type"
                  value={courseData.type}
                  fullWidth
                  onChange={(e) => handleTypeChange(e.target.value)}
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
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField
                label="التكلفة"
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
                value={dayjs(courseData.start_date)}
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
                value={dayjs(courseData.end_date)}
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
            <Grid size={12}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                القاعات:
              </Typography>
              {classRooms.map((room) => (
                <FormControlLabel
                  key={room}
                  control={
                    <Checkbox
                      checked={courseData.classrooms.includes(room)}
                      onChange={(e) =>
                        toggleClassRoomSelection(room, e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label={`القاعة ${room}`}
                  sx={{ ml: 4 }}
                />
              ))}
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
                const selectedValue = e.target.value as "select-all" | string;
                console.log(typeof selectedValue);

                if (selectedValue === "select-all") {
                  // Select all subjects that aren't already selected
                  subjects?.data.forEach((subject) => {
                    if (
                      !courseData.subjects.some(
                        (s) => s.subject_id === subject.id
                      )
                    ) {
                      handleSubjectSelect(subject);
                    }
                  });
                } else {
                  const subject = subjects?.data.find(
                    (s) => s.id == selectedValue
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
              {courseData.subjects.length < (subjects?.data?.length || 0) && (
                <MenuItem key="select-all" value="select-all">
                  {" "}
                  {/*fix later*/}
                  تحديد الكل
                </MenuItem>
              )}
              {(subjects?.data.length ?? 0) > 0 ? (
                subjects?.data.map((subject) => (
                  <MenuItem
                    key={subject.id}
                    value={subject.id}
                    disabled={courseData.subjects.some(
                      (s) => s.subject_id === subject.id
                    )}
                  >
                    {subject.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled sx={{ justifyContent: "center" }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    لا يوجد مواد متاحة
                  </Typography>
                </MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Selected Subjects */}

          <Box sx={{ mt: 2 }}>
            {courseData.subjects.map((subject) => (
              <SubjectItem key={subject.subject_id} subject={subject} />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleSubmit}
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
            onClick={handleSubmit} //later
            disabled={true}
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
