import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Checkbox, Typography } from '@mui/material';
import {  Quiz } from '../../interfaces/Quiz';

interface QuizInfoStepProps {
  quiz: Quiz;
  onQuizChange: (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => void;
}

export const QuizInfoStep = ({ quiz, onQuizChange }: QuizInfoStepProps) => (
  <Box component="form">
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>المنهج الدراسي</InputLabel>
      <Select
        name="curriculum_id"
        value={quiz.curriculum_id}
        onChange={onQuizChange}
      >
        <MenuItem value={1}>المنهج 1</MenuItem>
        <MenuItem value={2}>المنهج 2</MenuItem>
      </Select>
    </FormControl>

    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>نوع الاختبار</InputLabel>
      <Select
        name="type"
        value={quiz.type}
        onChange={(e) => onQuizChange(e as React.ChangeEvent<{ name?: string; value: unknown }>)}
      >
        <MenuItem value="timed">اختبار محدود الوقت</MenuItem>
        <MenuItem value="worksheet">ورقة عمل</MenuItem>
      </Select>
    </FormControl>

    <TextField
      fullWidth
      sx={{ mb: 2 }}
      name="duration"
      label="المدة (دقائق)"
      type="number"
      value={quiz.duration}
      onChange={onQuizChange}
    />

    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        fullWidth
        name="start_time"
        label="وقت البدء"
        type="datetime-local"
        value={quiz.start_time}
        onChange={onQuizChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        name="end_time"
        label="وقت الانتهاء"
        type="datetime-local"
        value={quiz.end_time}
        onChange={onQuizChange}
        InputLabelProps={{ shrink: true }}
      />
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        name="available"
        checked={quiz.available}
        onChange={onQuizChange}
      />
      <Typography>جعل الاختبار متاحًا فورًا</Typography>
    </Box>
  </Box>
);