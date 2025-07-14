import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import { formattedDate } from "../../utils/formatedDate";
import { Course } from "../../interfaces/Course";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course , onClick }) => {
  
  // Determine course status
  const currentDate = new Date();
  const startDate = new Date(course.start_date);
  const endDate = new Date(course.end_date);

  let status = "لم يبدأ بعد";
  let statusColor = "default";

  if (currentDate >= startDate && currentDate <= endDate) {
    status = "نشط";
    statusColor = "success";
  } else if (currentDate > endDate) {
    status = "منتهي";
    statusColor = "error";
  }

  return (
    <Card
     onClick={onClick} // Use the passed onClick
      sx={{
        width: 300,
        m: 2,
        boxShadow: 3,
        "&:hover": {
          cursor: "pointer",
          boxShadow: 6, // Example: stronger shadow on hover
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {course.name}
          </Typography>
          <Chip
            label={status}
            color={statusColor as "success" | "error"}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          نوع الدورة: {course.type}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          الكود: {course.code}
        </Typography>

        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography variant="body2" color="text.secondary">
            السعر: {course.cost} $
          </Typography>
          <Typography variant="body2" color="text.secondary">
            السعة: {course.capacity}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2">
            <Box component="span" fontWeight="bold">
              تاريخ البدء:
            </Box>
            <br />
            {formattedDate(course.start_date)}
          </Typography>
          <Typography variant="body2" textAlign="right">
            <Box component="span" fontWeight="bold">
              تاريخ الانتهاء:
            </Box>
            <br />
            {formattedDate(course.end_date)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
