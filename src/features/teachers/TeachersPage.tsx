import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EntityToolbar from "../../components/ui/EntityToolbar";
import TeacherCard from "./TeacherCard";
import useFetchData from "../../hooks/useFetchData";
import { Teacher } from "../../interfaces/Teacher";

const TeachersPage = () => {
  const navigate = useNavigate();
  const { data: teachers } = useFetchData<Teacher[]>("/admin/allTeachers");

  const handleSearch = () => {
    console.log("Searching for:");
  };

  const handleAddStudent = () => {
    navigate(`/manager/teachers/new`);
  };

  const [isNewestSelected, setIsNewestSelected] = React.useState(false);
  const handleSortNewest = () => {
    console.log("Sort by newest clicked");
    setIsNewestSelected(!isNewestSelected);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: "bold",
        }}
      >
        المعلمون
      </Typography>
      <EntityToolbar
        entityType="teacher"
        onSearch={handleSearch}
        onAdd={handleAddStudent}
        selectedNewest={isNewestSelected}
        onSortNewest={handleSortNewest}
      />
      <Box
        component="section"
        sx={{
          display: "grid",
          placeItems: "center", //return
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
        {teachers?.data?.map((teacher) => (
          <TeacherCard key={teacher.id}  teacher={teacher} />
        ))}
      </Box>
    </>
  );
};

export default TeachersPage;
