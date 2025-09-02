import React from "react";
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaidIcon from "@mui/icons-material/Paid";
import { CoursePayments } from "../../../interfaces/Invoice";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";

const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "الآن";
  if (diffInSeconds < 3600)
    return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
  if (diffInSeconds < 86400)
    return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
  if (diffInSeconds < 2592000)
    return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;

  return date.toLocaleDateString("ar-SA");
};

const PaymentsNotification = () => {
  const { selectedCourseId } = useSelectedCourse();
  const { data } = useFetchDataId<CoursePayments>(
    `/payment/courses/${selectedCourseId}/payments`,
    selectedCourseId as string | undefined
  );
  const paymentNotifications = data?.data.payments ?? [];
  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <NotificationsIcon color="action" /> إشعارات الدفع
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {paymentNotifications.map((notification, index) => (
          <ListItem
            key={index}
            divider={index < paymentNotifications.length - 1}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "success.light" }}>
                <PaidIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box component="span">
                  قام{" "}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {notification.student_name}
                  </Box>{" "}
                  بتسديد دفعة جديدة بقيمة {notification.invoice_value} $
                </Box>
              }
              secondary={timeAgo(notification.payment_date)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PaymentsNotification;
