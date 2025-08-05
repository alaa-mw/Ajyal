import { Skeleton, Paper, Box } from "@mui/material";
import theme from "../../styles/mainThem";

const TeacherCardSkeleton = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: 300,
        textAlign: "center",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        backgroundColor: theme.palette.tertiary.dark + "80",
      }}
    >
      <Skeleton
        variant="circular"
        width={120}
        height={120}
        sx={{
          border: "2px solid white",
          bgcolor: "grey",
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
          bottom: -50,
          position: "relative",
        }}
      />
      <Box
        sx={{
          backgroundColor: "white",
          width: "inherit",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 7,
          pb: 2,
          px: 2,
          boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Skeleton
          variant="text"
          width={150}
          height={32}
          sx={{
            mb: 1,
            borderRadius: 1,
          }}
        />
      </Box>
    </Paper>
  );
};

export default TeacherCardSkeleton;
