import { Paper, Typography, Box, alpha, useTheme,  } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";


const InvoiceCard = ({ invoice, isSelected, isFuture, onClick }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={isSelected ? 8 : 2}
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 3,
        width: 150,
        opacity: isFuture ? 1 : 0.75,
        cursor: "pointer",
        border: "2px solid transparent",
        borderColor: isSelected ? "primary.main" : "transparent",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease-in-out",
        bgcolor: isFuture
          ? "background.paper"
          : alpha(theme.palette.grey[500], 0.1),
        "&:hover": {
          boxShadow: theme.shadows[8],
          borderColor: !isSelected ? "primary.light" : "primary.main",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <MonetizationOnIcon
          fontSize="small"
          sx={{ mr: 1, color: isFuture ? "secondary.main" : "text.disabled" }}
        />
        <Typography variant="h6" component="span" fontWeight="bold">
          ${invoice.value.toFixed(2)}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        فاتورة رقم #{invoice.id.split("-")[1]}
      </Typography>
    </Paper>
  );
};

export default InvoiceCard