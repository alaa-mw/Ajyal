import { CssBaseline, ThemeProvider } from "@mui/material";
import arabicThem from "./styles/arabicThem";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthPage from "./features/auth/AuthPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import NotFound from "./pages/NotFound";
import NewStudent from "./features/students/NewStudent";
import NewTeacher from "./features/teachers/NewTeacher";
import StudentsPage from "./features/students/StudentsPage";
import TeachersPage from "./features/teachers/TeachersPage";
import AdsPage from "./features/ads/AdsPage";
import CoursesPage from "./features/courses/CoursesPage";
import NewCourse from "./features/courses/NewCourse";
import NewAd from "./features/ads/NewAd";
import ProtectedRoute from "./pages/ProtectedRoute";
import { SnackbarProvider } from "./contexts/SnackbarContext.tsx";
import CourseScientificContentPage from "./features/courseSpecific/courseScientificContentPage.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/auth/Redux/authSlice.ts";
import { rolesConfig } from "./rolesConfig.ts";
import { SelectedCourseProvider } from "./contexts/SelectedCourseContext.tsx";
import CourseRegisterPage from "./features/courseSpecific/courseRegisterPage.tsx";
import QuestionsPage from "./pages/teacher/QuestionsPage.tsx";
import QuizDetails from "./features/quizzes/Viewer/QuizDetails.tsx";
import QuizCreator from "./features/quizzes/Creator/QuizCreator.tsx";
import QuizList from "./features/quizzes/Viewer/QuizList.tsx";

function App() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");
  useEffect(() => {
    if (userToken && userRole) {
      dispatch(
        loginSuccess({
          token: userToken,
          role: userRole,
        })
      );
      Navigate(`${rolesConfig[userRole].webPrefix}/`);
    }
  }, [userRole, userToken]);

  return (
    <ThemeProvider theme={arabicThem}>
      <SelectedCourseProvider>
        <SnackbarProvider>
          <CssBaseline />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />

            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["manager", "secretariat"]} />
              }
            >
              <Route path="/manager" element={<ManagerDashboard />}>
                <Route path="*" element={<NotFound />} />
                {/* <Route index element={<ManagerHome />} /> */}
                <Route path="students" element={<StudentsPage />} />
                <Route path="students/new" element={<NewStudent />} />

                <Route path="teachers" element={<TeachersPage />} />
                <Route path="teachers/new" element={<NewTeacher />} />

                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/select" element={<CoursesPage />} />
                <Route path="courses/new" element={<NewCourse />} />

                <Route path="ads" element={<AdsPage />} />
                <Route path="ads/new" element={<NewAd />} />

                <Route
                  path="course-register"
                  element={<CourseRegisterPage />}
                />
                <Route
                  path="course-scientific-content"
                  element={<CourseScientificContentPage />}
                />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
              <Route path="/teacher" element={<TeacherDashboard />}>
                <Route index element={<div>home</div>} />
                <Route path="quizzes">
                  <Route index element={<QuizList />} />
                  <Route path=":quizId" element={<QuizDetails />} />

                  {/* Updated routes - clearly separated create/edit flows */}
                  <Route path="create">
                    {/* <Route index element={<Navigate to="new" replace />} /> */}
                    <Route path="new" element={<QuizCreator mode="create" />} />
                    <Route
                      path=":quizId"
                      element={<QuizCreator mode="edit" />}
                    />
                  </Route>
                </Route>

                <Route path="questions" element={<QuestionsPage />} />
              </Route>
            </Route>

            {/* Fallback routes */}
            {/* <Route
              path="/not-authorized"
              element={<div>غير مصرح بالوصول</div>}
            /> */}
          </Routes>
        </SnackbarProvider>
      </SelectedCourseProvider>
    </ThemeProvider>
  );
}

export default App;
