export interface Choice {
  id?: number;
  question_id?: number;
  choice_text: string;
  is_correct: boolean;
}

export interface Question {
  id?: number;
  quiz_id?: number;
  parent_question_id: number | null;
  image?: string;
  mark: number;
  question_text: string;
  hint?: string;
  choices: Choice[];
  children?: Question[];
  expanded?: boolean;
}

export interface Quiz {
  id?: number;
  curriculum_id: number;
  type: 'timed' | 'worksheet';
  available: boolean;
  duration: number;
  image?: string;
  start_time: string;
  end_time: string;
  questions: Question[];
}