import { CssBaseline, ThemeProvider } from "@mui/material";
import arabicThem from "./styles/arabicThem";
import { Route, Routes } from "react-router-dom";
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
import CourseRegisterPage from "./features/courseSpecific/courseRegisterPage.tsx";
import CourseScientificContentPage from "./features/courseSpecific/courseScientificContentPage.tsx";

function App() {
  return (
    <ThemeProvider theme={arabicThem}>
      <SnackbarProvider>
      <CssBaseline />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route path="/manager" element={<ManagerDashboard />}>
            <Route path="*" element={<NotFound />} />
           {/* <Route index element={<ManagerHome />} /> */}
            <Route path="students" element={<StudentsPage />} />
            <Route path="students/new" element={<NewStudent />} />

            <Route path="teachers" element={<TeachersPage />} />
            <Route path="teachers/new" element={<NewTeacher />} />

            <Route path="courses" element={<CoursesPage />} />
            <Route path="courses/new" element={<NewCourse />} />

            <Route path="ads" element={<AdsPage />} />
            <Route path="ads/new" element={<NewAd />} />

            <Route path="course-register" element={<CourseRegisterPage />} />
            <Route path="course-scientific-content" element={<CourseScientificContentPage />} />
           
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
          <Route path="/teacher" element={<TeacherDashboard />}>
            {/* Teacher routes here */}
          </Route>
        </Route>

        {/* Fallback routes */}
        <Route path="/not-authorized" element={<div>غير مصرح بالوصول</div>} />
       
      </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;