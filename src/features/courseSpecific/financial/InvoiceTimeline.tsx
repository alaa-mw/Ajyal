import  { useState } from "react";
import {  Typography, Box, alpha, useTheme, Stack } from "@mui/material";
import { format, isPast, parseISO } from "date-fns";

// --- Icons ---
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InvoiceCard from "./InvoiceCard";
// --- Mock Data ---
// In a real app, this would come from props or an API call.
const mockInvoices = [
  { id: "inv-001", value: 250.75, dueDate: "2025-07-15T10:00:00Z" },
  { id: "inv-002", value: 150.0, dueDate: "2025-08-01T10:00:00Z" },
  { id: "inv-003", value: 320.5, dueDate: "2025-08-20T10:00:00Z" },
  { id: "inv-004", value: 450.0, dueDate: "2025-09-05T10:00:00Z" },
  { id: "inv-005", value: 80.25, dueDate: "2025-09-25T10:00:00Z" },
  { id: "inv-006", value: 600.0, dueDate: "2025-10-15T10:00:00Z" },
].sort((a, b) => Number(new Date(a.dueDate)) - Number(new Date(b.dueDate))); // Ensure invoices are sorted by date

const InvoiceTimeline = () => {
 const theme = useTheme();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  // Updated handler: any invoice can be selected now.
  const handleInvoiceClick = (invoiceId) => {
    setSelectedInvoiceId((prevId) => (prevId === invoiceId ? null : invoiceId));
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        bgcolor: "background.default",
        borderRadius: 4,
        direction: "rtl",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4, textAlign: "center" }}
      >
        الجدول الزمني للفواتير
      </Typography>
      <Box sx={{ overflowX: "auto", p: 4 }}>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            position: "relative",
            alignItems: "center",
            minHeight: 280,
            minWidth: "fit-content", // Ensures the container is wide enough for all items
            py: 4,
          }}
        >
          {/* Central Horizontal Line */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "4px",
              bgcolor: "divider",
              transform: "translateY(-50%)",
            }}
          />

          {mockInvoices.map((invoice) => {
            const dueDate = parseISO(invoice.dueDate);
            const isFutureInvoice = !isPast(dueDate);
            const isSelected = selectedInvoiceId === invoice.id;
           
            let dotColor = theme.palette.grey[500];
            let icon = <CheckCircleOutlineIcon fontSize="small" />;
            if (isFutureInvoice) {
              dotColor = isSelected
                ? theme.palette.primary.main
                : theme.palette.secondary.main;
              icon = <ScheduleIcon fontSize="small" />;
            }

            return (
              <Box
                key={invoice.id}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  top: -35,
                }}
              >
                <InvoiceCard
                  invoice={invoice}
                  isSelected={isSelected}
                  isFuture={isFutureInvoice}
                  onClick={() => handleInvoiceClick(invoice.id)}
                />

                {/* 2. The Dot on the line */}
                <Box
                  sx={{
                    order: 2,
                    height: "32px",
                    width: "32px",
                    borderRadius: "50%",
                    bgcolor: alpha(dotColor, 0.15),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: dotColor,
                    border: `3px solid ${theme.palette.background.default}`,
                    boxShadow: isSelected
                      ? `0 0 15px ${alpha(theme.palette.primary.main, 0.7)}`
                      : "none",
                    transition: "all 0.3s ease-in-out",
                    zIndex: 1,
                    my:1,
                  }}
                >
                  {icon}
                </Box>

                <Box
                  sx={{
                    order: 3,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: "medium" }}
                  >
                    {format(dueDate, "dd MMM yyyy")}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};


export default InvoiceTimeline