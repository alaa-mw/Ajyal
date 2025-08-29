import { Image } from "./Image";
import { Student } from './Student';

export interface Choice {
  id?: string;
  question_id?: string;
  choice_text: string;
  is_correct: 0 | 1;
}

export interface Question {
  mode: 'create' | 'edit';
  isChange: boolean;
  id?: string;
  quiz_id?: string;
  parent_question_id: string | null;
  image?: Image ;
  mark?: string;
  question_text: string;
  hint?: string;
  choices: Choice[];
  children?: Question[];
}

export interface Quiz {
  mode: 'create' | 'edit';
  isChange:boolean;
  id: string;
  curriculum_id: string;
  topic_id: string;
  name:string;
  type: 'Timed' | 'worksheet';
  available: number;
  duration: number;
  start_time: string;
  questions: Question[];
  max_degree?:string;
  student_quizzes?:StudentResult[];
}

export interface StudentResult{
  id:string;
  result:number;
  student:Student;
}