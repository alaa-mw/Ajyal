import { createSlice, current } from '@reduxjs/toolkit'

// 1. تعريف واجهة للحالة
export interface AuthState {
  userToken: string | null;
  userRole: string | null;
  userEndpoint: string | null;
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState : AuthState = {
    userToken: null,
    userRole: null,
    userEndpoint:null,
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
      state.userToken = action.payload.token;
      state.userRole = action.payload.role;
      state.userEndpoint = action.payload.endpoint;
      state.userId = action.payload.id;
      state.isLoading = false;

      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userRole', action.payload.role);
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
    setUserEndpoint(state, action) {
      state.userEndpoint = action.payload;
    },
    printState(state) { //fix
      console.log(current(state));
    }
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logoutSuccess,
  setUserEndpoint,
  printState
} = authSlice.actions;

export default authSlice.reducer;