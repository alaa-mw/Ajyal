// mockData.js
export const communities = [
  {
    Community_ID: 1,
    Curriculum_ID: 101,
    Title: "Math Community",
    created_at: "2024-01-01",
    updated_at: "2024-05-01",
  },
];

export const issues = [
  {
    Issues_ID: 1,
    Community_ID: 1,
    Student_ID: 201,
    Teacher_ID: null,
    Hashtag: "#algebra",
    body: "How do I solve quadratic equations?",
    IsFQA: false,
    file: null,
    created_at: "2024-06-01",
    updated_at: "2024-06-05",
  },
  {
    Issues_ID: 2,
    Community_ID: 1,
    Student_ID: 202,
    Teacher_ID: null,
    Hashtag: "#geometry",
    body: "What is the Pythagorean theorem?",
    IsFQA: true,
    file: null,
    created_at: "2024-06-03",
    updated_at: "2024-06-05",
  },
];

export const replies = [
  {
    Answer_ID: 1,
    Issues_ID: 1,
    Teacher_ID: 301,
    body: "Use the quadratic formula: ax²+bx+c=0 → x=(-b±√(b²-4ac))/2a",
    file: null,
    created_at: "2024-06-02",
    updated_at: "2024-06-02",
  },
  {
    Answer_ID: 2,
    Issues_ID: 2,
    Teacher_ID: 301,
    body: "In a right triangle: a²+b²=c²",
    file: null,
    created_at: "2024-06-04",
    updated_at: "2024-06-04",
  },
];
