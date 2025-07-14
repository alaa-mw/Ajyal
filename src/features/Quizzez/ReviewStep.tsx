import { Typography, Box } from '@mui/material';
import { Quiz } from '../../interfaces/Quiz';

interface ReviewStepProps {
  quiz: Quiz;
}

export const ReviewStep = ({ quiz }: ReviewStepProps) => (
  <Box>
    <Typography variant="h5" gutterBottom>ملخص الاختبار</Typography>
    {/* Implement review content */}
  </Box>
);