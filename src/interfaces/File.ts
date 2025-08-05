import { Subject } from "./Subject";

export interface file{
    
    id: string;
    title: string;
    file_path: string;
    curriculum_id: string;
    created_at:string;
    subject: Subject;
}