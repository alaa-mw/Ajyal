import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const QuizInfoStep = () => {
  const quiz = useSelector((state: RootState) => state.quiz);
  return (
    <Box component="form" px={4}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>المنهج الدراسي</InputLabel>
        <Select
          name="curriculum_id"
          value={quiz.curriculum_id}
          // onChange={onQuizChange}
        >
          <MenuItem value={1}> علوم - صيف 25</MenuItem>
          <MenuItem value={2}>علوم - مكثفة</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="subtitle1">الأقسام المقررة</Typography>
        <Box sx={{ ml: 1 }}>
          {[
            "الوحدة الأولى",
            "الوحدة الثانية",
            "الوحدة الثالثة",
            "الوحدة الرابعة",
            "الوحدة الخامسة",
          ].map((unit, index) => (
            <MenuItem key={index} value={unit}>
              <Checkbox
                checked={true} // Replace with your state variable
                onChange={(e) => console.log(e.target.checked)} // Add your handler
                value={index + 1}
              />
              <Typography>{unit}</Typography>
            </MenuItem>
          ))}
        </Box>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>نوع الاختبار</InputLabel>
        <Select
          name="type"
          value={quiz.type}
          // onChange={(e) =>
          //   onQuizChange(
          //     e as React.ChangeEvent<{ name?: string; value: unknown }>
          //   )
          // }
        >
          <MenuItem value="timed">اختبار محدود الوقت</MenuItem>
          <MenuItem value="worksheet">ورقة عمل</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          name="start_time"
          label="وقت البدء"
          type="datetime-local"
          value={quiz.start_time}
          // onChange={onQuizChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="duration"
          label="المدة (دقائق)"
          type="number"
          value={quiz.duration}
          // onChange={onQuizChange}
        />
      </Box>
    </Box>
  );
};
