import { Typography } from "@mui/material";
import React from "react";
import EntityToolbar from "../../components/ui/EntityToolbar";
import { useNavigate } from "react-router-dom";
import StudentsTable from "./StudentsTable";

const StudentsPage = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Searching for:");
  };

  const handleAddStudent = () => {
    console.log("Add new student clicked");
    navigate(`/manager/students/new`);
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
        الطلاب
      </Typography>
      <EntityToolbar
        entityType="student"
        onSearch={handleSearch}
        onAdd={handleAddStudent}
        selectedNewest={isNewestSelected}
        onSortNewest={handleSortNewest}
      />
      <StudentsTable />
    </>
  );
};

export default StudentsPage;
