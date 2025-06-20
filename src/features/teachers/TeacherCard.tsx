// import { Typography, Paper, Avatar, Box, Stack } from "@mui/material";
// import MailIcon from "@mui/icons-material/Mail";
// import { Phone } from "@mui/icons-material";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import InfoIcon from "@mui/icons-material/Info";
// import { Teacher } from "../../interfaces/Teacher";

// const TeacherCard = ({
//   name,
//   email,
//   date_of_contract,
//   phone_number,
//   image,
//   bio,
// }: Teacher) => {
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 3,
//         width: 300,
//         textAlign: "center",
//         borderRadius: 3,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 2,
//       }}
//     >
//       <Avatar
//         src={image?.path}
//         sx={{
//           bgcolor: "secondary.light",
//           width: 100,
//           height: 100,
//           fontSize: "2.5rem",
//           "& img": {
//             objectFit: "cover",
//           },
//         }}
//       >
//         {!image && name.charAt(0)}
//       </Avatar>

//       <Box>
//         <Typography variant="h5" component="h2" fontWeight="bold">
//           {name}
//         </Typography>
//       </Box>

//       {bio && (
//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <InfoIcon color="action" />
//           <Typography variant="body2">{bio}</Typography>
//         </Box>
//       )}

//       <Stack spacing={1} width="100%" alignItems="flex-start">
//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <MailIcon color="action" />
//           <Typography variant="body1">{email}</Typography>
//         </Box>

//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <Phone color="action" />
//           <Typography variant="body1">{phone_number}</Typography>
//         </Box>

//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <CalendarTodayIcon color="action" />
//           <Typography variant="body1">
//             {new Date(date_of_contract).toLocaleDateString()}
//           </Typography>
//         </Box>
//       </Stack>
//     </Paper>
//   );
// };

// export default TeacherCard;
import { Typography, Paper, Avatar } from "@mui/material";
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
    
        <MailIcon /> 
        <Phone />
      
    </Paper>
  );
};

export default TeacherCard;