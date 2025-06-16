import { Typography, Paper, Avatar, Box } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Phone } from "@mui/icons-material";

const TeacherCard = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 3,
        minWidth: 250,
        textAlign: "center",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        sx={{
          bgcolor: "secondary.light",
          opacity: 0.6,
          width: 100,
          height: 100,
          fontSize: "2.5rem",
        }}
      />
      <Typography
        variant="h6"
        component="h1"
        sx={{
          mt: 2,
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        احمد محمد
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: "text.secondary",
        }}
      >
        الفيزياء
      </Typography>
      <Box display="flex">
        <MailIcon />
        <Phone />
      </Box>
    </Paper>
  );
};

export default TeacherCard;
