import { Student } from "./Student";

export interface Invoice{   
    id:string;
    value:number;
    due_date: string;
    created_at: string;
    updated_at: string;
}

export interface Payment{  // fix - back
    id:string;
    payment_date:string;
    invoice: Invoice;
}

export interface CourseRegistrationsStudent { // fix - back
    id: string;
    course_id: string;
    student_id: string;
    registered_at: string;
    created_at: string;
    updated_at: string;
    student: Student;
    payments:Payment[]
}