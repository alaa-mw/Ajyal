import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { Quiz } from "../../../interfaces/Quiz";
import { resetQuiz, setQuizData, printQuizState } from "../Redux/quizSlice";

export const useQuizStateManager = () => {
  const { quizId } = useParams();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // const [isWaiting, setIsWaiting] = useState(true);

  const {
    data: fetchedQuiz,
    error,
    isLoading,
  } = useFetchDataId<Quiz>(`/quiz/all_questions/${quizId}`, quizId);

  useEffect(() => {
    console.log("**************fetchedQuiz", fetchedQuiz);

    if (!quizId) {
      dispatch(resetQuiz());
      // setIsWaiting(false);
      return;
    }

    if (fetchedQuiz) {
      try {
        console.log("edit");
        dispatch(setQuizData(fetchedQuiz.data));
        // setIsWaiting(false);
      } catch (err) {
        showSnackbar("فشل تحميل بيانات الاختبار", "error");
        console.error("Error parsing quiz data:", err);
        // setIsWaiting(false);
      }
    }
    dispatch(printQuizState());
    // console.log("isWaiting", isWaiting);
  }, [quizId, fetchedQuiz, dispatch]);

  return { error, isLoading };
};

// export const useQuizStateManager = () => {
//   const { quizId } = useParams();
//   const { showSnackbar } = useSnackbar();
//   const dispatch = useDispatch();
//   const quiz = useSelector((state: RootState) => state.quiz);
//   let wait = true;
//   const {
//     data: fetchedQuiz,
//     error,
//     isLoading,
//   } = useFetchDataId<Quiz>(`/quiz/all_questions/${quizId}`, quizId);

//   useEffect(() => {
//     console.log("**************fetchedQuiz", fetchedQuiz);
//     if (quiz.mode == "create") {
//       dispatch(resetQuiz());
//       return;
//     }

//     if (fetchedQuiz) {
//       // edit
//       try {
//         console.log("edit");
//         dispatch(setQuizData(fetchedQuiz.data));
//       } catch (err) {
//         showSnackbar("فشل تحميل بيانات الاختبار", "error");
//         console.error("Error parsing quiz data:", err);
//       }
//     }
//     dispatch(printQuizState());
//     wait = false;
//     console.log("wait",wait)
//   }, [quizId, fetchedQuiz, dispatch]);

//   return { error, isLoading, wait };
// };
