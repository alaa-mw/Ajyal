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

function App() {
  return (
    <ThemeProvider theme={arabicThem}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />}>
          {/* <Route index element={<ManagerHome />} /> */}

          <Route path="students" element={<StudentsPage />} />
          <Route path="students/new" element={<NewStudent />} />

          <Route path="teachers" element={<TeachersPage />} />
          <Route path="teachers/new" element={<NewTeacher />} />

          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/new" element={<NewCourse />} />

          <Route path="ads" element={<AdsPage />} />
          <Route path="ads/new" element={<NewAd />} />
        </Route>
        <Route path="/manager/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
