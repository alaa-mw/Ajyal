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
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import useFetchData from "../../../hooks/useFetchData";
import { Curriculum } from "../../../interfaces/Curriculum";
import { printQuizState, updateQuizField } from "../Redux/quizSlice";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Subject } from "../../../interfaces/Subject";
import useFetchDataId from "../../../hooks/useFetchDataId";
import useSendData from "../../../hooks/useSendData";
import { setQuizData } from "../Redux/quizSlice";
import { Quiz } from "../../../interfaces/Quiz";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { RTLTimeDatePicker } from "../../../components/common/RTLTimeDatePicker";

export interface QuizStepRef {
  saveQuiz: () => Promise<void>;
}

export const QuizInfoStep = forwardRef<QuizStepRef | undefined>(
  function QuizInfoStep(props, ref) {
    const { showSnackbar } = useSnackbar();
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

    const { mutate: createQuiz } = useSendData<Quiz>("/quiz/create");
    const { mutate: updateQuiz } = useSendData<Quiz>("/quiz/update");

    useEffect(() => {
      dispatch(printQuizState());
    }, [quiz]);

    useEffect(() => {
      const selectedCurriculum = teacherCurriculum?.data.find(
        (tc) => tc.id === quiz.curriculum_id
      );
      setSId(selectedCurriculum?.subject_id);
    }, [quiz.curriculum_id]);

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

    // const handleTopicChange = (e: SelectChangeEvent<string>) => {
    //   const topicId = e.target.value as unknown as string;

    //   handleQuizFieldChange("topic_id", e.target.value);

    //   const selectedTopic = sTopics?.data.topics.find((tc) => tc.id == topicId);
    //   if (selectedTopic?.topic_name) {
    //     handleQuizFieldChange("name", `اختبار ${selectedTopic?.topic_name}`);
    //   }
    // };

    const prepareQuizData = () => ({
      quiz_id: quiz.id,
      curriculum_id: quiz.curriculum_id,
      topic_id: quiz.topic_id,
      name: quiz.name,
      type: quiz.type,
      available: quiz.available,
      duration: quiz.duration,
      start_time: quiz.start_time,
    });

    const handleQuizSave = () => {
      console.log("handleQuizSave");
      return new Promise<void>((resolve, reject) => {
        if (quiz.isChange && quiz.mode == "create") {
          createQuiz(prepareQuizData(), {
            onSuccess: (response) => {
              console.log(response.data);
              showSnackbar(response.message, "success");
              dispatch(
                setQuizData({
                  ...response.data,
                  isChange: false,
                })
              );
              resolve();
            },
            onError: (error) => {
              showSnackbar(error.message, "error");
              reject(error);
            },
          });
        } else if (quiz.isChange && quiz.mode == "edit") {
          updateQuiz(prepareQuizData(), {
            onSuccess: (response) => {
              showSnackbar(response.message, "success");
              dispatch(
                setQuizData({
                  ...response.data,
                  isChange: false,
                })
              );
              resolve();
            },
            onError: (error) => {
              showSnackbar(error.message, "error");
              reject(error);
            },
          });
        } else if (!quiz.isChange && quiz.mode == "create") {
          showSnackbar(
            "لا يمكنك المتابعة دون تعبئة معلومات الاختبار لإنشائه",
            "error"
          );
          reject("please create quiz before !");
        } else if (quiz.mode == "edit") {
          resolve();
        }
      });
    };

    const saveQuiz = async () => {
      await handleQuizSave();
    };

    useImperativeHandle(ref, () => ({
      saveQuiz,
    }));

    return (
      <Box component="form" px={4}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>المنهج الدراسي</InputLabel>
          <Select
            name="curriculum_id"
            value={quiz.curriculum_id || ""}
            onChange={(e) =>
              handleQuizFieldChange("curriculum_id", e.target.value)
            }
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
          {/* قم بإزالة الـ MenuItem واستخدام Box أو أي Container آخر  */}
          <Box sx={{ ml: 1 }}>
            {sTopics?.data.topics.map((t) => (
              <Box key={t.id} sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={quiz.topic_id === t.id}
                  onChange={() => handleQuizFieldChange("topic_id", t.id)} // قم بتمرير الـ ID مباشرة
                />
                <Typography>{t.topic_name}</Typography>
              </Box>
            ))}
          </Box>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            name="name"
            label="عنوان الاختبار"
            value={quiz.name || ""}
            onChange={(e) => handleQuizFieldChange("name", e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>نوع الاختبار</InputLabel>
          <Select
            name="type"
            value={quiz.type || ""}
            onChange={(e) => handleQuizFieldChange("type", e.target.value)}
          >
            <MenuItem value="Timed">اختبار محدود الوقت</MenuItem>
            <MenuItem value="worksheet">ورقة عمل</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <RTLTimeDatePicker
            label="تاريخ البدء"
            value={quiz.start_time}
            minDate={new Date()} // current date and time.
            onChange={(value) => handleQuizFieldChange("start_time", value)}
            disabled={quiz.type == "worksheet"} // handle
          />

          <TextField
            // fullWidth
            sx={{ mb: 2 }}
            name="duration"
            label="المدة (دقائق)"
            type="number"
            inputProps={{
              min: 5,
              step: 5,
            }}
            value={quiz.duration || ""}
            onChange={(e) =>
              handleQuizFieldChange("duration", Number(e.target.value))
            }
            disabled={quiz.type == "worksheet"}
          />
        </Box>
      </Box>
    );
  }
);
