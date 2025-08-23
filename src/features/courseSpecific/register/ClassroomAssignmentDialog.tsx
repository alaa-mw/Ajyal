import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItemText,
  Typography,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import useSendData from "../../../hooks/useSendData";
import { useSelectedCourse } from "../../../contexts/SelectedCourseContext";
import useFetchDataId from "../../../hooks/useFetchDataId";
import { useSnackbar } from "../../../contexts/SnackbarContext";
import { ClassRoom } from "../../../interfaces/ClassRoom";

interface ClassroomAssignmentDialogProps {
  open: boolean;
  onClose: () => void;
  selectedStudents: string[];
}

export function ClassroomAssignmentDialog({
  open,
  onClose,
  selectedStudents,
}: ClassroomAssignmentDialogProps) {
  const { showSnackbar } = useSnackbar();
  const { selectedCourseId } = useSelectedCourse();
  const { data: classrooms } = useFetchDataId<ClassRoom[]>(
    `/course/classRooms-course/${selectedCourseId}`,
    selectedCourseId as string | undefined
  );
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(
    null
  );

  const { mutate: assignToClassroom } = useSendData("/course/sortStudent");

  const handleConfirm = () => {
    // fix - alert - snck
    assignToClassroom(
      {
        class_course_id: selectedClassroom,
        registration_id: selectedStudents,
      },
      {
        onSuccess: (response) => {
          showSnackbar(response.message, "success");
        },
        onError: (error) => {
          showSnackbar(error.message, "error");
        },
      }
    );
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">إسناد الطلاب إلى قاعة صفية</Typography>
        <Typography variant="body2" color="textSecondary">
          {selectedStudents.length} طالب محددة
        </Typography>
      </DialogTitle>

      <DialogContent>
        <List>
          {classrooms?.data.map((classroom) => (
            <ListItemButton
              key={classroom.id}
              selected={selectedClassroom === classroom.id}
              onClick={() => setSelectedClassroom(classroom.id)}
            >
              <ListItemText
                primary={classroom.class_number}
                secondary={`السعة: ${classroom.capacity}`}
              />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          إلغاء
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={!selectedClassroom}
        >
          تأكيد الإسناد
        </Button>
      </DialogActions>
    </Dialog>
  );
}
