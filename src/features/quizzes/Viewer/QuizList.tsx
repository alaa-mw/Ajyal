import { useNavigate } from "react-router-dom";
import {
  Grid,
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import QuizCard from "./QuizCard";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { Quiz } from "../../../interfaces/Quiz";
import { Add } from "@mui/icons-material";
import useFetchData from "../../../hooks/useFetchData";
import { Curriculum } from "../../../interfaces/Curriculum";
import { useState } from "react";

const QuizList = () => {
  const navigate = useNavigate();
  const [cId, setCId] = useState<string>();
  const { data: quizzes } = useFetchDataId<Quiz[]>(
    `/quiz/all_quizzes_for_curriculum/${cId}`,
    cId
  );

  const { data: teacherCurriculum } = useFetchData<Curriculum[]>(
    "/teacher/get-all-my-subjects-with-course"
  );

  const handleQuizClick = (quizId: string) => {
    const available = quizzes?.data.find((q) => q.id == quizId)?.available;

    if (available === 1) {
      navigate(`/teacher/quizzes/${quizId}`, {
        // Full path including /teacher
        state: { from: location.pathname },
      });
    } else if (available === 0) {
      navigate(`/teacher/quizzes/create/${quizId}`, {
        // Full path including /teacher
        state: { from: location.pathname },
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        الاختبارات
      </Typography>
      <Box display={"flex"} justifyContent={"space-between"}>
        <FormControl  sx={{ width:300, mb: 2 }}>
          <InputLabel>المنهج الدراسي</InputLabel>
          <Select
            name="curriculum_id"
            value={cId || ""}
            onChange={(e) => setCId(e.target.value)}
          >
            <MenuItem value="">اختر المنهج الدراسي</MenuItem>{" "}
            {/* Default empty option */}
            {teacherCurriculum?.data.map((tc) => (
              <MenuItem key={tc.id} value={tc.id}>
                {`${tc.subject.name} - ${tc.course.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add sx={{ ml: 2 }} />}
          onClick={() => navigate("/teacher/quizzes/create/new")}
          sx={{
            mb: 2,
            fontWeight: "bold",
            px: 2,
            py: 1,
            borderRadius: 20,
          }}
        >
          إضافة اختبار
        </Button>
      </Box>
      <Grid container spacing={3}>
        {quizzes?.data.map((quiz) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={quiz.id}>
            <QuizCard quiz={quiz} onClick={handleQuizClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default QuizList;
