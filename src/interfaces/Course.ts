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
}

export interface classRoom{
    id: string;
    class_number: string;
}

export interface CourseRegistrationsStudent {
    id: number;
    course_id: number;
    student_id: number;
    registered_at: string;
    created_at: string;
    updated_at: string;
    student: Student;
}