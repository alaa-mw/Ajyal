import { Box, Card, Skeleton } from "@mui/material";
import theme from "../../styles/mainThem";

const AdsSkeleton = () => {
  return (
    <Card
      sx={{
        position: "relative",
        width: 270,
        height: 540,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {/* Skeleton للصورة الرئيسية */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          zIndex: 1,
          p: 1,
          borderRadius: 5,
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>

      {/* Skeleton للجزء السفلي */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60%",
          background: theme.palette.grey[200],
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        {/* Skeleton للنوع */}
        <Skeleton
          variant="rectangular"
          width={80}
          height={24}
          sx={{
            position: "absolute",
            top: -15,
            right: 16,
            borderRadius: 1,
            zIndex: 3,
          }}
        />

        {/* Skeleton للعنوان */}
        <Skeleton
          variant="text"
          width="80%"
          height={32}
          sx={{ mb: 1, zIndex: 3 }}
        />

        {/* Skeleton للنص */}
        <Skeleton
          variant="text"
          width="100%"
          height={72}
          sx={{ mb: 2, zIndex: 3 }}
        />

        {/* Skeleton للصور الإضافية */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 1,
          }}
        >
          {[1, 2, 3].map((img) => (
            <Skeleton
              key={img}
              variant="rectangular"
              width={60}
              height={60}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>

        {/* Skeleton للتاريخ */}
        <Skeleton
          variant="text"
          width={100}
          height={20}
          sx={{ alignSelf: "flex-end", mt: 1, zIndex: 3 }}
        />
      </Box>
    </Card>
  );
};

export default AdsSkeleton;
