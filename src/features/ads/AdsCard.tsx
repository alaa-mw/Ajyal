import React from "react";
import logo from "../../../public/logo.png";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import theme from "../../styles/mainThem";

interface AdsCardProps {
  title: string;
  body: string;
  creation_date: string;
}

const AdsCard: React.FC<AdsCardProps> = ({ title, body, creation_date }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
        "&:hover": {
          boxShadow: 6,
        },
        borderRight: `12px solid ${theme.palette.secondary.main}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h6" m={0} component="div">
            {title}
          </Typography>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              bgcolor: "secondary.light",
              color: "primary.contrastText",
              borderRadius: 5,
              px: 1,
            }}
          >
            type
          </Box>
        </Box>
        <Accordion
          sx={{
            background: "transparent",
            boxShadow: "none",
            "&:before": {
              display: "none", // Removes the default border
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              padding: 0, // Remove default padding
              minHeight: "auto", // Remove default min-height
              "&.Mui-expanded": {
                minHeight: "auto", // Same height when expanded
              },
              "& .MuiAccordionSummary-content": {
                margin: "12px 0", // Adjust content margin
              },
            }}
          />
          <AccordionDetails
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                width: "100%",
                textAlign: "right", // RTL text alignment
              }}
            >
              {body}
            </Typography>

            <Box
              component="img"
              src={logo}
              alt="Ajyal logo"
              sx={{
                height: "150px",
                borderRadius: 2,
                alignSelf: "center", // Explicit center alignment
              }}
            />
          </AccordionDetails>
        </Accordion>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ fontWeight: "bold" }}
          >
            {creation_date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdsCard;
