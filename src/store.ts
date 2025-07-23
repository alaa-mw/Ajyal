import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './features/auth/Redux/authSlice';
import courseReducer, { CourseState } from './features/courses/Redux/courseSlice';
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these paths in the state
      ignoredPaths: [
        'quiz.questions.*.image.file',
        'quiz.questions.*.image._file',
        /^quiz\.questions\.\d+\.image\.file$/,
        /^quiz\.questions\.\d+\.image\._file$/
      ],
      // Ignore these field paths in all actions
      ignoredActionPaths: [
        'payload.changes.image.file',
        'payload.image.file',
        'payload.image._file',
        /changes\.image\.file$/,
        /image\.file$/,
        /image\._file$/
      ]
    }
  })
});