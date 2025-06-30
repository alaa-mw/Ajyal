import { Box, Typography } from "@mui/material";
import StudentsTable from "../students/StudentsTable";
import StudentsWaitList from "../students/StudentsWaitList";
const courseRegisterPage = () => {
  return (
     <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
        }}
      >
        التسجيل والشعب
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "column", lg: "row" },
          gap: 4,
        }}
      >
        <StudentsTable/>
        <StudentsWaitList/>
      </Box>
    </>
  )
}

export default courseRegisterPage