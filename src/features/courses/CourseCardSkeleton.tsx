import React from "react";
import {
  Skeleton,
  Card,
  CardContent,
  Box,
  Divider,
  alpha,
} from "@mui/material";
import theme from "../../styles/mainThem";

const CourseCardSkeleton = () => {
  return (
    <Card
      sx={{
        width:280,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "16px",
      }}
    >
      {/* Header Skeleton */}
      <Box
        sx={{
          width: "100%",
          p: 2,
          backgroundColor: `${theme.palette.primary.main}80`,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton
            variant="text"
            width={120}
            height={30}
            sx={{ bgcolor: alpha(theme.palette.primary.contrastText, 0.5) }}
          />
          <Skeleton
            variant="rectangular"
            width={60}
            height={24}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Box>

      {/* Body Skeleton */}
      <CardContent sx={{ width: "100%", flexGrow: 1 }}>
        {/* Course Type and Code */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 16 }} />
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 16 }} />
        </Box>

        {/* Price and Capacity */}
        <Box display="flex" justifyContent="space-between" my={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={40} height={20} />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={60} height={20} />
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Dates Section */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Box>
              <Skeleton variant="text" width={60} height={15} />
              <Skeleton variant="text" width={80} height={20} />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Box>
              <Skeleton variant="text" width={60} height={15} />
              <Skeleton variant="text" width={80} height={20} />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCardSkeleton;