/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, current, Draft, PayloadAction } from '@reduxjs/toolkit';
import { Choice, Question, Quiz } from '../../../interfaces/Quiz';
import { createNewQuestion, findQuestion } from '../../../utils/questionUtils';

const initialState: Quiz = {
  mode:'create',
  isChange:false,
   id: '',
   curriculum_id: '',
   topic_id:'',
   name:'',
   type: 'Timed' ,
   available: 0,
   duration: 30,
   start_time: '',
   questions:[
    {
        mode:'create',
        isChange:false,
        id:'',
        parent_question_id: null,
        image: undefined,
        question_text: '',
        hint: '',
        mark:"1",
        choices: [
            { choice_text: "", is_correct: 0 },
            { choice_text: "", is_correct: 0 },
        ],
        children: [],
    },
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
        state.isChange=true;
    },
    
     updateQuizMode:(
        state: Draft<Quiz>,
        action: PayloadAction<{ value: "create" | "edit" }>
    ) => {
        const {value } = action.payload;
        state.mode= value;
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
        state.questions[questionIndex].isChange = true;
        console.log("true.......")
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
        state.questions[questionIndex].isChange = true;
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
        current.isChange = true; 
      }
    },

    addQuestion:(state: Draft<Quiz>)=>{
      const newQuestion = createNewQuestion( null);
        state.questions.push(newQuestion);
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
          
          parent.isChange = true;
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
          { choice_text: "", is_correct: 0 },
          { choice_text: "", is_correct: 0 },
        ];
      }
    },

    printQuizState(state) { 
      console.log(current(state));
    },

    resetQuiz: () => initialState,

    // for response 
    setQuizData: (state: Draft<Quiz>, action: PayloadAction<Quiz>) => {
      const {
        id,
        curriculum_id,
        topic_id,
        name,
        type,
        available,
        duration,
        start_time,
        questions = [],
        isChange = false,
        mode = 'edit'
      } = action.payload;

      // Update top-level quiz fields
      state.id = id;
      state.curriculum_id = curriculum_id;
      state.topic_id = topic_id;
      state.name = name;
      state.type = type;
      state.available = available;
      state.duration = duration;
      state.start_time = start_time;
      state.isChange = isChange;
      state.mode = mode;

      // Normalize and set questions
      state.questions = questions.map(question => ({
        ...question,
        isChange: false,
        mode:'edit',

        choices: question?.choices?.map(choice =>({
          ...choice,

        })),

        children: question.children?.map(child => ({
          ...child,
          isChange: false,
          mode:'edit',
          
          choices: child?.choices?.map(choice =>({
          ...choice,

        })),

        })) || []
      }));
    },
    setQuestionData: (state: Draft<Quiz>, action: PayloadAction<{ 
        path: number[]; 
        changes: Partial<Question>;
      }>) => {
        
      const { path, changes } = action.payload;
      const current = state.questions[path[0]]

      const {
        id,
        image,
        question_text,
        hint,
        choices = [],
        children = [],
        isChange = false,
        mode = 'edit'
      } = changes;
      current.id = id;
      current.image = image;
      current.question_text = question_text || '';
      current.hint = hint;
      current.isChange = isChange;
      current.mode = mode;

      current.choices = choices?.map(choice =>({
        ...choice
      })) ;

      current.children = children?.map(child => ({
          ...child,
          isChange: false,
          mode:'edit',
          choices: child?.choices?.map(choice =>({
          ...choice,

          }))
      }))
    },
  }
});

export const {
  updateQuizField,
  updateQuestion,
  updateChoice,
  updateNestedQuestion,
  addQuestion,
  addChildQuestion,
  removeQuestion,
  printQuizState,
  resetQuiz,
  setQuizData,
  setQuestionData,
  updateQuizMode
} = quizSlice.actions;

export default quizSlice.reducer;

