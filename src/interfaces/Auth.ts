export interface Auth{
    token?: string;
    role?: ["secretariat" | "manager" | "teacher"];
}