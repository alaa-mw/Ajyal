// Community Interface
// export interface Community {
//   Community_ID: string; 
//   Curriculum_ID: string; 
//   Title: string;
//   created_at: Date;
//   updated_at: Date;
// }

export interface Issue {
  id: string; 
  Community_ID: string; 
  Student_DoTeacher_ID: string; // fix - back
  Hashtag: string;
  body: string;
  IsFOA: boolean;
  file: string;
  created_at: Date;
  updated_at: Date;
}

export interface Reply {
  id: string; 
  Issues_ID: string; 
  Teacher_id: string; // fix - back
  body: string;
  file: string;
  created_at: Date;
  updated_at: Date;
}

