import {
  Box,
  CircularProgress,
  CircularProgressProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import theme from "../../styles/mainThem";
import { Lock, MoreVert } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const QuizCard = () => {
  return (
    <Box
      display={"flex"}
      
      gap={4}
      sx={{
        p: 1,
        borderRadius: 2,
        backgroundColor: "white",
        borderRight: `7px solid ${theme.palette.tertiary.main}`,
        // boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
        boxShadow: 3,
        "&:hover": {
          bgcolor: grey[100],
          cursor: "pointer",
        },
      }}
    >
      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="subtitle1">اختبار الوحدة الثالثة</Typography>
        <Typography variant="caption" color="gray">
          اللغة الانكليزية
        </Typography>
      </Stack>

      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="subtitle2">مؤقت</Typography>
      </Stack>

      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <Lock sx={{ color: "gray" }} />
        <Typography variant="caption" color="gray">
          مغلق
        </Typography>
      </Stack>
      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgressWithLabel value={90} />
      </Stack>
      <Stack
        sx={{ width: 120, alignItems: "center", justifyContent: "center" }}
      >
        <IconButton
        // aria-label="more"
        // id="long-button"
        // aria-controls={open ? "long-menu" : undefined}
        // aria-expanded={open ? "true" : undefined}
        // aria-haspopup="true"
        // onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
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
