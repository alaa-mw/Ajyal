import { Curriculum } from "./Curriculum";
import { Student } from "./Student";

export interface Course{
    id: string;
    name: string;
    cost: string; 
    type: string; 
    start_date: string; 
    end_date: string; 
    code: string;
    capacity: number;
    created_at: string;
    updated_at: string;
    curriculums?: Curriculum[];
}


export interface CourseRegistrationsStudent {
    id: string;
    course_id: string;
    student_id: string;
    registered_at: string;
    created_at: string;
    updated_at: string;
    student: Student;
}

export interface CourseQuizzes{
    with_results?:QuizResult[],
    without_results?:QuizResult[]
}

export interface QuizResult {
  id: string,
  curriculum_teacher_id: string,
  topic_id: string,
  curriculum_id: string,
  name: string,
  type: string,
  available: number,
  start_time: string,
  duration: number,
  mean_result: number
}