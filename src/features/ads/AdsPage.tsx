import React from "react";
import AdsCard from "./AdsCard";
import { Box, Typography } from "@mui/material";
import EntityToolbar from "../../components/ui/EntityToolbar";
import { useNavigate } from "react-router-dom";

const AdsPage = () => {
  const navigate = useNavigate();
  const handleSearch = () => {
    console.log("Searching for:");
  };

  const handleAddStudent = () => {
    console.log("Add new student clicked");
    navigate(`/manager/ads/new`);
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
        الإعلانات
      </Typography>

      <EntityToolbar
        entityType="ad"
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
        <AdsCard
          title="فرصة عمل مميزة"
          body="مطلوب مدرس رياضيات لطلاب الثانوية\nخبرة لا تقل عن 3 سنوات"
          creation_date={"11-3-2024"}
        />
        <AdsCard
          title="فرصة عمل مميزة"
          body="مطلوب مدرس رياضيات لطلاب الثانوية\nخبرة لا تقل عن 3 سنوات"
          creation_date={"11-3-2024"}
        />
        <AdsCard
          title="فرصة عمل مميزة"
          body="مطلوب مدرس رياضيات لطلاب الثانوية\nخبرة لا تقل عن 3 سنوات"
          creation_date={"11-3-2024"}
        />
      </Box>
    </>
  );
};

export default AdsPage;
