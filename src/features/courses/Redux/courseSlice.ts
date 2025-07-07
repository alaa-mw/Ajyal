import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

export interface SubjectTeachers {
  subject_id: string;
  subject_name: string; // add this fix to assibn to if also 
  teachers: string[];
}

export interface CourseState {
  name: string;
  cost: string;
  type: string;
  capacity: string;
  start_date: string | null; 
  end_date: string | null;   
  classrooms: string[];
  subjects: SubjectTeachers[];
}

const initialState: CourseState = {
  name: '',
  cost: '',
  type: '',
  capacity: '',
  start_date: null,
  end_date: null,
  classrooms: [],
  subjects: [],
};

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateField: (state, action: PayloadAction<{field: string, value: any}>) => {
      const { field, value } = action.payload;
      state[field as keyof CourseState] = value;
    },

    toggleClassroom: (state, action: PayloadAction<{roomId: string, isChecked: boolean}>) => {
      const { roomId, isChecked } = action.payload;
      if (isChecked) {
        state.classrooms.push(roomId); // add
      } else {
        state.classrooms = state.classrooms.filter(id => id !== roomId); //remove
      }
    },

    addSubject: (state, action: PayloadAction<{subject_id: string, subject_name: string}>) => {
      const { subject_id, subject_name } = action.payload;
      if (!state.subjects.some(s => s.subject_id === subject_id)) {
        state.subjects.push({ 
          subject_id, 
          subject_name, 
          teachers: [] 
        });
      }
    },

    removeSubject: (state, action: PayloadAction<string>) => {
      state.subjects = state.subjects.filter(s => s.subject_id !== action.payload);
    },

    addTeacher: (state, action: PayloadAction<{subjectId: string, teacherIds: string[]}>) => {
      const { subjectId, teacherIds } = action.payload;
      const subject = state.subjects.find(s => s.subject_id === subjectId);
      if (subject) {
        subject.teachers = [...new Set([...subject.teachers, ...teacherIds])];
      }
    },
    removeTeacher: (state, action: PayloadAction<{subjectId: string, teacherId: string}>) => {
      const { subjectId, teacherId } = action.payload;
      const subject = state.subjects.find(s => s.subject_id === subjectId);
      if (subject) {
        subject.teachers = subject.teachers.filter(tid => tid !== teacherId);
      }
    },
    printCourseState(state) { 
      console.log(current(state));
    },
    resetCourse: () => initialState,
  },
});

export const {
  updateField,
  toggleClassroom,
  addSubject,
  removeSubject,
  addTeacher,
  removeTeacher,
  printCourseState,
  resetCourse,
} = courseSlice.actions;

export default courseSlice.reducer;