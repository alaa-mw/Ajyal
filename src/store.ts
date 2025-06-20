import { configureStore } from '@reduxjs/toolkit'
import authReducer, { AuthState } from './features/auth/Redux/authSlice';

export interface RootState {
  auth: AuthState;
  // يمكنك إضافة شرائح أخرى هنا إذا كان لديك
}

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})