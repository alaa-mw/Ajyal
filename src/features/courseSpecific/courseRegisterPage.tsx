import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import useFetchDataId from "../../hooks/useFetchDataId";
import { classRoom, CourseRegistrationsStudent } from "../../interfaces/Course";
import { useSelectedCourse } from "../../contexts/SelectedCourseContext";
import SelectedCourse from "./SelectedCourse";
import { useEffect, useState } from "react";
import useSendData from "../../hooks/useSendData";
import ActiveStudentsList from "./students/ActiveStudentsList";
import RegisterStudentDialog from "./RegisterStudentDialog";
import useFetchData from "../../hooks/useFetchData";
import { Student } from "../../interfaces/Student";

const CourseRegisterPage = () => {
  const { selectedCourseId } = useSelectedCourse();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<string>("all");
  const [displayedStudents, setDisplayedStudents] = useState<
    CourseRegistrationsStudent[]
  >([]);

  const { data: classRooms } = useFetchDataId<classRoom[]>(
    `/course/classRooms-course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );
  const { data: allStudent } = useFetchDataId<CourseRegistrationsStudent[]>(
    `/course/AllStudent/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  const { data: studentsAtClass, mutate: getStudentsAtClass } = useSendData<
    CourseRegistrationsStudent[]
  >("/course/AllStudentAtClass");

  const { data: ajyalStudent } = useFetchData<Student[]>("/student/all");

  // Update displayed students when data changes
  useEffect(() => {
    if (selectedClassroom === "all") {
      setDisplayedStudents(allStudent?.data || []);
    } else {
      setDisplayedStudents(studentsAtClass?.data || []);
    }
  }, [allStudent, studentsAtClass, selectedClassroom]);

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedClassroom(value);

    if (value !== "all" && selectedCourseId) {
      getStudentsAtClass({
        courseId: selectedCourseId,
        classroomCourseId: value,
      });
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
      >
        التسجيل والشعب
      </Typography>
      <SelectedCourse
        courseId={selectedCourseId}
        registeredCount={allStudent?.data.length}
      />
      <FormControl fullWidth size="small" sx={{ width: 220 }}>
        <InputLabel id="classroom-filter-label">Classroom</InputLabel>
        <Select
          labelId="classroom-filter-label"
          value={selectedClassroom}
          label="Classroom"
          onChange={handleChange}
        >
          <MenuItem key={"all"} value={"all"}>
            All
          </MenuItem>
          {classRooms?.data.map((cls) => (
            <MenuItem key={cls.id} value={cls.id}>
              {cls.class_number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        تسجيل طالب جديد
      </Button>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
          gap: 4,
        }}
      > */}
      <ActiveStudentsList activeStudents={displayedStudents} />

      {/* </Box> */}
      <RegisterStudentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={(studentId, amount) => {
          // Handle payment registration
          console.log(`Register payment ${amount} for student ${studentId}`);
        }}
        students={ajyalStudent?.data || []}
      />
    </>
  );
};

export default CourseRegisterPage;
