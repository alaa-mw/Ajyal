import { Course } from "./Course";
import { Subject } from "./Subject";
import { Teacher } from "./Teacher";

export interface Curriculum{
    id:string;
    course_id?:string;
    subject_id?:string;
    subject:Subject;
    teachers:Teacher[];
    course:Course;
}