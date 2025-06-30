import React, { useState } from "react";
import QuizCard from "./QuizCard";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import theme from "../../styles/mainThem";

const labels = ["العنوان", "النوع", "الحالة", "معدل النجاح", "المزيد"];
const itemsPerPage = 5; // Number of items to show per page

const QuizList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 12; // Total number of quiz items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate which items to display on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = Array.from({ length: totalItems })
    .slice(startIndex, endIndex)
    .map((_, index) => startIndex + index);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
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
              bgcolor: theme.palette.tertiary.main,
              color: "white",
              borderRadius: 5,
              p: 0.5,
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Quiz cards container without scroll */}
      <Stack spacing={2} sx={{ borderRadius: 2 }}>
        {currentItems.map((itemIndex) => (
          <QuizCard key={`quiz-card-${itemIndex}`} />
        ))}
      </Stack>

      {/* Pagination controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme.palette.tertiary.main,
              borderColor: theme.palette.tertiary.main,
            },
            "& .Mui-selected": {
              backgroundColor: theme.palette.tertiary.main,
              color: "#fff",
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default QuizList;


// import QuizCard from "./QuizCard";
// import { Box, Stack, Typography } from "@mui/material";
// import theme from "../../styles/mainThem";
// const labels = ["العنوان", "النوع", "الحالة", "معدل النجاح", "المزيد"];
// const QuizList = () => {
//   return (
//     <Stack>
//       <Box display={"flex"} gap={4} paddingX={3.5} mb={2}>
//         {labels.map((item) => (
//           <Typography
//             sx={{
//               width: 120,
//               textAlign: "center",
//               bgcolor: theme.palette.tertiary.main,
//               color: "white",
//               borderRadius: 5,
//               p: 0.5,
//             }}
//           >
//             {item}
//           </Typography>
//         ))}
//       </Box>
//       {/* Vertical scrollable cards container */}
//       <Box
//         sx={{
//           height: "470px", // Fixed height for scroll container
//           overflowY: "auto",
//           pr: 0.5, // Space for scrollbar
//           pt:0.5,
//           // Custom scrollbar styling
//           "&::-webkit-scrollbar": {
//             width: "4px",
//           },
//           "&::-webkit-scrollbar-track": {
//             background: theme.palette.grey[100],
//             borderRadius: "4px",
//           },
//           "&::-webkit-scrollbar-thumb": {
//             background: theme.palette.grey[400],
//             borderRadius: "4px",
//             "&:hover": {
//               background: theme.palette.grey[500],
//             },
//           },
//         }}
//       >
//         <Stack
//           spacing={2}
//           sx={{ borderRadius: 2}}
//         >
//           {Array.from({ length: 12 }).map((_, index) => (
//             <QuizCard key={`quiz-card-${index}`} />
//           ))}
//         </Stack>
//       </Box>
//     </Stack>
//   );
// };

// export default QuizList;