import React from "react";
import {
  Box,
  Typography,
  Backdrop,
  TextField,
  InputAdornment,
} from "@mui/material";
import EntityToolbar from "../../components/ui/EntityToolbar";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import useFetchData from "../../hooks/useFetchData";
import { Course } from "../../interfaces/Course";
import { useSelectedCourse } from "../../contexts/SelectedCourseContext";
import { drawerWidth } from "../../components/ui/ResponsiveDrawer";
import Search from "@mui/icons-material/Search";

const CoursesPage = () => {
  const { data: courses } = useFetchData<Course[]>("/course/all-courses");
  const navigate = useNavigate();
  const { setSelectedCourse } = useSelectedCourse();

  // Check if we're in selection mode
  const isSelectionMode = location.pathname.includes("/select");

  const handleSearch = () => {
    console.log("Searching for:");
  };

  const handleAddStudent = () => {
    console.log("Add new student clicked");
    navigate(`/manager/courses/new`);
  };

  const [isNewestSelected, setIsNewestSelected] = React.useState(false);
  const handleSortNewest = () => {
    console.log("Sort by newest clicked");
    setIsNewestSelected(!isNewestSelected);
  };

  const handleSelectCourse = (courseId: string, courseName: string) => {
    if (isSelectionMode) {
      setSelectedCourse(courseId, courseName);
      navigate("../course-register");
    }
    // In normal mode, the CourseCard handles its own click logic
  };
  return (
    <Box sx={{ position: "relative" }}>
      {/* Grey overlay/mask in selection mode */}
      {isSelectionMode && (
        <Backdrop
          open={true}
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.drawer,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            top: 0,
            left: 0,
            right: drawerWidth,
            bottom: 0,
          }}
        />
      )}

      {/* Main content */}
      <Box
        sx={{
          position: "relative",
          zIndex: isSelectionMode ? (theme) => theme.zIndex.modal + 1 : "auto",
          // filter: isSelectionMode ? "none" : "none",
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
          {isSelectionMode ? "اختر الدورة" : "الدورات"}
        </Typography>

        {isSelectionMode ? (
          <TextField
            placeholder={`بحث عن دورة...`}
            size="small"
            // onChange={(e) => onSearch(e.target.value)}
            sx={{
              width: 300,
              backgroundColor: "common.white",
              borderRadius: 20,
              "& .MuiOutlinedInput-root": {
                borderRadius: 20,
                "& fieldset": {
                  borderColor: "grey.300",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <EntityToolbar
            entityType="course"
            onSearch={handleSearch}
            onAdd={handleAddStudent}
            selectedNewest={isNewestSelected}
            onSortNewest={handleSortNewest}
          />
        )}

        <Box
          component="section"
          sx={{
            display: "grid",
            placeItems: "center",
            gap: 1,
            gridTemplateColumns: {
              xs: "1fr",
              s: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            p: 2,
          }}
        >
          {courses?.data.map((item) => (
            <CourseCard
              key={item.id}
              course={item}
              onClick={
                isSelectionMode
                  ? () => handleSelectCourse(item.id, item.name)
                  : undefined
              }
              // isSelectable={isSelectionMode}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CoursesPage;
