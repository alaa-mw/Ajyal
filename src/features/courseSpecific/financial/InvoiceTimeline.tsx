import { useState } from "react";
import {
  Typography,
  Box,
  alpha,
  useTheme,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import { isPast, parseISO } from "date-fns";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Invoice } from "../../../interfaces/Invoice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InvoiceCard from "./InvoiceCard";
import { formattedDate } from "../../../utils/formatedDate";
import InvoiceStudentsPayments from "./InvoiceStudentsPayments";

const InvoiceTimeline = () => {
  const theme = useTheme();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const navigate = useNavigate();
  const { selectedCourseId } = useSelectedCourse();
  const { data: invoices } = useFetchDataId<Invoice[]>(
    `/invoice/allInvoices/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );

  invoices?.data.sort(
    (a, b) => Number(new Date(a.due_date)) - Number(new Date(b.due_date))
  ); // Ensure invoices are sorted by date

  // Updated handler: any invoice can be selected now.
  const handleInvoiceClick = (invoiceId) => {
    setSelectedInvoiceId((prevId) => (prevId === invoiceId ? null : invoiceId));
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 4,
        direction: "rtl",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 270,
      }}
    >
      {" "}
      {invoices?.data.length ? (
        <Box sx={{ overflowX: "auto", p: 2 }}>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              position: "relative",
              alignItems: "end",
              height: 160,
              minWidth: "fit-content", // Ensures the container is wide enough for all items
            }}
          >
            {/* Central Horizontal Line */}
            <Box
              sx={{
                position: "absolute",
                top: "80%",
                left: 0,
                right: 0,
                height: "4px",
                bgcolor: "divider",
                transform: "translateY(-50%)",
              }}
            />

            {invoices.data.map((invoice) => {
              const dueDate = parseISO(invoice.due_date);
              const isFutureInvoice = !isPast(dueDate);
              const isSelected = selectedInvoiceId === invoice.id;

              let dotColor = isSelected
                ? theme.palette.primary.main
                : theme.palette.tertiary.dark; //.grey[500];
              let icon = <CheckCircleOutlineIcon fontSize="small" />;
              if (isFutureInvoice) {
                dotColor = isSelected
                  ? theme.palette.primary.main
                  : theme.palette.grey[500];
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
                    top: 15,
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
                      my: 1,
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
                      {formattedDate(dueDate)}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "GrayText", m: 0 }}>
            ما من فواتير مضافة
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add sx={{ ml: 2 }} />}
            onClick={() => navigate("/manager/course-financial/create")}
          >
            إضافة الفواتير
          </Button>
        </Box>
      )}
      <Typography
        variant="body1"
        fontWeight="bold"
        gutterBottom
        sx={{ my: 2, textAlign: "center", color: "GrayText" }}
      >
        الجدول الزمني للفواتير
      </Typography>
      <Divider />
      {selectedInvoiceId && (
        <InvoiceStudentsPayments invoiceId={selectedInvoiceId} />
      )}
    </Box>
  );
};

export default InvoiceTimeline;
