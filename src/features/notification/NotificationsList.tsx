import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import useFetchData from "../../hooks/useFetchData";

interface Notification {
  id: string;
  user_id: string;
  title: string;
  notifiable_type: string;
  notifiable_id: string;
  body: string;
  created_at: string;
}

const formatTime = (isoString) => {
  if (!isoString) return "لا يوجد تاريخ";
  const date = new Date(isoString);
  const now = new Date();
  const diffInHours =
    Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return `اليوم في ${date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return date.toLocaleDateString("ar-EG");
  }
};

const NotificationsList = () => {
  const { data:notificationsData } = useFetchData<Notification[]>("/notification/notifications");
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: 1,
        direction: "rtl",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{ p: { xs: 2, md: 4 }, bgcolor: "transparent" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              textAlign: "right",
            }}
          >
            <NotificationsIcon color="primary" sx={{ fontSize: 30, ml: 2 }} />
            <Typography variant="h5" component="h5" sx={{ fontWeight: "bold" }}>
              الإشعارات
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {notificationsData?.data?.map((notification) => (
              <Grid size={{ xs: 12 }} key={notification.id}>
                <Card
                  sx={{
                    transition: "transform 0.3s, box-shadow 0.3s",
                    bgcolor: "background.paper",
                  }}
                >
                  <CardContent
                    sx={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <Box sx={{ mt: 0.5, ml: 2, color: "primary.main" }}>
                      <MarkEmailUnreadIcon />
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 400 }}
                      >
                        {notification.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {notification.body}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 2,
                          color: "text.disabled",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                          {formatTime(notification.created_at)}
                        </Typography>
                        <ScheduleIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotificationsList;
