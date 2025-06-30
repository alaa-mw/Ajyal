import { createSlice, current } from '@reduxjs/toolkit'
// 1. تعريف واجهة للحالة
export interface AuthState {
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState : AuthState = {
    userId: null,
    isLoading: false,
    error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userRole', action.payload.role);
    
      state.isLoading = false;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      return initialState; // إعادة تعيين كامل للحالة
    },
    setUserId(state, action) {
      state.userId = action.payload.userId;
    },
    printState(state) { //fix
      console.log(current(state));
      console.log(localStorage.getItem('authToken'));
      console.log(localStorage.getItem('userRole'));
    }
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logoutSuccess,
  setUserId,
  printState
} = authSlice.actions;

export default authSlice.reducer;