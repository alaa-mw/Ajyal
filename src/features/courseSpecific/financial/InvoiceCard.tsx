import { Paper, Typography, Box, alpha, useTheme,  } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Invoice } from '../../../interfaces/Invoice';

interface InvoiceCardProps {
  invoice: Invoice;
  isSelected: boolean;
  isFuture: boolean;
  onClick: () => void;
}

const InvoiceCard = ({ invoice, isSelected, isFuture, onClick }: InvoiceCardProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={isSelected ? 8 : 2}
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 3,
        width: 150,
        opacity: isFuture ? 0.75 :1 ,
        cursor: "pointer",
        border: "2px solid transparent",
        borderColor: isSelected ? "primary.main" : "transparent",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        transition: "all 0.3s ease-in-out",
        bgcolor: isFuture
          ? alpha(theme.palette.grey[500], 0.1)//"background.paper"
          : alpha(theme.palette.tertiary.light, 1),
        "&:hover": {
          boxShadow: theme.shadows[8],
          borderColor: !isSelected ? "primary.light" : "primary.main",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <MonetizationOnIcon
          fontSize="small"
          sx={{ mr: 1, color: isFuture ?  "text.disabled":"tertiary.dark"  }}
        />
        <Typography variant="h6" component="span" fontWeight="bold">
          ${Number(invoice.value).toFixed(2)}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary" >
        فاتورة رقم #{invoice.id}
      </Typography>
    </Paper>
  );
};

export default InvoiceCard