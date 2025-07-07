import { configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from './features/auth/Redux/authSlice';
import courseReducer,{ CourseState } from './features/courses/Redux/courseSlice';

export interface RootState {
  auth: AuthState;
  course: CourseState;
}

export default configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
})