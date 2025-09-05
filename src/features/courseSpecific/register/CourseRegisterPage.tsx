import { getStudentName } from "../../../utils/getStudentName";
import { useState, useEffect, useMemo, useRef } from "react";
import { Typography, Container, Grid, Stack, Button, Box } from "@mui/material";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import useFetchData from "../../../hooks/useFetchData";
import ActiveStudentsList from "./ActiveStudentsList";
import RegisterStudentDialog from "./registerDialog/RegisterStudentDialog";
import {
  Course,
  CourseRegistrationsStudent,
  ScheduleCourse,
} from "../../../interfaces/Course";
import { Student } from "../../../interfaces/Student";
import CourseStats from "./CourseStats";
import CourseActionsToolbar from "./CourseActionsToolbar";
import useSendData from "../../../hooks/useSendData";
import { ClassRoom } from "../../../interfaces/ClassRoom";
import AbsenceCheckList from "./AbsenceCheckList";
import { Checklist } from "@mui/icons-material";
import ExcelDownloader from "../content/ExcelDownloader";
import PaperExamDialog from "./PaperExamDialog";
import { TodayAbsence } from "../../../interfaces/TodayAbsence";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import getImageUrl from '../../../services/image-url';

const CourseRegisterPage = () => {
  const { selectedCourseId } = useSelectedCourse();

  // --- State Management ---
  const [openDialog, setOpenDialog] = useState(false);
  const [openPaperDialog, setOpenPaperDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [studentList, setStudentList] = useState<CourseRegistrationsStudent[]>(
    []
  );

  // --- Data Fetching ---
  const { data: courseData } = useFetchDataId<Course>(
    `/course/show/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );
  const { data: classRoomsData } = useFetchDataId<ClassRoom[]>(
    `/course/classRooms-course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );
  const { data: allStudentsInCourseData, isLoading } = useFetchDataId<
    CourseRegistrationsStudent[]
  >(
    `/course/AllStudent/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  const { mutate: getStudentsAtClass } = useSendData<
    CourseRegistrationsStudent[]
  >("/course/AllStudentAtClass");

  const { data: ajyalStudentsData } = useFetchData<Student[]>("/student/all");

  const { data: todayAbsence } = useFetchDataId<TodayAbsence>(
    `/absence/today-absence/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  const isAbsence = todayAbsence?.data.classrooms_with_absence.some(
    (cls) => cls.classroom_id === selectedClassroom
  );

  const { data: Schedules } = useFetchDataId<ScheduleCourse[]>(
    `/course/all-schedule/course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );
  const selectedSchedule = Schedules?.data.find(
    (cls) => cls.classroom_id === selectedClassroom
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSnackbar } = useSnackbar();
  const { mutate: storeFile } = useSendData(
    "/course/add-schedule-to-classroom-at-course"
  );

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("classroom_course_id", selectedClassroom); //fix
    formData.append("schedule", file);

    storeFile(formData, {
      onSuccess: (response) => showSnackbar(response.message, "success"),
      onError: (error) => showSnackbar(error.message, "error"),
    });
  };

  // This effect updates the student list based on the main data source
  useEffect(() => {
    setStudentList(allStudentsInCourseData?.data || []);
  }, [allStudentsInCourseData]);

  const [studentsByClass, setStudentsByClass] = useState<
    CourseRegistrationsStudent[]
  >([]);

  // 1. جلب البيانات عند تغيير الصف
  useEffect(() => {
    if (selectedClassroom !== "all") {
      getStudentsAtClass(
        { courseId: selectedCourseId, classroomCourseId: selectedClassroom },
        {
          onSuccess: (response) => {
            setStudentsByClass([...response.data]); // تحديث الحالة
          },
        }
      );
    } else {
      setStudentsByClass([...studentList]); // عرض كل الطلاب
    }
  }, [selectedClassroom, selectedCourseId, studentList]);

  const displayedStudents = useMemo(() => {
    let result = [...studentsByClass]; // نستخدم البيانات المحدثة من useEffect

    // تصفية حسب searchTerm (عملية متزامنة)
    if (searchTerm) {
      result = result.filter((data) =>
        getStudentName(data.student)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [studentsByClass, searchTerm]);

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 1, fontWeight: "bold" }}
      >
        التسجيل والشعب
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ s: 12, md: 9 }}>
          <Stack spacing={3}>
            <CourseActionsToolbar
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              selectedClassroom={selectedClassroom}
              onClassroomChange={(id: string) => setSelectedClassroom(id)}
              classRooms={classRoomsData?.data || []}
              onAddNewStudent={() => setOpenDialog(true)}
            />

            {selectedClassroom != "-1" && selectedClassroom != "all" && (
              <Box display={"flex"} gap={1}>
                <Button
                  variant="contained"
                  onClick={() => setDrawerOpen(true)}
                  startIcon={<Checklist sx={{ ml: 1 }} />}
                  disabled={isAbsence}
                >
                  {isAbsence ? "تم التفقد" : "تفقد الحضور"}
                </Button>
                <ExcelDownloader />
                <Button
                  variant="contained"
                  onClick={() => setOpenPaperDialog(true)}
                  sx={{ mx: 1 }}
                >
                  رفع العلامات
                </Button>
                {selectedSchedule?.image ? (
                  <Button
                    variant="contained"
                    onClick={() =>
                      window.open(getImageUrl(selectedSchedule.image.path), "_blank")
                    }
                    sx={{ mx: 1 }}
                  >
                    عرض جدول الدوام
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => fileInputRef.current?.click()}
                    sx={{ mx: 1 }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleUpload}
                      accept="image/*"
                    />
                    رفع جدول الدوام
                  </Button>
                )}
              </Box>
            )}
            <ActiveStudentsList
              activeStudents={displayedStudents}
              isLoading={isLoading}
            />
          </Stack>
        </Grid>

        <Grid size={{ s: 12, md: 3 }}>
          <CourseStats
            course={courseData?.data}
            registeredCount={allStudentsInCourseData?.data.length || 0}
          />
        </Grid>
      </Grid>

      <RegisterStudentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        students={ajyalStudentsData?.data || []}
      />
      <PaperExamDialog
        open={openPaperDialog}
        onClose={() => setOpenPaperDialog(false)}
      />

      {/* Bottom Drawer for Absence Checklist */}
      <AbsenceCheckList
        students={displayedStudents}
        classRoomId={selectedClassroom}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        // onSave={handleSaveAbsences}
      />
    </Container>
  );
};

export default CourseRegisterPage;
