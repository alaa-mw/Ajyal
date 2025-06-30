import {
  Typography,
  Paper,
  Avatar,
  Box,
  Link,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Phone } from "@mui/icons-material";
import { Teacher } from "../../interfaces/Teacher";
import getImageUrl from "../../services/image-url";
import theme from "../../styles/mainThem";

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => (
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
      backgroundColor: theme.palette.tertiary.dark,
    }}
  >
    <Avatar
      src={teacher.image ? getImageUrl(teacher?.image.path) : ""}
      sx={{
        border: "2px solid white",
        bgcolor: "grey",
        width: 120,
        height: 120,
        fontSize: "2.5rem",
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)", // Top shadow
        zIndex: 1,
        bottom: -50,
      }}
    />
    <Box
      sx={{
        backgroundColor: "white",
        width: "inherit",
        borderRadius: "20px ",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: 7,
        pb: 2,
        px: 2,
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)", // Top shadow
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        {teacher.name}
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap">
        {teacher.subjects?.map((sub) => (
          <Box key={sub.id} display="flex" alignItems="center">
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {sub.name}
            </Typography>
          </Box>
        ))}
      </Box>
      {/* Accordion */}
      <Accordion sx={{ width: "100%", boxShadow: "none" }}>
        <AccordionSummary
          sx={{
            minHeight: "auto",
            padding: 0,
            "& .MuiAccordionSummary-content": {
              my: 1,
              display: "flex",
              justifyContent: "center",
              flexGrow: 0,
            },
            "&.Mui-expanded": {
              minHeight: "auto !important",
              my: 0,
            },
          }}
        >
          <Typography variant="body2" color="text.secondary">
            التفاصيل
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderRadius: 1,
            borderRight: `2px solid ${theme.palette.tertiary.main}`,
            padding: 0.5,
          }}
        >
          {/* bio */}
          <Typography variant="body2" textAlign={"right"}>
            {teacher.bio}
          </Typography>
          {/* date */}
          <Typography variant="body2" color="grey">
            تاريخ العقد:{" "}
            {new Date(teacher?.date_of_contract).toLocaleDateString()}
          </Typography>
          {/* Email & phone */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <Tooltip title={`Email: ${teacher.email}`} arrow placement="top">
              <Link
                href={`mailto:${teacher.email}`}
                underline="none"
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <MailIcon color="inherit" />
              </Link>
            </Tooltip>
            <Tooltip
              title={`Call: ${teacher.phone_number}`}
              arrow
              placement="top"
            >
              <Link
                href={`tel:${teacher.phone_number}`}
                underline="none"
                sx={{
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <Phone color="inherit" />
              </Link>
            </Tooltip>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  </Paper>
);

export default TeacherCard;
