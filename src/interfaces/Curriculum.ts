import { Course } from "./Course";
import { Subject } from "./Subject";

export interface Curriculum{
    id:string;
    course_id?:string;
    subject_id?:string;
    subject:Subject;
    course:Course;
}