import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { Quiz } from "../../../interfaces/Quiz";
import { resetQuiz, setQuizData, printQuizState } from "../Redux/quizSlice";
import { RootState } from "../../../store";

export const useQuizStateManager = () => {
  const { quizId } = useParams();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz);

  const {
    data: fetchedQuiz,
    error,
    isLoading,
  } = useFetchDataId<Quiz>(`/quiz/all_questions/${quizId}`, quizId);

  useEffect(() => {
    console.log("fetchedQuiz", fetchedQuiz); // have 9 questions
    if (quiz.mode == 'create') {
      dispatch(resetQuiz());
      return;
    }

    if (fetchedQuiz) { // edit
      try {
        dispatch(setQuizData(fetchedQuiz.data));
      } catch (err) {
        showSnackbar("فشل تحميل بيانات الاختبار", "error");
        console.error("Error parsing quiz data:", err);
      }
    }
    dispatch(printQuizState());
  }, [quizId, fetchedQuiz, dispatch, showSnackbar]);

  return { error, isLoading };
};


