import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Stack,
  Typography,
} from "@mui/material";
import theme from "../../styles/mainThem";

const QuizCard = () => {
  return (
    <Box
      display={"flex"}
      gap={4}
      sx={{ borderBottom: `5px solid ${theme.palette.tertiary.main}` }}
    >
      <Stack>
        <Typography variant="subtitle1">اختبار الوحدة الثالثة</Typography>
        <Typography variant="caption" color="gray">
          اللغة الانكليزية
        </Typography>
      </Stack>

      <Stack>
        <CircularProgressWithLabel value={90} />
        <Typography variant="caption" color="gray">
          المعدل
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="subtitle2">مغلق</Typography>
        <Typography variant="caption" color="gray">
          الحالة
        </Typography>
      </Stack>
    </Box>
  );
};

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
export default QuizCard;
