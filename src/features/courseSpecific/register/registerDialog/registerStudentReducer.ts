import { Invoice } from "../../../../interfaces/Invoice";
import { Student } from "../../../../interfaces/Student";

// Define the state shape
export interface RegisterStudentState {
  activeStep: number;
  mode: "select" | "add";
  selectedStudent: Student | null;
  selectedInvoices: Invoice[];
  studentData: {
    first_name: string;
    last_name: string;
    father_name: string;
    mother_name: string;
    address: string;
    number_civial: string;
    class_level: string;
    birthdate: string;
  };
}

// Define action types for better type safety
export type RegisterStudentAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_MODE"; payload: "select" | "add" }
  | { type: "SET_STUDENT"; payload: Student | null }
  | { type: "TOGGLE_INVOICE"; payload: Invoice }
  | { type: "UPDATE_STUDENT_DATA"; payload: Partial<RegisterStudentState['studentData']> }
  | { type: "RESET" };

// Initial state for the reducer
export const initialState: RegisterStudentState = {
  activeStep: 0,
  mode: "select",
  selectedStudent: null,
  selectedInvoices: [],
  studentData: {
    first_name: "",
    last_name: "",
    father_name: "",
    mother_name: "",
    address: "",
    number_civial: "",
    class_level: "",
    birthdate: "",
  },
};

// The reducer function
export const registerStudentReducer = (
  state: RegisterStudentState,
  action: RegisterStudentAction
): RegisterStudentState => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, activeStep: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_STUDENT":
      return { ...state, selectedStudent: action.payload };
    case "TOGGLE_INVOICE": {
      const invoice = action.payload;
      const isSelected = state.selectedInvoices.some(
        (inv) => inv.id === invoice.id
      );
      return {
        ...state,
        selectedInvoices: isSelected
          ? state.selectedInvoices.filter((i) => i.id !== invoice.id)
          : [...state.selectedInvoices, invoice],
      };
    }
    case "UPDATE_STUDENT_DATA":
      return {
        ...state,
        studentData: { ...state.studentData, ...action.payload },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};