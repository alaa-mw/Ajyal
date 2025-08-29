import { ClassRoom } from "./ClassRoom";

export interface TodayAbsence{
classrooms_with_absence:ClassRoomsAbsence[];
classrooms_without_absence:ClassRoomsAbsence[];
}

export interface ClassRoomsAbsence{
    classroom_id:string;
    class_room:ClassRoom;
}