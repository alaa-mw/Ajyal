import { Student } from "./Student";

export interface Invoice{   
    id:string;
    value:number;
    due_date: string;
    created_at: string;
    updated_at: string;
    payments:Payment;
}

export interface Payment{  // fix - back
    id:string;
    payment_date:string;
    invoice: Invoice;
}

export interface InvoiceStudentPayments{
    paid_students:Student[];
    unpaid_students:Student[];

}
export interface StudentInvoicesPaid{
    student:Student;
    paid_invoices:Invoice[];
    unpaid_invoices:Invoice[];

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

export interface CoursePayments{
    payments:CPayments[];
}
export interface CPayments{
    payment_id:string;
    invoice_id:string;
    invoice_value: number;
    payment_date: string; 
    student_id: string;
    student_name: string;
}