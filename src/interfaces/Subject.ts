 export interface Subject {
  id: string;
  name: string;
  subject_code: string;
  type: "الصف التاسع" | "البكالوريا العلمية" | "البكالوريا الأدبية";
  description: string;
  archived: number | boolean; // 0/1 can be treated as boolean if preferred
  created_at: string; // or Date if you'll convert it
  updated_at: string; // or Date if you'll convert it
}

export interface SubjectsByGradeDynamic {
  [gradeLevel: string]: Subject[];
}