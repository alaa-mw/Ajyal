import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import { formattedDate } from "../../../utils/formatedDate";

export interface StudentWait {
  id: string;
  name: string;
  registrationFee: number;
  paymentStatus: "paid" | "unpaid" | "partial";
  registrationDate: string;
  isWaitingList: boolean;
}

interface Props {
  waitingStudents: StudentWait[];
  onConfirmRegistration: (studentId: string) => void;
}

const WaitStudentsList: React.FC<Props> = ({
  waitingStudents,
  onConfirmRegistration,
}) => {
  const getPaymentChip = (status: string) => {
    switch (status) {
      case "paid":
        return <Chip label="مدفوع" color="success" size="small" />;
      case "partial":
        return <Chip label="جزئي" color="warning" size="small" />;
      default:
        return <Chip label="غير مدفوع" color="error" size="small" />;
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        الطلاب الجدد المسجلين ({waitingStudents.length})
      </Typography>

      {/* Waiting List Section */}
      {waitingStudents.length > 0 && (
        <>
          <Typography
            variant="subtitle1"
            sx={{  color: "warning.main" }}
          >
            قائمة الانتظار ({waitingStudents.length})
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey.100" }}>
                  <TableCell>اسم الطالب</TableCell>
                  <TableCell align="center">رسم التسجيل</TableCell>
                  <TableCell align="center">حالة الدفع</TableCell>
                  <TableCell align="center">تاريخ التسجيل</TableCell>
                  <TableCell align="center">إجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {waitingStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell align="center">
                      {student.registrationFee} ر.س
                    </TableCell>
                    <TableCell align="center">
                      {getPaymentChip(student.paymentStatus)}
                    </TableCell>
                    <TableCell align="center">
                      {formattedDate(student.registrationDate)}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => onConfirmRegistration(student.id)}
                        disabled={student.paymentStatus !== "paid"}
                      >
                        تأكيد التسجيل
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default WaitStudentsList;
