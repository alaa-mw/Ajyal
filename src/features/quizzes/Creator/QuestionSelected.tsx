import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  AddCircle,
  RemoveCircle,
  QuestionAnswerOutlined,
} from "@mui/icons-material";
import { Question } from "../../../interfaces/Quiz";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  addChildQuestion,
  printQuizState,
  removeQuestion,
  updateNestedQuestion,
} from "../Redux/quizSlice";
import { findQuestion } from "../../../utils/questionUtils";
import theme from "../../../styles/mainThem";
import { useEffect } from "react";
import { ImageUploader } from "../../../components/common/ImageUploader";
import { Image } from "../../../interfaces/Image";
import useSendData from "../../../hooks/useSendData";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface QuestionSelectedProps {
  path: number[];
}

const QuestionSelected = ({ path = [] }: QuestionSelectedProps) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  const questions = useSelector((state: RootState) => state.quiz.questions);
  const question = useSelector((state: RootState) =>
    findQuestion(state.quiz.questions, path)
  );

  const { mutate: deleteQuestion } = useSendData("/question/delete");
  useEffect(() => {
    dispatch(printQuizState());
  }, [question]);

  useEffect(() => {
    console.log("image", question?.image);
  }, [question?.image]);

  if (!question) return null;

  const hasChildren = question.children && question.children.length > 0;
  console.log(path);

  const handleQuestionFieldChange = <K extends keyof Question>(
    field: K,
    value: Question[K]
  ) => {
    dispatch(
      updateNestedQuestion({
        path,
        changes: { [field]: value } as Partial<Question>,
      })
    );
  };

  const handleChoiceTextChange = (cIndex: number, value: string) => {
    const updatedChoices = [...question.choices];
    updatedChoices[cIndex] = {
      ...updatedChoices[cIndex],
      choice_text: value,
    };
    dispatch(
      updateNestedQuestion({
        path,
        changes: { choices: updatedChoices },
      })
    );
  };

  const handleAddChoice = () => {
    const newChoice = { choice_text: "", is_correct: 0 as 0 | 1 };
    dispatch(
      updateNestedQuestion({
        path,
        changes: { choices: [...question.choices, newChoice] },
      })
    );
  };

  const handleRemoveChoice = (cIndex: number) => {
    const updatedChoices = question.choices.filter((_, i) => i !== cIndex);
    dispatch(
      updateNestedQuestion({
        path,
        changes: { choices: updatedChoices },
      })
    );
  };

  const handleAddChildQuestion = () => {
    dispatch(addChildQuestion({ path }));
  };

  const handleRemoveQuestion = () => {
    if (path.length <= 1) {
      // parent
      deleteQuestion(
        {
          question_id: findQuestion(questions, path)?.id,
        },
        {
          onSuccess: (response) => {
            showSnackbar(response.message, "success");

            dispatch(removeQuestion({ path }));
          },
          onError: (error) => {
            showSnackbar(error.message, "error");
          },
        }
      );
    } else {
      dispatch(removeQuestion({ path }));
    }
  };

  const handleImageChange = (images: Image[]) => {
    // Store serializable data in Redux
    dispatch(
      updateNestedQuestion({
        path,
        changes: {
          image: images[0],
        },
      })
    );
  };

  return (
    <Box
      sx={{
        border: `2px solid transparent`,
        backgroundImage: `
      linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}),
      linear-gradient(to bottom, 
        ${theme.palette.primary.main}, 
        ${theme.palette.secondary.main}70,
        ${theme.palette.primary.main}10
      )
    `,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        mb: 2,
        ml: path.length * 1,
        zIndex: -2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            borderRight: `4px solid ${theme.palette.primary.main}95`,
            px: 1,
          }}
        >
          <QuestionAnswerOutlined />
          <Typography variant="subtitle1">
            {path.length === 1
              ? `السؤال ${path[0] + 1}`
              : `السؤال الفرعي ${path[path.length - 1] + 1}`}
          </Typography>
        </Box>

        <Box>
          <IconButton
            size="small"
            onClick={handleAddChildQuestion}
            color="primary"
            disabled={path.length > 1}
          >
            <AddCircle fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleRemoveQuestion} color="error">
            <RemoveCircle fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <>
        <Box sx={{ display: "flex", mb: 1, gap: 2 }}>
          <TextField
            fullWidth
            label="نص السؤال"
            multiline
            rows={2}
            value={question.question_text}
            sx={{ bgcolor: "white" }}
            onChange={(e) =>
              handleQuestionFieldChange("question_text", e.target.value)
            }
          />
          {path.length === 1 && (
            <ImageUploader // change to conveint image filed in quiz, when sand to server send as api
              maxImages={1}
              selectedImages={question.image ? [question.image] : []}
              setSelectedImages={handleImageChange}
            />
          )}
        </Box>

        {question?.choices?.length !== 0 && (
          <>
            <TextField
              fullWidth
              label="تلميح/توضيح"
              value={question.hint || ""}
              onChange={(e) =>
                handleQuestionFieldChange("hint", e.target.value)
              }
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
              الخيارات (حدد الإجابات الصحيحة)
            </Typography>

            {question.choices.map((choice, cIndex) => (
              <Box
                key={cIndex}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <Checkbox
                  checked={Boolean(choice.is_correct)}
                  onChange={(e) => {
                    // Only set to true if it's being checked
                    if (e.target.checked) {
                      // Create new choices array with all is_correct set to false
                      const updatedChoices = question.choices.map(
                        (ch, idx) => ({
                          ...ch,
                          is_correct: (idx === cIndex ? 1 : 0) as 0 | 1,
                        })
                      );
                      // Update the entire choices array
                      dispatch(
                        updateNestedQuestion({
                          path,
                          changes: { choices: updatedChoices },
                        })
                      );
                    }
                  }}
                />
                <TextField
                  fullWidth
                  value={choice.choice_text}
                  onChange={(e) =>
                    handleChoiceTextChange(cIndex, e.target.value)
                  }
                  placeholder={`الخيار ${cIndex + 1}`}
                />
                <IconButton
                  onClick={() => handleRemoveChoice(cIndex)}
                  disabled={question.choices.length <= 2}
                  color="error"
                  size="small"
                >
                  <RemoveCircle fontSize="small" />
                </IconButton>
              </Box>
            ))}

            <Button
              startIcon={<AddCircle sx={{ ml: 1 }} fontSize="small" />}
              onClick={handleAddChoice}
              size="small"
              sx={{ mt: 1 }}
              disabled={question.choices.length > 3}
            >
              إضافة خيار
            </Button>
          </>
        )}

        {hasChildren && question.children && (
          <Box sx={{ mt: 2, pl: 1 }}>
            <Typography
              variant="subtitle1"
              color={theme.palette.secondary.light}
            >
              عدد الأسئلة الفرعية: ({question.children.length})
            </Typography>

            {question.children.map((_, index) => (
              <QuestionSelected key={index} path={[...path, index]} />
            ))}
          </Box>
        )}
      </>
    </Box>
  );
};

export default QuestionSelected;
