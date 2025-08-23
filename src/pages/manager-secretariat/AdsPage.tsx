import React, { SetStateAction, useState } from "react";
import AdsCard from "../../features/ads/AdsCard";
import { Box, Button, Typography } from "@mui/material";
import { useLazyFetch } from "../../hooks/useLazyFetch";
import { Advertisement } from "../../interfaces/Advertisement ";
import { PaginatedResponse } from "../../interfaces/PaginatedResponse";
import AdsSkeleton from "../../features/ads/AdsSkeleton";
import AdForm from "../../features/ads/AdForm";

const AdsPage = () => {
  const [activeTab, setActiveTab] = useState<
    "teachers" | "courses" | "general"
  >("teachers");
  const [page, setPage] = useState(1);

  const {
    data: tAd,
    fetchWithParams: fetchTAd,
    isFetching: isFetchingTeachers,
  } = useLazyFetch<PaginatedResponse<Advertisement[]>>(
    "/advertisement/teacherAdvertisements"
  );

  const {
    data: cAd,
    fetchWithParams: fetchCAd,
    isFetching: isFetchingCourses,
  } = useLazyFetch<PaginatedResponse<Advertisement[]>>(
    "/advertisement/courseAdvertisements"
  );

  const {
    data: gAd,
    fetchWithParams: fetchGAd,
    isFetching: isFetchingGeneral,
  } = useLazyFetch<PaginatedResponse<Advertisement[]>>(
    "/advertisement/generalAdvertisements"
  );

  // تحديد البيانات المعروضة بناءً على التبويب النشط
  const adsData = React.useMemo(() => {
    if (activeTab === "teachers") return tAd?.data.data || [];
    if (activeTab === "courses") return cAd?.data.data || [];
    return gAd?.data.data || [];
  }, [activeTab, tAd, cAd, gAd]);

  const paginationData = React.useMemo(() => {
    if (activeTab === "teachers") return tAd;
    if (activeTab === "courses") return cAd;
    return gAd;
  }, [activeTab, tAd, cAd, gAd]);

  // Fetch data when tab or page changes
  React.useEffect(() => {
    const initialParams = { page };
    console.log(initialParams);
    if (activeTab === "teachers") {
      fetchTAd(initialParams);
    } else if (activeTab === "courses") {
      fetchCAd(initialParams);
    } else {
      fetchGAd(initialParams);
    }
  }, [activeTab, page]);

  const isLoading =
    isFetchingTeachers || isFetchingCourses || isFetchingGeneral;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
        الإعلانات
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "column",
            xl: "row",
          },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: 1250 } }}
        >
          {/* أزرار التبويب */}
          <Box
            sx={{
              display: "flex",
              // justifyContent: "space-between",
              gap: 1,
              my: 1,
              mx: 2,
            }}
          >
            {["teachers", "courses", "general"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "contained" : "outlined"}
                onClick={() => {
                  setActiveTab(
                    tab as SetStateAction<"teachers" | "courses" | "general">
                  );
                  setPage(1);
                }}
                sx={{ borderRadius: 10 }}
              >
                {tab === "teachers"
                  ? "معلمين"
                  : tab === "courses"
                  ? "دورات"
                  : "عامة"}
              </Button>
            ))}
          </Box>

          {/* محتوى الإعلانات */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                s: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 1,
              px: 2,
              minHeight: 510, // "calc(100vh - 160px)",
              minWidth: 800,
            }}
          >
            {isLoading ? (
              <>
                {[1, 2, 3].map((item) => (
                  <AdsSkeleton key={item} />
                ))}
              </>
            ) : (
              adsData.map((item) => (
                <AdsCard key={item.id} advertisement={item} />
              ))
            )}
            {!isLoading && adsData.length == 0 && (
              <Typography
                variant="h6"
                sx={{ gridColumn: "1/-1", textAlign: "center" }}
              >
                لا توجد إعلانات متاحة
              </Typography>
            )}
          </Box>

          {paginationData && (
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 1, gap: 1 }}
            >
              <Button
                disabled={page == 1}
                onClick={() => handlePageChange(page - 1)}
              >
                السابق
              </Button>

              {Array.from(
                { length: paginationData.data.last_page },
                (_, i) => i + 1
              ).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "contained" : "outlined"}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}

              <Button
                disabled={page == paginationData.data.last_page}
                onClick={() => handlePageChange(page + 1)}
              >
                التالي
              </Button>
            </Box>
          )}
        </Box>
          <AdForm />
      </Box>
    </>
  );
};

export default AdsPage;
