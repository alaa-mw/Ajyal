import React from "react";
import {
  Card,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  LinearProgress,
  useTheme,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { formattedDate } from "../../../utils/formatedDate"; // Assuming this utility exists
import { Course } from "../../../interfaces/Course";

// A smaller, reusable component for each stat card
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  bgColor: string;
}

const StatCard = ({ title, value, icon, bgColor }: StatCardProps) => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      borderRadius: "12px",
      backgroundColor: bgColor,
      color: "common.white",
      boxShadow: "none",
    }}
  >
    <Box sx={{ ml: 1 }}>
      {React.cloneElement(icon, {
        sx: { color: "common.white", fontSize: "2rem" },
      })}
    </Box>
    <Box>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Card>
);

interface CourseStatsProps {
  course?: Course;
  registeredCount: number;
}

const CourseStats = ({ course, registeredCount }: CourseStatsProps) => {
  const theme = useTheme();

  // Return a loading skeleton or null if course data is not yet available
  if (!course) {
    return (
      <Card sx={{ p: 2, borderRadius: "12px", boxShadow: 3 }}>
        <Box sx={{ textAlign: "center", height: 400 }}>Loading...</Box>
      </Card>
    );
  }

  // --- Progress Calculation Logic ---
  const calculateProgress = () => {
    const start = new Date(course.start_date).getTime();
    const end = new Date(course.end_date).getTime();
    const now = new Date().getTime();

    if (now < start) return 0;
    if (now > end) return 100;
    return ((now - start) / (end - start)) * 100;
  };

  const progress = calculateProgress();
  const isCompleted = progress >= 100;
  const notStarted = progress <= 0;

  let progressLabel;
  if (isCompleted) {
    progressLabel = "مكتملة";
  } else if (notStarted) {
    progressLabel = "لم تبدأ بعد";
  } else {
    progressLabel = `${Math.round(progress)}%`;
  }

  const stats = [
    {
      title: "الطلاب المسجلون",
      value: `${registeredCount} / ${course.capacity}`,
      icon: <PeopleAltIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: "نوع الدورة",
      value: course.type,
      icon: <SchoolIcon />,
      color: theme.palette.secondary.main,
    },
    {
      title: "القسط الكامل",
      value: `${course.cost}`,
      icon: <AttachMoneyIcon />,
      color: theme.palette.tertiary.dark,
    },
  ];

  return (
    <Card sx={{ p: 2.5, borderRadius: 3, boxShadow: 3, height: "80vh" }}>
      {/* Course Header */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {course.name}
        </Typography>
        <Chip
          label={course.code}
          size="small"
          sx={{ mt: 0.5, backgroundColor: theme.palette.grey[200] }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />

      {/* Stats Cards Section */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.color}
          />
        ))}
      </Stack>
      <Divider sx={{ my: 2 }} />

      {/* Progress Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1.5, fontWeight: "bold" }}>
          تقدم الدورة
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary">
            {formattedDate(course.start_date)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formattedDate(course.end_date)}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5, my: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2" color="text.secondary">
            {progressLabel}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CourseStats;
