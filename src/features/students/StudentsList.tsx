import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import useFetchData from "../../hooks/useFetchData";
import { Student } from "../../interfaces/Student";
import { getStudentName } from "../../utils/getStudentName";
import { useRef, useState } from "react";
import { formattedDate } from '../../utils/formatedDate';

const StudentsList = () => {
  // State and handlers remain the same
  const { data: studentsData } = useFetchData<Student[]>("/student/all");
  const activeStudents = studentsData?.data || [];

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isDraggingSelect, setIsDraggingSelect] = useState(false);
  const dragStartRef = useRef<number | null>(null);

  const handleCheckboxChange = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

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

  return (
    <Box sx={{ p: 2 }} onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {selectedStudents.length > 0 && <div>actions needed</div>}
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
              <TableCell>الصف</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>تاريخ التسجيل</TableCell>
              <TableCell>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeStudents.map((student, index) => (
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
                <TableCell>{student.class_level}</TableCell>
                <TableCell>
                  <Chip label="نشط" color="success" size="small" />
                </TableCell>
                <TableCell>
                  {formattedDate(student.created_at)}
                </TableCell>
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
    </Box>
  );
};

export default StudentsList;
