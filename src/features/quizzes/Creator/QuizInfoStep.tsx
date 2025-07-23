import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../../../hooks/useFetchData";
import { Curriculum } from "../../../interfaces/Curriculum";
import { Quiz } from "../../../interfaces/Quiz";
import { printQuizState, updateQuizField } from "../Redux/quizSlice";
import { useEffect, useState } from "react";
import { Subject } from "../../../interfaces/Subject";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { RTLDatePicker } from "../../../components/common/RTLDatePicker";

export const QuizInfoStep = () => {  // make mode create or update send frpm parent   
  // fix - handle update - handle confirm to become outside
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz);
  const [sId, setSId] = useState<string | undefined>();

  const { data: teacherCurriculum } = useFetchData<Curriculum[]>(
    "/teacher/get-all-my-subjects-with-course"
  );

  const { data: sTopics } = useFetchDataId<Subject>(
    `/subjects/${sId}/with-topics`,
    sId
  );

  useEffect(() => {
    dispatch(printQuizState());
    console.log(teacherCurriculum);
  }, [quiz, teacherCurriculum]);

  const handleQuizFieldChange = <K extends keyof Quiz>(
    field: K,
    value: Quiz[K]
  ) => {
    dispatch(
      updateQuizField({
        field,
        value,
      })
    );
  };

  const handleCurriculumChange = (e: SelectChangeEvent<string>) => {
    const curriculumId = e.target.value as unknown as string;
    handleQuizFieldChange("curriculum_id", curriculumId);

    const selectedCurriculum = teacherCurriculum?.data.find(
      (tc) => tc.id === curriculumId
    );
    setSId(selectedCurriculum?.subject_id);
  };

  const handleTopicChange = (e: SelectChangeEvent<string>) => {
    const topicId = e.target.value as unknown as string;

    handleQuizFieldChange("topic_id", e.target.value);

    const selectedTopic = sTopics?.data.topics.find((tc) => tc.id == topicId);
    if (selectedTopic?.topic_name) {
      handleQuizFieldChange("name", `اختبار ${selectedTopic?.topic_name}`);
    }
  };

  return (
    <Box component="form" px={4}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>المنهج الدراسي</InputLabel>
        <Select
          name="curriculum_id"
          value={quiz.curriculum_id || ""}
          onChange={handleCurriculumChange}
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

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          الأقسام المقررة
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "0.85rem",
              mx: 0.5,
            }}
          >
            (ادخل المنهج الدراسي لإتاحة الأقسام)
          </Typography>
        </Typography>
        <Box sx={{ ml: 1 }}>
          {sTopics?.data.topics.map((t, index) => (
            <MenuItem key={index} value={t.id}>
              <Checkbox
                checked={quiz.topic_id == t.id}
                onChange={handleTopicChange}
                value={t.id}
              />
              <Typography>{t.topic_name}</Typography>
            </MenuItem>
          ))}
        </Box>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          fullWidth
          name="name"
          label="عنوان الاختبار"
          value={quiz.name}
          onChange={(e) => handleQuizFieldChange("name", e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>نوع الاختبار</InputLabel>
        <Select
          name="type"
          value={quiz.type}
          onChange={(e) => handleQuizFieldChange("type", e.target.value)}
        >
          <MenuItem value="Timed">اختبار محدود الوقت</MenuItem>
          <MenuItem value="worksheet">ورقة عمل</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <RTLDatePicker
          label="تاريخ البدء"
          value={quiz.start_time}
          onChange={(value) => handleQuizFieldChange("start_time", value)}
          disabled={quiz.type == "worksheet"} // handle
        />

        <TextField
          fullWidth
          sx={{ mb: 2 }}
          name="duration"
          label="المدة (دقائق)"
          type="number"
          inputProps={{
            min: 5,
            step: 5,
          }}
          value={quiz.duration}
          onChange={(e) =>
            handleQuizFieldChange("duration", Number(e.target.value))
          }
          disabled={quiz.type == "worksheet"}
        />
      </Box>
    </Box>
  );
};
