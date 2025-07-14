import { Student } from "../interfaces/Student";

export const getStudentName = (student:Student | null) => {
    if (!student) return "";
    return `${student.first_name || ""} ${student.father_name || ""}  ${student.last_name || ""}`.trim();
  };