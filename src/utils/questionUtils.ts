import { Question } from "../interfaces/Quiz";

export const createNewQuestion = (parentId: string | null = null): Question => ({
  parent_question_id: parentId,
  question_text: '',
  choices: [
    { choice_text: '', is_correct: false },
    { choice_text: '', is_correct: false },
  ],
  children: [],
  expanded: true,
  mark: 1,
});

export const findQuestion = (questions: Question[], path: number[]): Question | undefined => {
  
  let current: Question | undefined = questions[path[0]];
  if (!current) return undefined;

  // Navigate through the nested structure
  for (let i = 1; i < path.length; i++) {
    if (!current.children) return undefined;
    
    current = current.children[path[i]];
    if (!current) return undefined;
  }
  
  return current;
};