import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  CardActionArea,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { formattedDate } from "../../utils/formatedDate";
import { Course } from "../../interfaces/Course";

// Icons for better visual representation
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import theme from "../../styles/mainThem";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  // --- Course status logic ---
  const currentDate = new Date();
  const startDate = new Date(course.start_date);
  const endDate = new Date(course.end_date);

  let status = "لم يبدأ بعد";
  let statusColor: "default" | "success" | "error" = "default";

  if (currentDate >= startDate && currentDate <= endDate) {
    status = "نشط";
    statusColor = "success";
  } else if (currentDate > endDate) {
    status = "منتهي";
    statusColor = "error";
  }
  // --- End of status logic ---

  return (
    <Card
      sx={{
        width:310,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: "16px", // Softer, more modern radius
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 8px 20px -5px ${alpha(
            theme.palette.primary.dark,
            0.2
          )}`,
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* === Card Header === */}
        <Box
          sx={{
            width: "100%",
            p: 2,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {course.name}
            </Typography>
            <Chip
              label={status}
              color={statusColor}
              size="small"
              sx={{
                // Custom background and text color for default status to match previous design
                backgroundColor:
                  statusColor === "default"
                    ? theme.palette.grey[400]
                    : undefined,
                color: "#fff",
              }}
            />
          </Box>
        </Box>

        {/* === Card Body === */}
        <CardContent sx={{ width: "100%", flexGrow: 1 }}>
          {/* === MODIFIED SECTION === */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            {/* Chip for Course Type */}
            <Chip
              icon={<BookmarkBorderIcon sx={{ color: "white !important" }} />} // Ensure icon is also white
              label={course.type}
              variant="filled"
              size="small"
              sx={{
                backgroundColor: "secondary.light", // Use a valid theme color
                color: "white", // Make label text white
                px: 1,
              }}
            />
            {/* Chip for Course Code */}
            <Chip
              label={course.code}
              size="small"
              variant="outlined"
              sx={{
                color: "grey.700",
                fontWeight: "bold",
                borderColor: "grey.400",
              }}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            my={2}
            color="text.secondary"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <MonetizationOnIcon fontSize="small" />
              <Typography variant="body2">{course.cost} $</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <PeopleOutlineIcon fontSize="small" />
              <Typography variant="body2">{course.capacity} طالب</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* === Dates Section === */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  تاريخ البدء
                </Typography>
                <Typography variant="body2" fontWeight="500">
                  {formattedDate(course.start_date)}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Box textAlign="left">
                <Typography variant="caption" color="text.secondary">
                  تاريخ الانتهاء
                </Typography>
                <Typography variant="body2" fontWeight="500">
                  {formattedDate(course.end_date)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
