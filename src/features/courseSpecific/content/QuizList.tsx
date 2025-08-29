
import React, { useState } from "react";
import QuizCard from "./QuizCard";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import theme from "../../../styles/mainThem";
import { QuizResult } from "../../../interfaces/Course";

interface QuizListProps {
  quizzes?: QuizResult[];
}

const labels = ["العنوان",
   "النوع", 
    "تاريخ التقدم", 
   "متوسط ​​النتيجة",
    "النتائج"];
const itemsPerPage = 5;

const QuizList = ({ quizzes = [] }: QuizListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalItems = quizzes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuizzes = quizzes.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Function to determine quiz status based on available property
  const getQuizStatus = (quiz: QuizResult) => {
    return quiz.available === 1 ? "مفتوح" : "مغلق";
  };

  // Function to calculate success rate (you might want to adjust this logic)
  const getSuccessRate = (quiz: QuizResult) => {
    return quiz.mean_result || 0;
  };

  return (
    <Stack spacing={2}>
      <Box display={"flex"} gap={4} paddingX={3.5} mb={2}>
        {labels.map((item, index) => (
          <Typography
            key={`label-${index}`}
            sx={{
              width: 120,
              textAlign: "center",
              bgcolor: theme.palette.primary.light,
              color: "white",
              borderRadius: 5,
              p: 0.5,
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Quiz cards */}
      <Stack spacing={2} sx={{ borderRadius: 2 }}>
        {currentQuizzes.map((quiz) => (
          <QuizCard 
            key={quiz.id} 
            quiz={quiz}
            successRate={getSuccessRate(quiz)}
            status={getQuizStatus(quiz)}
          />
        ))}
        
        {quizzes.length === 0 && (
          <Typography textAlign="center" color="text.secondary" py={4}>
            لا توجد اختبارات
          </Typography>
        )}
      </Stack>

      {/* Pagination - only show if there are multiple pages */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
              },
              "& .Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: "#fff",
              },
            }}
          />
        </Box>
      )}
      
    </Stack>
  );
};

export default QuizList;