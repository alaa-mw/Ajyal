import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Student } from "../../../interfaces/Student";
import { useEffect, useState } from "react";
import { getStudentName } from "../../../utils/getStudentName";
import useSendData from "../../../hooks/useSendData";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface NoteDialogProps {
  open: boolean;
  student: Student | null;
  onClose: () => void;
}

const NoteDialog = ({ open, student, onClose }: NoteDialogProps) => {
  const { showSnackbar } = useSnackbar();
  const [noteForm, setNoteForm] = useState({
    title: "",
    content: "",
    student_id: student?.id,
  });
  const { mutate: addNote } = useSendData("/note/add");

  const handleSaveNote = () => {
    addNote(noteForm, {
      onSuccess: (response) => {
        showSnackbar(response.message, "success");
        onClose();
      },

      onError: (error) => showSnackbar(error.message, "error"),
    });
  };

  useEffect(() => {
    setNoteForm({
      title: "",
      content: "",
      student_id: student?.id,
    });
  }, [open]);
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="h5" component="span">
          إضافة ملاحظة للطالب {getStudentName(student)}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="العنوان"
          fullWidth
          variant="standard"
          value={noteForm.title}
          onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
        />
        <TextField
          margin="dense"
          label="الملاحظة"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={noteForm.content}
          onChange={(e) =>
            setNoteForm({ ...noteForm, content: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>إلغاء</Button>
        <Button onClick={handleSaveNote}>حفظ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
