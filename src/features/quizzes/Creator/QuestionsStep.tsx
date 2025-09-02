import { Box, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import QuestionSelected from "./QuestionSelected";
import { useEffect, useState } from "react";
import { addQuestion, setQuestionData } from "../Redux/quizSlice";
import { AddCircle } from "@mui/icons-material";
import { findQuestion } from "../../../utils/questionUtils";
import useSendData from "../../../hooks/useSendData";
import { Question } from "../../../interfaces/Quiz";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { forwardRef, useImperativeHandle } from "react";

export interface QuestionsStepRef {
  saveLastQuestion: () => Promise<void>;
}

export const QuestionsStep = forwardRef<QuestionsStepRef | undefined>(
  function QuestionsStep(props, ref) {
    const { showSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const quiz = useSelector((state: RootState) => state.quiz);
    const [selectedPath, setSelectedPath] = useState<number[]>([0]);

    const { mutate: createQuestion } =
      useSendData<Question>("/question/create");
    const { mutate: updateQuestion } =
      useSendData<Question>("/question/update");

    const prepareQuestionData = (q: Question) => ({
      question_id: q.id,
      image: q.image?.file,
      question_text: q.question_text,
      hint: q.hint,
      mark: q.mark,
      choices: q.choices,
      children: q.children,
    });

    const handleQuestionSave = (path: number[]) => {
      return new Promise<void>((resolve, reject) => {
        const question = findQuestion(quiz.questions, path);
        if (!question || !quiz.id) {
           showSnackbar("لا سؤال","info");
          resolve()}
          ;
        if( question?.isChange == false){// now
          showSnackbar("لا تغيير على السؤال","info");
           resolve();
        }
        if (question?.isChange && question.mode === "create") {
          createQuestion(
            {
              ...prepareQuestionData(question),
              quiz_id: quiz.id,
            },
            {
              onSuccess: (response) => {
                console.log("createRes",response.data);
                showSnackbar(response.message, "success");
                dispatch(
                  setQuestionData({
                    path,
                    changes: response.data,
                  })
                );
                resolve();
              },
              onError: (error) => {
              console.log("erroooooor");
                showSnackbar(error.message, "error");
                reject(error);
              },
            }
          );
        } else if (question?.isChange && question.mode === "edit") {
          updateQuestion(prepareQuestionData(question), {
            onSuccess: (response) => {
                console.log("updateRes",response.data);
              showSnackbar(response.message, "success");
              dispatch(
                setQuestionData({
                  path,
                  changes: response.data,
                })
              );
              resolve();
            },
            onError: (error) => {
              console.log("erroooooor");
              showSnackbar(error.message, "error");
              reject(error);
            },
          });
        }
        // showSnackbar("النهاية","info");
        // resolve();
      });
    };

    const saveLastQuestion = async () => {
      await handleQuestionSave(selectedPath);
    };

    useImperativeHandle(ref, () => ({
      saveLastQuestion,
    }));
    
    // Handle path changes and auto-save previous question
    const handleQuestionSelect = (index: number) => {
      handleQuestionSave(selectedPath);
      setSelectedPath([index]);
    };

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "Enter") {
          e.preventDefault();
          handleQuestionSelect((selectedPath[0] + 1) % quiz.questions.length);
        } else if (e.ctrlKey && e.key === "ArrowUp") {
          e.preventDefault();
          handleQuestionSelect(
            (selectedPath[0] - 1 + quiz.questions.length) %
              quiz.questions.length
          );
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedPath, quiz.questions.length]);

    return (
      <Box
        display="flex"
        sx={{ height: "100%" }}
        gap={{ xs: 0.2, md: 2 }}
        px={{ md: 4 }}
      >
        <Stack direction="column" spacing={1} sx={{ width: "10%" }}>
          <Button
            startIcon={<AddCircle sx={{ ml: 1 }} fontSize="small" />}
            size="small"
            sx={{ mt: 1 }}
            onClick={() => dispatch(addQuestion())}
          >
            إضافة سؤال
          </Button>
          {quiz.questions.map((_, index) => (
            <Button
              key={index}
              variant={selectedPath[0] === index ? "contained" : "outlined"}
              onClick={() => handleQuestionSelect(index)}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transform:
                  selectedPath[0] === index ? "scaleX(1.1)" : "scaleX(1)",
                transition: "transform 0.2s ease-in-out",
                minWidth: "auto",
                px: { xs: 1, md: 2 },
                "&::before": {
                  content: {
                    xs: `"${index + 1}"`,
                    md: `"السؤال ${index + 1}"`,
                  },
                  display: "inline-block",
                },
              }}
            />
          ))}
        </Stack>

        <Box sx={{ width: "85%" }}>
          {selectedPath.length > 0 && <QuestionSelected path={selectedPath} />}
        </Box>
      </Box>
    );
  }
);
