import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Divider,
  CardActions,
  Skeleton,
} from "@mui/material";

const QuizCardSkeleton = () => {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        direction: "rtl",
        borderRadius: 4,
      }}
    >
      <CardActionArea sx={{ flexGrow: 1, p: 2 }}>
        <CardContent sx={{ p: 1 }}>
          {/* Header Skeleton */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Skeleton variant="text" width="60%" height={30} />
            <Skeleton
              variant="rectangular"
              width={70}
              height={24}
              sx={{ borderRadius: 16 }}
            />
          </Box>

          {/* Meta Info Skeleton */}
          <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                variant="circular"
                width={16}
                height={16}
                sx={{ ml: 1 }}
              />
              <Skeleton variant="text" width={80} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton
                variant="circular"
                width={16}
                height={16}
                sx={{ ml: 1 }}
              />
              <Skeleton variant="text" width={120} />
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>

      <Divider sx={{ mx: 2 }} />

      {/* Actions Footer Skeleton */}
      <CardActions sx={{ justifyContent: "space-between", p: 1.5 }}>
        <Skeleton
          variant="rectangular"
          width={80}
          height={24}
          sx={{ borderRadius: 16 }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton
            variant="rectangular"
            width={100}
            height={32}
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default QuizCardSkeleton;
