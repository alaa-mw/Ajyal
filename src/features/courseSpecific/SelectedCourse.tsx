import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import { Course } from "../../interfaces/Course";
import { formattedDate } from "../../utils/formatedDate";
import useFetchDataId from "../../hooks/useFetchDataId";

const SelectedCourse = ({ courseId }) => {
  console.log("cc", courseId);
  const theme = useTheme();
  const { data: response } = useFetchDataId<Course>(
    `/course/show/${courseId}`,
    courseId
  );
  const course = response?.data;
  console.log(response);
  // Calculate progress percentage between start and end dates
  const calculateProgress = () => {
    const start = new Date(course?.start_date as string).getTime();
    const end = new Date(course?.end_date as string).getTime();
    const now = new Date().getTime();

    if (now < start) return 0;
    if (now > end) return 100;

    return ((now - start) / (end - start)) * 100;
  };

  const progress = calculateProgress();
  const isCompleted = progress >= 100;
  const notStarted = progress <= 0;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        // minWidth: 300,
        // maxWidth: 500,
        boxShadow: 2,
        borderRadius: 2,
        overflow: "visible",
        mb:1
      }}
    >
      <CardContent sx={{ flex: 1, py: "7px !important" }}>
        {/* Header with name and code */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {course?.name}
          </Typography>
          <Chip
            label={course?.code}
            size="small"
            sx={{
              backgroundColor: theme.palette.grey[200],
              fontWeight: "medium",
            }}
          />
        </Box>

        {/* Details row */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-around"
          spacing={{ xs: 2, sm: 5 }}
          divider={
            <>
              {/* Show vertical divider on desktop */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Divider orientation="vertical"  />
              </Box>
              {/* Show horizontal divider on mobile */}
              <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
                <Divider orientation="horizontal" />
              </Box>
            </>
          }
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              المرحلة :
            </Typography>
            <Typography variant="body2">{course?.type}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              القسط الكامل :
            </Typography>
            <Typography variant="body2">{course?.cost}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              السعة الكلية :
            </Typography>
            <Typography variant="body2">{course?.capacity} طالب</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              عدد المسجلين :
            </Typography>
            <Typography variant="body2">{course?.capacity} طالب</Typography>
          </Box>
        </Stack>

        {/* Date range display */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {formattedDate(course?.start_date)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formattedDate(course?.end_date)}
          </Typography>
        </Box>

        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: isCompleted
              ? theme.palette.success.light
              : theme.palette.grey[200],
            "& .MuiLinearProgress-bar": {
              backgroundColor: isCompleted
                ? theme.palette.success.main
                : notStarted
                ? theme.palette.grey[400]
                : theme.palette.primary.main,
              borderRadius: 4,
            },
          }}
        />

        {/* Progress label */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="caption" color="text.secondary">
            {isCompleted
              ? "Completed"
              : notStarted
              ? "Not started"
              : `${Math.round(progress)}%`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SelectedCourse;
