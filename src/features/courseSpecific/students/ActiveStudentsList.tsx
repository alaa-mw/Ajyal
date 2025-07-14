import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Chip,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { formattedDate } from "../../../utils/formatedDate";
import NoteDialog from "./NoteDialog";
import { PaymentDialog } from "./PaymentDialog";
import { Student } from "../../../interfaces/Student";
import { getStudentName } from "../../../utils/getStudentName";
import { StudentActionsMenu } from "./StudentActionsMenu";

interface Props {
  activeStudents: Student[] | undefined;
}

const ActiveStudentsList = ({ activeStudents }: Props) => {
  const [students] = useState<Student[]>([
    {
      id: "1",
      first_name: "alaa",
      last_name: "...",
      mother_name: "mum",
      section: "أ",
      isAccountActive: true,
      registrationDate: "2023-01-15",
    },
    {
      id: "2",
      first_name: "yaman",
      last_name: "....",
      mother_name: "mum",
      section: "ب",
      isAccountActive: false,
      registrationDate: "2023-02-20",
    },
    {
      id: "3",
      first_name: "oula",
      last_name: "...",
      mother_name: "mum",
      section: "ب",
      isAccountActive: false,
      registrationDate: "2023-02-20",
    },
    {
      id: "4",
      first_name: "rana",
      last_name: "..",
      mother_name: "mum",
      section: "ب",
      isAccountActive: false,
      registrationDate: "2023-02-20",
    },
    {
      id: "5",
      first_name: "sana",
      last_name: "...",
      mother_name: "mum",
      section: "ب",
      isAccountActive: false,
      registrationDate: "2023-02-20",
    },
  ]);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isDraggingSelect, setIsDraggingSelect] = useState(false);
  const dragStartRef = useRef<number | null>(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  // Regular checkbox toggle
  const handleCheckboxChange = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  useEffect(() => {
    console.log(selectedStudents);
  }, [selectedStudents]);
  // Drag selection handlers
  const handleMouseDown = (studentId: string, index: number) => {
    dragStartRef.current = index;
    setIsDraggingSelect(true);
  };

  const handleMouseEnter = (studentId: string, index: number) => {
    if (!isDraggingSelect || dragStartRef.current === null) return;

    const start = dragStartRef.current;
    const end = index;

    const rangeStudents = students
      .slice(Math.min(start, end), Math.max(start, end) + 1)
      .map((s) => s.id);

    setSelectedStudents((prev) => [...new Set([...prev, ...rangeStudents])]);
  };

  const handleMouseUp = () => {
    setIsDraggingSelect(false);
    dragStartRef.current = null;
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    student: Student
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentStudent(student);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAssignToClassroom = () => {
    console.log("Assigning students:", selectedStudents);
    setSelectedStudents([]);
  };

  const handleSendPaymentAlert = () => {
    console.log("Sending payment alert to:", currentStudent?.id);
    handleMenuClose();
  };

  const handleAddPayment = () => {
    setOpenPaymentDialog(true);
    handleMenuClose();
  };

  const handleViewPayments = () => {
    console.log("Viewing payments for:", currentStudent?.id);
    handleMenuClose();
  };

  const handleAddNote = () => {
    setOpenNoteDialog(true);
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 2 }} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h6" sx={{ mb: 0 }}>
          الطلاب الفعليين (اسحب لتحديد متعدد)
        </Typography>

        {selectedStudents.length > 0 && (
          <Box sx={{ mb: 1, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAssignToClassroom}
            >
              إسناد إلى قاعة صفية ({selectedStudents.length})
            </Button>
          </Box>
        )}
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedStudents.length > 0 &&
                    selectedStudents.length < students.length
                  }
                  checked={
                    students.length > 0 &&
                    selectedStudents.length === students.length
                  }
                  onChange={() => {
                    setSelectedStudents(
                      selectedStudents.length === students.length
                        ? []
                        : students.map((s) => s.id)
                    );
                  }}
                />
              </TableCell>
              <TableCell>الاسم الثلاثي</TableCell>
              <TableCell>اسم الأم</TableCell>
              <TableCell>الشعبة</TableCell>
              <TableCell>متابعة الأهل</TableCell>
              <TableCell>تاريخ التسجيل</TableCell>
              <TableCell>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow
                key={student.id}
                hover
                sx={{
                  bgcolor: selectedStudents.includes(student.id)
                    ? "#e3f2fd"
                    : "inherit",
                  "&:hover": {
                    cursor: isDraggingSelect ? "crosshair" : "pointer",
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleCheckboxChange(student.id)}
                    onMouseDown={() => handleMouseDown(student.id, index)}
                    onMouseEnter={() => handleMouseEnter(student.id, index)}
                  />
                </TableCell>
                <TableCell>{getStudentName(student)}</TableCell>
                <TableCell>{student.mother_name}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>
                  <Chip
                    label={student.isAccountActive ? "متابع" : "غير متابع"}
                    color={student.isAccountActive ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formattedDate(student.registrationDate)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="actions"
                    onClick={(e) => handleMenuClick(e, student)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StudentActionsMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onSendPaymentAlert={handleSendPaymentAlert}
        onAddPayment={handleAddPayment}
        onViewPayments={handleViewPayments}
        onAddNote={handleAddNote}
      />

      <PaymentDialog
        open={openPaymentDialog}
        student={currentStudent}
        onClose={() => setOpenPaymentDialog(false)}
      />

      <NoteDialog
        open={openNoteDialog}
        student={currentStudent}
        onClose={() => setOpenNoteDialog(false)}
      />
    </Box>
  );
};

export default ActiveStudentsList;
