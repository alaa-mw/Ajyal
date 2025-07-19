import { configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from './features/auth/Redux/authSlice';
import courseReducer,{ CourseState } from './features/courses/Redux/courseSlice';
import quizReducer from './features/quizzes/Redux/quizSlice';
import { Quiz } from './interfaces/Quiz';

export interface RootState {
  auth: AuthState;
  course: CourseState;
  quiz: Quiz;
}

export default configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    quiz: quizReducer,
  },
})