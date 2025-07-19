/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, current, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Choice, Question, Quiz } from '../../../interfaces/Quiz';
import { createNewQuestion, findQuestion } from '../../../utils/questionUtils';

const initialState: Quiz = {
   id: '',
   curriculum_id: '',
   type: 'timed' ,
   available: false,
   duration: 30,
   image: '',
   start_time: '',
   end_time: '',
   questions:[
    {
        id:'',
        parent_question_id: null,
        image: '',
        question_text: '',
        hint: '',
        choices: [
            { choice_text: "", is_correct: false },
            { choice_text: "", is_correct: false },
        ],
        children: [],
        expanded: false,
    },{
        id:'',
        parent_question_id: null,
        image: '',
        question_text: '',
        hint: '',
        choices: [
            { choice_text: "", is_correct: false },
            { choice_text: "", is_correct: false },
        ],
        children: [],
        expanded: true,
    },{
        id:'',
        parent_question_id: null,
        image: '',
        question_text: '',
        hint: '',
        choices: [
            { choice_text: "", is_correct: false },
            { choice_text: "", is_correct: false },
        ],
        children: [],
        expanded: true,
    }
    ]
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // For top-level quiz fields
    updateQuizField: <K extends keyof Quiz>(
        state: Draft<Quiz>,
        action: PayloadAction<{ field: K; value: Quiz[K] }>
    ) => {
        const { field, value } = action.payload;
        state[field] = value;
    },
    
    // For question fields
    updateQuestion: <K extends keyof Question> (
        state: Draft<Quiz>,
        action: PayloadAction<{
        questionIndex: number;
        field: K;
        value: Question[K]; // Can refine further
        }>
    ) => {
        const { questionIndex, field, value } = action.payload;
        state.questions[questionIndex][field] = value;
    },
    
    // For choice fields
    updateChoice:<K extends keyof Choice> (
        state: Draft<Quiz>,
        action: PayloadAction<{
        questionIndex: number;
        choiceIndex: number;
        field: K;
        value: Choice[K]; // Can refine further
        }>
    ) => {
        const { questionIndex, choiceIndex, field, value } = action.payload;
        state.questions[questionIndex].choices[choiceIndex][field] = value;
    },

    // For nested questions
    updateNestedQuestion: (
      state: Draft<Quiz>,
      action: PayloadAction<{
        path: number[];
        changes: Partial<Question>;
      }>
    ) => {
      const { path, changes } = action.payload;
      let current: Draft<Question> | undefined = state.questions[path[0]];
      
      for (let i = 1; i < path.length; i++) {
        current = current?.children?.[path[i]];
      }
      
      if (current) {
        Object.assign(current, changes);
      }
    },

    addChildQuestion: (
      state: Draft<Quiz>,
      action: PayloadAction<{ path: number[] }>
    ) => {
      const { path } = action.payload;
      
      // Prevent adding more than 2 levels (parent + child)
      if (path.length >= 2) {
        console.error("Cannot add more than two levels of questions");
        return;
      }

      // Create new question with empty choices if it's a parent question
      const newQuestion = createNewQuestion(
        path.length > 0 ? findQuestion(state.questions, path)?.id || null : null
      );

      if (path.length === 0) {
        // Add to root questions
        state.questions.push(newQuestion);
      } else {
        // Add to nested questions
        const parent = findQuestion(state.questions, path);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(newQuestion);
          
          // If adding first child, remove choices from parent
          if (parent.children.length === 1 && parent.choices?.length) {
            parent.choices = [];
          }
        }
      }
    },


    removeQuestion: (
      state: Draft<Quiz>,
      action: PayloadAction<{ path: number[] }>
    ) => {
      const { path } = action.payload;
      console.log(path)
       // Handle empty path case
      if (path.length === 0) return;

      // Case 1: Removing root-level question
      if (path.length === 1) {
        const indexToRemove = path[0];
        if (indexToRemove >= 0 && indexToRemove < state.questions.length) {
          state.questions.splice(indexToRemove, 1); // remove by specific index
        }
        return;
      }

      // Case 2: Removing nested question
      const parentPath = path.slice(0, -1);
      const indexToRemove = path[path.length - 1];
      
      const parent = findQuestion(state.questions,parentPath);

      // Remove the question
      if (parent?.children && parent.children.length > 0) {
        parent.children.splice(indexToRemove, 1);
      }
      // If last child was removed, restore default choices to parent
      if (parent?.children?.length === 0) {
        parent.choices = [
          { choice_text: "", is_correct: false },
          { choice_text: "", is_correct: false },
        ];
      }
    },

    printQuizState(state) { 
      console.log(current(state));
    },

    resetCourse: () => initialState,
  },
});

export const {
  updateQuizField,
  updateQuestion,
  updateChoice,
  updateNestedQuestion,
  addChildQuestion,
  removeQuestion,
  printQuizState,
  resetCourse,
} = quizSlice.actions;

export default quizSlice.reducer;

