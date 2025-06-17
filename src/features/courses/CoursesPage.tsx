import React from "react";
import { Box, Typography } from "@mui/material";
import EntityToolbar from "../../components/ui/EntityToolbar";
import { useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const navigate = useNavigate();
  const handleSearch = () => {
    console.log("Searching for:");
  };

  const handleAddStudent = () => {
    console.log("Add new student clicked");
    navigate(`/manager/course/new`);
  };

  const [isNewestSelected, setIsNewestSelected] = React.useState(false);
  const handleSortNewest = () => {
    console.log("Sort by newest clicked");
    setIsNewestSelected(!isNewestSelected);
  };
  return (
    <>
      {" "}
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: "bold",
        }}
      >
        الدورات
      </Typography>
      <EntityToolbar
        entityType="course"
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
      ></Box>
    </>
  );
};

export default CoursesPage;
