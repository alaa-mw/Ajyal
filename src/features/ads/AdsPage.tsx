import React from "react";
import AdsCard from "./AdsCard";
import { Box, Divider, Typography } from "@mui/material";
import EntityToolbar from "../../components/ui/EntityToolbar";
import NewAd from "./NewAd";

const AdsPage = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    console.log("Searching for:");
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
          justifyContent: "space-between",
        }}
      >
        <NewAd />

        <Box>
          <EntityToolbar entityType="ad" onSearch={handleSearch} />

          {/* Vertical scroll container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 2,
              gap: 1,
              height: {
                xs: "calc(100vh - 200px)", // Adjust 200px based on your header/footer height
                md: "calc(100vh - 160px)", // Larger offset for desktop
              },
              overflowY: "auto",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {[...Array(8)].map((_, index) => (
              <Box key={index} sx={{ minHeight: 110, flexShrink: 0 }}>
                {" "}
                {/* Changed from minWidth */}
                <AdsCard
                  title="فرصة عمل مميزة"
                  body="مطلوب مدرس رياضيات لطلاب الثانوية\nخبرة لا تقل عن 3 سنوات"
                  creation_date={"11-3-2024"}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

export default AdsPage;
