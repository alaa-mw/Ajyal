import { CssBaseline, ThemeProvider } from "@mui/material";
import arabicThem from "./styles/arabicThem";
import { Route, Routes, useNavigate } from "react-router-dom";
import TeacherDashboard from "./pages/TeacherDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import NotFound from "./pages/NotFound";
import NewStudent from "./features/students/NewStudent";
import NewTeacher from "./features/teachers/NewTeacher";
import StudentsPage from "./pages/manager-secretariat/StudentsPage.tsx";
import TeachersPage from "./pages/manager-secretariat/TeachersPage.tsx";
import AdsPage from "./pages/manager-secretariat/AdsPage.tsx";
import CoursesPage from "./pages/manager-secretariat/CoursesPage.tsx";
import NewCourse from "./features/courses/NewCourse";
import NewAd from "./features/ads/AdForm.tsx";
import ProtectedRoute from "./pages/ProtectedRoute";
import { SnackbarProvider } from "./contexts/SnackbarContext.tsx";
import CourseScientificContentPage from "./features/courseSpecific/content/courseScientificContentPage.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/auth/Redux/authSlice.ts";
import { rolesConfig } from "./rolesConfig.ts";
import { SelectedCourseProvider } from "./contexts/SelectedCourseContext.tsx";
import QuestionsPage from "./pages/teacher/QuestionsPage.tsx";
import QuizDetails from "./features/quizzes/Viewer/QuizDetails.tsx";
import QuizCreator from "./features/quizzes/Creator/QuizCreator.tsx";
import QuizList from "./features/quizzes/Viewer/QuizList.tsx";
import CourseRegisterPage from "./features/courseSpecific/register/CourseRegisterPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import CourseFinancialPage from "./features/courseSpecific/financial/CourseFinancialPage.tsx";
import InvoiceCreator from "./features/courseSpecific/financial/InvoiceCreator.tsx";

function App() {
  const navigate = useNavigate();
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
      navigate(`${rolesConfig[userRole].webPrefix}/`);
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
                <Route path="course-financial">
                  <Route index element={<CourseFinancialPage />} />
                  <Route path="create" element={<InvoiceCreator />} />
                </Route>
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
          </Routes>
        </SnackbarProvider>
      </SelectedCourseProvider>
    </ThemeProvider>
  );
}

export default App;
