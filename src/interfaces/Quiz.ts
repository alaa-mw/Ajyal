export interface Choice {
  id?: string;
  question_id?: string;
  choice_text: string;
  is_correct: boolean;
}

export interface Question {
  id?: string;
  quiz_id?: string;
  parent_question_id: string | null;
  image?: string;
  mark?: number;
  question_text: string;
  hint?: string;
  choices: Choice[];
  children?: Question[];
  expanded?: boolean;
}

export interface Quiz {
  id?: string;
  curriculum_id: string;
  type: 'timed' | 'worksheet';
  available: boolean;
  duration: number;
  image?: string;
  start_time: string;
  end_time: string;
  questions: Question[];
}