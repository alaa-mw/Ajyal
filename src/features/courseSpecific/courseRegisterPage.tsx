import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import WaitStudentsList, { StudentWait } from "./students/WaitStudentsList";
import useFetchDataId from "../../hooks/useFetchDataId";
import { classRoom } from "../../interfaces/Course";
import { useSelectedCourse } from "../../contexts/SelectedCourseContext";
import SelectedCourse from "./SelectedCourse";
import { useEffect, useState } from "react";
import { Student } from "../../interfaces/Student";
import useSendData from "../../hooks/useSendData";
import React from "react";
import ActiveStudentsList from "./students/ActiveStudentsList";

const CourseRegisterPage = () => {
  const [students, setStudents] = React.useState<StudentWait[]>([
    {
      id: "1",
      name: "أحمد محمد",
      registrationFee: 500,
      paymentStatus: "paid",
      registrationDate: "2023-05-15",
      isWaitingList: true,
    },
    {
      id: "2",
      name: "سارة علي",
      registrationFee: 500,
      paymentStatus: "unpaid",
      registrationDate: "2023-05-16",
      isWaitingList: true,
    },
    {
      id: "3",
      name: "خالد عبدالله",
      registrationFee: 300,
      paymentStatus: "paid",
      registrationDate: "2023-05-10",
      isWaitingList: false,
    },
  ]);

  const handleConfirmRegistration = (studentId: string) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? { ...student, isWaitingList: false }
          : student
      )
    );
    // Here you would also call your API to confirm the registration
    console.log("Confirming registration for student:", studentId);
  };

  const { selectedCourseId } = useSelectedCourse();
  const [selectedClassroom, setSelectedClassroom] = useState<string>("all");
  const [displayedStudents, setDisplayedStudents] = useState<Student[]| CourseRegistrationsStudent[]>([]);

  const { data: classRooms } = useFetchDataId<classRoom[]>(
    `/course/classRooms-course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );
  const { data: allStudent } = useFetchDataId<Student[]>(
    `/course/AllStudent/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  const { data: studentsAtClass, mutate: getStudentsAtClass } = useSendData<
    Student[]
  >("/course/AllStudentAtClass");

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
      <SelectedCourse courseId={selectedCourseId} />
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
      <Box
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
      >
        <ActiveStudentsList activeStudents={displayedStudents} />
        <WaitStudentsList
          waitingStudents={students}
          onConfirmRegistration={handleConfirmRegistration}
        />
      </Box>
    </>
  );
};

export default CourseRegisterPage;
