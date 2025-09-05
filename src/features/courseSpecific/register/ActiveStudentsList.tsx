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
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { formattedDate } from "../../../utils/formatedDate";
import NoteDialog from "./NoteDialog";
import { Student } from "../../../interfaces/Student";
import { getStudentName } from "../../../utils/getStudentName";
import { StudentActionsMenu } from "./StudentActionsMenu";
import { CourseRegistrationsStudent } from "../../../interfaces/Course";
import { ClassroomAssignmentDialog } from "./ClassroomAssignmentDialog";
import SkeletonTableRow from "../../../components/common/SkeletonTableRow";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading: boolean;
  activeStudents: CourseRegistrationsStudent[];
}

const ActiveStudentsList = ({ activeStudents, isLoading }: Props) => {
  console.log("activeStudents",activeStudents);
   const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isDraggingSelect, setIsDraggingSelect] = useState(false);
  const dragStartRef = useRef<number | null>(null);
  // const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openNoteDialog, setOpenNoteDialog] = useState(false);
  const [openClassroomDialog, setOpenClassroomDialog] = useState(false);
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
    if (!activeStudents) return;

    const rangeStudents = activeStudents
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
    setOpenClassroomDialog(true);
  };

  const handleSendPaymentAlert = () => {
    console.log("Sending payment alert to:", currentStudent?.id);
    handleMenuClose();
  };

  
  const handleViewPayments = () => {
    
    console.log("Viewing payments for:", currentStudent?.id);
    if (currentStudent) {
      navigate(`/manager/course-financial/${currentStudent.id}`);
    }
    handleMenuClose();
  };

  const handleAddNote = () => {
    setOpenNoteDialog(true);
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 0 }} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {/* <Typography variant="h6" sx={{ mb: 0 }}>
          الطلاب 
          <Typography variant="body2" color="grey">(اسحب لتحديد متعدد)</Typography>
        </Typography> */}

        {selectedStudents.length > 0 && (
          <Box sx={{ mb: 1, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAssignToClassroom}
            >
              إسناد إلى شعبة ({selectedStudents.length})
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
                    selectedStudents.length < activeStudents.length
                  }
                  checked={
                    activeStudents.length > 0 &&
                    selectedStudents.length === activeStudents.length
                  }
                  onChange={() => {
                    setSelectedStudents(
                      selectedStudents.length === activeStudents.length
                        ? []
                        : activeStudents.map((s) => s.id)
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
            {isLoading && <SkeletonTableRow cellCount={7} rowCount={3}/>}
            {activeStudents?.map((student, index) => (
              <TableRow
                key={student.id}
                hover
                sx={{
                  bgcolor: selectedStudents.includes(student.id) // registered_id
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
                <TableCell>{getStudentName(student.student)}</TableCell>
                <TableCell>{student.student.mother_name}</TableCell>
                <TableCell>{"later"}</TableCell>
                {/* // fix -later */}
                <TableCell>
                  <Chip
                    // fix -later
                    label={"متابع"}
                    color={"success"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formattedDate(student.registered_at)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="actions"
                    onClick={(e) => handleMenuClick(e, student.student)}
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
        onViewPayments={handleViewPayments}
        onAddNote={handleAddNote}
      />

      {/* <PaymentDialog
        open={openPaymentDialog}
        student={currentStudent}
        onClose={() => setOpenPaymentDialog(false)}
      /> */}

      <NoteDialog
        open={openNoteDialog}
        student={currentStudent}
        onClose={() => setOpenNoteDialog(false)}
      />
      <ClassroomAssignmentDialog
        open={openClassroomDialog}
        onClose={() => setOpenClassroomDialog(false)}
        selectedStudents={selectedStudents}
      />
    </Box>
  );
};

export default ActiveStudentsList;
