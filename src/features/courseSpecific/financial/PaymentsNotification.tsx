import React from 'react';
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaidIcon from '@mui/icons-material/Paid';
import { Payment } from '../../../interfaces/Invoice';

interface Student{
    id:string;
    first_name:string;
}
// Interface definition
interface PaymentNotification {
  student: Student;
  payment: Payment;
  date: string;
}

// Sample data for notifications
const paymentNotifications: PaymentNotification[] = [
  {
    student: {
      id: "stu_001",
      first_name: "John Smith",
    },
    payment: {
      id: "pay_001",
      payment_date: "2024-01-15T10:30:00Z",
      invoice: {
        id: "inv_001",
        value: 1500.00,
        due_date: "2024-01-20",
        created_at: "2024-01-01T09:00:00Z",
        updated_at: "2024-01-15T10:30:00Z"
      }
    },
    date: "2024-01-15"
  },
  {
    student: {
      id: "stu_002",
      first_name: "Emily Johnson",
    },
    payment: {
      id: "pay_002",
      payment_date: "2024-01-16T14:45:00Z",
      invoice: {
        id: "inv_002",
        value: 2000.00,
        due_date: "2024-01-25",
        created_at: "2024-01-05T11:20:00Z",
        updated_at: "2024-01-16T14:45:00Z"
      }
    },
    date: "2024-01-16"
  },
  {
    student: {
      id: "stu_003",
      first_name: "Michael Brown",
    },
    payment: {
      id: "pay_003",
      payment_date: "2024-01-17T16:20:00Z",
      invoice: {
        id: "inv_003",
        value: 1800.00,
        due_date: "2024-01-22",
        created_at: "2024-01-03T08:15:00Z",
        updated_at: "2024-01-17T16:20:00Z"
      }
    },
    date: "2024-01-17"
  },
  {
    student: {
      id: "stu_004",
      first_name: "Sarah Wilson",
    },
    payment: {
      id: "pay_004",
      payment_date: "2024-01-18T11:10:00Z",
      invoice: {
        id: "inv_004",
        value: 2500.00,
        due_date: "2024-01-28",
        created_at: "2024-01-07T13:45:00Z",
        updated_at: "2024-01-18T11:10:00Z"
      }
    },
    date: "2024-01-18"
  },
  {
    student: {
      id: "stu_005",
      first_name: "David Lee",
    },
    payment: {
      id: "pay_005",
      payment_date: "2024-01-19T09:55:00Z",
      invoice: {
        id: "inv_005",
        value: 1700.00,
        due_date: "2024-01-24",
        created_at: "2024-01-04T10:30:00Z",
        updated_at: "2024-01-19T09:55:00Z"
      }
    },
    date: "2024-01-19"
  }
];

// Time ago function to display relative time
const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'الآن';
  if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
  if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
  if (diffInSeconds < 2592000) return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;
  
  return date.toLocaleDateString('ar-SA');
};

const PaymentsNotification = () => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationsIcon color="action" /> الإشعارات الأخيرة
        </Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {paymentNotifications.map((notification, index) => (
          <ListItem key={index} divider={index < paymentNotifications.length - 1}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'success.light' }}>
                <PaidIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={`قام ${notification.student.first_name} بتسديد دفعة جديدة بقيمة ${notification.payment.invoice.value} ريال`}
              secondary={timeAgo(notification.date)}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default PaymentsNotification;